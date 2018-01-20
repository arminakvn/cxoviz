(function() {
  var b_chart;
  var _data;
  var _z_data;
  var data_parsed;
  var s_w = 360;
  var s_h = 100;



  var state_of_viz = d3.map()
  state_of_viz.set('drag_location', 0);

function updateChart (xinvert,slid_item) {
  console.log("slid_item",slid_item)
  console.log('xinvert', xinvert)
  
  console.log(_data)
  console.log('_z_data',_z_data)    

  var _new_data = []
  var _supp_load = []
  // _data = _z_data
  console.log("----------------",(Math.round(xinvert)).toString().split('.')[0])
  if ((Math.round(xinvert)).toString().split('.')[0] == '0'){
    _supp_load = data_parsed[2]
  } else {
  _data.forEach( function(e) {
    // console.log("e",e)
          // get the increase from the lookup
        var lookup_change = slid_item.filter(function(d){

          return d["tick"] == (Math.round(xinvert)).toString();
        }) 
        console.log("lookup change",lookup_change)
        for (var k in lookup_change[0]){
          // console.log("k",k)
          // console.log("lookup_change",lookup_change[0][k], k)
          if (k == e["Year"]){
            console.log(lookup_change[0][k], "is change to apply to year ", k)
            if (lookup_change[0][k] == 0){
              console.log("oush it")
              _new_data.push(e)
            } else {
              var new_supply = e["Supply"] + (+lookup_change[0][k])*1000
              e["Supply"] = new_supply
              _new_data.push(e)
              
            }
          }
          // for year/item k, apply the change to the data!

        }
        // console.log("e[supp", e["Supply"])
        // for (i = 0; i < lookup_change.length; i++) {
        //   console.log("lookup_change",lookup_change[i])
        // }
          // e["Supply"] = 
        // }
  });
  _supp_load.push("Supply")
  _new_data.forEach(function(nd){
    _supp_load.push(nd["Supply"])
  })
}
  // console.log("_new_data",_new_data)
  console.log("data_parsed",data_parsed)
  
  // _data = _new_data
  console.log("_supp_load",_supp_load)
  // b_chart.unload("Supply")
  // console.log(b_chart.unload())
  // console.log(_supp_load)
  // b_chart.hide(["Supply"])
  // b_chart.show(["Supply"])
  b_chart.load({
    columns: [_supp_load],
    unload: ["Supply"]
  });
    // b_chart.show(["Supply"])

  // _data = _new_data
}
function initViz(data_parsed){

	
      b_chart = bb.generate({
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
              show: false
          }
      })
}



function initSlider(j_slid, slid_item){

  var slider_item =  d3.select("body").append("div");
  slider_item.attr('width', s_w + 40);
  slider_item.attr('height', s_h + 90);
  slider_item.selectAll("text").data(slid_item).enter().append("text").attr("x", 0)
    .attr("text-anchor", "middle").text(function(d){
    return d;
  })

	var svg = d3.select("body").append("svg");

	svg.attr('width', s_w);
	svg.attr('height', s_h);
	console.log(svg)
    margin = {right: 50, left: 50};

    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height");
    console.log(width, height)

    ticks_sl = [];
    j_slid.forEach(function(each){
      ticks_sl.push(+(each["tick"]))
    })
var x = d3.scaleLinear()
    .domain([ticks_sl[0],ticks_sl[ticks_sl.length - 1]])
    .rangeRound([0, width])
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
        .on("start.interrupt", function() { 
          slider.interrupt(); 
        })
        .on("start drag", function() { 
          console.log("x.invert(d3.event.x) ",x.invert(d3.event.x));
          // console.log(d3.event)
          // updateChart(x.invert(d3.event.x),j_slid);

          hue(x.invert(d3.event.x)); 
        })
        .on("end", function() { 
          console.log("x.invert(d3.event.x) ",x.invert(d3.event.x));
          console.log("state",state_of_viz.get("drag_location"))
          if (state_of_viz.get("drag_location")!=x.invert(d3.event.x)){

          // console.log(d3.event)
          updateChart(x.invert(d3.event.x),j_slid);
          state_of_viz.set('drag_location', x.invert(d3.event.x));
        }

          // hue(x.invert(d3.event.x)); 
        }));

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    // .tickPadding(0)
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
  .data(
    x.ticks(20)
  )
  .enter().append("text")
    .attr("x", x)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9)
    .attr("cx", x(0));

// slider.transition() // Gratuitous intro!
//     .duration(750)
//     .tween("hue", function() {
//       var i = d3.interpolate(0, 70);
//       return function(t) { 
//         hue(i(t)); 
//       };
//     });

function hue(h) {
  console.log(h);
  handle.attr("cx", x(h));
  // svg.style("background-color", d3.hsl(h, 0.8, 0.8));
}	


}


function dataDidLoad(error, j, j_slid, k) { //add topics if necessary
    // d3.select("#loader").transition().duration(600).style("opacity", 0).remove();
          base_color = d3.rgb(49, 130, 189);

     console.log("j_slid",j_slid);
     

       data_parsed = []
       _data = []
       _z_data = []
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
          // "Demand Change": +each.demand_change,
          // "Percent Shortfall": +each.pct_shortfall,
          "Supply": +each.supply,
          // "Supply Change": +each.supply_change,
          // "Target level": +each.target_level,
          // "US": +each.us_fo,
          date: new Date(each.year, 01, 01),
          "Year": each.year,
        }
        )
        
      })
      // parse k
      // k.forEach(function(each) {
      //   // if ((indexOf.call(scity, each.town) >= 0)) {
      //   _data2.push(
      //   {
      //     "2015": +each.2015,
      //     "2016": +each.2016,
      //     "Title": +each.title,
          
      //   }
      //   )
        
      // })

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


      _data2.forEach(function(mnt_data){
//        console.log(mnt_data)
        data2_point1.push(mnt_data["2015"]);
        data2_point2.push(mnt_data["2016"]);
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
// _z_data = data_parsed

initSlider(j_slid, ["Supply"]);
      initViz(data_parsed);

}







var q = d3.queue(
  ).defer(d3.csv, "https://arminakvn.github.io/cxoviz/graph1-state0.csv"
  // loading the slider table / data
  ).defer(d3.csv, "https://arminakvn.github.io/cxoviz/graph1-slider1-higher_ed.csv"
  ).defer(d3.csv, "https://arminakvn.github.io/cxoviz/chart2-data-security-jobs.csv");
q.await(dataDidLoad);



})();