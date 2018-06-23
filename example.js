const BotParent = require('./sdk.js');

const VkBot = new BotParent({
	'language': 'ru',
	'token': '',
	'groupId': 168059774,
	'commandDivider': '.',
	'autoRead': true,
	'getInfoAboutUser': true
});

VkBot.onLeave(data => {
	console.log(data);
	VkBot.api.sendMessage(data.from_id, undefined, 'photo164124208_456247141_48cc142a1cbfbd8c4e');
});

VkBot.onJoin(data => {
	VkBot.api.sendMessage(data.from_id, 'Hello!');
});

VkBot.onMessage(msg => {
	VkBot.api.sendMessage(msg.from_id, 'Выберите кнопки', 0, {
		"one_time": true,
		"buttons": [
			[{
				"action": {
					"type": "text",
					"payload": "{\"button\": \"1\"}",
					"label": "Red"
				},
				"color": "negative"
			}, {
				"action": {
					"type": "text",
					"payload": "{\"button\": \"2\"}",
					"label": "Green"
				},
				"color": "positive"
			}],
			[{
				"action": {
					"type": "text",
					"payload": "{\"button\": \"3\"}",
					"label": "White"
				},
				"color": "default"
			}, {
				"action": {
					"type": "text",
					"payload": "{\"button\": \"4\"}",
					"label": "Blue"
				},
				"color": "primary"
			}]
		]
	});
});


VkBot.onPayload({button:"2"}, (msg)=>{
	console.log('Нажатие кнопки!');
	console.log(msg);
})


VkBot.onMessageWithoutEvent(msg => console.log(msg));

/*
Объект сообщений выглядит как-то так:
{ date: 1529761087,
  from_id: 165854518,
  id: 76,
  out: 1,
  peer_id: 165854518,
  text: 'Red',
  conversation_message_id: 13,
  fwd_messages: [],
  important: false,
  random_id: 0,
  attachments: [],
  payload: '{"button":"1"}',
  is_hidden: false,
  params: 'Red',
  user_id: 165854518 }


 */