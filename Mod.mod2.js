
navigator.require('Mod.mod1.js');
navigator.define('Mod.mod2', 'Mod.mod1', function ($, undefined) {

	var Events = {};	
	
	return {
		foo: function () {
			return 'hello from mod 2';
		}
	};
});