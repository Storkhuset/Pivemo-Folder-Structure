/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function Edit(props) {
  const {
    data,
    current_user_id
  } = customTableData;

  // Use the data in your block editor UI
  let selectOptions = [{
    label: "-- Select a Structure --",
    value: "9999999"
  }];
  let allStructures = {
    9999999: {
      structure: [],
      userID: 0,
      structureName: "Select structure",
      topLevelFolderName: "Select structure"
    }
  };
  let jsxElement;
  data.map(structure => {
    // console.log(JSON.parse(structure.data.replaceAll("\\", "")));
    if (props.attributes.currentUser) {
      if (structure.user_id == current_user_id) {
        selectOptions.push({
          label: "id: " + structure.id + " - " + structure.folder_name,
          value: structure.id
        });
      }
    } else {
      selectOptions.push({
        label: "id: " + structure.id + " - " + structure.folder_name,
        value: structure.id
      });
    }
    allStructures[structure.id] = {
      structure: JSON.parse(structure.data.replaceAll("\\", "")),
      userID: structure.user_id,
      structureName: structure.folder_name,
      topLevelFolderName: structure.name
    };
  });
  function renderObjectToJSX(obj) {
    if (obj != null) {
      console.log(obj.length);
      const lastIndex = obj.length - 1;
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, obj.map((item, index) => {
        const isLastFolder = index == lastIndex && item.type == "folder";
        const lastFolderClass = isLastFolder ? " last-folder" : "";
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
          key: index,
          className: item.type === "folder" ? `folder${lastFolderClass}` : "file"
        }, setTheIcon(item), item.type === "folder" ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, " " + item.name, renderObjectToJSX(item.content)) : " " + item.name);
      }));
    }
  }
  function setTheIcon(item) {
    if (item.type === "folder") {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        className: "ppi ppi-folder"
      });
    }

    // Get the file suffix to determine what icon to use
    const fileSuffix = item.name.split(".").at(-1);
    let icon;
    switch (fileSuffix) {
      // Programming
      case "html":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-html"
        });
        break;
      case "js":
      case "jsx":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-javascript"
        });
        break;
      case "css":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-css"
        });
        break;
      case "scss":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-sass"
        });
        break;
      case "php":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-php"
        });
        break;
      case "py":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-python"
        });
        break;
      case "c":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-c"
        });
        break;
      case "cpp":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-cpp"
        });
        break;
      case "go":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-go"
        });
        break;
      case "java":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-java"
        });
        break;
      case "md":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-markdown"
        });
        break;
      case "r":
      case "rd":
      case "rsx":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-r"
        });
        break;
      case "rb":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-ruby"
        });
        break;
      case "rs":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-rust"
        });
        break;
      case "swift":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-swift"
        });
        break;
      case "ts":
      case "tsx":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-typescript"
        });
        break;
      case "vue":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-vue"
        });
        break;
      // Office documents
      case "doc":
      case "docx":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-word"
        });
        break;
      case "xls":
      case "xlsx":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-excel"
        });
        break;
      case "ppt":
      case "pptx":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-powerpoint"
        });
        break;
      case "txt":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-txt"
        });
        break;
      // Images
      case "png":
      case "jpg":
      case "jpeg":
      case "webp":
      case "gif":
      case "ps":
      case "tif":
      case "eps":
      case "svg":
      case "ai":
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-image"
        });
        break;
      // Default
      default:
        icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: "ppi ppi-document"
        });
        break;
    }
    return icon;
  }
  let selectedStructure = parseInt(props.attributes.selectedStructure);
  let strucName = Object.keys(allStructures).length != 0 ? allStructures[selectedStructure].topLevelFolderName : "";
  console.log(location.origin + "/wp-admin/admin.php?page=pivemo_folder_structure");
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "pfs-title-text"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "ppi ppi-folder"
  }), " ", strucName), renderObjectToJSX(allStructures[selectedStructure].structure), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pfs-block-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "pfs-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Pivemo Folder Structure")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CheckboxControl, {
    label: "Only list structures for Current user",
    value: props.attributes.currentUser,
    checked: props.attributes.currentUser,
    onChange: () => {
      props.setAttributes({
        currentUser: !props.attributes.currentUser
      });
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: "Select the folder structure you want to publish",
    value: props.attributes.selectedStructure,
    options: selectOptions,
    onChange: setStructure => props.setAttributes({
      selectedStructure: setStructure
    })
    // __nextHasNoMarginBottom
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: location.origin + "/wp-admin/admin.php?page=pivemo_folder_structure",
    className: "pfs-add-new-structure-link "
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "ppi ppi-plus"
  }), " Create new folder structure")));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  attributes: {
    selectedStructure: {
      type: "string",
      default: "9999999"
    },
    currentUser: {
      type: "boolean",
      default: true
    }
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */



/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
function save(props) {
  const selectedStructure = props.attributes.selectedStructure;
  let pfsShortcode = `[pfs-folder-structure id='${selectedStructure}']`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.RawHTML, {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save()
  }, pfsShortcode);
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"create-block/pivemo-folder-structure","version":"0.1.0","title":"Pivemo Folder Structure","category":"widgets","icon":"embed-generic","description":"Display folder structures in a nice and clear way. Easy to use.","supports":{"html":false},"textdomain":"pivemo-folder-structure","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkpivemo_folder_structure"] = globalThis["webpackChunkpivemo_folder_structure"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map