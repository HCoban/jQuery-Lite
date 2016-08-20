/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	window.$l = function(arg) {

	  if ( arg instanceof HTMLElement) {
	    return new DOMNodeCollection([arg]);
	  } else if (arg instanceof Function) {
	    document.addEventListener('DOMContentLoaded', arg);
	  } else {
	    let list = document.querySelectorAll(arg);
	    return new DOMNodeCollection(Array.from(list));
	  }
	};

	window.$l.extend = function(object, ...objects) {
	  objects.forEach( (el) => {
	    Object.keys(el).forEach ((key) => {
	      object[key] = el[key];
	    });
	  });
	};

	window.$l.ajax = function(object) {
	  let url = object["url"];
	  let data = object["data"];
	  let dataType = object["datatype"];
	  let type = object["type"];
	  let success = object["success"];
	  let failure = object["failure"];

	  const xhr = new XMLHttpRequest();

	  xhr.open(type, url);
	  xhr.responseType = dataType;
	  xhr.send(data);

	  if (xhr.status = 200) {
	    success();
	  } else {
	    failure();
	  }
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(arr) {
	    this.list = arr;
	  }

	  html(string) {
	    if (string || string === "") {
	      this.list.forEach ((el) => {
	        el.innerHTML = string;
	      });
	    } else {
	      return this.list[0].innerHTML;
	    }
	  }

	  empty() {
	    this.html("");
	  }

	  append(element) {
	    if (element instanceof DOMNodeCollection) {
	      this.list.forEach ((el) => {
	        element.list.forEach( (outer) => {
	          el.innerHTML += outer.outerHTML;
	        });
	      });
	    } else {
	      this.list.forEach ((el) => {
	        el.innerHTML += element;
	      });
	    }
	  }

	  addClass (newClass) {
	    this.list.forEach( (el)=> {
	      el.classList.add(newClass);
	    });
	  }

	  removeClass (oldClass) {
	    this.list.forEach ((el) => {
	      el.classList.remove(oldClass);
	    });
	  }

	  attr(key, value) {
	    let attrArr = [];
	    let flag = false;
	    if(value === undefined) {
	      this.list.forEach ( (el) => {
	        if (el.attributes[key] !== undefined) {
	          attrArr.push(el.attributes[key]);
	          return el.attributes[key];
	        }
	      });
	      return attrArr[0];
	    } else {
	      this.list.forEach ( (el) => {
	        el.attributes[key] = value;
	        attrArr.push(value);
	      });
	      return this;
	    }
	  }

	  children() {
	    let childArr = [];

	    this.list.forEach((el) => {
	      childArr = childArr.concat(Array.from(el.children));
	    });
	    return new DOMNodeCollection(childArr);
	  }

	  parent() {
	    let parentArr = [];
	    this.list.forEach((el) => {
	      parentArr.push(el.parentElement);
	    });
	    return new DOMNodeCollection(parentArr);
	  }

	  find (arg) {
	    let arr = [];
	    this.list.forEach((el) => {
	      arr = arr.concat(Array.from(el.querySelectorAll(arg)));
	    });

	    return new DOMNodeCollection(arr);
	  }

	  remove () {
	    this.list.forEach ((el) => {
	      el.remove();
	    });
	  }

	  on (type, listener) {
	    this.list.forEach((el) => {
	      addEventListener(type, listener);
	    });
	  }








	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);