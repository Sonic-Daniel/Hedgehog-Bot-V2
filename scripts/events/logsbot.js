const { getTime } = global.utils;

module.exports = {
	config: {
		name: "logsbot",
		isBot: true,
		version: "1.4",
		author: "NTKhang",
		envConfig: {
			allow: true
		},
		category: "events"
	},

	langs: {
		vi: {
			title: "====== Nhật ký bot ======",
			added: "\n✅\nSự kiện: bot được thêm vào nhóm mới\n- Người thêm: %1",
			kicked: "\n❌\nSự kiện: bot bị kick\n- Người kick: %1",
			footer: "\n- User ID: %1\n- Nhóm: %2\n- ID nhóm: %3\n- Thời gian: %4"
		},
		en: {
			title: "====== 𝐁𝐎𝐓 𝐋𝐎𝐆𝐒 ======",
			added: "\n🫠\n𝑳𝒆 𝑯𝒆𝒅𝒈𝒆𝒉𝒐𝒈𝒃𝒐𝒕 𝒂 𝒆𝒕𝒆 𝒂𝒋𝒐𝒖𝒕𝒆 𝒅𝒂𝒏𝒔 𝒖𝒏 𝒈𝒓𝒐𝒖𝒑𝒆\n✰ 𝑨𝒋𝒐𝒖𝒕é: %1",
			kicked: "\n🤧\n𝑳𝒆 𝒉𝒆𝒅𝒈𝒆𝒉𝒐𝒈𝒃𝒐𝒕 𝒂 𝒆𝒕𝒆 𝒓𝒆𝒕𝒊𝒓𝒆 𝒅𝒖 𝒈𝒓𝒐𝒖𝒑𝒆\n✰ 𝑹𝒆𝒕𝒊𝒓é 𝒑𝒂𝒓: %1",
			footer: "\n✰ 𝑼𝒔𝒆𝒓 𝑰𝑫: %1\n✰ 𝑮𝒓𝒐𝒖𝒑 : %2\n✰ 𝑮𝒓𝒐𝒖𝒑𝒆 𝑰𝑫: %3\n✰ 𝑻𝒊𝒎𝒆: %4"
		}
	},

	onStart: async ({ usersData, threadsData, event, api, getLang }) => {
		if (
			(event.logMessageType == "log:subscribe" && event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
			|| (event.logMessageType == "log:unsubscribe" && event.logMessageData.leftParticipantFbId == api.getCurrentUserID())
		) return async function () {
			let msg = getLang("title");
			const { author, threadID } = event;
			if (author == api.getCurrentUserID())
				return;
			let threadName;
			const { config } = global.GoatBot;

			if (event.logMessageType == "log:subscribe") {
				if (!event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
					return;
				threadName = (await api.getThreadInfo(threadID)).threadName;
				const authorName = await usersData.getName(author);
				msg += getLang("added", authorName);
			}
			else if (event.logMessageType == "log:unsubscribe") {
				if (event.logMessageData.leftParticipantFbId != api.getCurrentUserID())
					return;
				const authorName = await usersData.getName(author);
				const threadData = await threadsData.get(threadID);
				threadName = threadData.threadName;
				msg += getLang("kicked", authorName);
			}
			const time = getTime("DD/MM/YYYY HH:mm:ss");
			msg += getLang("footer", author, threadName, threadID, time);

			for (const adminID of config.adminBot)
				api.sendMessage(msg, adminID);
		};
	}
};
