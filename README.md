# famd :alien: :metal:
Faux AMD Library. Inspired by the AMD architecture. Extends the native [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator) object. This library is dependent on 
jQuery library and the [RunWhen](https://github.com/rafaelgandi/RunWhen) function.

## Methods exposed using the Navigator object.
	* navigator.famd - FAMD object. Contains utility methods
	* navigator.require - Used to specify/load a dependency js file
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
	
#### Normal defining of a module	
```JavaScript
navigator.require('Mod.mod1.js');
navigator.require('Mod.mod2.js');
navigator.require('js/highlightFade.min.js');
navigator.define('Mod.mod3', [
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
```

#### Defining a module with one dependency. 2nd parameter can be a string
```JavaScript
navigator.require('Mod.mod1.js');
navigator.define('Mod.mod2', 'Mod.mod1', function ($, undefined) {

	var Events = {};	
	
	return {
		foo: function () {
			return 'hello from mod 2';
		}
	};
});
```

#### Defining a module without dependencies
```JavaScript
navigator.define('Mod.mod1', function () {
	return {
		foo: function () {
			return 'hello from mod 1';
		}
	};
});
```

#### Defining a module that does not return anything
```JavaScript
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
```

### navigator.mod
	Method used to get the methods/properties of a module. Takes the module name/id as its only parameter. 
	This is also internally used by RunWhen to check for the availablity of the module.

```JavaScript
navigator.mod('Mod.mod3').foo(); // Calling the method foo() from module "Mod.mod3"
```	

## :squirrel: Enjoy!