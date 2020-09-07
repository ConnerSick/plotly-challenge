function doSomething(sample) {
    d3.json('../samples.json').then((data)  => {
        var metadata = data.metadata
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample)
        var result = resultArray[0]
        var testVar = d3.select('#sample-metadata')

        testVar.html("")
        Object.entries(result).forEach(([key,value]) => {
            testVar.append('h6').text('${key.toUpperCase()}: ${value}')
        })
    })
}


