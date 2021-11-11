
const app = function(){
    const myData = {};
    // const output = document.querySelector('.output');
    // const rowdata = document.querySelector('.row-data');
   
    var ctx = document.getElementById("myChart").getContext('2d');
      
    function BuildChart(labels, values, chartTitle) {
        var data = {
            labels: labels,
            datasets: [{
                label: chartTitle, // Name the series
                data: values,
                backgroundColor: ['rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                ],
            }],
        };
      
       
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true, // Instruct chart js to respond nicely.
                maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
                scales: {
                    xAxes: [{
                            scaleLabel: {
                            display: true,
                            labelString: 'Total'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Production in Million Ton'
                        }
                    }]
                },
            }
        });
      
        return myChart;
      }





    function init(){
      console.log('Loaded');
      loadJSON();
    }
  
    function loadOutput(){
     var labels =[];
     var values =[];
      for(let x=0; x<myData.Prodyrs.length; x++){
      console.log(myData.Prodyrs[x]);
      let temp = myData.Prodyrs[x];
     // console.log(temp);
            labels.push(temp.year);
     // Map json values back to values array
            values.push(temp.production);
  
      }
    // console.log(myData);
    BuildChart(labels, values, "Production Data");
    }
  
    function loadJSON(){
         const id='1r05ArCOx-vAW_SwVRo9L25b2jG_QmNPoXHPHffhQm-s';
          let urls = [];
          for(let x =1; x<4; x++){
            urls.push('https://spreadsheets.google.com/feeds/list/'+id+'/'+x+'/public/values?alt=json');
          }
          Promise.all(urls.map(url=>{
             return fetch(url)
                .then(response=>response.json())
                .then(data=>{
                  let tempArray =[];
                  let sheetName = data.feed.title.$t;
                  data.feed.entry.forEach(element => {
                    let holder = {};
                    for(let key in element){
                      if(key.substring(0,3)=='gsx'){
                        holder[key.split('$')[1]]=element[key].$t;
                      }
                    }
                    tempArray.push(holder);
                   // console.log(element);
                  });
                 console.log(tempArray);
                  //console.log(data);
                  return {
                    key:sheetName,
                    value:tempArray
                  }
                })
          })).then(data=>{
            console.log(data);
            for(let i=0; i<data.length; i++){
              myData[data[i].key] = data[i].value;
  
            }
                loadOutput();
          })
           console.log(urls);
        }
    return{
      init:init
    };
  }();
  
  
  document.addEventListener('DOMContentLoaded',app.init);
  
  
  
