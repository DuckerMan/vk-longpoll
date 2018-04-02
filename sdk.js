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
			'token':'3b814061febe10c0d6d8b02ff661dda7739f2a8e49dae78ee2549a139d4ed02a46b0e2377fdae8dca7f9f', // secret group token
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

		const {VKApi, ConsoleLogger, BotsLongPollUpdatesProvider} = require('node-vk-sdk');

		let VK = require('promise-vksdk');
		this.__BotsLongPollUpdatesProvider = BotsLongPollUpdatesProvider;
		this.__request = require('request');

		this.vk = new VK(config);
		this.vk.setToken(config.token);
		this.vk.setSecureRequests(true);

		this.__api = new VKApi({
			token: config.token,
			logger: new ConsoleLogger()
		})

		let updatesProvider = new BotsLongPollUpdatesProvider(this.__api, config.groupId);
		this.updatesProvider = updatesProvider;

		this.commandDivider = config.commandDivider;
		let that = this;
		updatesProvider.getUpdates(updates=>{
			updates.forEach(upd=>{

				if(upd.type == 'message_new'){
					if(config.autoRead) this.vk.request('messages.markAsRead', {message_ids:upd.object.id});

					this.event.emit(`msg ${upd.object.body}`, upd.object);
				}

				if(upd.type == 'group_leave') this.event.emit(`leave`, upd.object);
				if(upd.type == 'group_join') this.event.emit(`join`, upd.object);

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

	onLeave(cb){
		this.event.on('leave', cb);
	}

	onJoin(cb){
		this.event.on('join', cb);
	}





	/**
	 * Send message with TEXT
	 * @param  {integer} id   user id
	 * @param  string text Text
	 * @return {Promise}      Promise with api-response
	 */
	async sendMessageText(id, text) {
		return this.vk.request('messages.send', {user_id:id, message:text});
	}

	/**
	 * Send message with attachment
	 * @param  {integer} id   user id
	 * @param  string attachment VK attachment
	 * @return {Promise}      Promise with api-response
	 */
	async sendMessageAttachment(id, attachment){
		return this.vk.request('messages.send', {user_id:id, attachment:attachment});
	}

}


module.exports = VkBot;
