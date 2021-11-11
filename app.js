//1aVjCurbtWEfVNbZlXZfjt_FRNg2GRDvGhbSfOUlFQ8A

const app = function(){
  const myData = {};
  const output = document.querySelector('.output');
  const rowdata = document.querySelector('.row-data');
 
  function init(){
    console.log('Loaded');
    loadJSON();
  }

  function loadOutput(){
   
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
       const id='1r05ArCOx-vAW_SwVRo9L25b2jG_QmNPoXHPHffhQm-s';
        let urls = [];
        for(let x =1; x<3; x++){
          urls.push('https://sheets.googleapis.com/v4/spreadsheets/list/'+id+'/'+x+'/public/values?alt=json');
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
              // console.log(tempArray);
                //console.log(data);
                return {
                  key:sheetName,
                  value:tempArray
                }
              })
        })).then(data=>{
         // console.log(data);
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


