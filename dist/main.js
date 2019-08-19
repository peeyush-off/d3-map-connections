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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/connections.js":
/*!*******************************!*\
  !*** ./src/js/connections.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (80:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|         .on(\\\"end\\\", pulsate);\\n|     }\\n> }\\n| \\n|   /**\");\n\n//# sourceURL=webpack:///./src/js/connections.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options */ \"./src/js/options.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ \"./src/js/map.js\");\n/* harmony import */ var _connections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./connections */ \"./src/js/connections.js\");\n/* harmony import */ var _connections__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_connections__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n// import connections from './connections.js';\n// import feedData from './feedData.js';\n\n// eslint-disable-next-line no-unused-vars\nconst d3MapConn = (function exportFunction() {\n    const EXPORTOBJECT = {};\n\n    EXPORTOBJECT.setOptions = function setOptions(optionsObject) {\n        // eslint-disable-next-line no-restricted-syntax\n        for (const [key, value] of Object.entries(optionsObject)) {\n            if (key in _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options) {\n                _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options[key] = value;\n            } else {\n                throw new Error(\n                    `No configuration option named ${key} available`\n                );\n            }\n        }\n        // optionsMap.set(options);\n    };\n\n    EXPORTOBJECT.createMap = function createMap() {\n        _map__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create();\n    };\n\n    EXPORTOBJECT.createConnections = function createConnections() {\n        _connections__WEBPACK_IMPORTED_MODULE_2___default.a.createConnections();\n    };\n\n    // Expose the public EXPORTOBJECT\n    return EXPORTOBJECT;\n})();\n\nwindow.d3MapConn = d3MapConn;\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options */ \"./src/js/options.js\");\n\n\nfunction create() {\n    const container = _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.parentId;\n\n    const w = $(container).width();\n    const h = $(container).height();\n\n    // variables for catching min and max zoom factors\n    let minZoom;\n    let maxZoom;\n\n    // Define map projection\n    const projection = d3\n        .geoEquirectangular()\n        .center([0, 0])\n        .scale([w / (2 * Math.PI)]) // scale to fit group width\n        .translate([w / 2, h / 2]); // ensure centred in group\n\n    const div = d3\n        .select(\"body\")\n        .append(\"div\")\n        .attr(\"class\", \"tooltip\")\n        .style(\"opacity\", 0);\n\n    // Define map path\n    const path = d3.geoPath().projection(projection);\n\n    // Create function to apply zoom to countriesGroup\n    function zoomed() {\n        const t = d3.event.transform;\n        // eslint-disable-next-line no-use-before-define\n        countriesGroup.attr(\n            \"transform\",\n            `translate(${[t.x, t.y]})scale(${t.k})`\n        );\n    }\n\n    // Create an SVG\n    const svg = d3\n        .select(\"#map-holder\")\n        .append(\"svg\")\n        // set to the same size as the \"map-holder\" div\n        .attr(\"width\", $(\"#map-holder\").width())\n        .attr(\"height\", $(\"#map-holder\").height());\n\n    let countriesGroup = svg.append(\"g\").attr(\"id\", \"map\");\n    // let arcGroup = countriesGroup.append('g');\n    // let imageGroupDestination = countriesGroup.append('g');\n    // let highlightCircle = countriesGroup.append('g');\n    // let imageGroupSource = countriesGroup.append('g');\n\n    // Define map zoom behaviour\n    const zoom = d3.zoom().on(\"zoom\", zoomed);\n\n    // Function that calculates zoom/pan limits and sets zoom to default value\n    function initiateZoom() {\n        // Define a \"minzoom\" whereby the \"Countries\" is as\n        // small possible without leaving white space at top/bottom or sides\n        minZoom = Math.max(\n            $(\"#map-holder\").width() / w,\n            $(\"#map-holder\").height() / h\n        );\n        // set max zoom to a suitable factor of this value\n        maxZoom = 20 * minZoom;\n        // set extent of zoom to chosen values\n        // set translate extent so that panning can't cause map to move out of viewport\n        zoom.scaleExtent([minZoom, maxZoom]).translateExtent([[0, 0], [w, h]]);\n        // define X and Y offset for centre of map to be shown in centre of holder\n        const midX = ($(\"#map-holder\").width() - minZoom * w) / 2;\n        const midY = ($(\"#map-holder\").height() - minZoom * h) / 2;\n        // change zoom transform to min zoom and centre offsets\n        svg.call(\n            zoom.transform,\n            d3.zoomIdentity.translate(midX, midY).scale(minZoom)\n        );\n    }\n\n    let resizetimeouts;\n    // On window resize\n    // eslint-disable-next-line func-names\n    $(window).resize(() => {\n        // Resize SVG\n        if (resizetimeouts) {\n            clearTimeout(resizetimeouts);\n        }\n        resizetimeouts = setTimeout(() => {\n            svg.attr(\"width\", $(\"#map-holder\").width()).attr(\n                \"height\",\n                $(\"#map-holder\").height()\n            );\n            initiateZoom();\n        }, 100);\n    });\n\n    function init() {\n        setTimeout(() => {\n            createMap(_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.geoJson);\n        }, 100);\n    }\n\n    init();\n\n    /**\n     * This function creates the map on the page.\n     * @param {array} json JSONs read.\n     */\n    function createMap(json) {\n        countriesGroup\n            .append(\"rect\")\n            .attr(\"x\", 0)\n            .attr(\"y\", 0)\n            .attr(\"width\", w)\n            .attr(\"height\", h);\n\n        countriesGroup\n            .selectAll(\"path\")\n            .data(json.features)\n            .enter()\n            .append(\"path\")\n            .attr(\"d\", path)\n            .attr(\"id\", d => `country${d.properties.iso_a3}`)\n            .attr(\"class\", \"country\")\n\n            .on(\"mouseover\", d => {\n                d3.select(`#countryLabel${d.properties.iso_a3}`).style(\n                    \"display\",\n                    \"block\"\n                );\n            })\n            .on(\"mouseout\", d => {\n                d3.select(`#countryLabel${d.properties.iso_a3}`).style(\n                    \"display\",\n                    \"none\"\n                );\n            });\n\n        const countryLabels = countriesGroup\n            .selectAll(\"g\")\n            .data(json.features)\n            .enter()\n            .append(\"g\")\n            .attr(\"class\", \"countryLabel\")\n            .attr(\"id\", d => `countryLabel${d.properties.iso_a3}`)\n            .attr(\n                \"transform\",\n                d => `translate(${path.centroid(d)[0]},${path.centroid(d)[1]})`\n            )\n            .on(\"mouseover\", function() {\n                d3.select(this).style(\"display\", \"block\");\n            })\n            .on(\"mouseout\", function() {\n                d3.select(this).style(\"display\", \"none\");\n            });\n\n        countryLabels\n            .append(\"text\")\n            .attr(\"class\", \"countryName\")\n            .style(\"text-anchor\", \"middle\")\n            .attr(\"dx\", 0)\n            .attr(\"dy\", 0)\n            .text(d => d.properties.name);\n\n        initiateZoom();\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ create });\n\n\n//# sourceURL=webpack:///./src/js/map.js?");

/***/ }),

/***/ "./src/js/options.js":
/*!***************************!*\
  !*** ./src/js/options.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst options = {\n    showPulsatingDestinationCircles: true,\n    parentId: \"#map-holder\",\n    geoJson: null,\n    sourcePointer: 'img/source.png',\n    destinationPointer: 'img/destination.png',\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    options\n});\n\n\n//# sourceURL=webpack:///./src/js/options.js?");

/***/ })

/******/ });