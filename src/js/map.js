import optionsMap from './options';

function create() {
    const container = optionsMap.options.parentId;

    const w = $(container).width();
    const h = $(container).height();

    // variables for catching min and max zoom factors
    let minZoom;
    let maxZoom;

    // Define map projection
    const projection = d3
        .geoEquirectangular()
        .center([0, 0])
        .scale([w / (2 * Math.PI)]) // scale to fit group width
        .translate([w / 2, h / 2]); // ensure centred in group

    const div = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // Define map path
    const path = d3.geoPath().projection(projection);

    // Create function to apply zoom to countriesGroup
    function zoomed() {
        const t = d3.event.transform;
        // eslint-disable-next-line no-use-before-define
        countriesGroup.attr(
            'transform',
            `translate(${[t.x, t.y]})scale(${t.k})`,
        );
    }

    // Create an SVG
    const svg = d3
        .select('#map-holder')
        .append('svg')
        // set to the same size as the "map-holder" div
        .attr('width', $('#map-holder').width())
        .attr('height', $('#map-holder').height());

    let countriesGroup = svg.append('g').attr('id', 'map');
    // let arcGroup = countriesGroup.append('g');
    // let imageGroupDestination = countriesGroup.append('g');
    // let highlightCircle = countriesGroup.append('g');
    // let imageGroupSource = countriesGroup.append('g');

    // Define map zoom behaviour
    const zoom = d3.zoom().on('zoom', zoomed);

    // Function that calculates zoom/pan limits and sets zoom to default value
    function initiateZoom() {
        // Define a "minzoom" whereby the "Countries" is as
        // small possible without leaving white space at top/bottom or sides
        minZoom = Math.max(
            $('#map-holder').width() / w,
            $('#map-holder').height() / h,
        );
        // set max zoom to a suitable factor of this value
        maxZoom = 20 * minZoom;
        // set extent of zoom to chosen values
        // set translate extent so that panning can't cause map to move out of viewport
        zoom.scaleExtent([minZoom, maxZoom]).translateExtent([[0, 0], [w, h]]);
        // define X and Y offset for centre of map to be shown in centre of holder
        const midX = ($('#map-holder').width() - minZoom * w) / 2;
        const midY = ($('#map-holder').height() - minZoom * h) / 2;
        // change zoom transform to min zoom and centre offsets
        svg.call(
            zoom.transform,
            d3.zoomIdentity.translate(midX, midY).scale(minZoom),
        );
    }

    // On window resize
    // eslint-disable-next-line func-names
    $(window).resize(() => {
        // Resize SVG
        svg.attr('width', $('#map-holder').width()).attr(
            'height',
            $('#map-holder').height(),
        );
        initiateZoom();
    });

    function init() {
        setTimeout(() => {
            createMap(optionsMap.options.geoJson);
        }, 100);
    }

    init();

    /**
     * This function creates the map on the page.
     * @param {array} json JSONs read.
     */
    function createMap(json) {
        countriesGroup
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', w)
            .attr('height', h);

        countriesGroup
            .selectAll('path')
            .data(json.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('id', d => `country${d.properties.iso_a3}`)
            .attr('class', 'country')

            .on('mouseover', (d) => {
                d3.select(`#countryLabel${d.properties.iso_a3}`).style(
                    'display',
                    'block',
                );
            })
            .on('mouseout', (d) => {
                d3.select(`#countryLabel${d.properties.iso_a3}`).style(
                    'display',
                    'none',
                );
            });

        const countryLabels = countriesGroup
            .selectAll('g')
            .data(json.features)
            .enter()
            .append('g')
            .attr('class', 'countryLabel')
            .attr('id', d => `countryLabel${d.properties.iso_a3}`)
            .attr(
                'transform',
                d => `translate(${path.centroid(d)[0]},${path.centroid(d)[1]})`,
            )
            .on('mouseover', function () {
                d3.select(this).style('display', 'block');
            })
            .on('mouseout', function () {
                d3.select(this).style('display', 'none');
            });

        countryLabels
            .append('text')
            .attr('class', 'countryName')
            .style('text-anchor', 'middle')
            .attr('dx', 0)
            .attr('dy', 0)
            .text(d => d.properties.name);

        initiateZoom();
    }
}

export default { create };
