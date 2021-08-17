/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./inc/blocks/wp-block-gen sync recursive ^.*block\\.json$":
/*!*******************************************************!*\
  !*** ./inc/blocks/wp-block-gen/ sync ^.*block\.json$ ***!
  \*******************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./inc/blocks/wp-block-gen sync recursive ^.*block\\.json$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "./inc/blocks/wp-block-gen/BlockGenerator.js":
/*!***************************************************!*\
  !*** ./inc/blocks/wp-block-gen/BlockGenerator.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BlockGenerator)
/* harmony export */ });
/* harmony import */ var _EditGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditGenerator.js */ "./inc/blocks/wp-block-gen/EditGenerator.js");
/* harmony import */ var _SaveGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SaveGenerator.js */ "./inc/blocks/wp-block-gen/SaveGenerator.js");
/* harmony import */ var _SaveGenerator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SaveGenerator_js__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * WP Block Generator
 */


var wp = window.wp;
var registerBlockType = wp.blocks.registerBlockType;

var BlockGenerator = /*#__PURE__*/function () {
  function BlockGenerator(config) {
    var pathPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    _classCallCheck(this, BlockGenerator);

    if (!config) {
      console.error("BlockGenerator: Unable to find wp-block-gen configuration JSON");
      return;
    }

    this.categoryName = config.category;
    this.startCollapsed = config.startCollapsed;
    this.registerBlocks(config.blocks, pathPrefix);
  }

  _createClass(BlockGenerator, [{
    key: "registerBlocks",
    value: function registerBlocks(blocks) {
      var _this = this;

      var pathPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var isChild = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      blocks.forEach(function (blockData) {
        var block = __webpack_require__("./inc/blocks/wp-block-gen sync recursive ^.*block\\.json$")(pathPrefix + blockData.path + "block.json");

        block.path = blockData.path;
        block.isChild = isChild;

        _this.registerBlock(block);

        if (typeof block.children != 'undefined' && block.children.length > 0) {
          // Register all children blocks with isChild set to true
          _this.registerBlocks(block.children, pathPrefix + block.path, true);
        }
      });
    }
  }, {
    key: "registerBlock",
    value: function registerBlock(block) {
      block.name = block.categ + "/" + block.slug;

      if (typeof block.parent != "undefined") {
        block.parentName = block.categ + '/' + block.parent;
      }

      var renderJSX = block.render == "JSX";

      var _edit = new EditComponent(block, this.startCollapsed, this.categoryName);

      var _save = new SaveGenerator(block);

      registerBlockType(block.name, {
        title: block.title,
        description: block.desc,
        icon: block.icon,
        parent: block.parentName,
        category: block.categ,
        attributes: block.attrs,
        edit: function edit() {
          return _edit;
        },
        save: function save() {
          return _save;
        }
      });
    }
  }]);

  return BlockGenerator;
}();



/***/ }),

/***/ "./inc/blocks/wp-block-gen/EditGenerator.js":
/*!**************************************************!*\
  !*** ./inc/blocks/wp-block-gen/EditGenerator.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Inputs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Inputs.js */ "./inc/blocks/wp-block-gen/Inputs.js");
/* harmony import */ var _Inputs_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Inputs_js__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Edit Generator
 */

var defaultTitleType = 'h4';

var EditGenerator = function EditGenerator(block, collapsed, categoryName) {
  _classCallCheck(this, EditGenerator);

  this.block = block;
  this.collapsed = collapsed;
  this.categoryName = categoryName;
  this.editRender = new EditComponent(block, collapsed, categoryName);
};

var wp = window.wp;
var Component = wp.element.Component;
var el = wp.element.createElement;
/**
 * Create Edit React Component for Gutenberg Editor
 */

var EditComponent = /*#__PURE__*/function (_Component) {
  _inherits(EditComponent, _Component);

  var _super = _createSuper(EditComponent);

  function EditComponent(block, collapsed, categoryName) {
    var _this;

    _classCallCheck(this, EditComponent);

    _this.block = block;
    _this.collapsed = collapsed;
    _this.categoryName = categoryName;
    return _possibleConstructorReturn(_this);
  }

  _createClass(EditComponent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes,
          className = _this$props.className,
          clientId = _this$props.clientId,
          name = _this$props.name;
      var editElements = [];

      if (typeof this.block.edit != 'undefined') {
        this.block.edit.forEach(function (element) {
          editElements.push(generateElement(element));
        });
      }

      var editView = el('div', {
        className: className
      }, editElements);
      return el('div', null, [/*#__PURE__*/React.createElement("h2", null, this.block.title), editView]);
    }
  }, {
    key: "generateElement",
    value: function generateElement(element) {
      switch (element.tag) {
        case 'title':
          return /*#__PURE__*/React.createElement(CustomTitle, {
            element: element
          });

        case 'input':
          if (typeof element.attr == "undefined" || element.attr.length == 0 || typeof element.type == "undefined") return null;
          var _this$props2 = this.props,
              attributes = _this$props2.attributes,
              setAttributes = _this$props2.setAttributes;
          if (typeof attributes[attr] != 'undefined') element.value = attributes[attr];
          return /*#__PURE__*/React.createElement(GenerateInput, {
            element: element,
            setAttributes: setAttributes
          });
      }
    }
  }, {
    key: "CustomTitle",
    value: function CustomTitle(props) {
      var element = props.element;
      if (element.tag != "title") return null;
      if (typeof element.type == 'undefined') element.type = defaultTitleType;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(element.type, {
        "class": "hr-title"
      }, element.title), element.useHR && /*#__PURE__*/React.createElement("hr", null));
    }
  }]);

  return EditComponent;
}(Component);

/***/ }),

/***/ "./inc/blocks/wp-block-gen/Inputs.js":
/*!*******************************************!*\
  !*** ./inc/blocks/wp-block-gen/Inputs.js ***!
  \*******************************************/
/***/ (() => {

function GenerateInput(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
  if (element.tag != 'input') return null;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var InputComponent = 'Input' + capitalizeFirstLetter(element.type);

  if (InputComponent != null) {
    return /*#__PURE__*/React.createElement(InputComponent, {
      element: element,
      setAttributes: setAttributes
    });
  }
}

function InputText(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputNumber(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputRange(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputRich(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputTextarea(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputImage(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputGallery(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputUrl(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputCheck(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputSelect(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputInner(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputTemplate(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

function InputIcon(props) {
  var element = props.element,
      setAttributes = props.setAttributes;
}

/***/ }),

/***/ "./inc/blocks/wp-block-gen/SaveGenerator.js":
/*!**************************************************!*\
  !*** ./inc/blocks/wp-block-gen/SaveGenerator.js ***!
  \**************************************************/
/***/ (() => {

/**
 * Save Generator
 */
function SaveGenerator() {
  return /*#__PURE__*/React.createElement("h1", null, "Hello World");
}

/***/ }),

/***/ "./inc/blocks/config.json":
/*!********************************!*\
  !*** ./inc/blocks/config.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"category":"MinimalQ Blocks","startCollapsed":true,"blocks":[{"path":"hero/"}]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./inc/blocks/blocks.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wp_block_gen_BlockGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wp-block-gen/BlockGenerator */ "./inc/blocks/wp-block-gen/BlockGenerator.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.json */ "./inc/blocks/config.json");
// import '../wp-block-gen/BlockGenerator'


new _wp_block_gen_BlockGenerator__WEBPACK_IMPORTED_MODULE_0__.default(_config_json__WEBPACK_IMPORTED_MODULE_1__, '../');
})();

/******/ })()
;