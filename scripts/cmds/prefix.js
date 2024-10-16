const fs = require('fs');

module.exports = {
  config: {
    name: "prefix",
    version: "1.0",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡", // this cmd will expire if you change this credits (NEW VERSION)
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "system",
  },
 
  onStart: async function() {},
 
  onChat: async function({ event, message, getLang, api }) {
   const link = [
"https://i.ibb.co/ZhbH43w/image.gif",
"https://i.ibb.co/3kp0Ft2/image.gif",
"https://i.ibb.co/thTk7LS/image.gif",
]
  let img =
link[Math.floor(Math.random()*link.length)]
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "prefix":
          const replies = [
            "╔╦══• •✠•☘️•✠ • •══╦╗🎯𝑯𝑬𝑫𝑮𝑬𝑯𝑶𝑮👻𝑷𝑹𝑬𝑭𝑰𝑿🎯\n            🎶✨#✨🎶\n╰╚╩══• •✠•☘️•✠ • •══╩╝\n════•『🎗』•════\n🍂✨𝑀𝑌 𝐶𝑅𝐸𝐴𝑇𝑂𝑅𝑆✨🍂\n════•『🎗』•════\n╭━──━─≪💧≫─━──━╮\nミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡\n╰━──━─≪💧≫─━──━╯",
          ];
          api.setMessageReaction("🥀", event.messageID, event.messageID, api); 
          const randomIndex = Math.floor(Math.random() * replies.length);
          message.reply({
            body: replies[randomIndex],
attachment: await global.utils.getStreamFromURL(img)})
          break;
        default:
          return; 
      }
    }
  },
};
