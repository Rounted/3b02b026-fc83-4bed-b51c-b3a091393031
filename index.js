var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

const YTDL = require("ytdl-core");
const TOKEN = "Mzk3MDU5ODk2MDUyNTQ3NTk3.DTBrXw.E7YIMydUb1d3dJSfult9ApdEu6c";
const PREFIX = "/";
const Discord = require("discord.js");

function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly" }));
    server.queue.shift();
    server.dispatcher.on("end", function () {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunes = [
    "Evet",
    "Hayır",
    "Olabilir",
    "Kes sesini"
]

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function () {
    console.log("Hazır!");
});

bot.on("guildMemberAdd", function (member) {
    member.guild.channels.find("name", "genel-sohbet").sendMessage(member.toString() + " Aramıza Hoşgeldin Dostum !!");
    member.addRole(member.guild.roles.find("name", "Game Of Player"));
});

bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");



    switch (args[0].toLowerCase()) {
        case "yardım":
            var embed = new Discord.RichEmbed();
            message.channel.sendEmbed(embed.setTitle("Komut Listesi").setColor('BLUE').setDescription("**/yardım , /ping , /hakkımızda , /sor (Soru) , /temizle (Mesaj Sayısı) , /zarsalla , /play , /skip , /stop **"));
            break;
        case "ping":
            message.channel.sendMessage("Ping! Pong! Tong!");
            break;
        case "hakkımızda":
            message.channel.sendMessage("Biz Game Of Players Topluluğuyuz :heart:");
            break;
        case "sor":
            if (args[1])
                message.channel.sendMessage(message.author.tag + ' ' + fortunes[Math.floor(Math.random() * fortunes.length)]);
            else
                message.channel.sendMessage("Anlayamadım dostum.");
            break;
        case "temizle":
            var messagesdelete = message.channel.awaitMessages;
            message.channel.messagesdelete();
            break;
        case "zarsalla":
            break;
        case "play":
            if (!args[1]) {
                message.channel.sendMessage("Lütfen youtube linki atın.")
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.sendMessage("Lütfen herhangi bir ses kanalına bağlanın.");
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] =
                {
                    queue: []
                };


            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
                play(connection, message);
            });

            break;

            case "skip":
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            break;
            case "stop":
            var server = servers[message.guild.id];
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break; 
        default:
            message.channel.sendMessage("Böyle bir komut bulunamadı dostum. Lütfen **/yardım** yazarak komut listesine bir göz at.")
            break;
    }


});

bot.login(TOKEN);









app.get("/", function (req, res) {
    res.send("Merhaba deneme");
});

app.listen(port);