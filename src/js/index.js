import optionsMap from './options';
import map from './map';
import connections from './connections';

// import connections from './connections.js';
// import feedData from './feedData.js';

// eslint-disable-next-line no-unused-vars
const d3MapConn = (function exportFunction() {
    const EXPORTOBJECT = {};

    EXPORTOBJECT.setOptions = function setOptions(optionsObject) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(optionsObject)) {
            if (key in optionsMap.options) {
                if (typeof optionsMap.options[key] === 'object' && optionsMap.options[key] !== null) {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const [innerKey, innerValue] of Object.entries(optionsObject[key])) {
                        if (innerKey in optionsMap.options[key]) {
                            optionsMap.options[key][innerKey] = innerValue;
                        } else {
                            throw new Error(
                                `No configuration option named '${key}.${innerKey}' available`,
                            );
                        }
                    }
                } else {
                    optionsMap.options[key] = value;
                }
            } else {
                throw new Error(
                    `No configuration option named '${key}' available`,
                );
            }
        }
        // optionsMap.set(options);
        console.log(optionsMap.options);
    };

    EXPORTOBJECT.createMap = function createMap() {
        return map.create();
    };

    EXPORTOBJECT.createConnections = function createConnections(data) {
        connections.createConnections(data);
    };

    EXPORTOBJECT.removeConnections = function removeConnections() {
        connections.removeConnections();
    };

    // Expose the public EXPORTOBJECT
    return EXPORTOBJECT;
})();

window.d3MapConn = d3MapConn;
