const Discord = require('discord.js');
const surf = require('./surf.json');
const fs = require("fs");
//const token = surf.token;
const prefix = surf.prefix;
const guildList = surf.guildList;
const bot = new Discord.Client();
bot.login(process.env.token);

bot.once("ready", () => {
    console.log("PREPARE...TO RELAX!");
    bot.user.setActivity("volleyball. | Say #help");
    bot.user.setStatus("idle");
});

bot.on("error", err => {
    if (err.message.startsWith("read ECONNRESET")) console.log(err.message);
    else console.log(err);
});

bot.on("message", message => {
    const invite = () => {message.author.send(surf.invite)}
    if (message.content.startsWith(prefix + "invite")) invite();
    if (message.content.startsWith(prefix + "join")) invite();
});

bot.on("message", message => {
    const intro = () => {
        message.author.send(surf.intro);
        message.channel.send(`I sent a letter far out to you, ${message.author}`);
    }
    const suBe = (blueSky) => {
        if (message.author.id != "459784010445619210") {
            message.channel.send(`Did someone say ${blueSky}?`);
        }
    }
    if (message.author.id == "459784010445619210") return;
    if (message.content.startsWith(prefix + "intro")) intro();
    if (message.content.startsWith(prefix + "help")) intro();
    if (message.content.startsWith(prefix + "info")) intro();
    if (message.content.startsWith(prefix + "beach")) intro();
    if (message.content.startsWith(prefix + "beachbot")) intro();
    if (message.content.startsWith(prefix + "BeachBot")) intro();
    if (message.content.startsWith(prefix + "beachBot")) intro();
    if (message.content.startsWith(prefix + "Beachbot")) intro();
    if (message.content.startsWith("beachbot")) intro();
    if (message.content.startsWith("BeachBot")) intro();
    if (message.content.startsWith("beachBot")) intro();
    if (message.content.startsWith("Beachbot")) intro();
    if (message.content.startsWith('<@459784010445619210>')) intro();
    else if (message.content.includes("surfboard")) suBe('surfboard');
    else if (message.content.includes("surfing")) suBe('surfing');
    else if (message.content.includes("surf")) suBe('surf');
    else if (message.content.includes("beach")) suBe('beach');
    else if (message.content.includes("sand")) suBe('sand');
});

bot.on("message", message => {
    let colRand1 = Math.floor(Math.random() * 255 + 1);
    let colRand2 = Math.floor(Math.random() * 255 + 1);
    let colRand3 = Math.floor(Math.random() * 255 + 1);
    const cateRole = (rolNm) => {
        if (message.channel.type == "dm") return;
        let theRole = message.guild.roles.find('name', `${rolNm}`);
        if (!theRole) {
            message.guild.createRole({
                name: `${rolNm}`, 
                hoist: true, 
                color: [colRand1, colRand2, colRand3],
                mentionable: true
            }).then(theRole => {
                message.member.addRole(`${theRole.id}`);
                message.channel.send(`${message.author}, you have been given the totally awesome new ${theRole} role. Far out!`);
            });
        } else if (message.member.roles.has(theRole.id)) {
            message.channel.send(`You already have that role, ${message.author}, dude.`);
        } else {
            /*if (!theRole.hasPermission("ADMINISTRATOR") && !theRole.hasPermission("KICK_MEMBERS") && !theRole.hasPermission("BAN_MEMBERS") && !theRole.hasPermission("MANAGE_CHANNELS") && !theRole.hasPermission("MANAGE_GUILD") && !theRole.hasPermission("MANAGE_MESSAGES") && !theRole.hasPermission("MUTE_MEMBERS") && !theRole.hasPermission("DEAFEN_MEMBERS") && !theRole.hasPermission("MOVE_MEMBERS") && !theRole.hasPermission("MANAGE_NICKNAMES") && !theRole.hasPermission("MANAGE_ROLES") && !theRole.hasPermission("MANAGE_WEBHOOKS") && !theRole.hasPermission("MANAGE_EMOJIS")) {
                message.member.addRole(`${theRole.id}`);
                message.channel.send(`${message.author}, you have been given the totally awesome ${theRole} role.`);
            } else {
                message.channel.send(`${message.author}, that role's permissions are too far out. Try something else.`);
            }*/ message.channel.send(`Try making a custom role, dude.`);
        }
    }
    const remaRole = (rolNm) => {
        if (message.channel.type == "dm") return;
        let theRole = message.guild.roles.find('name', `${rolNm}`);
        if (!theRole) {
            message.channel.send(`That role isn't on this server, ${message.author}.`);
        } else if (message.member.roles.has(theRole.id)) {
            message.member.removeRole(`${theRole.id}`);
            message.channel.send(`Cmon, ${message.author}, dude! You lost my ${theRole} role.`);
        } else {
            message.channel.send(`You don't have that role, dude.`);
        }
    }
    const roleList = () => {
        if (message.channel.type == "dm") return;
        if (message.member.hasPermission("MENTION_EVERYONE")) {
            let rLO = [];
            message.guild.roles.forEach(rolly => {
                if (rolly.name == '@everyone') rLO.push(`@everyone`);
                else rLO.push(`<@&${rolly.id}>`);
            });
            message.channel.send(`I've got the full list of roles in this server right here, dude.`);
            message.channel.send(rLO.join("\n"));
        } else {
            let rLO = [];
            message.guild.roles.forEach(rolly => {
                if (rolly.name == '@everyone') return;
                else rLO.push(`<@&${rolly.id}>`);
            });
            message.channel.send(`I've got the full list of roles in this server right here, dude. Except the everyone tag, of course.`);
            message.channel.send(rLO.join("\n"));
        }
    }
    if (message.content.startsWith(`${prefix}add`) && message.member.hasPermission("MANAGE_ROLES")) {
        if (message.content.length <= (prefix.length + 3)) {
            message.channel.send("Put a role after the command, dude.");
        } else if (message.content.includes("@")) {
            message.channel.send("Remove all the '@'s.");
        } else {
            let ewewRl = message.content.slice(prefix.length + 4, message.content.length);
            cateRole(ewewRl);
        }
    }
    if (message.content.startsWith(`${prefix}remove`) && message.member.hasPermission("MANAGE_ROLES")) {
        if (message.content.length <= (prefix.length + 6)) {
            message.channel.send("Put a role after the command, dude.");
        } else if (message.content.includes("@")) {
            message.channel.send("Remove all the '@'s.");
        } else {
            let oroLP = message.content.slice(prefix.length + 7, message.content.length);
            remaRole(oroLP);
        }
    }
    if (message.content.startsWith(`${prefix}roles`)) roleList();
    if (message.content.startsWith(`${prefix}roleList`)) roleList();
    if (message.content.startsWith(`${prefix}list`)) roleList();
    if (message.content.startsWith(`${prefix}rolelist`)) roleList();
    if (message.content.startsWith(`${prefix}RoleList`)) roleList();
    if (message.content.startsWith(`${prefix}Rolelist`)) roleList();
    if (message.content.startsWith(`${prefix}List`)) roleList();
    if (message.content.startsWith(`${prefix}Roles`)) roleList();
});

/*bot.on("guildCreate", guild => {
    guildList.push(guild.name);
});

bot.on("message", message => {
    const guYld = () => {
        if (guildList.length == 1) {
            message.channel.send(`I am currently being used in ${guildList.length} server.`);
        } else {
            message.channel.send(`I am currently being used in ${guildList.length} servers.`);
        }
        console.log(guildList);
    }
    if (message.content.startsWith(`${prefix}guilds`)) guYld();
    if (message.content.startsWith(`${prefix}servers`)) guYld();
});*/
