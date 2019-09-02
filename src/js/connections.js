/* eslint-disable no-plusplus */
import optionMap from './options';

let arcGroup;
let imageGroupDestination;
let highlightCircle;
let imageGroupSource;
let destination;
let source;
let sourceMatchMap;
let destinationMatchMap;
let alreadyHighlighted;
let iterationCount;

function removeConnections() {
    // Remove all existing elments on the map
    arcGroup.remove();
    imageGroupSource.remove();
    imageGroupDestination.remove();
    highlightCircle.remove();
    arcGroup = null;
    imageGroupSource = null;
    imageGroupDestination = null;
    highlightCircle = null;
}

/**
 * This function will be used to draw elemets like
 * path, pointers and pulsating circles on map.
 * @param {array} data The data that will used to create elements.
 */
function createConnections(data) {
    const {
        div,
        projection,
        countriesGroup,
    } = optionMap.internalStore;

    if (!arcGroup) {
        arcGroup = countriesGroup.append('g');
        imageGroupDestination = countriesGroup.append('g');
        highlightCircle = countriesGroup.append('g');
        imageGroupSource = countriesGroup.append('g');

        // Array that will be used  to draw destination pointer
        destination = [];

        // Array that will be used  to draw source pointer
        source = [];

        // Map to check if a source already exists
        sourceMatchMap = new Map();

        // Map to check if a destination already exists
        destinationMatchMap = new Map();

        alreadyHighlighted = {};
        iterationCount = 0;
    }
    iterationCount++;

    data.map((val) => {
        // Update source and destination array according to data
        if (!sourceMatchMap.has(val.source.lat + val.source.lon)) {
            source.push(val.source);
            sourceMatchMap.set(val.source.lat + val.source.lon, true);
        }
        if (
            !destinationMatchMap.has(val.destination.lat + val.destination.lon)
        ) {
            destination.push(val.destination);
            destinationMatchMap.set(
                val.destination.lat + val.destination.lon,
                true,
            );
        }
        return null;
    });

    // Add source pointers on the map
    imageGroupSource
        .selectAll('image')
        .data([0])
        .data(source)
        .enter()
        .append('image')
        .attr('class', 'pointer')
        .attr('xlink:href', optionMap.options.sourceImage)
        .attr('width', optionMap.options.sourceImageWidth)
        .attr('height', optionMap.options.sourceImageHeight)
        .on('mouseover', function (d, i) {
            if (optionMap.options.allowIconClick) {
                d3.select(this).style('cursor', 'pointer');
            }
            div.transition().style('opacity', 0.9);
            div.html(
                `
            <div style = "background-color: black;color: white; padding: 10px;">${
                d[optionMap.options.sourceTooltipdata]
                }</div>
            `,
            )
                .style('left', `${d3.event.pageX + optionMap.options.sourceImageXPos}px`)
                .style('top', `${d3.event.pageY + optionMap.options.sourceImageYPos}px`);
        })
        .on('mouseout', function () {
            if (optionMap.options.allowIconClick) {
                d3.select(this).style('cursor', 'default');
            }
            div.transition()
                .duration(500)
                .style('opacity', 0);
        })
        .on('click', (d) => {
            if (optionMap.options.allowIconClick) {
                const evt = new CustomEvent('sourceIconClick', { detail: d });
                window.dispatchEvent(evt);
            }
        })
        .attr('x', d => projection([d.lon, d.lat])[0] - 10)
        .attr('y', d => projection([d.lon, d.lat])[1] - 18);

    // Add destination pointer on the map
    imageGroupDestination
        .selectAll('image')
        .data([0])
        .data(destination)
        .enter()
        .append('image')
        .attr('class', 'pointer')
        .attr('xlink:href', optionMap.options.destinationImage)
        .attr('width', optionMap.options.destinationImageWidth)
        .attr('height', optionMap.options.destinationImageHeight)
        .attr('x', d => projection([d.lon, d.lat])[0] - 7)
        .attr('y', d => projection([d.lon, d.lat])[1] - 15)
        .on('mouseover', function (d) {
            if (optionMap.options.allowIconClick) {
                d3.select(this).style('cursor', 'pointer');
            }
            div.transition().style('opacity', 0.9);
            div.html(
                `
            <div style = "background-color: black; color: white; padding: 10px;">${
                d[optionMap.options.destinationTooltipdata]
                }</div>
            `,
            )
                .style('left', `${d3.event.pageX + optionMap.options.destinationImageXPos}px`)
                .style('top', `${d3.event.pageY + optionMap.options.destinationImageYPos}px`);
        })
        .on('mouseout', function () {
            if (optionMap.options.allowIconClick) {
                d3.select(this).style('cursor', 'default');
            }
            div.transition()
                .duration(500)
                .style('opacity', 0);
        })
        .on('click', (d) => {
            if (optionMap.options.allowIconClick) {
                const evt = new CustomEvent('destinationIconClick', { detail: d });
                window.dispatchEvent(evt);
            }
        })
        .style('visibility', 'hidden')
        .transition()
        .style('visibility', 'visible')
        .delay(optionMap.options.addAnimationToPath ? optionMap.options.animationDuration : 0);

    // line that will be used as a prototype for all paths
    const line = d3
        .line()
        .x(d => projection([d.lon, d.lat])[0])
        .y(d => projection([d.lon, d.lat])[1])
        .curve(curve);

    // Add line to the map
    arcGroup
        .selectAll(null)
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'line')
        .attr('id', (d, i) => `line${iterationCount}-${i}`)
        .datum(d => [d.source, d.destination])
        .attr('d', line)
        .style('fill', 'none')
        .style('stroke', optionMap.options.pathColor)
        .style('stroke-width', (d) => {
            if (d[0].count < 10) return 1.5;
            if (d[0].count < 50) return 2;
            return 2.5;
        })
        .attr('pointer-events', 'visibleStroke')
        .on('click', (d) => {
            if (optionMap.options.allowEdgeClick) {
                const evt = new CustomEvent('pathClick', { detail: d });
                window.dispatchEvent(evt);
            }
        })
        .on('mouseover', (d, i) => {
            if (optionMap.options.showCountriesOnHover) {
                d3.select(`#countryLabel${data[i].source.iso_a3}`).style(
                    'display',
                    'block',
                );
                d3.select(`#countryLabel${data[i].destination.iso_a3}`).style(
                    'display',
                    'block',
                );
            }
        })
        .on('mouseout', (d, i) => {
            if (optionMap.options.showCountriesOnHover) {
                d3.select(`#countryLabel${data[i].source.iso_a3}`).style(
                    'display',
                    'none',
                );
                d3.select(`#countryLabel${data[i].destination.iso_a3}`).style(
                    'display',
                    'none',
                );
            }
        });

    if (optionMap.options.addAnimationToPath) {
        // Add animation to all paths drawn on map

        d3.selectAll('.line').each((d, i) => {
            if (d3.select(`#line${iterationCount}-${i}`).node()) {
                const totalLength = d3
                    .select(`#line${iterationCount}-${i}`)
                    .node()
                    .getTotalLength();
                d3.selectAll(`#line${iterationCount}-${i}`)
                    .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
                    .attr('stroke-dashoffset', totalLength)
                    .transition()
                    .duration(optionMap.options.addAnimationToPath ? optionMap.options.animationDuration : 0)
                    .delay(100 * i)
                    .attr('stroke-dashoffset', 0)
                    .style('stroke-width', 3);
            }
        });
    }

    if (optionMap.options.showPulsatingDestinationCircles) {
        // Destination pulstaing circles
        const circles = highlightCircle
            .selectAll('highlightCircles')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', (d) => {
                if (
                    alreadyHighlighted[`${d.destination.lon}${d.destination.lat}`]
                ) {
                    alreadyHighlighted[
                        `${d.destination.lon}${d.destination.lat}`
                    ].count += d.count;
                    alreadyHighlighted[`${d.destination.lon}${d.destination.lat}`]
                        .connections++;
                } else {
                    alreadyHighlighted[
                        `${d.destination.lon}${d.destination.lat}`
                    ] = {};
                    alreadyHighlighted[
                        `${d.destination.lon}${d.destination.lat}`
                    ].count = d.count;
                    alreadyHighlighted[
                        `${d.destination.lon}${d.destination.lat}`
                    ].connections = 1;
                }
                return projection([d.destination.lon, d.destination.lat])[0];
            })
            .attr('cy', d => projection([d.destination.lon, d.destination.lat])[1])
            .attr('r', (d) => {
                if (
                    alreadyHighlighted[`${d.destination.lon}${d.destination.lat}`]
                        .count < 10
                ) {
                    return 5;
                }
                if (
                    alreadyHighlighted[`${d.destination.lon}${d.destination.lat}`]
                        .count < 50
                ) {
                    return 7;
                }
                return 10;
            })
            .attr('fill', optionMap.options.pulsatingDestinationCirclesColor)
            .attr('fill-opacity', 0.5)
            .on('mouseover', function (d, i) {
                if (optionMap.options.allowCircleClick) {
                    d3.select(this).style('cursor', 'pointer');
                }
                div.transition().style('opacity', 0.9);
                div.html(
                    `
            <div style = "background-color: black; color: white; padding: 10px;">${
                    d.destination[optionMap.options.destinationTooltipdata]
                    }</div>
            `,
                )
                    .style('left', `${d3.event.pageX}px`)
                    .style('top', `${d3.event.pageY - 28}px`);
            })
            .on('mouseout', function (d, i) {
                if (optionMap.options.allowCircleClick) {
                    d3.select(this).style('cursor', 'default');
                }
                div.transition()
                    .duration(500)
                    .style('opacity', 0);
            })
            .on('click', (d) => {
                if (optionMap.options.allowCircleClick) {
                    const evt = new CustomEvent('circleClick', { detail: d });
                    window.dispatchEvent(evt);
                }
            })
            .attr('fill-opacity', 0)
            .transition()
            .attr('fill-opacity', 0.5)
            .delay(optionMap.options.addAnimationToPath ? optionMap.options.animationDuration : 0);

        setTimeout(() => {
            circles.each(pulsate);
        }, 5500);
    }

    /**
     * Function for pulsating the destination circles.
     */
    function pulsate() {
        // console.log('Hell')
        let pulser = d3.select(this);
        // d3.timer(function() {
        //   console.log('Hell');
        //   pulser.style("visibility", "visible");
        // }, 5000);

        pulser = pulser
            .transition()
            .duration(1500)
            .style('visibility', 'visible')
            .attr('r', function () {
                if (this.__data__.count < 10) {
                    return 5;
                }
                if (this.__data__.count < 50) {
                    return 7;
                }
                return 10;
            })
            .attr('stroke-width', 50)
            .transition()
            .duration(1500)
            .attr('r', function () {
                if (this.__data__.count < 10) {
                    return 5 * 1.5;
                }
                if (this.__data__.count < 50) {
                    return 7 * 1.5;
                }
                return 10 * 1.5;
            })
            .attr('stroke-width', 10)
            .on('end', pulsate);
    }

    /**
 * This function defines the curve that will be used in creating the paths on the map.
 */
    function curve(context) {
        const custom = d3.curveLinear(context);
        custom._context = context;
        custom.point = function (x, y) {
            (x = +x), (y = +y);
            switch (this._point) {
                case 0:
                    this._point = 1;
                    this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                    this.x0 = x;
                    this.y0 = y;
                    break;
                case 1:
                    this._point = 2;
                default:
                    let x1 = this.x0 * 0.5 + x * 0.5;
                    let y1 = this.y0 * 0.5 + y * 0.5;
                    const m = 1 / (y1 - y) / (x1 - x);
                    const r = -100; // offset of mid point.
                    const k = r / Math.sqrt(1 + m * m);
                    if (m == Infinity) {
                        y1 += r;
                    } else {
                        y1 += k;
                        x1 += m * k;
                    }
                    this._context.quadraticCurveTo(x1, y1, x, y);
                    this.x0 = x;
                    this.y0 = y;
                    break;
            }
        };
        return custom;
    }
}

export default {
    createConnections,
    removeConnections,
};
