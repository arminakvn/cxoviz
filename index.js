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
    .onDrag(
      function(pos){
        var new_data = []
        // var lookup_change = slid_item.filter(function(d){
        //   return d["tick"] == (pos).toString();
        // }) ;
        // for (i = 0; i < _data.length; i++){
        //   d = _data[i]
        //   var new_supl = d["Supply"] + +lookup_change[0][d["Year"]]*1000
        //   var d_2 = {"Demand": d["Demand"], "Year": d["Year"], "date": d["date"], "Supply": new_supl}
        //   new_data.push(d_2)
        // }
        // updateData(pos,new_data,lookup_change);
      }
      )
    .onDone(function(pos){
      var new_data = []
      var lookup_change = slid_item.filter(function(d){
        return d["tick"] == (pos).toString();
      }) ;
      for (i = 0; i < _data.length; i++){
        d = _data[i]
        console.log(d["Year"],lookup_change)
        console.log( lookup_change[0][d["Year"]])
        var new_supl = d["Supply"] + +lookup_change[0][d["Year"]]*1000
        var d_2 = {"Demand": d["Demand"], "Year": d["Year"], "date": d["date"], "Supply": new_supl}
        new_data.push(d_2)
      }
      updateData(pos,new_data,lookup_change);
    });
    svg.append('g').call(mySlider);
  }
  function initViz3 (_data,j_slid) {
    x.domain(d3.extent(_data, function(d) { return d.date; }));
    y.domain([0, d3.max(_data, function(d) { return d["Supply"]; })+2500000]);





  g.append("path")
    .data([_data])
    .attr("class", "demandLine")
    .attr("d", demandLine);
    demandArea.y0(y(0));
    g.append("path")
    .data([_data])
    .attr("fill", "red")
    .attr("class", "demandArea")
    .attr("d", demandArea);
    g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);




    g.append("path")
    .data([_data])
    .attr("class", "line")
    .attr("d", supplyLine);
    supplyArea.y0(y(0));
    g.append("path")
    .data([_data])
    .attr("fill", "steelblue")
    .attr("class", "area")
    .attr("d", supplyArea);
    g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
    g.append("g")
    .call(yAxis)
    .attr("class","yaxistext")
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("");




    
    



    initSlider3(_data, ["Supply"],j_slid);
  }
  function dataDidLoad(error, j, j_slid, k) { //add topics if necessary
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
    j.forEach(function(each) {
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

    _data.forEach(function(mnt_data){
      data_point1.push(mnt_data["Demand"]);
      data_point2.push(mnt_data["Supply"]);
      x_data.push(mnt_data["Year"]);
    })
    _data2.forEach(function(mnt_data){
      data2_point1.push(mnt_data["2015"]);
      data2_point2.push(mnt_data["2016"]);
      x_data.push(mnt_data["Year"]);
    })
    data_point1.unshift("Demand");
    data_point2.unshift("Supply");
    data_parsed.push(
      data_point1
      );
    data_parsed.push(
      data_point2
      );
    x_data.unshift('Year');
    data_parsed.unshift(x_data);
    state_of_viz.set('_data', _data);
    initViz3(_data,j_slid);
  }
  state_of_viz = d3.map()
  var b_chart;
  var _z_data;
  var data_parsed;
  var s_w = 360;
  var s_h = 100;
  var c_w = 960;
  var c_h = 500;
  state_of_viz.set('drag_location', 0);

  var svg = d3.select("#chart_1").append("svg");

  svg.attr('width', c_w);
  svg.attr('height', c_h);

  var margin = {top: 20, right: 20, bottom: 30, left: 150},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseTime = d3.timeParse("%d-%b-%y");

  var x = d3.scaleTime()
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);
  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);

  var supplyArea = d3.area()
    .x(function(d) { return x(d.date); })
    .y1(function(d) { return y(d["Supply"]); });

  var demandLine = d3.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d["Demand"]); })


  var demandArea = d3.area()
    .x(function(d) { return x(d.date); })
    .y1(function(d) { return y(d["Demand"]); });

  var supplyLine = d3.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d["Supply"]); })

  var q = d3.queue(
    ).defer(d3.csv, "https://arminakvn.github.io/cxoviztemp/graph1-state0.csv"
    ).defer(d3.csv, "https://arminakvn.github.io/cxoviztemp/graph1-slider1-higher_edit.2018-0120.csv"
    ).defer(d3.csv, "https://arminakvn.github.io/cxoviztemp/chart2-data-security-jobs.csv");
    q.await(dataDidLoad);
  function updateData(pos,new_data,lookup_change) {
        // Scale the range of the data again 
        // x.domain(d3.extent(new_data, function(d) { return d.date; }));
        // y.domain([0, d3.max(new_data, function(d) { return d["Supply"]; })]);
        // var xAxis = d3.axisBottom(x);
        //   var yAxis = d3.axisLeft(y);
      // Make the changes
    g.select("path.line") 
      .datum(new_data)
          // .attr("d", line(_data))
          // .duration(70)
      .attr("d", supplyLine(new_data));
      
      g.select("path.area") 
      // .datum(new_data)
      // .attr("d", line(_data))
      // .duration(70)
      // .attr("d", supplyArea(new_data));
    }
})();