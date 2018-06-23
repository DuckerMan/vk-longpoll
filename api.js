class Api {
	constructor(vk) {
		this.vk = vk;
		this.request = require('request');
	}
	
	/**
	 * Send message 
	 * @param  {integer} id   Айди пользователя
	 * @param  {string} text Сообщение
	 * @param  {string} attachment Аттачмент вконтакте
	 * @param  {object} keyboard Клавиатура ВК
	 * @return {Promise}      Промис с ответом АПИ
	 */
	async sendMessage(id, text, attachment, keyboard) {
		let params = {user_id:id, message:text}; // дефолтные параметры

		if(attachment) params.attachment = attachment;
		if(keyboard) params.keyboard=JSON.stringify(keyboard);
		return await this.vk.messagesSend(params);
	}
	/**
	 * Upload photo for messages
	 * @param  {string} file File path
	 * @return {mixed}      Attachment object
	 */
	uploadPhoto(file) {
		let that = this;
		return new Promise((resolve, reject) => {
			that.vk.photosGetMessagesUploadServer({
				lang: 'ru'
			}).then(loadServer => {
				loadServer = loadServer.upload_url;

				that.request.post({
					url: loadServer,
					formData: {
						photo: require('fs').createReadStream(file)
					}
				}, function optionalCallback(err, httpResponse, body) {
					if (err) {
						reject(err);
					}
					let response = JSON.parse(body);
					that.vk.photosSaveMessagesPhoto({
						server: response.server,
						photo: response.photo,
						hash: response.hash
					}).then(r => {
						r = r[0]; // TODO

						r.attachment = `photo${r.owner_id}_${r.id}`;
						if(r.access_key) r.attachment += `_${r.access_key}`;
						resolve(r);
					});
				});

			})
		});
	}

	async readMessage(id){
		return await this.vk.messagesMarkAsRead({message_ids:id});
	}
}

module.exports = Api;