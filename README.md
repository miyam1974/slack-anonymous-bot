# Slack Anonymous Bot by Slack Bolt
---
This is a App built with [Slack's Bolt Framework](https://slack.dev/bolt/tutorial/getting-started) for node.js.  
If you send a DM to this bot, it will be anonymously transferred to #anonymous.  
This project can be imported into Glitch ([https://glitch.com](https://glitch.com)) as is.  

## Requirements

- A Bot User must be added to your App
- Your App must be subscribed to [Events API](https://api.slack.com/events-api)
- Your app needs to be subscribed to the events mentioned in the _Events_ section

## Tokens
- OAuth Access Token
- Bot User OAuth Access Token

## Scopes
#### Bot Token Scopes
- [`channels:history`](https://api.slack.com/scopes/channels:history)
- [`im:history`](https://api.slack.com/scopes/im:history)
- [`chat:write`](https://api.slack.com/scopes/chat:write)

## Events
#### bot events

- [`app_home_opened`](https://api.slack.com/events/app_home_opened)
- [`message.channels`](https://api.slack.com/events/message.channels)
- [`message.im`](https://api.slack.com/events/message.im)

## Files
name | description
--- | ---
.env | Setting file. Not included. Please create a new one.
.glitch-assets |
README.md | This information file.
index.js | Main logic.
package-lock.json |
package.json |

### .env
Create an .env file in the following format and describe the value of the variable

    # Environment Config
    
    SLACK_SIGNING_SECRET=please input
    SLACK_BOT_TOKEN=please input
    SLACK_TOKEN=please input

    ANONYMOUS_CHANNEL_ID=please input
    BOT_DM_CHANNEL_ID=please input
    BOT_USER_ID=please input
    
    # On Glitch, free user apps sleep in 5 minutes.
    # This value is the URL path from the root without the domain.
    # If you access this page every 5 minutes using a service such as cron, 
    # you can keep the application running.
    # 
    # WAKE_UP_URL=/wake-up
    
    WAKE_UP_URL=/wake-up

### License
MIT License