import util from './util.js';
import mapElements from './mapElements.js';

// eslint-disable-next-line no-unused-vars
const d3MapConn = (function exportFunction() {

	const EXPORTOBJECT = {};

	const options = {
		showPulsatingDestinationCircles: true,
	};

	//
	// Methods
	//

	EXPORTOBJECT.setOptions = function setOptions(optionsObject) {
		// eslint-disable-next-line no-restricted-syntax
		for (const [key, value] of Object.entries(optionsObject)) {
			if (key in options) {
				options[key] = value;
			} else {
				throw new Error(`No configuration option named ${key} available`);
			}
		}
	};

	EXPORTOBJECT.createMap = function createMap() {

	};

	EXPORTOBJECT.createConnections = function createConnections() {

	};

	EXPORTOBJECT.feedData = function feedData() {

	};

	// Expose the public EXPORTOBJECT
	return EXPORTOBJECT;
}());
