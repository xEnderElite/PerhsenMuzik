const discord = require("discord.js")
const token = process.env.token;

const client = new discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });
const { readdirSync } = require("fs");
const { join } = require("path");//It is encoded by K4H1N
const ayarlar = require("./ayarlar.json")
client.on("ready", () => {
  console.log('Perhsen Music Aktif!')
  client.user.setActivity("Perhsen Music")
})
client.on("warn", info => console.log(info));

client.on("error", console.error)

client.commands = new discord.Collection()
client.prefix = ayarlar.PREFIX
client.queue = new Map();


const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file))
  client.commands.set(command.name, command)
} 


client.on("message", message => {
   if (message.author.bot) return;
  if (!message.guild) return;
  
  if(message.content.startsWith(ayarlar.PREFIX)) {//It is encoded by K4H1N
    
    const args = message.content.slice(ayarlar.PREFIX.length).trim().split(/ +/)
    const command = args.shift().toLowerCase();
    
    if(!client.commands.has(command)) {
      return;
    } 
  try  { 
      client.commands.get(command).execute(client, message, args)
    } catch (err) { 
      console.log(err)
      message.reply("> Bir hata oluştu!")//It is encoded by K4H1N
    }
    
  }
});

client.login(ayarlar.token)    