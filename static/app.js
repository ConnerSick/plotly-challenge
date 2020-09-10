var testData = jsonData



function buildMetadata(sample) {
    ((testData) => {
      var metadata = testData.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var metadataSelect = d3.select("#sample-metadata");
  
      metadataSelect.html("");
  
      Object.entries(result).forEach(([key, value]) => {
        metadataSelect.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
}
  
function buildCharts(sample) {
    ((testData) => {
      var samples = testData.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      
      var sample_values = result.sample_values;  
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
  
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
  
      Plotly.newPlot("bar", barData, barLayout);
    
    
      var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
          }
        }
      ];
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}


function dataSelector(sample) {
    var dropdownSelector = d3.select("#selDataset");
  
    d3.json("../samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        dropdownSelector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
}
  
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}
  
dataSelector();

// buildCharts()