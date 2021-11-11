
const app = function(){
    const myData = {};
    const output = document.querySelector('.output');
    const rowdata = document.querySelector('.row-data');
   
    var ctx = document.getElementById("myChart").getContext('2d');
      
    function BuildChart(labels, values1, values2,values3) {
        var data = {
            labels: labels,
            datasets: [{
                label: 'Lump', // Name the series
                data: values1,
                backgroundColor: ['rgb(4, 4, 235)',
                                              'rgb(4, 4, 235)',
                                              'rgb(4, 4, 235)',
                                              'rgb(4, 4, 235)',
                                              'rgb(4, 4, 235)',
                                              'rgb(4, 4, 235)',
                                              'rgb(4, 4, 235)',
                                              'rgb(4, 4, 235)',
                                              'rgb(4, 4, 235)',
                                              'rgb(4, 4, 235)',

                ],
            },
            {
                label: 'Fines', // Name the series
                data: values2,
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
            },
            {
                label: 'Total', // Name the series
                data: values3,
                backgroundColor: ['rgb(162, 162, 62)',
                    'rgb(162, 162, 62)',
                    'rgb(162, 162, 62)',
                    'rgb(162, 162, 62)',
                    'rgb(162, 162, 62)',
                    'rgb(162, 162, 62)',
                    'rgb(162, 162, 62)',
                    'rgb(162, 162, 62)',
                    'rgb(162, 162, 62)',
                    'rgb(162, 162, 62)',
                ],
            }
        ]
        };
      
       
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true, // Instruct chart js to respond nicely.
                maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height
                
                scales: {
                    xAxes: [{
                         ticks:{
                            fontFamily:"Helvetica",
                            fontSize: 16,
                            fontColor:'green',
                            //fontWeight:1000,
                            
                         },
                            scaleLabel: {
                            display: true,
                            labelString: 'Total',
                            fontFamily:"Helvetica",
                            fontSize: 26,
                            fontColor:'red'
                        }
                    }],
                    yAxes: [{
                        ticks:{
                            fontFamily:"Helvetica",
                            fontSize: 16,
                            fontColor:'darkgreen',
                            //fontWeight:1000,
                            
                         },
                        scaleLabel: {
                            display: true,
                            labelString: 'Production in Million Ton',
                            fontFamily:"Helvetica",
                            fontSize: 26,
                            fontColor:'blue'
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
     var values1 =[];
     var values2 =[];
     var values3 =[];
      for(let x=0; x<myData.Prodyrs.length; x++){
      console.log(myData.Prodyrs[x]);
      let temp = myData.Prodyrs[x];

     // console.log(temp);
            labels.push(temp.year);
     // Map json values back to values array
            values1.push(temp.lump);
          values2.push(temp.fines);
          values3.push(temp.total);
  
      }
    // console.log(myData);
    BuildChart(labels, values1,values2,values3);
  //  BuildChart(labels, values2, "Fines Data");

    for(let x=0; x<myData.TotalProd.length; x++){
        // console.log(myData.TotalProd[x]);
         let temp = myData.TotalProd[x];
         console.log(temp);
       rowdata.innerHTML += '<div class="row"><div class="mines">'+temp.mines+'</div>'
                                                + '<div class="lump">'+temp.lump+'</div>'
                                                +'<div class="fines">'+temp.fines+'</div>'
                                                + '<div class="total">'+temp.total+'</div></div>';
         }
        //console.log(myData);


    }
  
    function loadJSON(){
         const id='2PACX-1vTLPzDkE14eoELvZYsqHbeDjpQpiPzwwqKYAWmzu4DFQ8KHi8Z-JZIeei31BY1CXeGKWY8ekXYT7XK9';
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
  
  
  
