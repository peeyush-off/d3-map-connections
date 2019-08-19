import optionsMap from "./options";
import map from "./map";
import connections from "./connections";

// import connections from './connections.js';
// import feedData from './feedData.js';

// eslint-disable-next-line no-unused-vars
const d3MapConn = (function exportFunction() {
    const EXPORTOBJECT = {};

    EXPORTOBJECT.setOptions = function setOptions(optionsObject) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(optionsObject)) {
            if (key in optionsMap.options) {
                optionsMap.options[key] = value;
            } else {
                throw new Error(
                    `No configuration option named ${key} available`
                );
            }
        }
        // optionsMap.set(options);
    };

    EXPORTOBJECT.createMap = function createMap() {
        map.create();
    };

    EXPORTOBJECT.createConnections = function createConnections() {
        connections.createConnections();
    };

    // Expose the public EXPORTOBJECT
    return EXPORTOBJECT;
})();

window.d3MapConn = d3MapConn;
