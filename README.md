![logo](https://static.creatordev.io/logo-md-s.svg)

# Creator JS client

This js client allows you to use [The Creator IoT Framework](https://docs.creatordev.io/deviceserver/guides/iot-framework/), giving the possibility to quickly implement a client, to consume the Device Server REST API.

[![build status](https://api.travis-ci.org/CreatorDev/creator-js-client.svg?branch=master)](http://travis-ci.org/CreatorDev/creator-js-client)

---

## Table of Contents

* [Getting Started](#getting-started)
* [Jump Start](#jump-start)
* [Accessing Resources](#accessing-the-resources)
    * [Service Layer functions](#1-service-layer-functions)
        * [Available service layers](#available-service-layers)
    * [The request method](#2-the-request-method)
* [Test](#test)
* [Help](#help)
* [License](#license)
* [Contributing](#contributing)


## Getting Started
To install dependencies, just run:
    
```js
$ npm install
```

## Jump Start

In order to be able to utilize this library you will have to sign up for a creator account. You can do so going through the [Creator Developer Console](http://console.creatordev.io)

After signing up, you will need to create an access key and secret pair from the API keys section of the console. These will gain you access to the Creator REST API while using this library.

You can then create an instance of the library as follows: 

```js
var creator = require('creator-js-client')('CREATOR_ACCESS_KEY', 'CREATOR_ACCESS_SECRET');
```
Please note that you can also set the following **environment variables** for the library to use. 

* CREATOR_ACCESS_KEY
* CREATOR_ACCESS_SECRET

and then 

```js
var creator = require('creator-js-client')();
```

Now you should have a working instance of the library that you can use to access your resources RESTfully.

As you may already know, creator rest api is using what is called the HATEOAS REST application structure which means that you need to follow links in order to reach to certain resources. This library will do that for you. Please keep reading!

## Accessing The Resources

Using this library you have two main ways of accessing resources. 

1. Using the raw request method
2. Using the service layer functions

Please note that regrdless of the method chosen to access resources, data types of the arguments that you pass in are very important. For example if you are filtering down for the ObjectID 3201 then it needs to be passed in as a String -> '3201' rather than in the form of an integer.

### 1. The Request Method

The request method provide a very flexible way of accessing any resource you would like to interact with.

The structure for this method is as follows:

```js 
creator.request({
    // Options
}, function(data){
    // Do something with data
});
```

Now this method can be used to GET, POST, PUT or DELETE resources on the API.

**GET example** 

```js
creator.request({
    steps: ['clients']
}, function(clients){
    console.log(clients);
});
```

This will fetch you an array of your clients talking to the DeviceServer.

**PUT example**

```js
creator.request({
    method: 'PUT',
    steps: ['clients', {Name: 'CLIENT_NAME'}, 'objecttypes', {ObjectTypeID: '3201'}, 'instances', {InstanceID: '0'}],
    data: {
        DigitalOutputState: true
    }
}, function(cb){});

```
When you run this function, it will navigate until it finds the instance at the end of the steps option and set the DigitalOutputState to true.

#### Available Options
You can set the following options when calling the request(); method

```js
creator.request({
    follow: true, //defaults to true, if this is set to true steps should be provided
    method: 'PUT', // defaults to GET 
    steps: ['accesskeys'], // steps for navigator to follow 
    data: {
        // data if method is set to 'PUT'
    },
    timeout: 31000, // defaults to 31000
    headers: {}, // HTTP request headers are automatically set and we do not recommend overwriting them
    relativeEntryPoint: '/clients' // this option can be set if you know where to begin within the Creator DeviceServer API, can be useful to cut down steps
}, function(cb){});
```


### 2. Service Layer functions

These functions provide a great way of accessing a resource very quickly without dealing with any technical details at all.

An example would be:

```js 
creator.clients.getClients();
```  

The callback fed into the function above will be called, with an array of clients that you have talking to our Creator DeviceServer. 
A typical response example, containing one AwaLWM2 client - "ci40-board": 

```json
{
  "PageInfo": {
    "TotalCount": 1,
    "ItemsCount": 1,
    "StartIndex": 0
  },
  "Items": [
    {
      "Name": "ci40-board",
      "Links": [
        ...
      ]
    }
  ]
}

```


#### Available service layers

* Client Services - via creator.clients
  * ``` getClients(cb()); ```
  * ``` getClientByName(clientName, cb()); ```
* Metrics Services - via creator.metrics
  * ``` getUserMetrics(cb()); ```
  * ``` getClientMetrics(clientName, cb()); ```
* Object Resource Services - via creator.resources
  * ``` getClientObjects(clientName, cb()); ```
  * ``` getClientObject(clientName, objectID, cb()); ```
  * ``` getClientObjectInstanceByID(clientName, objectID, instanceID, cb()); ```
  * ``` writeClientObjectInstanceByID(clientName, objectID, instanceID, data, cb()); ```
* Subscription Services - via creator.subscriptions
  * ``` getUserSubscriptions(cb()); ```
  * ``` getClientSubscriptions(clientName, cb()); ```

Please note that the high level API is to be expanded to cover more areas of the DeviceServer. 

## Test

To run creator-node tests first you need to open up the test/config.js file and put a valid pair of access key and secret in it.

Thereafter, you can run the command below and initiate the mocha tests.

```js
$ npm test
```

## Help

If you have any problems installing or utilising the creator node library, please look into our [Creator Forum](https://forum.creatordev.io). 

Otherwise, If you have come across a nasty bug or would like to suggest new features to be added then please go ahead and open an issue or a pull request against this repo.

## License

Please see the [license](LICENSE) file for a detailed explanation.

## Contributing

Any Bug fixes and/or feature enhancements are welcome. Please see the [contributing](CONTRIBUTING.md) file for a detailed explanation.