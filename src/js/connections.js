import optionsMap from './options';

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
        .style("visibility", "visible")
        .attr("r", function() {
        if (this.__data__.count < 10) {
            return 5;
        } else if (this.__data__.count < 50) {
            return 7;
        } else {
            return 10;
        }
        })
        .attr("stroke-width", 50)
        .transition()
        .duration(1500)
        .attr("r", function() {
        if (this.__data__.count < 10) {
            return 5 * 1.5;
        } else if (this.__data__.count < 50) {
            return 7 * 1.5;
        } else {
            return 10 * 1.5;
        }
        })
        .attr("stroke-width", 10)
        .on("end", pulsate);
    }
}

  /**
   * This function will be used to draw elemets like
   * path, pointers and pulsating circles on map.
   * @param {array} data The data that will used to create elements.
   */
  function createMapElements(data) {
    // Array that will be used  to draw destination pointer
    let destination = [];

    // Array that will be used  to draw source pointer
    let source = [];

    // Map to check if a source already exists
    let sourceMatchMap = new Map();

    // Map to check if a destination already exists
    let destinationMatchMap = new Map();

    data.map(val => {
      // Update source and destination array according to data
      if (!sourceMatchMap.has(val.source.lat + val.source.lon)) {
        source.push(val.source);
        sourceMatchMap.set(val.source.lat + val.source.lon, true);
      }
      if (!destinationMatchMap.has(val.destination.lat + val.destination.lon)) {
        destination.push(val.destination);
        destinationMatchMap.set(
          val.destination.lat + val.destination.lon,
          true
        );
      }
    });

    // Add source pointers on the map
    imageGroupSource
      .selectAll("image")
      .data([0])
      .data(source)
      .enter()
      .append("image")
      .attr("class", "pointer")
      .attr("xlink:href", "source-pin.png")
      .attr("width", "20")
      .attr("height", "20")
      .on("mouseover", function(d, i) {
        d3.select(this).style("cursor", "pointer");
        div.transition().style("opacity", 0.9);
        div
          .html(
            `
            <div style = "background-color: black;color: white; padding: 10px;">${
              d.ip
            }</div>
            `
          )
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function(d, i) {
        d3.select(this).style("cursor", "default");
        div
          .transition()
          .duration(500)
          .style("opacity", 0);
      })
      .attr("x", function(d) {
        return projection([d.lon, d.lat])[0] - 10;
      })
      .attr("y", function(d) {
        return projection([d.lon, d.lat])[1] - 18;
      })
      .on("click", function(d, i) {
        self.dataInTable = [];
        console.log("iso: ", NodeMap[d.ip].my.country_iso_code);

        self.tableHeading = NodeMap[d.ip].my.country_iso_code + " 1";
        self.tableHeadingCountry = NodeMap[d.ip].my.country_name;
        self.countryCode = NodeMap[d.ip].my.country_iso_code;
        self.tableHeadingIP = d.ip;
        insertRow(d.ip);
        openNav();
      });

    // Add destination pointer on the map
    imageGroupDestination
      .selectAll("image")
      .data([0])
      .data(destination)
      .enter()
      .append("image")
      .attr("class", "pointer")
      .attr("xlink:href", "pointer.png")
      .attr("width", "15")
      .attr("height", "15")
      .attr("x", function(d) {
        return projection([d.lon, d.lat])[0] - 7;
      })
      .attr("y", function(d) {
        return projection([d.lon, d.lat])[1] - 15;
      })
      .on("mouseover", function(d, i) {
        d3.select(this).style("cursor", "pointer");
        div.transition().style("opacity", 0.9);
        div
          .html(
            `
            <div style = "background-color: black; color: white; padding: 10px;">${
              d.ip
            }</div>
            `
          )
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function(d, i) {
        d3.select(this).style("cursor", "default");
        div
          .transition()
          .duration(500)
          .style("opacity", 0);
      })
      .on("click", function(d, i) {
        self.dataInTable = [];

        console.log("iso: ", NodeMap[d.ip].my.country_iso_code);
        self.tableHeading = NodeMap[d.ip].my.country_iso_code + " 1";
        self.tableHeadingCountry = NodeMap[d.ip].my.country_name;
        self.countryCode = NodeMap[d.ip].my.country_iso_code;
        self.tableHeadingIP = d.ip;
        insertRow(d.ip);
        openNav();
      })
      .style("visibility", "hidden")
      .transition()
      .style("visibility", "visible")
      .delay(5000);

    // line that will be used as a prototype for all paths
    let line = d3
      .line()
      .x(function(d) {
        return projection([d.lon, d.lat])[0];
      })
      .y(function(d) {
        return projection([d.lon, d.lat])[1];
      })
      .curve(curve);

    // Add line to the map
    arcGroup
      .selectAll(null)
      .data(data)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("id", function(d, i) {
        return "line" + i;
      })
      .datum(function(d) {
        return [d.source, d.destination];
      })
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#fff787")
      .style("stroke-width", function(d) {
        if (d[0].count < 10) return 1.5;
        else if (d[0].count < 50) return 2;
        else return 2.5;
      })
      .attr("pointer-events", "visibleStroke")
      .on("mouseover", function(d, i) {
        d3.select("#countryLabel" + data[i].source.iso_a3).style(
          "display",
          "block"
        );
        d3.select("#countryLabel" + data[i].destination.iso_a3).style(
          "display",
          "block"
        );
      })
      .on("mouseout", function(d, i) {
        d3.select("#countryLabel" + data[i].source.iso_a3).style(
          "display",
          "none"
        );
        d3.select("#countryLabel" + data[i].destination.iso_a3).style(
          "display",
          "none"
        );
      });

    // Add animation to all paths drawn on map
    d3.selectAll(".line").each(function(d, i) {
      let totalLength = d3
        .select("#line" + i)
        .node()
        .getTotalLength();
      d3.selectAll("#line" + i)
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(5000)
        .delay(100 * i)
        .attr("stroke-dashoffset", 0)
        .style("stroke-width", 3);
    });

    let alreadyHighlighted = {};

    // Destination pulstaing circles
    let circles = highlightCircle
      .selectAll("highlightCircles")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        if (alreadyHighlighted[d.destination.lon + "" + d.destination.lat]) {
          alreadyHighlighted[
            d.destination.lon + "" + d.destination.lat
          ].count += d.count;
          alreadyHighlighted[d.destination.lon + "" + d.destination.lat]
            .connections++;
        } else {
          alreadyHighlighted[d.destination.lon + "" + d.destination.lat] = {};
          alreadyHighlighted[d.destination.lon + "" + d.destination.lat].count =
            d.count;
          alreadyHighlighted[
            d.destination.lon + "" + d.destination.lat
          ].connections = 1;
        }
        return projection([d.destination.lon, d.destination.lat])[0];
      })
      .attr("cy", function(d) {
        return projection([d.destination.lon, d.destination.lat])[1];
      })
      .attr("r", function(d) {
        if (
          alreadyHighlighted[d.destination.lon + "" + d.destination.lat].count <
          10
        ) {
          return 5;
        } else if (
          alreadyHighlighted[d.destination.lon + "" + d.destination.lat].count <
          50
        ) {
          return 7;
        } else {
          return 10;
        }
      })
      .attr("fill", "#fd0017")
      .attr("fill-opacity", 0.5)
      .on("mouseover", function(d, i) {
        d3.select(this).style("cursor", "pointer");
        div.transition().style("opacity", 0.9);
        div
          .html(
            `
              <div style = "background-color: black; color: white; padding: 10px;">${
                d.destination.ip
              }</div>
              `
          )
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function(d, i) {
        d3.select(this).style("cursor", "default");
        div
          .transition()
          .duration(500)
          .style("opacity", 0);
      })
      .on("click", function(d, i) {
        self.dataInTable = [];

        console.log("code: ", NodeMap[d.destination.ip].my.country_iso_code);
        self.tableHeading =
          NodeMap[d.destination.ip].my.country_iso_code + " 1";
        self.tableHeadingIP = d.destination.ip;
        self.countryCode = NodeMap[d.destination.ip].my.country_iso_code;
        self.tableHeadingCountry = NodeMap[d.destination.ip].my.country_name;
        insertRow(d.destination.ip);
        openNav();
      })
      .attr("fill-opacity", 0)
      .transition()
      .attr("fill-opacity", 0.5)
      .delay(5000);

    setTimeout(function() {
      circles.each(pulsate);
    }, 5500);

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
        .style("visibility", "visible")
        .attr("r", function() {
          if (this.__data__.count < 10) {
            return 5;
          } else if (this.__data__.count < 50) {
            return 7;
          } else {
            return 10;
          }
        })
        .attr("stroke-width", 50)
        .transition()
        .duration(1500)
        .attr("r", function() {
          if (this.__data__.count < 10) {
            return 5 * 1.5;
          } else if (this.__data__.count < 50) {
            return 7 * 1.5;
          } else {
            return 10 * 1.5;
          }
        })
        .attr("stroke-width", 10)
        .on("end", pulsate);
    }
  }