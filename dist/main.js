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

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options.js */ \"./src/js/options.js\");\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ \"./src/js/map.js\");\n\r\n\r\n// import connections from './connections.js';\r\n// import feedData from './feedData.js';\r\n\r\n// eslint-disable-next-line no-unused-vars\r\nconst d3MapConn = (function exportFunction() {\r\n    const EXPORTOBJECT = {};\r\n\r\n    const options = {\r\n        showPulsatingDestinationCircles: true,\r\n        parentId: '#map-holder'\r\n    };\r\n    console.log(_options_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\r\n    _options_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(options);\r\n\r\n    EXPORTOBJECT.setOptions = function setOptions(optionsObject) {\r\n        // eslint-disable-next-line no-restricted-syntax\r\n        for (const [key, value] of Object.entries(optionsObject)) {\r\n            if (key in options) {\r\n                options[key] = value;\r\n            } else {\r\n                throw new Error(`No configuration option named ${key} available`);\r\n            }\r\n        }\r\n        _options_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(options);\r\n    };\r\n\r\n    EXPORTOBJECT.createMap = function createMap() {\r\n        _map_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create();\r\n    };\r\n\r\n    EXPORTOBJECT.createConnections = function createConnections() {\r\n        createConnections();\r\n    };\r\n\r\n    EXPORTOBJECT.feedData = function feedData() {\r\n        feedData();\r\n    };\r\n\r\n    // Expose the public EXPORTOBJECT\r\n    return EXPORTOBJECT;\r\n}());\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (d3MapConn);\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/*! exports provided: create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options.js */ \"./src/js/options.js\");\n\r\n\r\nfunction create() {\r\n    let container = _options_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].parentId;\r\n\r\n    let w = $(container).width();\r\n    let h = $(container).height();\r\n\r\n    // variables for catching min and max zoom factors\r\n    let minZoom;\r\n    let maxZoom;\r\n\r\n    // Define map projection\r\n    let projection = d3\r\n        .geoEquirectangular()\r\n        .center([0, 0])\r\n        .scale([w / (2 * Math.PI)]) // scale to fit group width\r\n        .translate([w / 2, h / 2]); // ensure centred in group\r\n\r\n    let div = d3\r\n        .select('body')\r\n        .append('div')\r\n        .attr('class', 'tooltip')\r\n        .style('opacity', 0);\r\n\r\n    // Define map path\r\n    let path = d3.geoPath().projection(projection);\r\n\r\n    // Create function to apply zoom to countriesGroup\r\n    function zoomed() {\r\n        let t = d3.event.transform;\r\n        // eslint-disable-next-line no-use-before-define\r\n        countriesGroup.attr(\r\n            'transform',\r\n            'translate(' + [t.x, t.y] + ')scale(' + t.k + ')'\r\n        );\r\n    }\r\n\r\n    // Create an SVG\r\n    let svg = d3\r\n        .select('#map-holder')\r\n        .append('svg')\r\n        // set to the same size as the \"map-holder\" div\r\n        .attr('width', $('#map-holder').width())\r\n        .attr('height', $('#map-holder').height());\r\n\r\n    let countriesGroup = svg.append('g').attr('id', 'map');\r\n    // let arcGroup = countriesGroup.append('g');\r\n    // let imageGroupDestination = countriesGroup.append('g');\r\n    // let highlightCircle = countriesGroup.append('g');\r\n    // let imageGroupSource = countriesGroup.append('g');\r\n\r\n    // Define map zoom behaviour\r\n    let zoom = d3.zoom().on('zoom', zoomed);\r\n\r\n    // Function that calculates zoom/pan limits and sets zoom to default value\r\n    function initiateZoom() {\r\n        // Define a \"minzoom\" whereby the \"Countries\" is as\r\n        // small possible without leaving white space at top/bottom or sides\r\n        minZoom = Math.max(\r\n            $('#map-holder').width() / w,\r\n            $('#map-holder').height() / h\r\n        );\r\n        // set max zoom to a suitable factor of this value\r\n        maxZoom = 20 * minZoom;\r\n        // set extent of zoom to chosen values\r\n        // set translate extent so that panning can't cause map to move out of viewport\r\n        zoom.scaleExtent([minZoom, maxZoom]).translateExtent([\r\n            [0, 0],\r\n            [w, h]\r\n        ]);\r\n        // define X and Y offset for centre of map to be shown in centre of holder\r\n        let midX = ($('#map-holder').width() - minZoom * w) / 2;\r\n        let midY = ($('#map-holder').height() - minZoom * h) / 2;\r\n        // change zoom transform to min zoom and centre offsets\r\n        svg.call(\r\n            zoom.transform,\r\n            d3.zoomIdentity.translate(midX, midY).scale(minZoom)\r\n        );\r\n    }\r\n\r\n    // On window resize\r\n    // eslint-disable-next-line func-names\r\n    $(window).resize(function() {\r\n        // Resize SVG\r\n        svg\r\n            .attr('width', $('#map-holder').width())\r\n            .attr('height', $('#map-holder').height());\r\n        initiateZoom();\r\n    });\r\n\r\n    function init() {\r\n        setTimeout(function() {\r\n            d3.json('geo.json', function(error, data) {\r\n                if (error) {\r\n                    console.error('Error reading geo.json');\r\n                } else {\r\n                    createMap(data);\r\n                }\r\n            });\r\n        }, 100);\r\n    }\r\n\r\n    init();\r\n\r\n    /**\r\n     * This function creates the map on the page.\r\n     * @param {array} json JSONs read.\r\n     */\r\n    function createMap(json) {\r\n        countriesGroup\r\n            .append('rect')\r\n            .attr('x', 0)\r\n            .attr('y', 0)\r\n            .attr('width', w)\r\n            .attr('height', h);\r\n\r\n        countriesGroup\r\n            .selectAll('path')\r\n            .data(json.features)\r\n            .enter()\r\n            .append('path')\r\n            .attr('d', path)\r\n            .attr('id', function(d) {\r\n                return 'country' + d.properties.iso_a3;\r\n            })\r\n            .attr('class', 'country')\r\n\r\n        .on('mouseover', function(d) {\r\n                d3.select('#countryLabel' + d.properties.iso_a3).style(\r\n                    'display',\r\n                    'block'\r\n                );\r\n            })\r\n            .on('mouseout', function(d) {\r\n                d3.select('#countryLabel' + d.properties.iso_a3).style(\r\n                    'display',\r\n                    'none'\r\n                );\r\n            });\r\n\r\n        let countryLabels = countriesGroup\r\n            .selectAll('g')\r\n            .data(json.features)\r\n            .enter()\r\n            .append('g')\r\n            .attr('class', 'countryLabel')\r\n            .attr('id', function(d) {\r\n                return 'countryLabel' + d.properties.iso_a3;\r\n            })\r\n            .attr('transform', function(d) {\r\n                return (\r\n                    'translate(' + path.centroid(d)[0] + ',' + path.centroid(d)[1] + ')'\r\n                );\r\n            })\r\n            .on('mouseover', function() {\r\n                d3.select(this).style('display', 'block');\r\n            })\r\n            .on('mouseout', function() {\r\n                d3.select(this).style('display', 'none');\r\n            });\r\n\r\n        countryLabels\r\n            .append('text')\r\n            .attr('class', 'countryName')\r\n            .style('text-anchor', 'middle')\r\n            .attr('dx', 0)\r\n            .attr('dy', 0)\r\n            .text(function(d) {\r\n                return d.properties.name;\r\n            });\r\n\r\n        initiateZoom();\r\n    }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/map.js?");

/***/ }),

/***/ "./src/js/options.js":
/*!***************************!*\
  !*** ./src/js/options.js ***!
  \***************************/
/*! exports provided: set, options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"set\", function() { return set; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"options\", function() { return options; });\nlet options;\r\n\r\nfunction set(optionsObj) {\r\n    options = optionsObj;\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/options.js?");

/***/ })

/******/ });