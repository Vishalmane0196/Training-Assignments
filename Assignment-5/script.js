// // left chart
// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart1);
// google.charts.setOnLoadCallback(drawChart2);
// function drawChart1() {

// // Set Data
// const data = google.visualization.arrayToDataTable([
//   ['Contry', 'Mhl'],
//   ['Italy',54.8],
//   ['France',48.6],
//   ['Spain',44.4],
//   ['USA',23.9],
//   ['Argentina',14.5]
// ]);

// // Set Options
// const options = {
//   title:'World Wide Wine Production',
//   is3D:true
// };

// // Draw
// const chart = new google.visualization.PieChart(document.getElementById('left-chart'));
// chart.draw(data, options);

// }


// function drawChart2() {

//     // Set Data
//     const data = google.visualization.arrayToDataTable([
//       ['Contry', 'Mhl'],
//       ['Italy',55],
//       ['France',49],
//       ['Spain',44],
//       ['USA',24],
//       ['Argentina',15]
//     ]);
    
//     // Set Options
//     const options = {
//       title:'World Wide Wine Production'
//     };
    
//     // Draw
//     const chart = new google.visualization.BarChart(document.getElementById('right-chart'));
//     chart.draw(data, options);
    
    // }

    document.getElementById('select-sort').classList.add("option-select2")
    document.getElementById('select-sort').addEventListener('change',colorselect);

    function colorselect(e){
        
        console.log()
        if(document.getElementById('select-sort').value !== 'Sort') {
            document.getElementById('select-sort').classList.remove("option-select2")
        }
        
    }
