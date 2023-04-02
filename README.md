# Basic-Discord-Bot

### Introduction

Welcome to this basic Discord bot.

### Features

 * Discordjs 13
 * Basic Ticketsystem
 * Basic Commands(full list below)
 * Permissions (CHecks if you have the rights to execute the commands)

### Commandlist

 * /help | shows a list of all commands
 * /latency | shows the bot ping
 * /ping | replies with pong
 * /server | returns some Server information
 * /user | returns some information about the user
 * /ticket-setup | sends an embed into a channel with a menu to select which category the channel should have

### Work in Progress

 * Basic setup commands
 * Rate limits
 * Code optimizations
 * Ticket Archive
 * Ticket Reason for closure


### Basic Setup

Insert your Values into the config.json.  
Run the snippet below in an console to register your commands
```cmd
node deploy-commands.js
```

After that use the snippet below to start the bot

```cmd
node index.js
```
