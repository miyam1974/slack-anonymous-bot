const { App, ExpressReceiver } = require('@slack/bolt');

const expressReceiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET });

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token:         process.env.SLACK_BOT_TOKEN,
  receiver:      expressReceiver
});

// Access URL for Wake Up Glitch
expressReceiver.router.get(process.env.WAKE_UP_URL, (req, res) => {
  res.send('ok');
});

// Display the description on the latest line of the app home.
app.event('app_home_opened', async({ event, say }) => {
  let infoMessage = `If you send a DM here, anonymously posted to <#${process.env.ANONYMOUS_CHANNEL_ID}>. However, unable to change, delete, use threads, upload files.`;
  
  try {
    const result = await app.client.conversations.history({
      token:   process.env.SLACK_BOT_TOKEN,
      channel: process.env.BOT_DM_CHANNEL_ID,
      limit:   100
    });
    if (result.ok === true) {
      //delete
      let firstMessageTs = result.messages[0].ts;
      const infoMessages = result.messages.filter(message => message.text === infoMessage);
      for (let message of infoMessages) {
        try {
          //Do not delete if it is the latest line.
          if (message.ts === firstMessageTs) {
            continue;
          }
          const result = await app.client.chat.delete({
            token:   process.env.SLACK_BOT_TOKEN,
            channel: process.env.BOT_DM_CHANNEL_ID,
            ts:      message.ts
          });
        }
        catch (error) {
          console.log("event: app_home_opened -> delete");
          console.log(message);
          console.error(error);
          say('Error: ' + error.data.error);
        }
      }
      //post
      if (result.messages[0].text !== infoMessage) {
        say(infoMessage);
      }
    }
  }
  catch (error) {
    console.error(error);
  }
});

// Delete message and post to anonymous channel.
app.message(async ({ message, say }) => {
  if (message.type    === 'message'                          &&
      (message.channel === process.env.BOT_DM_CHANNEL_ID ||
       message.channel === process.env.ANONYMOUS_CHANNEL_ID) &&
      message.user    !== process.env.BOT_USER_ID            &&
      ("subtype" in message === false ||
       "subtype" in message === true  && message.subtype === 'file_share')
     ) {
    
    //delete (only message in #annonymous)
    if (message.channel === process.env.ANONYMOUS_CHANNEL_ID) {
      try {
        const result = await app.client.chat.delete({
          token:   process.env.SLACK_TOKEN,
          channel: message.channel,
          ts:      message.ts,
          as_user: true
        });
      }
      catch (error) {
        console.log("event: message -> delete");
        console.log(message);
        console.error(error);
        say('Error: ' + error.data.error);
      }
    }

    //post
    try {
      if ("subtype" in message === false ||
          "subtype" in message === true  && message.subtype !== 'file_share') {
        const result = await app.client.chat.postMessage({
          token:   process.env.SLACK_BOT_TOKEN,
          channel: process.env.ANONYMOUS_CHANNEL_ID,
          text:    message.text
        });
      }
    }
    catch (error) {
      console.log("event: message -> post");
      console.log(message);
      console.error(error);
      say('Error: ' + error.data.error);
    }
  }
});

// Start app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
