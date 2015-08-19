
navigator.require('Mod.mod4.js');

navigator.define('Mod.mod5', [
	'Mod.mod4'	
], function ($, undefined) {
	alert('from mod 5. mod 4 was loaded');
	
	return {
		mod5hello: function () {
			return 'MOD 5 FOR THE WIN!';
		}
	};
});