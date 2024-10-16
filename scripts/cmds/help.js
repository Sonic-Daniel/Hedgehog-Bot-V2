const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "웃『𝐒𝐇𝐈𝐒𝐔𝐈』ヅ"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "NTKhang", // modified by ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "system",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "╭──────•🎯•──────╮\nミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡\n╰──────•🎯•──────╯\n";

      msg += `━━━━━━━━━━━━━━━━\n`; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += ` ╭─⊚👻🎶${category.toUpperCase()}🎶👻\n`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 3).map((item) => `│  🥀 🔔✨${item}✨🔔\n`);
            msg += ` ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += ` ╰──────────────⊚\n`;
        }
      });

      const totalCommands = commands.size;
      msg += `𝐀𝐜𝐭𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝐥𝐞 𝐇𝐞𝐝𝐠𝐞𝐡𝐨𝐠𝐛𝐨𝐭 𝐝𝐢𝐬𝐩𝐨𝐬𝐞 𝐝𝐞 🎶${totalCommands}𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬🎶\n`;
      msg += `𝐒𝐚𝐢𝐬𝐢𝐬 ${prefix}𝐡𝐞𝐥𝐩 𝐬𝐮𝐢𝐯𝐢 𝐝𝐮 𝐧𝐨𝐦 𝐝𝐞 𝐥𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐩𝐨𝐮𝐫 𝐚𝐯𝐨𝐢𝐫 𝐩𝐥𝐮𝐬 𝐝𝐞 𝐝𝐞𝐭𝐚𝐢𝐥 𝐬𝐮𝐫 𝐥𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞\n━━━━━━━━━━━━━━━\n`;
      msg += `✎﹏﹏﹏﹏﹏﹏﹏﹏\n📣| 웃『𝐒𝐇𝐈𝐒𝐔𝐈』ヅ\n✎﹏﹏﹏﹏﹏﹏﹏﹏`; // its not decoy so change it if you want 

      const helpListImages = [
        "https://i.ibb.co/NZB12dL/image.jpg", // add image link here
        "https://i.ibb.co/xCqLBkB/image.jpg",
        "https://i.ibb.co/hLwkPfG/image.jpg",
        "https://i.ibb.co/L1ncxZf/image.jpg",
        "https://i.ibb.co/2crgLSM/image.jpg",

"https://i.ibb.co/tbSwLpq/image.jpg",
        // Add more image links as needed
      ];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage),
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `╭── NAME ────⭓
  │ ${configCommand.name}
  ├── INFO
  │ Description: ${longDescription}
  │ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
  │ Other names in your group: Do not have
  │ Version: ${configCommand.version || "1.0"}
  │ Role: ${roleText}
  │ Time per command: ${configCommand.countDown || 1}s
  │ Author: ${author}
  ├── Usage
  │ ${usage}
  ├── Notes
  │ The content inside <XXXXX> can be changed
  │ The content inside [a|b|c] is a or b or c
  ╰━━━━━━━❖`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
          }
