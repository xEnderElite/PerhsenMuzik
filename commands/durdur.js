module.exports = {
    name: "durdur",
    description: "Perhsen Music",
    execute (client, message, args) {//It is encoded by K4H1N
    const { channel } = message.member.voice;
      if (!channel) {
      
        return message.channel.send("> **Herhangi bir ses kanalında bulunmalısınız.**");
      }
      const serverQueue = message.client.queue.get(message.guild.id);
  
      if (!serverQueue) {
        return message.channel.send("> **Duraklatabileceğim bir şarkı bulamadım.**");
      }
      if(!serverQueue.playing) return message.channel.send('> **Şarkılar Zaten Duraklatılmış.**')
      if(serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause(true)
        
        return message.channel.send("> ✅ **Oynatılan şarkı duraklatıldı.**")
    }  
    }
  }