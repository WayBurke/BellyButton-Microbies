
//URL to the sample JSON
//const url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
//console.log(url); //Just a test
/*
const dataPromise = d3.json(url); //this is not needed

//Once the URL is available the callback function prints it to the console
console.log("Data Promise: ", dataPromise); //This is not needed

*/
//============================================================================
//ABOVE WORKS FOR READING THE JSON FROM THE URL.
//============================================================================


/*
// Fetch the JSON data and console log it -- metadata, names, samples
//What if i were to store the value rather than console.
d3.json(url).then(function(data) {
    console.log(data);
 
});


 //This does the same as the class example
fetch(url)
    .then((response) => response.json())
    .then((json) => console.log(json));

*/

//============================================================================
//WORK AREA - START
//============================================================================

/*about the data: 
    Names is an array; 
    Metadata is an array of dictionaries; 
    Samples: an array of dictionaries

*/

//------------------------------------
//MANUAL SECTION
//------------------------------------
//let tempData= Object.values(sampleData)
//console.log(sampleData);
//console.log(sampleData.names);
//console.log(sampleData.metadata[5]);
//console.log(sampleData.samples);

//WMB: sampleData is the name of the JS file with the sample of the JSON



let metaLabels = Object.keys(sampleData.metadata[0]);
console.log(metaLabels); //['id', 'ethnicity', 'gender', 'age', 'location', 'bbtype', 'wfreq']//Tempout

let metaInfo = Object.values(sampleData.metadata);
console.log(metaInfo[0]);

let sampleLabels = Object.keys(sampleData.samples[0]);
//console.log(sampleLabels);  //['id', 'otu_ids', 'sample_values', 'otu_labels']//Tempout

//the information in the samples section of the JSON
let sampleInfo = Object.values(sampleData.samples);
console.log(sampleInfo[0]); //Tempout

//using slicing to get the top10 from the sample - Getting the same Info as above just for 10 samples
//let top10Sample = sampleInfo.slice(0,11);
//console.log(top10Sample);

//------------------------------------
// Preliminary For Loop
// thinking to use slicing
//------------------------------------

//let top10Sample ={}; //dictionary for the top 10
let top10SampleList =[];

//for (let j =0; j<sampleInfo.length; j++){
for (let j =0; j<2; j++){
  let top10Sample ={}; //dictionary for the top 10

  //Purpose of this for loop is to create a new Sample List for the charts
  let sampleID = sampleInfo[j].id; //variable for the ID

  //Lists to hold the other segment of the sample
  let tempIds = sampleInfo[j].otu_ids.slice(0,10); //list fo the otu_ids
  let tempLabels = sampleInfo[j].otu_labels.slice(0,10); //list fo the otu_labels
  let tempSample = sampleInfo[j].sample_values.slice(0,10); //list fo the sample_value
  //console.log(tempIds);
/*
  //Modifying the name of the otu_ids to include the text OTU
  for (let i = 0; i <tempIds.length; i++){
    tempIds[i]= "OTU " + tempIds[i];
  };*/

  //Adding the info to a dictionary
  top10Sample["id"]=sampleID;
  top10Sample["otu_ids"]=tempIds;
  top10Sample["otu_labels"]=tempLabels;
  top10Sample["sample_values"]=tempSample;

  //Adding each dictionary to the list
  top10SampleList.push(top10Sample);


}
console.log(top10SampleList[0]);

//







//------------------------------------
//End of For loop
//------------------------------------



//------------------------------------













//================================================
//I need to get the individual Metadata keys
//let metaKeys = Object.keys(myJson[0].metadata);
//let metaKeys = myJson["metatdata"];
//console.log("metaKeys:");
//console.log(metaKeys);
//===============================================

//====================================================
//THIS BLOCK POPULATES THE DROPDOWN USING THE URL
//==================================================
let dropdown = document.getElementById('selDataset');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Select Test ID';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

//const url = 'https://api.myjson.com/bins/7xq2x';
const url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        let option;
    
    	for (let i = 0; i < data.names.length; i++) {
          option = document.createElement('option');
      	  option.text = data.names[i];
      	  //option.value = data.names;
      	  dropdown.add(option);
    	}    
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });

//=======================================================
//END OF BLOCK THAT POPULATES THE DROPDOWN USING THE URL
//=======================================================






//============================================================================
// WORK AREA - END
//============================================================================


//============================================================================
//BELOW WORKS FOR PLOT A CHART - JUST NOT THE ONES WE WORKING ON RIGHT NOW
//============================================================================
// Initializes the page with a default plot
// this needs to be updated
function init() {
  //---Dummy Data as place holder  
  data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
  //---End of dummy place holder 

//------------BAR CHART INFORMATION------------
let temp = top10SampleList[0].otu_ids;
console.log(`Temp list order before add: ${temp}`)
for (let i = 0; i <temp.length; i++){
  temp[i]= "OTU " + temp[i];
};

  barData =[{
    type:"bar",
    y:temp,
    x:top10SampleList[0].sample_values,
    //y:top10SampleList[0].otu_ids,
   
    orientation: 'h',
    xhovertext:top10SampleList[0].otu_labels
  }];  
  console.log(`Temp list order after adding OTU: ${temp}`)
  
  let barLayout = {
    title:`Top 10 OTUs in Test Subject: ${top10SampleList[0].id}`
  };
//-----------------------------------------------


//------------BUBBLE CHART INFORMATION------------
bubbleData=[{
  x:sampleInfo[0].otu_ids,
  y:sampleInfo[0].sample_values,
  text:sampleInfo[0].otu_labels,
  mode:'markers',
  marker:{
    size:sampleInfo[0].sample_values,
    color:sampleInfo[0].otu_ids
       
  }
}];


let bubbleLayout ={
  title: `Bubble Chart for Test Subject: ${sampleInfo[0].id}`,
  showlegend:false,
  height:550,
  width:1450

};
//-------------------------------------------------




//------------GAUGE CHART INFORMATION------------

gaugeData=[{
  domain:{x:metaInfo[0].wfreq},
  title:{text:"Belly Button Washing Frequency", font:{size:30}},
  type:"indicator",
  mode:"gauge"
}];


let gaugeLayout={
  width:600,
  height:500
};


//-------------------------------------------------
// PANEL WORK
//-------------------------------------------------
/*
const metaTable = document.getElementsByClassName("panel-body");
//metaTable.dataset = metaInfo[0];
metaTable.write(metaInfo[0]);
console.log(metaTable.dataset);*/

//d3.select(".panel-body").text(metaInfo[0]);

let info = metaInfo[0];
console.log(info);

let testData = {id: 2, name:3, height: 5, status:"good"};
let testDataLabel = ["id", "name", "height", "status"];
//Below gets the data in the right area - YES!!
//document.getElementById("sample-metadata").innerHTML = "help"; // this works
//document.getElementById("sample-metadata").innerHTML =info.id; //this works
//document.getElementById("sample-metadata").innerHTML =testDataLabel[0] +testData.id;

//document.getElementById("sample-metadata").innerHTML =info.toString();

//document.getElementById("sample-metadata").update(info);
//How to get multiple lines?






//-------------------------------------------------



  //----------PLOT INSTUCTIONS
    Plotly.newPlot('bar', barData, barLayout);
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);

    //Plotly.newPlot('bar', data);
   // Plotly.newPlot('gauge', data);
    //Plotly.newPlot('bubble', data);


let metaPanel = document.getElementsByClassName("body");
metaPanel.innerHTML = "help";
  }



//ADD CODE HERE


//This needs to be at the very end
 init();