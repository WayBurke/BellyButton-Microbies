# Microbial Species in the Human Belly Button
**An interactive Web Visualization of Microbial Species (referred to as operational taxonomic units (OTUs)) found in the Belly Button**

## Overview
The purpose of this project is to use JavaScript to create interactive web visualization of the Belly Button dataset that was accessed via a JSON Object.

**Webpage:**
The webpage can be viewed at: [Interactive Belly Button Page](https://wayburke.github.io/belly-button-challenge/)

## Features
### Four Interactive visualization items created using JavaScript:
* HTML Panel Body was updated to show the Demographic Information found in the metadata for the subject selected
* Horizontal Bar chart was created to show the top 10 OTUs found in the selected subject
* Bubble Chart was created to show all the sample values for the selected subject.
* An optional gauge chart was included that shows the frequency of belly button washing per week.

## How to Nagivate the page
* Make a selection from the "Test Subject ID No." dropdown
* Based on your selection, the Page will populate with the following information:
  * Demographic Information of the individual selected
  * Top 10 OTUs found in the individual selected
  * Bubble Chart of each sample with the markers sized based on the sample values received
  * Gauge Chart that plots the weekly washing frequency of the indiviual.
  
## Key Files
* [JavaScript File](/static/js/app.js) - JavaScript code for the manipulation of the HTML file
* [Index.html](/index.html) - HTML file to be hosted on GitHub Page


