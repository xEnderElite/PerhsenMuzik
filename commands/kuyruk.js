module.exports = {
    name: "sıra",
    description: "Perhsen Music",
    execute: (client, message, args) => {//It is encoded by K4H1N
      const { channel } = message.member.voice;
      if (!channel) {
        return message.channel.send("> **Herhangi bir ses kanalında bulunmalısınız.**");
      }
  
      const serverQueue = message.client.queue.get(message.guild.id);
  
      if (!serverQueue) {
        return message.channel.send("> **Kuyrukta şarkı bulamadım.**");
      } 
  
      message.channel.send(
        `${serverQueue.songs
          .map((song, index) => index + 1 + ". " + song.title)
          .join("\n\n")}`,
        { split: true }
      );
    }
  };