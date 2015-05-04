
navigator.require('Mod.mod1.js');
navigator.require('Mod.mod2.js');

setTimeout(function () { // Delay
	navigator.require('js/highlightFade.min.js');
}, 1000);


! navigator.mod('Mod.mod3') && navigator.define('Mod.mod3', [
	'Mod.mod1', 
	'Mod.mod2',
	'@$.fn.highlightFade'	
], function ($, undefined) {

	alert(typeof $.fn.highlightFade);	
	alert(navigator.mod('Mod.mod1').foo());
	
	
	var mod3 = {
		foo: function () {
			return 'hello from mod 3';
		},
		mod2: function () {
			return navigator.mod('Mod.mod2').foo();
		}
	};
	
	alert(mod3.mod2());
	alert($);
	return mod3;
});