const VkBot = new(require('./sdk.js'))({
	'appId': 2807970,
	'appSecret': 'L14ZKpgQPalJdumI6vFK',
	'language': 'ru',
	'token': '',
	'groupId': 142102660,
	'version': '5.74',
	'commandDivider': '.',
	'autoRead': true,
	'getInfoAboutUser': true
});


VkBot.onLeave((d) => VkBot.api.sendMessageAttachment(d.user_id, 'photo164124208_456247141_48cc142a1cbfbd8c4e'))
VkBot.onJoin((d) => VkBot.api.sendMessageText(d.user_id, 'Hello!'))

VkBot.onMessage(msg => console.log(msg))

/*
info is:
{ id: 46207, // mesage id
  date: 1522773307, // unix timestamp
  out: 0, // from me?
  user_id: 164124208, // sender
  read_state: 0,
  title: '',
  params:[duck], // Params, string without command
  body: 'Hey' // Text

  }

 */
VkBot.hear('test', (info) => {VkBot.sendMessageText(info.user_id, 'Test-test')});