# Slack Bolt - Anonymous Bot

---

This is a App built with [Slack's Bolt Framework](https://slack.dev/bolt/tutorial/getting-started) for node.js.

If you send a DM to this bot, it will be anonymously transferred to #anonymous.

### Requirements

- A Bot User must be added to your App
- Your App must be subscribed to [Events API](https://api.slack.com/events-api)
- Your app needs to be subscribed to the events mentioned in the _Events_ section

### Scopes

- [`channels:history`](https://api.slack.com/scopes/channels:history)
- [`im:history`](https://api.slack.com/scopes/im:history)
- [`chat:write`](https://api.slack.com/scopes/chat:write)

### Events

#### Workspace events

- [`app_home_opened`](https://api.slack.com/events/app_home_opened)
- [`message.channels`](https://api.slack.com/events/message.channels)
- [`message.im`](https://api.slack.com/events/message.im)
