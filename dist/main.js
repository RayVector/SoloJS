/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/CORE/SoloJS.js":
/*!****************************!*\
  !*** ./src/CORE/SoloJS.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\r\n  constructor(nodeId) {\r\n    this.appNode = null;\r\n    this.init(nodeId)\r\n  }\r\n\r\n  init(nodeId) {\r\n    if (nodeId === String || nodeId !== undefined) {\r\n      this.appNode = document.getElementById(nodeId);\r\n    }\r\n  }\r\n\r\n  // new element:\r\n  addEl(el) {\r\n    let node = document.createElement(el.node || \"div\");\r\n\r\n    if (el.id) this.addId(node, el);\r\n    if (el.content) this.addContent(node, el);\r\n    if (el.styles) this.addStyles(node, el);\r\n    if (Object.keys(el.methods).length > 0) this.addMethods(node, el);\r\n\r\n    if (node) {\r\n\r\n      // Observe:\r\n      const config = {\r\n        attributes: true,\r\n        childList: true,\r\n        subtree: true,\r\n        characterData: true,\r\n        characterDataOldValue: true,\r\n        attributeOldValue: true,\r\n      };\r\n\r\n      const callback = function (mutationsList, observer) {\r\n        for (let mutation of mutationsList) {\r\n          if (mutation.type === 'childList') {\r\n            const oldValue = [];\r\n            mutation.removedNodes.forEach(node => oldValue.push(node.data));\r\n            const newValue = [];\r\n            mutation.addedNodes.forEach(node => newValue.push(node.data));\r\n            console.log('oldValue:', oldValue);\r\n            console.log('newValue:', newValue);\r\n          }\r\n        }\r\n      };\r\n\r\n      const observer = new MutationObserver(callback);\r\n\r\n      observer.observe(node, config);\r\n\r\n      this.appNode.appendChild(node);\r\n    }\r\n\r\n  }\r\n\r\n  addId(node, el) {\r\n\r\n    node.attribute = \"id\";\r\n    node.setAttribute(\"id\", el.id);\r\n  }\r\n\r\n  addContent(node, el) {\r\n    node.innerHTML = el.content;\r\n  }\r\n\r\n  addStyles(node, el) {\r\n    for (let [key, value] of Object.entries(el.styles)) {\r\n      node.style[key] = value;\r\n    }\r\n  }\r\n\r\n  addMethods(node, el) {\r\n    document.addEventListener(\"DOMContentLoaded\", function (event) {\r\n      for (let key in el.methods) {\r\n        if (el.methods.hasOwnProperty(key)) {\r\n          node.addEventListener(key, e => {\r\n            el.methods[key](e)\r\n          })\r\n        }\r\n      }\r\n    });\r\n  }\r\n});\r\n\r\n\n\n//# sourceURL=webpack:///./src/CORE/SoloJS.js?");

/***/ }),

/***/ "./src/app/els/el_helloWorld.js":
/*!**************************************!*\
  !*** ./src/app/els/el_helloWorld.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst styles = {\r\n  userSelect: 'none',\r\n  fontSize: '2rem',\r\n  cursor: 'pointer'\r\n};\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  id: '',\r\n  node: 'span',\r\n  content: 'Hello world, im body element',\r\n  styles,\r\n  methods: {\r\n    click: (e) => e.target.innerHTML = 'Magic JS!',\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack:///./src/app/els/el_helloWorld.js?");

/***/ }),

/***/ "./src/app/main.js":
/*!*************************!*\
  !*** ./src/app/main.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CORE_SoloJS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CORE/SoloJS */ \"./src/CORE/SoloJS.js\");\n/* harmony import */ var _els_el_helloWorld__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./els/el_helloWorld */ \"./src/app/els/el_helloWorld.js\");\n\r\n\r\n\r\nconst SJS = new _CORE_SoloJS__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"app\");\r\n\r\nSJS.addEl(_els_el_helloWorld__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n//# sourceURL=webpack:///./src/app/main.js?");

/***/ })

/******/ });