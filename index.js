
exports.pEach = function(arr, iterable, onStepDone, onDone){

    var arr = arr || []
    var iterable = iterable || []
    var onStepDone = onStepDone || function(){}
    var onDone = onDone || function(){}

    var jobs = []

    arr.forEach(function (current) {

        iterable(current)

        var promiseAll = Promise.all(iterable).then(function(values){
            onStepDone(values)
        })
        jobs.push(promiseAll)
    })

    Promise.all(jobs).catch(function(err){
            onDone(err, null)
        }).then(function (values) {
            onDone(null, values)
        })
}