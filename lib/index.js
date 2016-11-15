/**
 @module Creator
 
 A helper library for interaction with the Creator REST API,
 interacting with connected clients, 
 reading and writing of lwm2m object resources, and more.
*/

var RestClient = require('./RestClient'),
    config = require('./resources/config');

/* Initialize */
function initializer(key, secret, options) { 
    if (!key || !secret) {
        if (process.env.CREATOR_ACCESS_KEY && process.env.CREATOR_ACCESS_SECRET) {
            
            key = process.env.CREATOR_ACCESS_KEY;
            secret = process.env.CREATOR_ACCESS_SECRET;
        }
        else throw config.INVALID_KEYS_ERROR;
    }

    return new RestClient(key, secret, options); 
}

/* 
* Main functional component(s) of the Creator module
*/
initializer.RestClient = RestClient;

//public module interface is a function, which passes through to RestClient constructor
module.exports = initializer;