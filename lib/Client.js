/**
 @module Client
 
 This module represents an encapsulation of Creator Client Services
 in the Creator REST API.
 uses http request module 
 */

var Q = require('q'),
    request = require('request'),
    moduleinfo = require('../package.json'),

    /* Resources */
    config = require('./resources/config'),
    Navigator = require('./resources/navigator'),
    Authenticator = require('./resources/authenticator');


/**
  Client
    @constructor
      @param {string} key - Login access key, as seen in the creator developer console
      @param {string} secret - Login access secret token, as seen in the creator developer console
      @param {object} options (optional) - optional config for the REST client
       - @member {string} host - host for the Creator Device Server REST API
**/
function Client(key, secret, host, timeout) {
    
    /* Required client config */
    
    /* if auth key and secret are passed in manually we might need to trim spaces */
    this.authKey = key.replace(/ /g, '');
    this.authSecret = secret.replace(/ /g, '');
    
    /* Optional config */
    this.host = host || config.defaultHost;
    config.defaultHost = host || config.defaultHost;
    this.timeout = timeout || 31000; // request timeout in milliseconds


    Authenticator.authenticate(key, secret).then(function(t){
        this.authorization = t;
    });

}

/**
 Construct URL helper for request funciton
 @returns {string} - the full URL
 */
Client.prototype.constructURL = function (extension) {
    return this.host + '/' + extension;
};

/**
 Make an authenticated request against the Creator Device Server.
*/
Client.prototype.request = function (options, callback) {
    var client = this, 
        deferred = Q.defer();
    
    /* Set Options fields */
    options.headers = {'Accept': 'application/json', 'Accept-Charset': 'utf-8', 'User-Agent': 'creator-node/' + moduleinfo.version, };
    if(!options.timeout) options.timeout = client.timeout; // default timeout
    if(options.follow === undefined) options.follow = true; // following by default 
    if(!options.method) options.method = "GET";
    var rel = options.relativeEntryPoint;
    if(rel) 
        if(rel.indexOf('http') > -1 || rel.indexOf('https') > -1 || rel.indexOf('www') > -1) 
            throw config.ONLY_RELATIVE_ERROR; 

    switch (options.method) {
        case "PUT":
            if(typeof options.data === 'object') {
                options.body = JSON.stringify(options.data);
                options.headers["content-type"] = "application/json";
            }
            break;
    }
    
    if(options.follow) {
        if (!options.steps) throw config.STEPS_ERROR;
        else {
            // Authenticate first
            Authenticator.authenticate(this.authKey, this.authSecret).then(function(t){
                this.authorization = t;

                // Then navigate
                Navigator.getURL(options.steps, this.authorization, options.relativeEntryPoint).then(function(url){
                    options.headers.Authorization = this.authorization.token; options.url = url;
                    
                    // And finally send out the final request
                    request(options, function (err, response, body) {
                        if(err) throw 'There has been an error: ' + err;
                        else if(callback && body) callback(JSON.parse(body));
                        else callback();
                    });
                });
            });
        }
    }
    else throw config.FOLLOW_FLAG_ERROR; // TODO: support absolute URL

    // Return promise, but also support original node callback style
    return deferred.promise.nodeify(callback);
};

/**
 * Store the response in a structured manner
 * TODO  
 */
Client.prototype.response = function(){
    this.payload = rawResponse.responseText;
    this.errorCode = rawResponse.errorCode;
    this.errorMsg = rawResponse.statusText; 
    this.rawResponse = rawResponse;

    this.getStatusCode = function(){
        return response.statusCode;
    };
};


module.exports = Client;
