//===================
//New Init ()
//===================
const url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let dropdown = document.getElementById('selDataset');
let defaultOption = document.createElement('option');

//Global variables for the Json
var sampleInfo, metaData, metaLabel, metaEntries, metaEntriesAll;


function init(){
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
            // above stays

            //since this is for the initial setup, i dont need all of the data from the json, only what is needed for setup
            sampleInfo = Object.values(data.samples); 
            metaData = Object.values(data.metadata);
            metaLabel = Object.keys(data.metadata[0]); //Getting the keys only from the Metadata element
            metaEntries = Object.entries(data.metadata[0]); //Getting the keys/value pair from the Metadata element
            
            metaEntriesAll = Object.entries(data.metadata);

            //Setting the default value for the dropdown
            defaultOption.text = data.names[0];
            dropdown.add(defaultOption);

                       
            /*============================================================================
            //                  PANEL-BODY SETUP INFORMATION
            //============================================================================*/
            
            let demoInfo = "";
            metaEntries.forEach(myFunction); //Calling function to format the panel-body
           
           
            document.getElementById("sample-metadata").innerHTML =demoInfo;

            function myFunction(value, index, array){
                demoInfo += value[0] +": "+value[1]+"<br>"
            }


            /*============================================================================
            //                  BAR CHART SETUP INFORMATION
            //============================================================================*/
            
            let sampleID = sampleInfo[0].id; //variable for the ID

            //using slicing to get the top10 from the sample 
            let tempIds = sampleInfo[0].otu_ids.slice(0,10); //list fo the otu_ids
            let tempLabels = sampleInfo[0].otu_labels.slice(0,10); //list fo the otu_labels
            let tempSample = sampleInfo[0].sample_values.slice(0,10); //list fo the sample_value

            
                     
            //creating duplicate to allow for name modification
            let temp = tempIds.slice(); 
            for (let i = 0; i <temp.length; i++){
                temp[i]= "OTU " + temp[i];
            };

            //------------BAR CHART CONFIGURATION SETTINGS------------
            barData =[{
                type:"bar",
                y:temp,
                x:tempSample,
                orientation: 'h',
                hovertext:tempLabels,
                transforms: [{
                    type: 'sort',
                    target: 'y',
                    order: 'descending'
                  }]
            }];  
                
            let barLayout = {
                title:`Top 10 OTUs in Test Subject: ${sampleID}`
            };
            //-----------------------------------------------

            
            /*============================================================================
            //                  BUBBLE CHART SETUP INFORMATION
            //============================================================================*/
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
                width:1250
          
              };

            /*============================================================================
            //                  GAUGE METER SETUP INFORMATION
            //============================================================================*/
            gaugeData=[{
                //domain:{y:metaData[0].wfreq},
                domain:{x:[0,1], y:[0,9]},
                value:metaData[0].wfreq,
                title:{text:`Belly Button Washing Frequency <br /> Scrubs per Week for ID: ${sampleInfo[0].id}`},
                type:"indicator",
                mode:"gauge+number"
              }];
          
          
              let gaugeLayout={
                width:500,
                height:500
              };
          


            //============================================================================
            //Initiate the plots
            //============================================================================
            Plotly.newPlot('bar', barData, barLayout);
            Plotly.newPlot('bubble', bubbleData, bubbleLayout);
            Plotly.newPlot('gauge', gaugeData, gaugeLayout);


            //below stays
        });  
        }  
    )  
    .catch(function(err) {  
        console.error('Fetch Error -', err);  
    });

}// END OF INIT FUNCTION


//============================================================================
//THIS BLOCK POPULATES THE DROPDOWN USING THE URL
//============================================================================

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
      	  option.value = data.names[i]; //This is setting the value in the HTML tag for action
      	  dropdown.add(option);
    	}    
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  }); // END OF BLOCK THAT POPULATES THE DROPDOWN USING THE URL





