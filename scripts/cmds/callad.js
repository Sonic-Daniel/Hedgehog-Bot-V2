const { getStreamsFromAttachment, log } = global.utils;
const mediaTypes = ["photo", 'png', "animated_image", "video", "audio"];

module.exports = {
	config: {
		name: "callad",
		version: "1.7",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "gửi báo cáo, góp ý, báo lỗi,... của bạn về admin bot",
			en: "send report, feedback, bug,... to admin bot"
		},
		category: "system",
		guide: {
			vi: "   {pn} <tin nhắn>",
			en: "   {pn} <message>"
		}
	},

	langs: {
		vi: {
			missingMessage: "Vui lòng nhập tin nhắn bạn muốn gửi về admin",
			sendByGroup: "\n- Được gửi từ nhóm: %1\n- Thread ID: %2",
			sendByUser: "\n- Được gửi từ người dùng",
			content: "\n\nNội dung:\n─────────────────\n%1\n─────────────────\nPhản hồi tin nhắn này để gửi tin nhắn về người dùng",
			success: "Đã gửi tin nhắn của bạn về %1 admin thành công!\n%2",
			failed: "Đã có lỗi xảy ra khi gửi tin nhắn của bạn về %1 admin\n%2\nKiểm tra console để biết thêm chi tiết",
			reply: "📍 Phản hồi từ admin %1:\n─────────────────\n%2\n─────────────────\nPhản hồi tin nhắn này để tiếp tục gửi tin nhắn về admin",
			replySuccess: "Đã gửi phản hồi của bạn về admin thành công!",
			feedback: "📝 Phản hồi từ người dùng %1:\n- User ID: %2%3\n\nNội dung:\n─────────────────\n%4\n─────────────────\nPhản hồi tin nhắn này để gửi tin nhắn về người dùng",
			replyUserSuccess: "Đã gửi phản hồi của bạn về người dùng thành công!",
			noAdmin: "Hiện tại bot chưa có admin nào"
		},
		en: {
			missingMessage: "🌶| 𝐄𝐜𝐫𝐢𝐯𝐞𝐳 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐪𝐮𝐞 𝐯𝐨𝐮𝐬 𝐬𝐨𝐮𝐡𝐚𝐢𝐭𝐞𝐳 𝐞𝐧𝐯𝐨𝐲𝐞𝐫 𝐚 𝐥'𝐚𝐝𝐦𝐢𝐧 !",
			sendByGroup: "\n- 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐞𝐧𝐯𝐨𝐲𝐞 𝐝𝐞𝐩𝐮𝐢𝐬 𝐥𝐞 𝐠𝐫𝐨𝐮𝐩𝐞 %1\n- 𝐓𝐈𝐃: %2",
			sendByUser: "\n- 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐞𝐧𝐯𝐨𝐲𝐞 𝐩𝐚𝐫 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫",
			content: "\n\🎯| 𝐂𝐎𝐔𝐑𝐑𝐈𝐄𝐋:\n═════════════════\n%1\n═════════════════\n𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐑𝐞𝐩𝐨𝐧𝐝𝐫𝐞 𝐚 𝐜𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞𝐫 𝐥𝐚 𝐝𝐢𝐬𝐜𝐮𝐬𝐬𝐢𝐨𝐧 𝐚𝐯𝐞𝐜 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 !",
			success: "✅| 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐞𝐧𝐯𝐨𝐲𝐞 𝐚 𝐦𝐨𝐧(𝐞𝐬) %1 𝐚𝐝𝐦𝐢𝐧(𝐬) 𝐬𝐞𝐱𝐲 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞𝐬\n━━━━━━━━━━━━━━━━\n%2",
			failed: "\n\n ❌| 𝐄𝐜𝐡𝐞𝐜 𝐝𝐞 𝐥'𝐞𝐧𝐯𝐨𝐢 𝐝𝐮 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐚 𝐦𝐨𝐧(𝐞𝐬) %1 𝐞𝐱(𝐬) \n━━━━━━━━━━━━━━━━\n%2\n",
			reply: "✉ 𝗥𝗲́𝗽𝗼𝗻𝘀𝗲 𝗱𝗲 𝗹'𝗮𝗱𝗺𝗶𝗻 %1:\n═════════════════\n%2\n═════════════════\n𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐫 𝐫𝐞𝐩𝐨𝐧𝐝𝐫𝐞 𝐚 𝐜𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞𝐫 𝐥𝐚 𝐝𝐢𝐬𝐜𝐮𝐬𝐬𝐢𝐨𝐧 𝐚𝐯𝐞𝐜 𝐥'𝐚𝐝𝐦𝐢𝐧『%1』—シ",
			replySuccess: "𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗲𝗻𝘃𝗼𝘆𝗲́!",
			feedback: "✉ 𝗥𝗲́𝗽𝗼𝗻𝘀𝗲 𝗱𝙪 𝙡'𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧 %1:\n- 𝘂𝗶𝗱 𝗱𝗲 𝙡'𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧: %2%3\n\n𝗠𝗲𝘀𝘀𝗮𝗴𝗲:\n═════════════════\n%4\n═════════════════\n𝐑𝐞𝐩𝐨𝐧𝐝𝐬 𝐚 𝐜𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞𝐫 𝐥𝐚 𝐝𝐢𝐬𝐜𝐮𝐬𝐬𝐢𝐨𝐧 𝐚𝐯𝐞𝐜 『%1』—シ,
			replyUserSuccess: "✅| 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐞𝐧𝐯𝐨𝐲𝐞 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞𝐬!",
			noAdmin: "❌🚫🚫🚫🚫❌"
		}
	},

	onStart: async function ({ args, message, event, usersData, threadsData, api, commandName, getLang }) {
		const { config } = global.GoatBot;
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const { senderID, threadID, isGroup } = event;
		if (config.adminBot.length == 0)
			return message.reply(getLang("noAdmin"));
		const senderName = await usersData.getName(senderID);
		const msg = "=📨༺𝐇𝐄𝐍𝐓𝐀𝐈ᬊ᭄𝐒𝐀𝐍༻📨="
			+ `\n- 𝘼𝙪𝙩𝙚𝙪𝙧 𝙙𝙪 𝙢𝙚𝙨𝙨𝙖𝙜𝙚: 🥒${senderName}🥒`
			+ `\n- 𝗨𝗜𝗗 𝗱𝗲 𝙡'𝙪𝙩𝙞𝙡𝙞𝙨𝙖𝙩𝙚𝙪𝙧: 🥀${senderID}🥀`
			+ (isGroup ? getLang("sendByGroup", (await threadsData.get(threadID)).threadName, threadID) : getLang("sendByUser"));

		const formMessage = {
			body: msg + getLang("content", args.join(" ")),
			mentions: [{
				id: senderID,
				tag: senderName
			}],
			attachment: await getStreamsFromAttachment(
				[...event.attachments, ...(event.messageReply?.attachments || [])]
					.filter(item => mediaTypes.includes(item.type))
			)
		};

		const successIDs = [];
		const failedIDs = [];
		const adminNames = await Promise.all(config.adminBot.map(async item => ({
			id: item,
			name: await usersData.getName(item)
		})));

		for (const uid of config.adminBot) {
			try {
				const messageSend = await api.sendMessage(formMessage, uid);
				successIDs.push(uid);
				global.GoatBot.onReply.set(messageSend.messageID, {
					commandName,
					messageID: messageSend.messageID,
					threadID,
					messageIDSender: event.messageID,
					type: "userCallAdmin"
				});
			}
			catch (err) {
				failedIDs.push({
					adminID: uid,
					error: err
				});
			}
		}

		let msg2 = "";
		if (successIDs.length > 0)
			msg2 += getLang("success", successIDs.length,
				adminNames.filter(item => successIDs.includes(item.id)).map(item => ` <@${item.id}> (${item.name})`).join("\n")
			);
		if (failedIDs.length > 0) {
			msg2 += getLang("failed", failedIDs.length,
				failedIDs.map(item => ` <@${item.adminID}> (${adminNames.find(item2 => item2.id == item.adminID)?.name || item.adminID})`).join("\n")
			);
			log.err("CALL ADMIN", failedIDs);
		}
		return message.reply({
			body: msg2,
			mentions: adminNames.map(item => ({
				id: item.id,
				tag: item.name
			}))
		});
	},

	onReply: async ({ args, event, api, message, Reply, usersData, commandName, getLang }) => {
		const { type, threadID, messageIDSender } = Reply;
		const senderName = await usersData.getName(event.senderID);
		const { isGroup } = event;

		switch (type) {
			case "userCallAdmin": {
				const formMessage = {
					body: getLang("reply", senderName, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replyUserSuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "adminReply"
					});
				}, messageIDSender);
				break;
			}
			case "adminReply": {
				let sendByGroup = "";
				if (isGroup) {
					const { threadName } = await api.getThreadInfo(event.threadID);
					sendByGroup = getLang("sendByGroup", threadName, event.threadID);
				}
				const formMessage = {
					body: getLang("feedback", senderName, event.senderID, sendByGroup, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replySuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "userCallAdmin"
					});
				}, messageIDSender);
				break;
			}
			default: {
				break;
			}
		}
	}
};
