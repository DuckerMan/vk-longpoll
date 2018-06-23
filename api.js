class Api {
	constructor(vk) {
		this.vk = vk;
		this.request = require('request');
	}
	
	/**
	 * Send message 
	 * @param  {integer} id   user id
	 * @param  {string} text Message
	 * @param  {string} attachment VK Attachment - photoOWNERID_ID
	 * @params {object} keyboard VK Keyboard
	 * @return {Promise}      Promise with api-response
	 */
	async sendMessage(id, text, attachment, keyboard) {
		let params = {user_id:id, message:text}; // default params

		if(attachment) params.attachment = attachment;
		if(keyboard) params.keyboard = keyboard;
		
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