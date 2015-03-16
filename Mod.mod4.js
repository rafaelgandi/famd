
navigator
.require('Mod.mod1.js')
.require('Mod.mod2.js')
.require('Mod.mod3.js')
.require('js/highlightFade.min.js')
.require('js/jquery.blockUI.pak.js');

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

