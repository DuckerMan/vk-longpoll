class Api {
	constructor(vk) {
		this.vk = vk;
	}
	
	/**
	 * Send message with TEXT
	 * @param  {integer} id   user id
	 * @param  string text Text
	 * @return {Promise}      Promise with api-response
	 */
	sendMessageText(id, text) {
		return this.vk.request('messages.send',
													 { user_id: id, message: text });
	}

	/**
	 * Send message with attachment
	 * @param  {integer} id   user id
	 * @param  string attachment VK attachment
	 * @return {Promise}      Promise with api-response
	 */
	 sendMessageAttachment(id, attachment) {
		return this.vk.request('messages.send',
													 { user_id: id, attachment: attachment });
	}
}

module.exports = Api;