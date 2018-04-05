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

		const {VKApi, ConsoleLogger, BotsLongPollUpdatesProvider} = require('node-vk-sdk');

		let VK = require('promise-vksdk');
		this.__BotsLongPollUpdatesProvider = BotsLongPollUpdatesProvider;

		this.vk = new VK(config);
		this.vk.setToken(config.token);
		this.vk.setSecureRequests(true);
		this.api = new (require('./api.js'))(this.vk);
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
					
					let searchText = upd.object.body.split(' ')[0];
					let params = upd.object.body.replace(`${searchText} `, '');
					upd.object.params = params;
					this.event.emit(`msg ${searchText}`, upd.object);
					this.event.emit(`message`, upd.object);
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
	 * OnMessage event - works ALWAYS
	 * @param  {Function} cb [description]
	 * @return {[type]}      [description]
	 */
	onMessage(cb){
		this.event.on('message', cb);
	}






}


module.exports = VkBot;
