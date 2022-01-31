  
const { Util } = require("discord.js");
const { YOUTUBE_API_KEY } = require("../ayarlar.json");
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(YOUTUBE_API_KEY);
const Discord = require('discord.js')
const { play } = require("../system/music.js") 
module.exports = {
  name: "oynat",
  description: "Perhsen Music",
  async execute(client, message, args) {

    if (!args.length) {
      return message.channel.send("> **Şarkı ismi veya link girmelisin.**");
    }
    
    const { channel } = message.member.voice;
    if (!channel) {
      
      return message.channel.send("> **Herhangi bir ses kanalına girmelisin.**");
    }



    const targetsong = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlcheck = videoPattern.test(args[0]);//It is encoded by K4H1N

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.channel.send("> **Oynatma listesi oynatılamıyor.**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let songData = null;
    let song = null;

    if (urlcheck) {
      try {
         
         const result = await youtube.searchVideos(args[0], 1)//It is encoded by K4H1N
         if(!result[0]) return message.channel.send('> **Yanlış link.**')
        songData = await ytdl.getInfo(result[0].url,{});
       
        console.log(songData)
        song = {
           title: songData.videoDetails.title,
           url: songData.videoDetails.video_url,
           duration: songData.videoDetails.lengthSeconds,
           thumbnail : songData.videoDetails.thumbnails[0].url,
           author : songData.videoDetails.author.name,
           wiews : songData.videoDetails.viewCount,
          likes : {
          trues : songData.videoDetails.likes.toLocaleString(),
          falses :songData.videoDetails.dislikes.toLocaleString()
         }
        };

      } catch (error) {
        if (message.include === "copyright") {
          return message
            .reply("> **Bu video telif hakları nedeni ile oynatılamıyor.**")
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {
      try {
         const result = await youtube.searchVideos(targetsong, 1)//It is encoded by K4H1N
        if(!result[0]) return message.channel.send('> **Arama sonucu bulunamadı.**')
        songData = await ytdl.getInfo(result[0].url)
         song = {
           title: songData.videoDetails.title,
           url: songData.videoDetails.video_url,
           duration: songData.videoDetails.lengthSeconds,
           thumbnail : songData.videoDetails.thumbnails[0].url,
           author : songData.videoDetails.author.name,
           wiews : songData.videoDetails.viewCount,
          likes : {
          trues : songData.videoDetails.likes.toLocaleString(),
         }
  
        };

      } catch (error) {
        console.error(error)
      }
    }
    
    if(serverQueue) {
      serverQueue.songs.push(song)
      return serverQueue.textChannel.send( new Discord.MessageEmbed()//It is encoded by K4H1N
        .setColor("BLUE")
        .setAuthor('Sıraya Eklendi!',message.author.avatarURL({format : "png",dynamic : true}))
        .setTitle(song.title)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        .addField('> Kanal',song.author,false)
        .addField('> Şarkı Saniyesi',song.duration,false)
        .addField('> İzlenme Sayısı',song.wiews.toLocaleString(),false)
        .addField('> Like',song.likes.trues,false)
        .addField('> Dislike',song.likes.falses,false))
      .catch(console.error)
    } else {
      queueConstruct.songs.push(song);
    }
    if(!serverQueue) message.client.queue.set(message.guild.id, queueConstruct)
    
     if (!serverQueue) {
      try {
    
        queueConstruct.connection = await channel.join();
        play(song, message)
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();//It is encoded by K4H1N
        return message.channel.send({embed: {"description": `Kanala giriş yapamıyorum.: ${error}`, "color": "RED"}}).catch(console.error);
      }
    }
    
  }
};