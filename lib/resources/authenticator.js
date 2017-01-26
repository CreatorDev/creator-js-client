/**
 @module resources/Authenticator
 This module gets the Client authenticated against the Creator Device Server
 using the access key and secret pair - and lets the client do authenticated calls
 by appending an access token field into the Client (super_) class
 */

var p = require('promise'),
    request = require('request'),
    config = require('./config');
    __async__ = require('asyncawait/async');
    __await__ = require('asyncawait/await');

/* Global authorization obj */
var authorization = {
    'token_type': null, 'access_token': null, 'token': null
};

var authorizationPending = false;

/* @method authenticate
    * @param {key, secret} the key and secret access keys
    * @return {Promise} when resolved, returns valid session data or rejects if authentication failed
    * @public
*/
var authenticate = (__async__(function authenticate(key, secret) {

	return new p(function (resolve, reject) {
        if (key && secret) {
            while (authorizationPending) {
                __await__(sleep(500));
            }
            if (authorization.token === null) {
                authorizationPending = true;
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
                        authorizationPending = false;
                        setTimeout(clearToken, body.expires_in*1000);
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
}));


function clearToken() {
    authorization.access_token = null;
    authorization.token = null;
    authorization.token_type = null;
}

function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms);});
}




module.exports = { authenticate: authenticate,  authorization: authorization }; /* Object short notation is only available in ES6 :( */
