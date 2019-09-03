const options = {
    extra: {
        showPulsatingDestinationCircles: true,
        showCountriesOnHover: true,
        pulsatingDestinationCirclesColor: '#fd0017',
        pathColor: '#fb5757',
        addAnimationToPath: true,
        animationDuration: 5000,
    },
    parentId: '#map-holder',
    geoJson: null,
    source: {
        imageXPos: 0,
        imageYPos: -28,
        imageWidth: 20,
        imageHeight: 20,
        location: `${__dirname}dist/img/source-pin.png`,
        tooltipdata: 'ip',
    },
    destination: {
        imageXPos: 0,
        imageYPos: -28,
        imageHeight: 15,
        imageWidth: 15,
        location: `${__dirname}dist/img/pointer.png`,
        tooltipdata: 'ip',
    },
    event: {
        edgeClick: false,
        circleClick: false,
        iconClick: true,
    }
    
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
