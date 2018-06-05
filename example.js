const BotParent = require('./sdk.js');

const VkBot = new BotParent({
	'language': 'ru',
	'token': '',
	'groupId': 142102660,
	'commandDivider': '.',
	'autoRead': true,
	'getInfoAboutUser': true
});

VkBot.onLeave(data => {
	VkBot.api.sendMessage(data.user_id, undefined, 'photo164124208_456247141_48cc142a1cbfbd8c4e');
});

VkBot.onJoin(data => {
	VkBot.api.sendMessage(data.user_id, 'Hello!');
});

VkBot.onMessage(msg => console.log(msg));

VkBot.onMessageWithoutEvent(msg => console.log(msg));

/*
msg is:
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
 
VkBot.hear('test', info => {
	VkBot.sendMessageText(info.user_id, 'Test-test');
});