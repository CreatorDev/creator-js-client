/**
 @module resources/Authenticator
 This module gets the Client authenticated against the Creator Device Server
 using the access key and secret pair - and lets the client do authenticated calls
 by appending an access token field into the Client (super_) class
 */

var p = require('promise'),
    request = require('request'),
    config = require('./config');

/* Global authorization obj */
var authorization = {
    'token_type': null, 'access_token': null, 'token': null
};

/* @method authenticate
    * @param {key, secret} the key and secret access keys
    * @return {Promise} when resolved, returns valid session data or rejects if authentication failed
    * @public
*/
function authenticate(key, secret) {
    return new p(function (resolve, reject) {
        if(key && secret) {
            if(authorization.token === null) {
                request.post({
                    url: config.defaultHost + config.defaultAuthEndpoint,
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    },
                    form: {
                        username: key,
                        password: secret,
                        grant_type: "password"
                }},
                function(err,httpResponse,body){
                    if(body && body !== undefined){
                        body = JSON.parse(body);
                        authorization.token_type = body.token_type;
                        authorization.access_token = body.access_token;
                        authorization.token = body.token_type + ' ' + body.access_token;

                        resolve(authorization);
                    }
                    else {
                        reject(new Error('There has been an error during the authentication process'));
                    }
                });
            }
            else { resolve(authorization); }
        }
        else { resolve(authorization); }
    });
}


module.exports = { authenticate: authenticate,  authorization: authorization }; /* Object short notation is only available in ES6 :( */
