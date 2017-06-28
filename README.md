# promise-each
This is a simple implementation of foreach based on promises.

Works great in the browser with [browserify](http://github.com/substack/node-browserify).

### Installation
`$ npm install promise-foreach`

### Usage
###### Simple case
```javascript
var promiseForeach = require('promise-foreach')

var list = [{
    firstName: 'John',
    lastName: 'Doe'
}, {
    firstName: 'Marie',
    lastName: 'Doe'
}]

promiseForeach.each(list,
    [function (thingsOnList) {
        return `${thingsOnList.firstName} ${thingsOnList.lastName}`
    }],
    function (arrayOfResultOfTask, currentList) {
        return {
            firstName: currentList.firstName,
            lastName: currentList.lastName,
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

###### Complex case
```javascript

var https = require('https');
var promiseForeach = require('promise-foreach')

var list = [{
    firstName: 'John',
    lastName: 'Doe',
    photo_id: 1
}, {
    firstName: 'Marie',
    lastName: 'Doe',
    photo_id: 2
}]

promiseForeach.each(list,
    [function (thingsOnList) {
        return `${thingsOnList.firstName} ${thingsOnList.lastName}`
    },
    function (list){
        return new Promise(function(resolve, reject){
            var request = https.get('https://jsonplaceholder.typicode.com/photos/' + list.photo_id, function(response){
                var body = [];
                response.on('data', function(chunk){
                    body.push(chunk)
                })
                response.on('end', function(){
                    resolve(JSON.parse(body.join('')))
                })
            })
            request.on('error', function(err){
                reject(err)
            })
        }) 
    }],
    function (arrayOfResultOfTask, currentList) {
        return {
            firstName: currentList.firstName,
            lastName: currentList.lastName,
            fullName: arrayOfResultOfTask[0],
            photo: arrayOfResultOfTask[1]
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

###### Concurrency case
```javascript

var https = require('https');
var promiseForeach = require('promise-foreach')

var list = [{
    firstName: 'John',
    lastName: 'Doe',
    photo_id: 1,
    comment_id: 3
}, {
    firstName: 'Marie',
    lastName: 'Doe',
    photo_id: 2,
    comment_id: 4
}]

promiseForeach.each(list,
    [function (thingsOnList) {
        return `${thingsOnList.firstName} ${thingsOnList.lastName}`
    },
    function (list){
        return new Promise(function(resolve, reject){
            var request = https.get('https://jsonplaceholder.typicode.com/photos/' + list.photo_id, function(response){
                var body = [];
                response.on('data', function(chunk){
                    body.push(chunk)
                })
                response.on('end', function(){
                    resolve(JSON.parse(body.join('')))
                })
            })
            request.on('error', function(err){
                reject(err)
            })
        }) 
    },
    function (list){
        return new Promise(function(resolve, reject){
            var request = https.get('https://jsonplaceholder.typicode.com/comments/' + list.comment_id, function(response){
                var body = [];
                response.on('data', function(chunk){
                    body.push(chunk)
                })
                response.on('end', function(){
                    resolve(JSON.parse(body.join('')))
                })
            })
            request.on('error', function(err){
                reject(err)
            })
        }) 
    }],
    function (arrayOfResultOfTask, currentList) {
        return {
            firstName: currentList.firstName,
            lastName: currentList.lastName,
            fullName: arrayOfResultOfTask[0],
            photo: arrayOfResultOfTask[1],
            comment: arrayOfResultOfTask[2]
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

###### Browser case
`$ browserify -r promise-foreach > modules.js`

```html
<script src="modules.js"></script>

<script>
    var promiseForeach = require('promise-foreach');
</script>

<script>
var list = [{
    firstName: 'John',
    lastName: 'Doe',
    photo_id: 1
}, {
    firstName: 'Marie',
    lastName: 'Doe',
    photo_id: 2
}]

promiseForeach.each(list,
    [function (thingsOnList) {
        return `${thingsOnList.firstName} ${thingsOnList.lastName}`
    },
    function (list){
        return new Promise(function(resolve, reject){
            var request = new Request('https://jsonplaceholder.typicode.com/photos/' + list.photo_id,{
                method: 'GET'
            })
            fetch(request).then(function(response){
                resolve(response.json())
            })
            .catch(function(error){
                reject(error)
            })
        })
    }],
    function (arrayOfResultOfTask, currentList) {
        return {
            firstName: currentList.firstName,
            lastName: currentList.lastName,
            fullName: arrayOfResultOfTask[0],
            photos: arrayOfResultOfTask[1]
        }
    },
    function (err, newList) {
        if (err) {
            console.error(err)
            return;
        }
        console.log('newList : ', newList)
    })

</script>
```

### License
Apache License 2.0
