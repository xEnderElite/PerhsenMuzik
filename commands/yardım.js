const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
module.exports = {//It is encoded by K4H1N
  name: "yardım",
  description: "Perhsen Music", 
  execute(client, message) {
  message.channel.send(new Discord.MessageEmbed()
  .setDescription(
    `
\> ${ayarlar.PREFIX}oynat <şarkı-adı> \n **Bir Şarkıyı Oynatır.** \n
\> ${ayarlar.PREFIX}atla \n **Sıradaki şarkıyı atlar.**\n
\> ${ayarlar.PREFIX}durdur \n **Şarkıyı durdurur.**\n
\> ${ayarlar.PREFIX}devam \n **Duran şarkıyı devam ettirir.**\n
\> ${ayarlar.PREFIX}sıra \n **Şarkı sırasını gösterir.**\n
\> ${ayarlar.PREFIX}şarkı \n **Oynatılan şarkının adını söyler.**\n
`)
.setColor("BLUE")
                      )    
}
} 