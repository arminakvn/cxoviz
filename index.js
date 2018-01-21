(function() {
 





function initSlider3 (_data, f ,slid_item) {
  const svg = d3.select('body').append('svg')
      .attr('height', 500)
      .attr('width', 500)
      
    const mySlider = slid3r()
      .width(200)
      .range([-10,10])
      .startPos(0)
      .label('Supply')
      .numTicks(21)
      .loc([50, 50])
      .onDrag((pos) => d3.select('#sliderValue').text(pos))
      .onDone(function(pos){
         var lookup_change = slid_item.filter(function(d){

          return d["tick"] == (pos).toString();
        }) ;

         for (i = 0; i < _data.length; i++){

      d = _data[i]
      console.log(d["Year"],lookup_change)
     console.log( lookup_change[0][d["Year"]])
     d["Supply"] = d["Supply"] + +lookup_change[0][d["Year"]]


  }


         updateData(pos,_data,lookup_change);
        });
  
    svg.append('g').call(mySlider);
}





function initViz3 (_data) {
  var svg = d3.select("#chart_1").append("svg");
  svg.attr('width', c_w);
  svg.attr('height', c_h);
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%d-%b-%y");
 x = d3.scaleTime()
    .rangeRound([0, width]);
 y = d3.scaleLinear()
    .rangeRound([height, 0]);




     xAxis = d3.axisBottom(x);

 yAxis = d3.axisLeft(y);





 area = d3.area()
    .x(function(d) { return x(d.date); })
    .y1(function(d) { return y(d["Supply"]); });

 line = d3.line()
    // .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d["Supply"]); })
    .curve(d3.curveCatmullRomOpen)
    // .curve(d3.curveStep)
    // .context(context);
// d3.tsv("data.tsv", function(d) {
//   d.date = parseTime(d.date);
//   d.close = +d.close;
//   return d;
// }, function(error, data) {
//   if (error) throw error;

  x.domain(d3.extent(_data, function(d) { return d.date; }));
  y.domain([d3.min(_data, function(d) { return d["Supply"]; }), d3.max(_data, function(d) { return d["Supply"]; })]);
  
g.append("path")
  .data([_data])
      .attr("class", "line")
      .attr("d", line);

  area.y0(y(d3.min(_data, function(d) { return d["Supply"]; })));

  // g.append("path")
  //     .datum(_data)
  //     .attr("fill", "steelblue")
  //     .attr("d", area);
  



  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("");
// });
}









function dataDidLoad(error, j, j_slid, k) { //add topics if necessary
    // d3.select("#loader").transition().duration(600).style("opacity", 0).remove();
          base_color = d3.rgb(49, 130, 189);

     console.log("j_slid",j_slid);
     

       var data_parsed = []
       var _data = []
       var  _z_data = []
       var x_data = []
       var data_point1 = []
       var data_point2 = []
       var data_point3 = []


       var data2_parsed = []
      var _data2 = []
       var x_data2 = []
       var data2_point1 = []
       var data2_point2 = []
       var data2_point3 = []
      
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
state_of_viz.set('_data', _data);










      initViz3(_data);


initSlider3(_data, ["Supply"],j_slid);
}


state_of_viz = d3.map()
  var b_chart;
  // var _data;
  var _z_data;
  var data_parsed;
  var s_w = 360;
  var s_h = 100;

  var c_w = 960;
  var c_h = 500;
  var x, y,xAxis,yAxis, line, area, _data;

  
  state_of_viz.set('drag_location', 0);




var q = d3.queue(
  ).defer(d3.csv, "https://arminakvn.github.io/cxoviz/graph1-state0.csv"
  // loading the slider table / data
  ).defer(d3.csv, "https://arminakvn.github.io/cxoviz/graph1-slider1-higher_ed.csv"
  ).defer(d3.csv, "https://arminakvn.github.io/cxoviz/chart2-data-security-jobs.csv");
q.await(dataDidLoad);




function updateData(pos,_data,lookup_change) {

  console.log(pos,lookup_change,_data)

  

 

console.log(lookup_change)

// let data = [];


   


console.log(_data)
    // Get the data again
    // d3.csv("data-alt.csv", function(error, data) {

      //   data.forEach(function(d) {
      //   d.date = parseDate(d.date);
      //   d.close = +d.close;
      // });

      // Scale the range of the data again 
      x.domain(d3.extent(_data, function(d) { return d.date; }));
      y.domain([0, d3.max(_data, function(d) { return d["Supply"]; })]);
      // console.log(x,y)
    // Select the section we want to apply our changes to
    var svg = d3.select("svg").transition();
    console.log(svg.select("path.line") )
    // Make the changes
        svg.select(".line") 
        .data(_data)
            // .attr("d", line(_data))
            .duration(70)
            .attr("d", line);
        svg.select(".x.axis") // change the x axis
            .duration(70)
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .duration(70)
            .call(yAxis);

    // });
}




})();