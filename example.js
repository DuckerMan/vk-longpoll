

const VkBot = new (require('./sdk.js'))({
			'appId': 2807970,
			'appSecret': 'L14ZKpgQPalJdumI6vFK',
			'language': 'ru',
			'token':'',
			'groupId':142102660,
			'version':'5.74',
			'commandDivider':'.',
			'autoRead':true,
			'getInfoAboutUser':true
		});


VkBot.onLeave((d) => VkBot.sendMessageAttachment(d.user_id, 'photo164124208_456247141_48cc142a1cbfbd8c4e'))
VkBot.onJoin((d) => VkBot.sendMessageText(d.user_id, 'Hello!'))


// VkBot.hear('test', (info) => {VkBot.sendMessageText(info.user_id, 'Test-test')});