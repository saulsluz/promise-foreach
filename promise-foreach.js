
exports.each = function (arr, iterable, onStepDone, onDone) {
    var arr = arr || []
    var iterable = iterable || []
    var onStepDone = onStepDone || function () { }
    var onDone = onDone || function () { }

    if (typeof iterable == 'function'){
        iterable = [iterable]
    }

    var jobs = []

    arr.forEach(function (currentValue) {

        var tasks = iterable.map(function (currentFunction) {
            var cf = currentFunction(currentValue)
            if (!cf instanceof Promise) cf = Promise.resolve(cf)
            return cf
        })

        var promiseAll = Promise.all(tasks).then(function (values) {
            return onStepDone(values, currentValue)
        })

        jobs.push(promiseAll)
    })

    Promise.all(jobs).catch(function (err) {
        onDone(err, null)
    }).then(function (values) {
        onDone(null, values)
    })
}