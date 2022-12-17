$(document).ready(async function () {

get_stats_a_chart()
get_stats_b_chart()
get_stats_c_chart()
get_stats_d_chart()
get_stats_e_chart()
})   



function get_stats_a_chart(){

    var xValues = [50,60,70,80,90,100,110,120,130,140,150];
    var yValues = [7,8,8,9,9,9,10,11,14,14,15];
    
    new Chart("statsAChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: "rgba(0,0,0,1.0)",
          borderColor: "rgba(0,0,0,0.1)",
          data: yValues
        }]
      },
      options:{
        legend:{display:true}
      }
    });

}//get_stats_a_chart



function get_stats_b_chart(){

    var xValues = [100,200,300,400,500,600,700,800,900,1000];

    new Chart("statsBChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
          borderColor: "red",
          fill: false
        },{
          data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
          borderColor: "green",
          fill: false
        },{
          data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
          borderColor: "blue",
          fill: false
        }]
      },
      options: {
        legend: {display: false}
      }
    });

}//get stats b chart


function get_stats_c_chart(){

    var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];

new Chart("statsCChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: true}
  }
});

}//get stats c chart


function get_stats_d_chart(){
    
    var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];

    new Chart("statsDChart", {
        type: "pie",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: "World Wide Wine Production"
          }
        }
      });
}//get_stats_d_chart



function get_stats_e_chart(){
    var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    var yValues = [55, 49, 44, 24, 15];
    var barColors = ["red", "green","blue","orange","brown"];
    
    new Chart("statsEChart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: "World Wide Donut Production"
          }
        }
      });
}//get_stats_e_chart

function get_stats_g_chart(){
    let config = {
        type: 'line',
        data: data,
      };
    let labels = Utils.months({count: 7});
let data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

let ctx = document.getElementById('statsCChart').getContext('2d');
let chart = new Chart(ctx,config )
return
}//get stats c chart