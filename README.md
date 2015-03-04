# famd
Faux AMD Library. Inspired by the AMD architecture. Extends the native Navigator object. This library is dependent on 
jQuery library and the RunWhen function.

## Methods exposed using the Navigator object.
	* navigator.famd - FAMD object. Contains utility methods
	* navigator.require - Used to spacify/load a dependency js file
	* navigator.define - Used to define a famd module
	* navigator.mod - Used to access the methods/properties of a famd module
	
### navigator.require
	This method takes 2 parameters the second being optional. The first parameter is the complete path to the javascript
	file to load. The second optional parameter is the callback to call when the script file is loaded. 
	
	This is usually called above any famd module definition. This loads a script only once. Same concept as the php function 
	"require_once". Internally uses jQuery's getScript() method.
	
```JavaScript
navigator.require('Mod.mod1.js');
navigator.require('Mod.mod2.js');
navigator.require('Mod.mod3.js');
navigator.require('js/highlightFade.min.js');
navigator.require('js/jquery.blockUI.pak.js');
```
### navigator.define
	Defines/creates an famd module. This method takes in 3 parameters. The first is the name/id of the module which could be any string 
	except the "@" character. The second is an array of module names/id that the module is dependent to. If the module does not have any 
	dependencies then we can automatically make the second parameter as the callback. The third parameter is the callback function that will 
	return the module object.
