/* 
	Faux AMD Library
		- Inspired by the AMD architecture. Extends the native Navigator object.
		- https://github.com/rafaelgandi/famd
	LM: 03-16-2015
	Author: Rafael Gandionco [www.rafaelgandi.tk]
 */
// Array.prototype.forEach() shiv //
// See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c,d;if(this==null)throw new TypeError(" this is null or not defined");var e=Object(this),f=e.length>>>0;if(typeof a!="function")throw new TypeError(a+" is not a function");arguments.length>1&&(c=b),d=0;while(d<f){var g;d in e&&(g=e[d],a.call(c,g,d,e)),d++}});
/* 
	Run When JS
		- Javascript code dependency checker	
	See: https://github.com/rafaelgandi/RunWhen
	LM: 10-09-14 
	Version: 0.2
*/
var runwhen=function(self){var cachedChecks={},TIMEOUT=800,check=function(_checks){var i=_checks.length;while(i--){if(!!cachedChecks[_checks[i]])continue;try{eval("if(typeof "+_checks[i]+" === 'undefined'){throw 'e';}"),cachedChecks[_checks[i]]=!0}catch(e){return!1}}return!0};return function(a,b){var c=1;a instanceof Array||(a=[a]),function d(){if(check(a))b.call(self);else{if(c>TIMEOUT)throw"RunWhen timeout reached for ["+a.join(", ")+"]";c++,self.setTimeout(d,10)}}()}}(self);
(function ($, self, undefined) {	
	var __modules = {},
		__loadedScripts = [],
		t = $.trim;
	// Make sure that the methods we are about to inject to the native Navigator object is not aready defined. //	
	if (navigator.require !== undefined || 
		navigator.define !== undefined || 
		navigator.mod !== undefined) {
		throw 'One or more of the famd methods are already defined in the Navigator object';
		return;
	}		
	// Get all the src of all the currently loaded scripts on dom ready // 	
	$(function () {
		var $scripts = $('script');
		if ($scripts.length) {
			$scripts.each(function () {
				__loadedScripts.push(t($(this).attr('src')));
			});			
		}
	});

	Navigator.prototype.famd = {
		getLoadedScripts: function () {
			return __loadedScripts;
		}
	};	
	
	Navigator.prototype.require = function (_src, _callback) {
		$(function () { // Respect the DOM ready
			_src = t(_src);
			_callback = _callback || function () {};
			if ($.inArray(_src, __loadedScripts) === -1) {
				$.getScript(_src, _callback);
				__loadedScripts.push(_src);
				return;
			}
			_callback();
		});
		return this;
	};
	
	Navigator.prototype.define = function (_moduleName, _dependencies, _callback) {
		var req = [];
		_moduleName = _moduleName.replace('@', '');
		_callback = _callback || function () {};
		if (_dependencies instanceof Function) {
			_callback = _dependencies;
			_dependencies = undefined;
		}
		else if (_dependencies instanceof String) {
			_dependencies = [_dependencies]; // Force array
		}	
		if (_dependencies instanceof Array) {
			_dependencies.forEach(function (mod) {
				if (mod.indexOf('@') !== -1) {
					// If one of the dependency is not a famd module then
					// load it directly. This is usually for 3rd party 
					// plugins or libraries. Just prefix an "@" symbol on 
					// the check string.
					req.push(t(mod.replace('@', '')));
				}
				else {
					req.push('navigator.mod("'+t(mod)+'")');
				}
			});	
			runwhen(req, function () {
				$(function () {
					var run = _callback.call(self, $); // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
					__modules[_moduleName] = (run instanceof Object) ? run : {};
				});
			});
		}
		else {
			// When no dependencies are given, then run the callback right away after the dom is ready
			$(function () {
				var run = _callback.call(self, $);
				__modules[_moduleName] = (run instanceof Object) ? run : {};
			});
		}
	};
	
	Navigator.prototype.mod = function (_moduleName) {
		return __modules[_moduleName];
	};	
})(jQuery, self);