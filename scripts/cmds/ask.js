const axios = require('axios');

async function fetchFromAI(url, params) {
 try {
 const response = await axios.get(url, { params });
 return response.data;
 } catch (error) {
 console.error(error);
 return null;
 }
}

async function getAIResponse(input, userName, userId, messageID) {
 const services = [
 { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
 ];

 let response = `ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡`;
 let currentIndex = 0;

 for (let i = 0; i < services.length; i++) {
 const service = services[currentIndex];
 const data = await fetchFromAI(service.url, service.params);
 if (data && (data.gpt4 || data.reply || data.response)) {
 response = data.gpt4 || data.reply || data.response;
 break;
 }
 currentIndex = (currentIndex + 1) % services.length; // Passer au service suivant
 }

 return { response, messageID };
}

module.exports = {
 config: {
 name: 'ask',
 author: 'shizuka',
 role: 0,
 aliase: ["𝐬𝐨𝐧𝐢𝐜"],
 category: 'ai-chat',
 shortDescription: 'ai to ask anything',
 },
 onStart: async function ({ api, event, args }) {
 const input = args.join(' ').trim();
 if (!input) {
 api.sendMessage("𝗦𝗮𝗹𝘂𝘁 𝗹'𝗮𝗺𝗶(𝗲)🖐💙 𝗲𝘅𝗽𝗹𝗶𝗾𝘂𝗲𝘀 𝗺𝗼𝗶 𝘁𝗼𝗻 𝗽𝗿𝗼𝗯𝗹𝗲𝗺𝗲", event.threadID, event.messageID);
 return;
 }

 api.getUserInfo(event.senderID, async (err, ret) => {
 if (err) {
 console.error(err);
 return;
 }
 const userName = ret[event.senderID].name;
 const { response, messageID } = await getAIResponse(input, userName, event.senderID, event.messageID);
 api.sendMessage(`ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━ 웃『𝐒𝐇𝐈𝐒𝐔𝐈』ヅ `, event.threadID, messageID);
 });
 },
 onChat: async function ({ api, event, message }) {
 const messageContent = event.body.trim().toLowerCase();
 if (messageContent.startsWith("sonic")) {
 const input = messageContent.replace(/^ai\s*/, "").trim();
 api.getUserInfo(event.senderID, async (err, ret) => {
 if (err) {
 console.error(err);
 return;
 }
 const userName = ret[event.senderID].name;
 const { response, messageID } = await getAIResponse(input, userName, event.senderID, message.messageID);
 message.reply(`ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡━━━━━━━━━━━━━━━━\n🗣️| ${userName} , ${response} 🥀✨💦 ━━━━━━━━━━━━━━━━ \n웃『𝐒𝐇𝐈𝐒𝐔𝐈』ヅ`, messageID);
api.setMessageReaction("🦔", event.messageID, () => {}, true);

 });
 }
 }
};
