console.log("Is this first? - above variable declarations #1");
//============================================================================
//GLOBAL DECLARATIONS
//============================================================================


//Variables for parts of the JSON
var metaLabels, metaInfo, sampleLabels, sampleInfo;

console.log("Is this first? - above url #2");
//URL to the JSON data
const url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
console.log(url);

//============================================================================
//ABOVE WORKS FOR READING THE JSON FROM THE URL.
//============================================================================

// Fetch the JSON data and console log it -- metadata, names, samples
//What if i were to store the value rather than console.
console.log("Is this first? - above d3.json() #3");
d3.json(url).then(function(json) {
   //console.log(data);
   //getJsonData(data);// this will get the json info into a variable in the function getJsonData
  

   console.log("Inside getJsonData; sample info2 - line 368-372"); //Informational - to be removed
  sampleInfo = Object.values(json.samples);
  sampleLabels = Object.keys(json.samples[0]);//['id', 'otu_ids', 'sample_values', 'otu_labels']
  metaInfo = Object.values(json.metadata); // All the data in Metatdata
  metaLabels = Object.keys(json.metadata[0]); // do i need this?? //['id', 'ethnicity', 'gender', 'age', 'location', 'bbtype', 'wfreq']

  console.log(sampleInfo);
 init(sampleInfo, metaInfo);
});


//============================================================================
//WORK AREA - START
//============================================================================

/*about the data: 
    Names is an array; 
    Metadata is an array of dictionaries; 
    Samples: an array of dictionaries

*/
//-----------------------------------------------------------------


//============================================================================
// FUNCTION TO GET THE INFO FROM THE JSON OF THE SELECTED SUBJECT
//============================================================================

/*WMB: If i have a function to get the value of the data, it need to be passed to something
as an array maybe??

this function is to be called by 

getJsonData is working.. but now how do i use it in previous manual code areas
*/
console.log("Is this first? - above getJsonData() #4");
/*function getJsonData(json){
  console.log("Inside getJsonData; sample info2 - line 368-372"); //Informational - to be removed
  sampleInfo = Object.values(json.samples);
  sampleLabels = Object.keys(json.samples[0]);//['id', 'otu_ids', 'sample_values', 'otu_labels']
  metaInfo = Object.values(json.metadata); // All the data in Metatdata
  metaLabels = Object.keys(json.metadata[0]); // do i need this?? //['id', 'ethnicity', 'gender', 'age', 'location', 'bbtype', 'wfreq']

  console.log(sampleInfo);
};*/


//------------------------------------
// Preliminary For Loop
// thinking to use slicing
//------------------------------------
console.log("Is this first? - above creating top10 sample from each - #5");
//let top10Sample ={}; //dictionary for the top 10
function setBarChart(sampleInfo){
    let top10SampleList =[];

    //for (let j =0; j<sampleInfo.length; j++){
    for (let j =0; j<2; j++){
      let top10Sample ={}; //dictionary for the top 10
      
      /*---------------------------------------*/
      //Throws an error initially, but still works
     // console.log(sampleInfo[j]); //test print -- returning undefine because the function getJsonData has not yet run
      //Purpose of this for loop is to create a new Sample List for the charts
      let sampleID = sampleInfo[j].id; //variable for the ID -- returning undefine because the function getJsonData has not yet run
      /*---------------------------------------*/


      //using slicing to get the top10 from the sample 
      //Lists to hold the other segment of the sample
      let tempIds = sampleInfo[j].otu_ids.slice(0,10); //list fo the otu_ids
      let tempLabels = sampleInfo[j].otu_labels.slice(0,10); //list fo the otu_labels
      let tempSample = sampleInfo[j].sample_values.slice(0,10); //list fo the sample_value
      console.log(tempIds);
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
    //console.log(top10SampleList[0]); //Tempout

    //------------BAR CHART INFORMATION------------
    let temp = top10SampleList[0].otu_ids;
    //console.log(`Temp list order before add: ${temp}`) //Tempout
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
      //console.log(`Temp list order after adding OTU: ${temp}`) //Tempout
      
      let barLayout = {
        title:`Top 10 OTUs in Test Subject: ${top10SampleList[0].id}`
      };
    //-----------------------------------------------

    Plotly.newPlot('bar', barData, barLayout);
};





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

//============================================================================
//THIS BLOCK POPULATES THE DROPDOWN USING THE URL
//============================================================================
let dropdown = document.getElementById('selDataset');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Select Test ID';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

console.log("Is this first? - above fetch dropdown");
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
      	  //option.value = data.names[i]; This is setting the value in the HTML for action
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
console.log("Is this first? - above Init()");
function init(sampleInfo, metaInfo) {
  console.log("Is this first? - inside Init()");
  setBarChart(sampleInfo);
  /*
    //------------BAR CHART INFORMATION------------
    let temp = top10SampleList[0].otu_ids;
    //console.log(`Temp list order before add: ${temp}`) //Tempout
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
      //console.log(`Temp list order after adding OTU: ${temp}`) //Tempout
      
      let barLayout = {
        title:`Top 10 OTUs in Test Subject: ${top10SampleList[0].id}`
      };
    //-----------------------------------------------
*/

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
    //console.log(info); //Tempout

    let testData = {id: 2, name:3, height: 5, status:"good"};
    let testDataLabel = ["id", "name", "height", "status"];
    //Below gets the data in the right area - YES!!
    //document.getElementById("sample-metadata").innerHTML = "help"; // this works
    document.getElementById("sample-metadata").innerHTML =info.id; //this works
    //document.getElementById("sample-metadata").innerHTML =testDataLabel[0] +testData.id;

    //document.getElementById("sample-metadata").innerHTML =info.toString();



    //How to get multiple lines?






    //-------------------------------------------------



      //----------PLOT INSTUCTIONS
        //Plotly.newPlot('bar', barData, barLayout); // moved to setBar function
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);


  } //END OF INIT()



//ADD CODE HERE





//============================================================================
// CREATING EVENT ON DROPDOWN CHANGE
//============================================================================
console.log("Is this first? - above optionChange()");
//let dropSubject = d3.select()
function optionChanged(value){
  console.log("Dropdown was changed! Yeah!!");
  document.getElementById("sample-metadata").innerHTML =value;

  /*WMB: what do i need to pass into the updatePlotly to change or update the 
  charts */
 
 // updatePlotly()
};







//============================================================================
// FUNCTION TO UPDATE THE PLOTPLY
//============================================================================
console.log("Is this first? - above updatePlotly()");
function updatePlotly(newdata,value) {
  //WMB: need to get the value in the drop down or some way of setting the data for the plot

  Plotly.restyle('bar', barData, barLayout);
  Plotly.restyle('bubble', bubbleData, bubbleLayout);
  Plotly.restyle('gauge', gaugeData, gaugeLayout);

}

console.log("Is this first? - above calling Init()");
//This needs to be at the very end
init();