//============================================================================
//CREATING EVENT ON DROPDOWN CHANGE
//============================================================================
var foundIt; //Variable to store the index of the item selected
function optionChanged(value){
    console.log("Dropdown was changed! Yeah!!");
    console.log(`Value: ${value}`);

    
    for (let i= 0; i< sampleInfo.length; i++)
    {
        if (sampleInfo[i].id == value){
            foundIt = i;
        };
    };

    console.log(`Found it index: ${foundIt} with ID: ${sampleInfo[foundIt].id}`);
    
    //Calling Plotting function for the item selected
    updatePlotly(sampleInfo[foundIt]);

    /*============================================================================
    //                  PANEL-BODY UPDATED INFORMATION
    //============================================================================*/
    
    d3.json(url).then(function(response) {
        metaEntriesAll = Object.entries(response.metadata[foundIt]);
              
        let demoInfo = "";
        metaEntriesAll.forEach(myFunction); //Calling function to format the panel-body
      
      
        document.getElementById("sample-metadata").innerHTML =demoInfo;

        function myFunction(value, index, array){
            demoInfo += value[0] +": "+value[1]+"<br>";
           
        }

    });
    
  };//END OF ONCHANGE ()




//============================================================================
// FUNCTION TO UPDATE THE PLOTPLY
//============================================================================

function updatePlotly(subjectSelected) {
    //Testing purposes
    console.log(subjectSelected);
    //console.log(metaEntriesAll[index][1].wfreq);
    //let freq = metaEntriesAll[index][1].wfreq;
    
    /*============================================================================
    //                  BAR CHART SETUP INFORMATION
    //============================================================================*/
            
    let sampleID = subjectSelected.id; //variable for the ID

    //using slicing to get the top10 from the sample 
    let tempIds = subjectSelected.otu_ids.slice(0,10); //list fo the otu_ids
    let tempLabels = subjectSelected.otu_labels.slice(0,10); //list fo the otu_labels
    let tempSample = subjectSelected.sample_values.slice(0,10); //list fo the sample_value

                
    //creating duplicate to allow for name modification
    let temp = tempIds.slice(); 
    for (let i = 0; i <temp.length; i++){
        temp[i]= "OTU " + temp[i];
    };

    //------------BAR CHART CONFIGURATION SETTINGS------------
    barData2 =[{
        type:"bar",
        y:temp,
        x:tempSample,
        orientation: 'h',
        hovertext:tempLabels,
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
            }]
    }];  
        
    let barLayout2 = {
        title:`Top 10 OTUs in Test Subject: ${sampleID}`
    };
    //-----------------------------------------------

     /*============================================================================
    //                  BUBBLE CHART SETUP INFORMATION
    //          getting the data from Json for the bar chart
    //============================================================================*/
    bubbleData2=[{
      x:subjectSelected.otu_ids,
      y:subjectSelected.sample_values,
      text:subjectSelected.otu_labels,
      mode:'markers',
      marker:{
          size:subjectSelected.sample_values,
          color:subjectSelected.otu_ids
          
      }
    }];
    
    
    let bubbleLayout2 ={
      title: `Bubble Chart for Test Subject: ${subjectSelected.id}`,
      showlegend:false,
      height:550,
      width:1250

    };

    
    /*============================================================================
    //                  GAUGE METER SETUP INFORMATION
    //============================================================================
    gaugeData2=[{
        //domain:{y:metaData[0].wfreq},
        domain:{x:[0,1], y:[0,1]},
        value:freq,
        //title:{text:"<h1>Belly Button Washing Frequency</h1> <br /> <h2>Scrubs per Week</h2>", font:{size:30}},
        title:{text:"Belly Button Washing Frequency <br /> Scrubs per Week"},
        type:"indicator",
        mode:"gauge+number",
        //align:"center",
        gauge: {steps: [
            { range: [0, 1], color: "" },
            { range: [1, 2], color: "" },
            { range: [2, 3], color: "" },
            { range: [3, 4], color: "#bfff00" },
            { range: [4, 5], color: "#00b33c" },
            { range: [5, 6], color: "#99cc00" },
            { range: [6, 7], color: "#00b33c" },
            { range: [7, 8], color: "#009933" },
            { range: [8, 9], color: "#00802b" }
            ]},
      }];
  
  
      let gaugeLayout2={
        width:500,
        height:500
      };
        */  



    Plotly.newPlot('bar', barData2, barLayout2);
    Plotly.newPlot('bubble', bubbleData2, bubbleLayout2);
    //Plotly.newPlot('gauge', gaugeData2, gaugeLayout2);

}



//********************** */
init();