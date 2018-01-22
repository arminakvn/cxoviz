(function() {
  function initSlider3 (_data, f ,slid_item) {
    const svg = d3.select('#chart_1').append('svg')
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
        var d_2 = {"Demand": d["Demand"], "Year": d["Year"], "date": d["date"], "Supply": new_supl, new_supl, "Old Supply": d["Supply"]}
        new_data.push(d_2)
      }
      updateData(pos,new_data,lookup_change);
    });
    svg.append('g').call(mySlider);
  }

function initViz2 (d) {
  bb.generate({
         bindto: "#chart_2",
        size: {
          width: 840,
          height: 450
        },
       
        data: {
            x: 'date',
            columns: d,
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
        //     json: d,
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
                    type: 'timeseries',
//                       categories: d.map(function(d){
// //                        console.log(d["Year"])
//                         return d["date"];
//                       }),
                  tick: {
                    format: '%Y'
                  }
                  // height: 100
              },
              y: {
                  label: {
                    text: '',
                     position: 'outer-middle'
                  },
                  // max: 35000000,
                  tick: {
                    format: d3.format(",")
                    //or format: function (d) { return '$' + d; }
                  }
                  // max: 1

              }
              // y2: {
              //   show: true,
              //   // max: 1400000,
              //   // min: 0,
              //   tick: {
              //       format: d3.format(",")
              //   }, 
              //   label: {
              //       text: 'Supply',
              //       // position: 'outer-middle'
              //     },

              // }
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


function initViz22 (d) {

  var colors = d3.schemeCategory20;

  console.log('gggggggggggggg',g)
  var s_w = 360;
  var s_h = 100;
  var c_w = 960;
  var c_h = 500;



  var colls = [
        "IT Security Specialist",
        "Information Security Analyst",
        "Network Security Engineer",
        "Security Engineer"   ,
        "Senior Information Security Analyst",
        "Application Security Engineer",
        "Security Consultant"   ,
        "Director of Information Security"  ,
        "Security Project Manager",
        "Security Manager"   
]



  var svg = d3.select("#chart_2").append("svg");

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

 var x = d3.scaleTime()
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);
  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);


  var lines = [];
  var areas = [];
for (i = 0; i < colls.length; i++){
      console.log("iiiiiiiiiii", colls[i])  
       var line = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d[colls[i]]); })


      var area = d3.area()
        .x(function(d) { return x(d.date); })
        .y1(function(d) { return y(d[colls[i]]); });



        lines.push(line);
        areas.push(area);
}
  


   x.domain(d3.extent(d, function(d) { return d.date; }));
    y.domain([0, d3.max(d, function(d) { return d["Security Manager"]; })+600]);


