function getData(sample) {
    d3.json('../samples.json').then((data)  => {
        var metadata = data.metadata
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample)
        var result = resultArray[0]
        var dataVar = d3.select('#sample-metadata')

        dataVar.html("")
        Object.entries(result).forEach(([key,value]) => {
            dataVar.append('h6').text('${key.toUpperCase()}: ${value}')
        })
    })
}


function createCharts(sample) {
    d3.json('../samples.json').then((data) => {
        var samples = data.samples
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample)
        var result = resultArray[0]
        var sample_values = result.sample_values
        var otu_ids = result.otu_ids
        var otu_labels = result.otu_labels

        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: 




        }
        
        
        
        )
    })
}