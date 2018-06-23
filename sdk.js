class VkBot {
	/**
	 * Constructor
	 * @param  {mixed} config Config
	 * @return mixed   this
	 *
	 * config:
	 *
	 * {
			'appId': 2807970, // application vk id
			'appSecret': 'L14ZKpgQPalJdumI6vFK', //secret aplication key
			'language': 'ru', // api language
			'token':'', // secret group token
			'groupId':142102660, // group id
			'version':'5.74', // api version
			'commandDivider':'.', // command start char, example : .test
			'autoRead':true, // read message
			'getInfoAboutUser':true
		}
	 * 
	 */
	constructor(config) {
		console.log('init');
		const EventEmitter = require('events').EventEmitter;
		this.event = new EventEmitter;

		const {
			VKApi,
			ConsoleLogger,
			BotsLongPollUpdatesProvider
		} = require('node-vk-sdk');
		let lang = (typeof config.language == 'undefined') ? 'ru' : config.language;
		this._api = new VKApi({
			token: config.token,
			lang: lang,
			logger: new ConsoleLogger()
		})

		this.api = new(require('./api.js'))(this._api); // Public
		this.updatesProvider = new BotsLongPollUpdatesProvider(this._api, config.groupId);
		this.commandDivider = config.commandDivider;

		this.updatesProvider.getUpdates(updates => {
			updates.forEach(upd => {
				if (upd.type == 'message_new') {
					if (config.autoRead) this.api.readMessage(upd.object.id); // Auto read message
					let messageBody = upd.object.body || upd.object; // зависит от версии API, TODO
					let searchText = messageBody.text.split(' ')[0],
						params = messageBody.text.replace(`${searchText} `, '');

					messageBody.params = params;
					messageBody.reply = (text, attachment, keyboard)=>this.api.sendMessage(messageBody.from_id, text, attachment, keyboard);
					messageBody.user_id = messageBody.from_id; // обратная совместимость

					if (this.event.listeners(`msg ${searchText}`).length == 0) this.event.emit('without message', messageBody);
					this.event.emit(`payload ${messageBody.payload}`, messageBody);
					this.event.emit(`msg ${searchText}`, messageBody);
					this.event.emit('message', messageBody);
				}

				if (upd.type == 'group_leave') this.event.emit('leave', upd.object);
				if (upd.type == 'group_join') this.event.emit('join', upd.object);

			})
		});
	}

	/**
	 * On bot get command
	 * @param  {string}   text Command without divider
	 * @param  {Function} cb   callback
	 * 
	 */
	hear(text, cb) {
		this.event.on(`msg ${this.commandDivider}${text}`, cb);
	}

	onLeave(cb) {
		this.event.on('leave', cb);
	}

	onJoin(cb) {
		this.event.on('join', cb);
	}

	/**
	 * If We get message Without Event.
	 * @param  {Function} cb callback
	 */
	onMessageWithoutEvent(cb) {
		this.event.on('without message', cb);
	}
	/**
	 * При получении сообщения с пэйлоад
	 * @param  {string}   payload Строка пейлоада
	 * @param  {Function} cb      callback
	 */
	onPayload(payload, cb) {
		this.event.on(`payload ${JSON.stringify(payload)}`, cb);
	}

	/**
	 * OnMessage event - works ALWAYS
	 * @param  {Function} cb [description]
	 */
	onMessage(cb) {
		this.event.on('message', cb);
	}
}

module.exports = VkBot;