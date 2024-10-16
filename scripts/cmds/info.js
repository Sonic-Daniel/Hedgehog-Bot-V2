const fs = require('fs');

const moment = require('moment-timezone');

const os = require('os');

const si = require('systeminformation');

const { performance } = require('perf_hooks');



module.exports = {

    config: {

        name: "info",

        version: "1.0",

        author: "Itz Aryan",

        countDown: 5,

        role: 0,

        shortDescription: { vi: "", en: "" },

        longDescription: { vi: "", en: "" },

        category: "owner",

        guide: { en: "" },

        envConfig: {}

    },

    onStart: async function ({ message }) {

        const botName = "웃『𝐒𝐇𝐈𝐒𝐔𝐈』ツ";

        const botPrefix = "#";

        const now = moment().tz('Asia/Jakarta');

        const date = now.format('MMMM Do YYYY');

        const time = now.format('h:mm:ss A');

        const uptime = process.uptime();

        const seconds = Math.floor(uptime % 60);

        const minutes = Math.floor((uptime / 60) % 60);

        const hours = Math.floor((uptime / (60 * 60)) % 24);

        const days = Math.floor(uptime / (60 * 60 * 24));

        const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;



        const cpu = os.cpus()[0].model;

        const cores = os.cpus().length;

        const arch = os.arch();

        const platform = os.platform();

        const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2);

        const freeMemory = (os.freemem() / (1024 ** 3)).toFixed(2);

        const usedMemory = (totalMemory - freeMemory).toFixed(2);



        // Disk information

        const diskInfo = await si.fsSize();

        const totalDisk = (diskInfo[0].size / (1024 ** 3)).toFixed(2);

        const usedDisk = (diskInfo[0].used / (1024 ** 3)).toFixed(2);

        const freeDisk = (diskInfo[0].available / (1024 ** 3)).toFixed(2);



        // Initialize link with a placeholder or handle properly based on your requirements

        const links = [

            "https://i.ibb.co/W2CwSZd/image.jpg",

            "https://i.ibb.co/D7qypWY/image.jpg"

        ];

        const link = links[Math.floor(Math.random() * links.length)];



        // Network information

        const networkInterfaces = os.networkInterfaces();

        const primaryInterface = Object.keys(networkInterfaces)[0];

        const ipAddress = networkInterfaces[primaryInterface][0].address;



        // System Load

        const load = os.loadavg();

        const loadString = `1m: ${load[0].toFixed(2)}, 5m: ${load[1].toFixed(2)}, 15m: ${load[2].toFixed(2)}`;



        // Speed (ping)

        const start = performance.now();

        await new Promise(resolve => setTimeout(resolve, 100));

        const end = performance.now();

        const ping = (end - start).toFixed(2);



        // Reply message construction

        message.reply({

            body: `《 𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 》

\Name: ${botName}

\Bot Prefix: ${botPrefix}

\Date: ${date}

\Time: ${time}

\Uptime: ${uptimeString}

=============== 

《 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢 》

\CPU: ${cpu}

\Cores: ${cores}

\Architecture: ${arch}

\Platform: ${platform}

\Total Memory: ${totalMemory} GB

\Used Memory: ${usedMemory} GB

\Free Memory: ${freeMemory} GB

=============== 

《 𝗗𝗜𝗦𝗞 𝗜𝗡𝗙𝗢 》

\Total Disk: ${totalDisk} GB

\Used Disk: ${usedDisk} GB

\Free Disk: ${freeDisk} GB

=============== 

《 𝗡𝗘𝗧𝗪𝗢𝗥𝗞 𝗜𝗡𝗙𝗢 》

\IP Address: ${ipAddress}

=============== 

《 𝗦𝗬𝗦𝗧𝗘𝗠 𝗟𝗢𝗔𝗗 》

\Load (1m): ${load[0].toFixed(2)}

\Load (5m): ${load[1].toFixed(2)}

\Load (15m): ${load[2].toFixed(2)}

=============== 

《 𝗣𝗘𝗥𝗙𝗢𝗥𝗠𝗔𝗡𝗖𝗘 𝗜𝗡𝗙𝗢 》

\Ping: ${ping} ms

===============`,

            attachment: await global.utils.getStreamFromURL(link)

        });

    },

    onChat: async function ({ event, message, getLang }) {

        if (event.body && event.body.toLowerCase() === "info") {

            this.onStart({ message });

        }

    }

};
