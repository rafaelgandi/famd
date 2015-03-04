
navigator.require('Mod.mod1.js');
navigator.require('Mod.mod2.js');
navigator.require('Mod.mod3.js');
navigator.require('js/highlightFade.min.js');
navigator.require('js/jquery.blockUI.pak.js');

navigator.define('Mod.mod4', [
	'Mod.mod1', 
	'Mod.mod2',
	'@jQuery.fn.highlightFade',
	'Mod.mod3',
	'@jQuery.fn.block'	
], function ($, undefined) {
	alert(typeof $.fn.block);	
	alert(navigator.mod('Mod.mod3').foo());
});