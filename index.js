var express = require("express");
var app = express();
var port = process.env.PORT || 3000;


const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "/";

bot.login('Mzk3MDU5ODk2MDUyNTQ3NTk3.DTBrXw.E7YIMydUb1d3dJSfult9ApdEu6c');

bot.on("ready",function(){
console.log('Bot Çalışıyor : '+ bot.user.tag)
});

bot.on("message", function(msg){
if(msg.content === prefix + "test")
{
msg.channel.send('Başarılı Dostum !');
}
});




app.get("/",function(req,res)
{
    res.send("Merhaba deneme");
});

app.listen(port);