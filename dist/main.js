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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options */ \"./src/js/options.js\");\n/* eslint-disable no-plusplus */\n\n\nlet arcGroup;\nlet imageGroupDestination;\nlet highlightCircle;\nlet imageGroupSource;\nlet destination;\nlet source;\nlet sourceMatchMap;\nlet destinationMatchMap;\nlet alreadyHighlighted;\nlet iterationCount;\n\nfunction removeConnections() {\n    // Remove all existing elments on the map\n    arcGroup.remove();\n    imageGroupSource.remove();\n    imageGroupDestination.remove();\n    highlightCircle.remove();\n    arcGroup = null;\n    imageGroupSource = null;\n    imageGroupDestination = null;\n    highlightCircle = null;\n}\n\n/**\n * This function will be used to draw elemets like\n * path, pointers and pulsating circles on map.\n * @param {array} data The data that will used to create elements.\n */\nfunction createConnections(data) {\n    const {\n        div,\n        projection,\n        countriesGroup,\n    } = _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].internalStore;\n\n    if (!arcGroup) {\n        arcGroup = countriesGroup.append('g');\n        imageGroupDestination = countriesGroup.append('g');\n        highlightCircle = countriesGroup.append('g');\n        imageGroupSource = countriesGroup.append('g');\n\n        // Array that will be used  to draw destination pointer\n        destination = [];\n\n        // Array that will be used  to draw source pointer\n        source = [];\n\n        // Map to check if a source already exists\n        sourceMatchMap = new Map();\n\n        // Map to check if a destination already exists\n        destinationMatchMap = new Map();\n\n        alreadyHighlighted = {};\n        iterationCount = 0;\n    }\n    iterationCount++;\n\n    data.map((val) => {\n        // Update source and destination array according to data\n        if (!sourceMatchMap.has(val.source.lat + val.source.lon)) {\n            source.push(val.source);\n            sourceMatchMap.set(val.source.lat + val.source.lon, true);\n        }\n        if (\n            !destinationMatchMap.has(val.destination.lat + val.destination.lon)\n        ) {\n            destination.push(val.destination);\n            destinationMatchMap.set(\n                val.destination.lat + val.destination.lon,\n                true,\n            );\n        }\n        return null;\n    });\n\n    // Add source pointers on the map\n    imageGroupSource\n        .selectAll('image')\n        .data([0])\n        .data(source)\n        .enter()\n        .append('image')\n        .attr('class', 'pointer')\n        .attr('xlink:href', _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.source.location)\n        .attr('width', _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.source.imageWidth)\n        .attr('height', _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.source.imageHeight)\n        .on('mouseover', function (d, i) {\n            if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.event.iconClick) {\n                d3.select(this).style('cursor', 'pointer');\n            }\n            div.transition().style('opacity', 0.9);\n            div.html(\n                `\n            <div style = \"background-color: black;color: white; padding: 10px;\">${\n                d[_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.source.tooltipdata]\n                }</div>\n            `,\n            )\n                .style('left', `${d3.event.pageX + _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.source.imageXPos}px`)\n                .style('top', `${d3.event.pageY + _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.source.imageYPos}px`);\n        })\n        .on('mouseout', function () {\n            if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.event.iconClick) {\n                d3.select(this).style('cursor', 'default');\n            }\n            div.transition()\n                .duration(500)\n                .style('opacity', 0);\n        })\n        .on('click', (d) => {\n            if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.event.iconClick) {\n                const evt = new CustomEvent('sourceIconClick', { detail: d });\n                window.dispatchEvent(evt);\n            }\n        })\n        .attr('x', d => projection([d.lon, d.lat])[0] - 10)\n        .attr('y', d => projection([d.lon, d.lat])[1] - 18);\n\n    // Add destination pointer on the map\n    imageGroupDestination\n        .selectAll('image')\n        .data([0])\n        .data(destination)\n        .enter()\n        .append('image')\n        .attr('class', 'pointer')\n        .attr('xlink:href', _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.destination.location)\n        .attr('width', _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.destination.imageWidth)\n        .attr('height', _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.destination.imageHeight)\n        .attr('x', d => projection([d.lon, d.lat])[0] - 7)\n        .attr('y', d => projection([d.lon, d.lat])[1] - 15)\n        .on('mouseover', function (d) {\n            if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.event.iconClick) {\n                d3.select(this).style('cursor', 'pointer');\n            }\n            div.transition().style('opacity', 0.9);\n            div.html(\n                `\n            <div style = \"background-color: black; color: white; padding: 10px;\">${\n                d[_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.destination.tooltipdata]\n                }</div>\n            `,\n            )\n                .style('left', `${d3.event.pageX + _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.destination.imageXPos}px`)\n                .style('top', `${d3.event.pageY + _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.destination.imageYPos}px`);\n        })\n        .on('mouseout', function () {\n            if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.event.iconClick) {\n                d3.select(this).style('cursor', 'default');\n            }\n            div.transition()\n                .duration(500)\n                .style('opacity', 0);\n        })\n        .on('click', (d) => {\n            if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.event.iconClick) {\n                const evt = new CustomEvent('destinationIconClick', { detail: d });\n                window.dispatchEvent(evt);\n            }\n        })\n        .style('visibility', 'hidden')\n        .transition()\n        .style('visibility', 'visible')\n        .delay(_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.addAnimationToPath ? _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.animationDuration : 0);\n\n    // line that will be used as a prototype for all paths\n    const line = d3\n        .line()\n        .x(d => projection([d.lon, d.lat])[0])\n        .y(d => projection([d.lon, d.lat])[1])\n        .curve(curve);\n\n    // Add line to the map\n    arcGroup\n        .selectAll(null)\n        .data(data)\n        .enter()\n        .append('path')\n        .attr('class', 'line')\n        .attr('id', (d, i) => `line${iterationCount}-${i}`)\n        .datum(d => [d.source, d.destination])\n        .attr('d', line)\n        .style('fill', 'none')\n        .style('stroke', _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.pathColor)\n        .style('stroke-width', (d) => {\n            if (d[0].count < 10) return 1.5;\n            if (d[0].count < 50) return 2;\n            return 2.5;\n        })\n        .attr('pointer-events', 'visibleStroke')\n        .on('click', (d) => {\n            if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.event.edgeClick) {\n                const evt = new CustomEvent('pathClick', { detail: d });\n                window.dispatchEvent(evt);\n            }\n        })\n        .on('mouseover', (d, i) => {\n            if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.showCountriesOnHover) {\n                d3.select(`#countryLabel${data[i].source.iso_a3}`).style(\n                    'display',\n                    'block',\n                );\n                d3.select(`#countryLabel${data[i].destination.iso_a3}`).style(\n                    'display',\n                    'block',\n                );\n            }\n        })\n        .on('mouseout', (d, i) => {\n            if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.showCountriesOnHover) {\n                d3.select(`#countryLabel${data[i].source.iso_a3}`).style(\n                    'display',\n                    'none',\n                );\n                d3.select(`#countryLabel${data[i].destination.iso_a3}`).style(\n                    'display',\n                    'none',\n                );\n            }\n        });\n\n    if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.addAnimationToPath) {\n        // Add animation to all paths drawn on map\n\n        d3.selectAll('.line').each((d, i) => {\n            if (d3.select(`#line${iterationCount}-${i}`).node()) {\n                const totalLength = d3\n                    .select(`#line${iterationCount}-${i}`)\n                    .node()\n                    .getTotalLength();\n                d3.selectAll(`#line${iterationCount}-${i}`)\n                    .attr('stroke-dasharray', `${totalLength} ${totalLength}`)\n                    .attr('stroke-dashoffset', totalLength)\n                    .transition()\n                    .duration(_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.addAnimationToPath ? _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.animationDuration : 0)\n                    .delay(100 * i)\n                    .attr('stroke-dashoffset', 0)\n                    .style('stroke-width', 3);\n            }\n        });\n    }\n\n    if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.showPulsatingDestinationCircles) {\n        // Destination pulstaing circles\n        const circles = highlightCircle\n            .selectAll('highlightCircles')\n            .data(data)\n            .enter()\n            .append('circle')\n            .attr('cx', (d) => {\n                if (\n                    alreadyHighlighted[`${d.destination.lon}${d.destination.lat}`]\n                ) {\n                    alreadyHighlighted[\n                        `${d.destination.lon}${d.destination.lat}`\n                    ].count += d.count;\n                    alreadyHighlighted[`${d.destination.lon}${d.destination.lat}`]\n                        .connections++;\n                } else {\n                    alreadyHighlighted[\n                        `${d.destination.lon}${d.destination.lat}`\n                    ] = {};\n                    alreadyHighlighted[\n                        `${d.destination.lon}${d.destination.lat}`\n                    ].count = d.count;\n                    alreadyHighlighted[\n                        `${d.destination.lon}${d.destination.lat}`\n                    ].connections = 1;\n                }\n                return projection([d.destination.lon, d.destination.lat])[0];\n            })\n            .attr('cy', d => projection([d.destination.lon, d.destination.lat])[1])\n            .attr('r', (d) => {\n                if (\n                    alreadyHighlighted[`${d.destination.lon}${d.destination.lat}`]\n                        .count < 10\n                ) {\n                    return 5;\n                }\n                if (\n                    alreadyHighlighted[`${d.destination.lon}${d.destination.lat}`]\n                        .count < 50\n                ) {\n                    return 7;\n                }\n                return 10;\n            })\n            .attr('fill', _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.pulsatingDestinationCirclesColor)\n            .attr('fill-opacity', 0.5)\n            .on('mouseover', function (d, i) {\n                if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.event.circleClick) {\n                    d3.select(this).style('cursor', 'pointer');\n                }\n                div.transition().style('opacity', 0.9);\n                div.html(\n                    `\n            <div style = \"background-color: black; color: white; padding: 10px;\">${\n                    d.destination[_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.destination.tooltipdata]\n                    }</div>\n            `,\n                )\n                    .style('left', `${d3.event.pageX}px`)\n                    .style('top', `${d3.event.pageY - 28}px`);\n            })\n            .on('mouseout', function (d, i) {\n                if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.event.circleClick) {\n                    d3.select(this).style('cursor', 'default');\n                }\n                div.transition()\n                    .duration(500)\n                    .style('opacity', 0);\n            })\n            .on('click', (d) => {\n                if (_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.event.circleClick) {\n                    const evt = new CustomEvent('circleClick', { detail: d });\n                    window.dispatchEvent(evt);\n                }\n            })\n            .attr('fill-opacity', 0)\n            .transition()\n            .attr('fill-opacity', 0.5)\n            .delay(_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.addAnimationToPath ? _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.extra.animationDuration : 0);\n\n        setTimeout(() => {\n            circles.each(pulsate);\n        }, 5500);\n    }\n\n    /**\n     * Function for pulsating the destination circles.\n     */\n    function pulsate() {\n        // console.log('Hell')\n        let pulser = d3.select(this);\n        // d3.timer(function() {\n        //   console.log('Hell');\n        //   pulser.style(\"visibility\", \"visible\");\n        // }, 5000);\n\n        pulser = pulser\n            .transition()\n            .duration(1500)\n            .style('visibility', 'visible')\n            .attr('r', function () {\n                if (this.__data__.count < 10) {\n                    return 5;\n                }\n                if (this.__data__.count < 50) {\n                    return 7;\n                }\n                return 10;\n            })\n            .attr('stroke-width', 50)\n            .transition()\n            .duration(1500)\n            .attr('r', function () {\n                if (this.__data__.count < 10) {\n                    return 5 * 1.5;\n                }\n                if (this.__data__.count < 50) {\n                    return 7 * 1.5;\n                }\n                return 10 * 1.5;\n            })\n            .attr('stroke-width', 10)\n            .on('end', pulsate);\n    }\n\n    /**\n * This function defines the curve that will be used in creating the paths on the map.\n */\n    function curve(context) {\n        const custom = d3.curveLinear(context);\n        custom._context = context;\n        custom.point = function (x, y) {\n            (x = +x), (y = +y);\n            switch (this._point) {\n                case 0:\n                    this._point = 1;\n                    this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);\n                    this.x0 = x;\n                    this.y0 = y;\n                    break;\n                case 1:\n                    this._point = 2;\n                default:\n                    let x1 = this.x0 * 0.5 + x * 0.5;\n                    let y1 = this.y0 * 0.5 + y * 0.5;\n                    const m = 1 / (y1 - y) / (x1 - x);\n                    const r = -100; // offset of mid point.\n                    const k = r / Math.sqrt(1 + m * m);\n                    if (m == Infinity) {\n                        y1 += r;\n                    } else {\n                        y1 += k;\n                        x1 += m * k;\n                    }\n                    this._context.quadraticCurveTo(x1, y1, x, y);\n                    this.x0 = x;\n                    this.y0 = y;\n                    break;\n            }\n        };\n        return custom;\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    createConnections,\n    removeConnections,\n});\n\n\n//# sourceURL=webpack:///./src/js/connections.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options */ \"./src/js/options.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ \"./src/js/map.js\");\n/* harmony import */ var _connections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./connections */ \"./src/js/connections.js\");\n\n\n\n\n// import connections from './connections.js';\n// import feedData from './feedData.js';\n\n// eslint-disable-next-line no-unused-vars\nconst d3MapConn = (function exportFunction() {\n    const EXPORTOBJECT = {};\n\n    EXPORTOBJECT.setOptions = function setOptions(optionsObject) {\n        // eslint-disable-next-line no-restricted-syntax\n        for (const [key, value] of Object.entries(optionsObject)) {\n            if (key in _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options) {\n                if (typeof _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options[key] === 'object' && _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options[key] !== null) {\n                    // eslint-disable-next-line no-restricted-syntax\n                    for (const [innerKey, innerValue] of Object.entries(optionsObject[key])) {\n                        if (innerKey in _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options[key]) {\n                            _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options[key][innerKey] = innerValue;\n                        } else {\n                            throw new Error(\n                                `No configuration option named '${key}.${innerKey}' available`,\n                            );\n                        }\n                    }\n                } else {\n                    _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options[key] = value;\n                }\n            } else {\n                throw new Error(\n                    `No configuration option named '${key}' available`,\n                );\n            }\n        }\n        // optionsMap.set(options);\n        console.log(_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options);\n    };\n\n    EXPORTOBJECT.createMap = function createMap() {\n        return _map__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create();\n    };\n\n    EXPORTOBJECT.createConnections = function createConnections(data) {\n        _connections__WEBPACK_IMPORTED_MODULE_2__[\"default\"].createConnections(data);\n    };\n\n    EXPORTOBJECT.removeConnections = function removeConnections() {\n        _connections__WEBPACK_IMPORTED_MODULE_2__[\"default\"].removeConnections();\n    };\n\n    // Expose the public EXPORTOBJECT\n    return EXPORTOBJECT;\n})();\n\nwindow.d3MapConn = d3MapConn;\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options */ \"./src/js/options.js\");\n\n\nfunction create() {\n    return new Promise(((resolve, reject) => {\n        const container = _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.parentId;\n\n        const w = $(container).width();\n        const h = $(container).height();\n\n        // variables for catching min and max zoom factors\n        let minZoom;\n        let maxZoom;\n\n        // Define map projection\n        const projection = d3\n            .geoEquirectangular()\n            .center([0, 0])\n            .scale([w / (2 * Math.PI)]) // scale to fit group width\n            .translate([w / 2, h / 2]); // ensure centred in group\n\n        const div = d3\n            .select('body')\n            .append('div')\n            .attr('class', 'tooltip')\n            .style('opacity', 0);\n\n        // Define map path\n        const path = d3.geoPath().projection(projection);\n\n        // Create function to apply zoom to countriesGroup\n        function zoomed() {\n            const t = d3.event.transform;\n            // eslint-disable-next-line no-use-before-define\n            countriesGroup.attr(\n                'transform',\n                `translate(${[t.x, t.y]})scale(${t.k})`,\n            );\n        }\n\n        // Create an SVG\n        const svg = d3\n            .select('#map-holder')\n            .append('svg')\n            // set to the same size as the \"map-holder\" div\n            .attr('width', $('#map-holder').width())\n            .attr('height', $('#map-holder').height());\n\n        let countriesGroup = svg.append('g').attr('id', 'map');\n\n        // Define map zoom behaviour\n        const zoom = d3.zoom().on('zoom', zoomed);\n\n        // Function that calculates zoom/pan limits and sets zoom to default value\n        function initiateZoom() {\n            // Define a \"minzoom\" whereby the \"Countries\" is as\n            // small possible without leaving white space at top/bottom or sides\n            minZoom = Math.max(\n                $('#map-holder').width() / w,\n                $('#map-holder').height() / h,\n            );\n            // set max zoom to a suitable factor of this value\n            maxZoom = 20 * minZoom;\n            // set extent of zoom to chosen values\n            // set translate extent so that panning can't cause map to move out of viewport\n            zoom.scaleExtent([minZoom, maxZoom]).translateExtent([[0, 0], [w, h]]);\n            // define X and Y offset for centre of map to be shown in centre of holder\n            const midX = ($('#map-holder').width() - minZoom * w) / 2;\n            const midY = ($('#map-holder').height() - minZoom * h) / 2;\n            // change zoom transform to min zoom and centre offsets\n            svg.call(\n                zoom.transform,\n                d3.zoomIdentity.translate(midX, midY).scale(minZoom),\n            );\n        }\n\n        let resizetimeouts;\n        // On window resize\n        // eslint-disable-next-line func-names\n        $(window).resize(() => {\n            // Resize SVG\n            if (resizetimeouts) {\n                clearTimeout(resizetimeouts);\n            }\n            resizetimeouts = setTimeout(() => {\n                svg.attr('width', $('#map-holder').width()).attr(\n                    'height',\n                    $('#map-holder').height(),\n                );\n                initiateZoom();\n            }, 100);\n        });\n\n        function init() {\n            setTimeout(() => {\n                createMap(_options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].options.geoJson);\n            }, 100);\n        }\n\n        init();\n\n        /**\n        * This function creates the map on the page.\n        * @param {array} json JSONs read.\n        */\n        function createMap(json) {\n            countriesGroup\n                .append('rect')\n                .attr('x', 0)\n                .attr('y', 0)\n                .attr('width', w)\n                .attr('height', h);\n\n            countriesGroup\n                .selectAll('path')\n                .data(json.features)\n                .enter()\n                .append('path')\n                .attr('d', path)\n                .attr('id', d => `country${d.properties.iso_a3}`)\n                .attr('class', 'country')\n\n                .on('mouseover', (d) => {\n                    d3.select(`#countryLabel${d.properties.iso_a3}`).style(\n                        'display',\n                        'block',\n                    );\n                })\n                .on('mouseout', (d) => {\n                    d3.select(`#countryLabel${d.properties.iso_a3}`).style(\n                        'display',\n                        'none',\n                    );\n                });\n\n            const countryLabels = countriesGroup\n                .selectAll('g')\n                .data(json.features)\n                .enter()\n                .append('g')\n                .attr('class', 'countryLabel')\n                .attr('id', d => `countryLabel${d.properties.iso_a3}`)\n                .attr(\n                    'transform',\n                    d => `translate(${path.centroid(d)[0]},${path.centroid(d)[1]})`,\n                )\n                .on('mouseover', function() {\n                    d3.select(this).style('display', 'block');\n                })\n                .on('mouseout', function() {\n                    d3.select(this).style('display', 'none');\n                });\n\n            countryLabels\n                .append('text')\n                .attr('class', 'countryName')\n                .style('text-anchor', 'middle')\n                .attr('dx', 0)\n                .attr('dy', 0)\n                .text(d => d.properties.name);\n\n            initiateZoom();\n        }\n        _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].internalStore.countriesGroup = countriesGroup;\n        _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].internalStore.div = div;\n        _options__WEBPACK_IMPORTED_MODULE_0__[\"default\"].internalStore.projection = projection;\n        setTimeout(() => {\n            resolve();\n          }, 250);\n    }));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ create });\n\n\n//# sourceURL=webpack:///./src/js/map.js?");

/***/ }),

/***/ "./src/js/options.js":
/*!***************************!*\
  !*** ./src/js/options.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {const options = {\n    extra: {\n        showPulsatingDestinationCircles: true,\n        showCountriesOnHover: true,\n        pulsatingDestinationCirclesColor: '#fd0017',\n        pathColor: '#fb5757',\n        addAnimationToPath: true,\n        animationDuration: 5000,\n    },\n    parentId: '#map-holder',\n    geoJson: null,\n    source: {\n        imageXPos: 0,\n        imageYPos: -28,\n        imageWidth: 20,\n        imageHeight: 20,\n        location: `${__dirname}dist/img/source-pin.png`,\n        tooltipdata: 'ip',\n    },\n    destination: {\n        imageXPos: 0,\n        imageYPos: -28,\n        imageHeight: 15,\n        imageWidth: 15,\n        location: `${__dirname}dist/img/pointer.png`,\n        tooltipdata: 'ip',\n    },\n    event: {\n        edgeClick: false,\n        circleClick: false,\n        iconClick: true,\n    }\n    \n};\n\nconst internalStore = {\n    countriesGroup: null,\n    div: null,\n    projection: null,\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    options,\n    internalStore,\n});\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/js/options.js?");

/***/ })

/******/ });