<h1>Documentation</h1>

<h3>Initialization</h3>

<code>
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

/**
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
 */
</code>

<p>or you can...</p>

<code>
	
	const VkLong = require('vk-botlongpoll');
	class CupidonBot extends VkLong {

	}

</code>

<h3>Functions</h3>
<h5>API:</h6>
<p>all api functions in VkBot.api</p>


<h2>SEE EXAMPLES!</h2>