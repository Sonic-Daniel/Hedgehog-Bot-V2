let fontEnabled = true;

function formatFont(text) {
	const fontMapping = {
		a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
		n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
		A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
		N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"
	};

	let formattedText = "";
	for (const char of text) {
		if (fontEnabled && char in fontMapping) {
			formattedText += fontMapping[char];
		} else {
			formattedText += char;
		}
	}

	return formattedText;
}

const os = require('os');
const fs = require('fs').promises;
const pidusage = require('pidusage');

async function getStartTimestamp() {
	try {
		const startTimeStr = await fs.readFile('time.txt', 'utf8');
		return parseInt(startTimeStr);
	} catch (error) {
		return Date.now();
	}
}

async function saveStartTimestamp(timestamp) {
	try {
		await fs.writeFile('time.txt', timestamp.toString());
	} catch (error) {
		console.error('Error saving start timestamp:', error);
	}
}

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

function getUptime(uptime) {
	const days = Math.floor(uptime / (3600 * 24));
	const hours = Math.floor((uptime % (3600 * 24)) / 3600);
	const mins = Math.floor((uptime % 3600) / 60);
	const seconds = Math.floor(uptime % 60);
	const months = Math.floor(days / 30);
		const remainingDays = days % 30;

	return `🍊✨${months}𝑚𝑜𝑛𝑡ℎ✨🍊\n━━━━━━━━━━━━━━━━\n🍊✨${remainingDays}𝑑𝑎𝑦✨🍊\n━━━━━━━━━━━━━━━━\n🍊✨${hours}ℎ✨🍊\n━━━━━━━━━━━━━━━━\n🍊✨${mins}𝑚𝑖𝑛✨🍊\n━━━━━━━━━━━━━━━━\n🍊✨${seconds}𝑠✨🍊\n━━━━━━━━━━━━━━━━`;
}

async function onStart({ api, event }) {
	const startTime = await getStartTimestamp();
	const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

	const usage = await pidusage(process.pid);
	const osInfo = {
		platform: os.platform(),
		architecture: os.arch()
	};

	const timeStart = Date.now();
	const uptimeMessage = getUptime(uptimeSeconds);
	const uid = "100090405019929";
	const returnResult = `📣| 𝐒𝐄𝐗𝐘𝐁𝐎𝐓 𝐑𝐔𝐍𝐍𝐈𝐍𝐆 𝐓𝐈𝐌𝐄\n━━━━━━━━━━━━━━━━${uptimeMessage}\n━━━━━━━━━━━━━━━━\n👽| 𝐂𝐏𝐔 𝐮𝐬𝐚𝐠𝐞: ${usage.cpu.toFixed(1)}%\n📲| 𝐑𝐚𝐦 𝐮𝐬𝐚𝐠𝐞: ${byte2mb(usage.memory)}\n🎶|  𝐂𝐨𝐫𝐞𝐬: ${os.cpus().length}\n🔔| 𝐏𝐢𝐧𝐠: ${Date.now() - timeStart}ms\n👾| 𝐎𝐩𝐞𝐫𝐚𝐭𝐢𝐧𝐠 𝐬𝐲𝐬𝐭𝐞𝐦 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦: ${osInfo.platform}\n🔮| 𝐒𝐲𝐬𝐭𝐞𝐦 𝐂𝐏𝐔 𝐚𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞: ${osInfo.architecture}`;

	await saveStartTimestamp(startTime);
	return api.shareContact(formatFont(returnResult), uid, event.threadID);
}

module.exports = {
	config: {
		name: 'uptime',
		version: '2.1.0',
		author: "Cliff", // Do not change credits
		countDown: 5,
		role: 0,
		shortDescription: 'shows how long uptime',
		longDescription: {
			en: ''
		},
		category: 'system',
		guide: {
			en: '{p}uptime'
		}
	},
	byte2mb,
	getStartTimestamp,
	saveStartTimestamp,
	getUptime,
	onStart
};
