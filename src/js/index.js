import optionsMap from './options.js';
import map from './map.js';
// import connections from './connections.js';
// import feedData from './feedData.js';

// eslint-disable-next-line no-unused-vars
const d3MapConn = (function exportFunction() {
    const EXPORTOBJECT = {};

    const options = {
        showPulsatingDestinationCircles: true,
        parentId: '#map-holder'
    };
    optionsMap.set(options);

    EXPORTOBJECT.setOptions = function setOptions(optionsObject) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(optionsObject)) {
            if (key in options) {
                options[key] = value;
            } else {
                throw new Error(`No configuration option named ${key} available`);
            }
        }
        optionsMap.set(options);
    };

    EXPORTOBJECT.createMap = function createMap() {
        map.create();
    };

    EXPORTOBJECT.createConnections = function createConnections() {
        createConnections();
    };

    EXPORTOBJECT.feedData = function feedData() {
        feedData();
    };

    // Expose the public EXPORTOBJECT
    return EXPORTOBJECT;
}());

export default d3MapConn;