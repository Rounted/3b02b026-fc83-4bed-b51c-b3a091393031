import { isContext } from "vm";

var express = require("express");
var app = express();
var port = process.env.PORT || 3000;


const Discord = require("discord.js");
const bot = new Discord.Client();

const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./Configuration/config.json", "utf8"));


bot.login(config.token);

bot.on("ready", function () {
    console.log('Bot Çalışıyor : ' + bot.user.tag)
});


bot.on("message", function (msg) {

    if (msg.content === config.prefix + "yardım") {
        msg.channel.send('Komut Listesi : /test , /yardım ,/temizle (Mesaj Sayısı)');
    }
    if (msg.content === config.prefix + "test") {
        msg.channel.send('Başarılı Dostum !');
    }
    if (msg.content === config.prefix + "zarsalla") {
        var x = Math.floor((Math.random() * 6) + 1);
        msg.channel.send(x);
    }
});













app.get("/", function (req, res) {
    res.send("Merhaba deneme");
});

app.listen(port);