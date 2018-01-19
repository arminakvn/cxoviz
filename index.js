(function() {

console.log('index')		


function initViz(data_parsed){

	
      bb.generate({
      	 bindto: "#chart_1",
        size: {
          width: 840,
          height: 450
        },
       
        data: {
            x: 'Year',
            columns: data_parsed,
            type: 'area-spline',
//             labels: {
//               format:  function (v, id, i, j) { 
// //                  console.log("v,id,i,j",v,id,i,j)
//                 val = v * 2281;
//                 return d3.format('$, ')(v.toFixed(0)) //+ '%' + '(' + val.toFixed(0) + ')'
//               }
//             },
			// ,

            // axes: {
            //     "RTA Ridership": 'y',
            //     "Revenue Service Hours": 'y2'
            // }
          },
   
        // data: {
        //     json: data_parsed,
        //     keys: {
        //         value: ['ridership']
        //     },
        //     // groups: [['public_transit', 'walk', 'bicycle', 'other', 'car']],
        //     colors: {
        //     'public_transit': base_color,
        //     'walk': base_color.darker(1),
        //     'bicycle':base_color.darker(2),
        //     'other':base_color.darker(3),
        //     'car':base_color.darker(4)
        //     },
        //     type: 'line'
        //   },
           axis: {
 
                 x: {
                    type: 'category',
                      categories: data_parsed.map(function(d){
//                        console.log(d["Year"])
                        return d["Year"];
                      }),
                  // height: 100
              },
              y: {
                  label: {
                    text: 'Demand',
                     position: 'outer-middle'
                  },
                  // max: 35000000,
                  tick: {
                    format: d3.format(",")
                    //or format: function (d) { return '$' + d; }
                  }
                  // max: 1

              },
              y2: {
                show: true,
                // max: 1400000,
                // min: 0,
                tick: {
                    format: d3.format(",")
                }, 
                label: {
                    text: 'Supply',
                    // position: 'outer-middle'
                  },

              }
          },
          subchart: {
                show: false
            },
          // regions: [
          //   {axis: 'y', start: 0, end: total_mean , class: 'region-1-3'},
          // //   {axis: 'x', start: 2.5, end:5.5 , class: 'region-3-5'}
          // ],
          legend: {
              show: true
          }
      })
}

function initSlider(){
	var svg = d3.select("body").append("svg");
	svg.attr('width', 360);
	svg.attr('height', 100);
	console.log(svg)
    margin = {right: 50, left: 50};

    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height");
    console.log(width, height)

var x = d3.scaleLinear()
    .domain([0, 180])
    .range([0, width])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { hue(x.invert(d3.event.x)); }));

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
  .data(x.ticks(10))
  .enter().append("text")
    .attr("x", x)
    .attr("text-anchor", "middle")
    .text(function(d) { return d + "°"; });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

slider.transition() // Gratuitous intro!
    .duration(750)
    .tween("hue", function() {
      var i = d3.interpolate(0, 70);
      return function(t) { hue(i(t)); };
    });

function hue(h) {
  handle.attr("cx", x(h));
  svg.style("background-color", d3.hsl(h, 0.8, 0.8));
}	


}


function dataDidLoad(error, j,k) { //add topics if necessary
    // d3.select("#loader").transition().duration(600).style("opacity", 0).remove();
          base_color = d3.rgb(49, 130, 189);
     console.log("k data",k);
       data_parsed = []
       _data = []
       x_data = []
       data_point1 = []
       data_point2 = []
       data_point3 = []


       data2_parsed = []
       _data2 = []
       x_data2 = []
       data2_point1 = []
       data2_point2 = []
       data2_point3 = []
      
      // parse j 
      j.forEach(function(each) {
        // if ((indexOf.call(scity, each.town) >= 0)) {
        _data.push(
        {
          "Demand": +each.demand,
          "Demand Change": +each.demand_change,
          "Percent Shortfall": +each.pct_shortfall,
          "Supply": +each.supply,
          "Supply Change": +each.supply_change,
          // "Target level": +each.target_level,
          // "US": +each.us_fo,
          date: new Date(each.year, 01, 01),
          "Year": each.year,
        }
        )
        
      })
      // parse k
      k.forEach(function(each) {
        // if ((indexOf.call(scity, each.town) >= 0)) {
        _data2.push(
        {
          "2015": +each.2015,
          "2016": +each.2016,
          "Title": +each.title,
          
        }
        )
        
      })

      console.log(_data)
        var _nestedData = d3.nest()
          .key(function(d){return d["Year"]})
          .entries(_data);


      // console.log(_nestedData)

      _data.forEach(function(mnt_data){
//        console.log(mnt_data)
        data_point1.push(mnt_data["Demand"]);
        data_point2.push(mnt_data["Supply"]);
        // data_point3.push(mnt_data["Percent Shortfall"]);
        x_data.push(mnt_data["Year"]);
        
      })
 		data_point1.unshift("Demand");
      data_point2.unshift("Supply");
            // data_point3.unshift("Percent Shortfall");

      data_parsed.push(
          data_point1
          );
      data_parsed.push(
          data_point2
        );
      // data_parsed.push(
      //     data_point3
      //   );
      x_data.unshift('Year');
      data_parsed.unshift(x_data);


      console.log("data_parsed",data_parsed)

      initViz(data_parsed);

}







var q = d3.queue(
  ).defer(d3.csv, "graph1-state0.csv"
  ).defer(d3.csv, "chart2-data-security-jobs.csv");
q.await(dataDidLoad);

initSlider();

})();