for (i = 0; i < colls.length; i++){
  var area = areas[i];
  var line = lines[i]
  var col = colls[i]


  area.y0(y(0));

    g.append("path")
    .data([d])
    .attr("fill", colors[i])
    .attr("class", "area")
    .attr("d", area);

    g.append("path")
    .data([d])
    .attr("stroke", colors[i])
    .attr("class", "lines")
    .attr("d", line);

    g.on("mouseover", function(e){

      console.log(d3.event)
    })


}

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



      


}




  function initViz3 (_data,j_slid) {
    x.domain(d3.extent(_data, function(d) { return d.date; }));
    y.domain([0, d3.max(_data, function(d) { return d["Supply"]; })+2500000]);





  
    demandArea.y0(y(0));

    g.append("path")
    .data([_data])
    .attr("fill", "red")
    .attr("class", "demandArea")
    .attr("d", demandArea);

    g.append("path")
    .data([_data])
    .attr("class", "demandLine")
    .attr("d", demandLine);
   
 
   
baseSupplyArea.y0(y(0));   
// 
  
supplyArea.y0(y(0));

  g.append("path")
    .data([_data])
    .attr("fill", "gray")
    .attr("class", "baseSupplyArea")
    .attr("d", supplyArea);
        

g.append("path")
    .data([_data])
    .attr("fill", "steelblue")
    .attr("opacity", 1)
    .attr("class", "area")
    .attr("d", supplyArea);
    

 

  




    // g.append("path")
    // .data([_data])
    // .attr("class", "line")i = 0; i < colls.length; i++
    // .attr("d", supplyLine);


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
  function dataDidLoad(error, j, j_slid) { //add topics if necessary
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


  function dataDidLoad2(error, d){
    console.log("ddddddddddddddd",d)
var data_parsed = []
    var _data = []
    var  _z_data = []
    var x_data = []
    var data_point0 = []
    var data_point1 = []
    var data_point2 = []
    var data_point3 = []
    var data_point4 = []
    var data_point5 = []
    var data_point6 = []
    var data_point7 = []
    var data_point8 = []
    var data2_parsed = []
    var _data2 = []
    var x_data2 = []
    var data2_point1 = []
    var data2_point2 = []
    var data2_point3 = []
    d.forEach(function(each) {
      _data.push(
      {
        "IT Security Specialist": +each["IT Security Specialist"],
        "Information Security Analyst": +each["Information Security Analyst"],
        "Network Security Engineer": +each["Network Security Engineer"],
        "Security Engineer": +each["Security Engineer"],
        "Senior Information Security Analyst": +each["Senior Information Security Analyst"],
        "Application Security Engineer": +each["Application Security Engineer"],
        "Security Consultant": +each["Security Consultant"],
        "Director of Information Security": +each["Director of Information Security"],
        "Security Project Manager": +each["Security Project Manager"],
        "Security Manager": +each["Security Manager"],

        // "Demand Change": +each.demand_change,
        // "Percent Shortfall": +each.pct_shortfall,
        // "Supply": +each.supply,
        // "Supply Change": +each.supply_change,
        // "Target level": +each.target_level,
        // "US": +each.us_fo,
        date: new Date(each["Year"], 01, 01),
        "Year": each["Year"],
      }
      )

    })
    console.log(_data)
// 
    _data.forEach(function(mnt_data){
      data_point0.push(mnt_data["IT Security Specialist"]);
      data_point1.push(mnt_data["Information Security Analyst"]);
      data_point2.push(mnt_data["Network Security Engineer"]);
      data_point3.push(mnt_data["Security Engineer"]);
      data_point4.push(mnt_data["Senior Information Security Analyst"]);
      data_point5.push(mnt_data["Application Security Engineer"]);
      data_point6.push(mnt_data["Security Consultant"]);
      data_point6.push(mnt_data["Director of Information Security"]);
      data_point7.push(mnt_data["Security Project Manager"]);
      data_point8.push(mnt_data["Security Manager"]);
      x_data.push(mnt_data["date"]);
    })

    data_point0.unshift("IT Security Specialist");
    data_point1.unshift("Information Security Analyst");
      data_point2.unshift("Network Security Engineer");
      data_point3.unshift("Security Engineer");
      data_point4.unshift("Senior Information Security Analyst");
      data_point5.unshift("Application Security Engineer");
      data_point6.unshift("Security Consultant");
      data_point6.unshift("Director of Information Security");
      data_point7.unshift("Security Project Manager");
      data_point8.unshift("Security Manager");
    data_parsed.push(
      data_point0
      );
    data_parsed.push(
      data_point1
      );
    data_parsed.push(
      data_point2
      );
    data_parsed.push(
      data_point3
      );
    data_parsed.push(
      data_point4
      );
    data_parsed.push(
      data_point5
      );
    data_parsed.push(
      data_point6
      );
    data_parsed.push(
      data_point7
      );
    data_parsed.push(
      data_point8
      );

    x_data.unshift('date');
    data_parsed.unshift(x_data);
    state_of_viz.set('_data2', _data);
    // initViz22(_data)
    initViz2(data_parsed)
  }



  state_of_viz = d3.map();
  var color_pallete = d3.map();
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


  var baseSupplyArea = d3.area()
    .x(function(d) { return x(d.date); })
    .y1(function(d) { return y(d["Old Supply"]); });

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
    ).defer(d3.csv, "https://arminakvn.github.io/cxoviz/graph1-state0.csv"
    ).defer(d3.csv, "https://arminakvn.github.io/cxoviz/graph1-slider1-higher_edit.2018-0120.csv")
    // ).defer(d3.csv, "chart2-data-security-jobs.csv");
    q.await(dataDidLoad);


     var q2 = d3.queue(
    ).defer(d3.csv, "https://arminakvn.github.io/cxoviz/chart2-data-security-jobs-top10.csv")


    q2.await(dataDidLoad2);


  function updateData(pos,new_data,lookup_change) {
        // Scale the range of the data again 
        // x.domain(d3.extent(new_data, function(d) { return d.date; }));
        // y.domain([0, d3.max(new_data, function(d) { return d["Supply"]; })]);
        // var xAxis = d3.axisBottom(x);
        //   var yAxis = d3.axisLeft(y);
      // Make the changes
    // if (pos > 0) {

        g.select("path.area") 
          .datum(new_data)
          // .duration(70)
          .attr("d", supplyArea(new_data));


      
      g.select("path.baseSupplyArea") 
          .datum(new_data)
          // .duration(70)
          .attr("d", baseSupplyArea(new_data));

          



          


        
    // } else {
       // baseSupplyArea.y0(y(0));   
      g.select("path.baseSupplyArea") 
          .datum(new_data)
          // .duration(70)
          .attr("d", baseSupplyArea(new_data));



 g.select("path.area") 
          .datum(new_data)
          // .duration(70)
          .attr("d", supplyArea(new_data));




          

    // }
    

    g.select("path.line") 
      .datum(new_data)
          // .attr("d", line(_data))
          // .duration(70)
      .attr("d", supplyLine(new_data));

     
    }
})();