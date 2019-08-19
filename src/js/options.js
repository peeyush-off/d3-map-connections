let options = {
    showPulsatingDestinationCircles: true,
    parentId: '#map-holder',
    geoJson: null,
};

function set(optionsObj) {
    options = optionsObj;
}

export default {
    set,
    options,
};