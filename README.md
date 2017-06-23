# promise-each
This is a simple implementation of foreach based on promises

### Installation
`$ npm install promise`

### Usage
Simple case
```
var pf = require('promise-foreach')

var list = [{
    firstName: 'John',
    lastName: 'Doe'
}, {
    firstName: 'Marie',
    lastName: 'Doe'
}]

pf.each(list,
    [function (thingsOnList) {
        return `${thingsOnList.firstName} ${thingsOnList.lastName}`
    }],
    function (arrayOfResultOfTask) {
        return {
            firstName: 'John',
            lastName: 'Doe',
            fullName: arrayOfResultOfTask[0]
        }
    },
    function (err, newList) {
        if (err) {
            console.error(err)
            return;
        }
        console.log('newList : ', newList)
    })
```

### License
Apache License 2.0
