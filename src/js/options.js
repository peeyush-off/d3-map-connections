const options = {
    showPulsatingDestinationCircles: true,
    parentId: '#map-holder',
    geoJson: null,
    sourceImage: 'source-pin.png',
    sourceImageHeight: 20,
    sourceImageWidth: 20,
    sourceTooltipdata: 'ip',
    destinationImage: 'pointer.png',
    destinationImageWidth: 15,
    destinationImageHeight: 15,
    destinationTooltipdata: 'ip',
    showCountriesOnHover: true,
    addAnimationToPath: true,
    animationDuration: 5000,
    pulsatingDestinationCirclesColor: '#fd0017',
    pathColor: '#fb5757',
};

const internalStore = {
    countriesGroup: null,
    div: null,
    projection: null,
};

export default {
    options,
    internalStore,
};
