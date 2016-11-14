/**
 @module resources/Navigator
 
 This module implements a navigator that can be used to 
 follow certain steps within the API to consturct a final URL 
 to perform an action on.
 */

var p = require('promise'),
    request = require('request'),
    rp = require('request-promise'),
    nc = require( "node-cache" ),
    config = require('./config');

/* init cache */
var mCache = new nc ({ stdTTL: config.cachePeriod, checkperiod: config.checkPeriod  });

/* Public exposed getURL() function */
module.exports.getURL = function(steps, authorization, relativeEntryPoint) {
    var _steps = (typeof steps === 'string') ? steps.split(",") : steps;
    return new p(function (resolve, reject) {
        var entryPoint = relativeEntryPoint ? config.defaultHost + relativeEntryPoint : config.defaultHost;
        return navigate(entryPoint, _steps, authorization, resolve, reject);
    });
};

/*
* Private navigate() function that handles caching and returns a request-promise
*/
function navigate(url, _steps, authorization, resolve, reject) {
    var cacheKey = url + authorization.token.replace(' ', '');
    var cachedData = mCache.get(cacheKey);
    
    if(cachedData !== undefined) {
        // Parse and forward onto navigateSteps
        cachedData = JSON.parse(cachedData); 
        navigateSteps(cachedData, _steps, authorization, resolve, reject);
    }
    else {
        rp({
            url: url,
            headers: {
                'Authorization' : authorization.token
            }
        }).then(function(data){
            if(data){
                try {
                    JSON.parse(data);
                } catch (error) {
                    throw('Web service has returned an invalid JSON.');
                }

                // Store in the cache
                mCache.set(cacheKey, data);
                
                // Parse and forward onto navigateSteps
                data = JSON.parse(data);
                navigateSteps(data, _steps, authorization, resolve, reject);    
            }  
            else {
                
            }
        }).catch(function (error) {
            throw(error);
        });
    }
}

/* Private navigateSteps() function that provides the actual navigation through the HATEOAS links */
function navigateSteps(data, _steps, authorization, resolve, reject){
        if(data && typeof _steps[0] === 'object'){
            var keyToLook = Object.keys(_steps[0]);
            if(data.Items) {
                data.Items.some(function (item, index) {
                    if(_steps[0] && _steps[0][keyToLook] === item[keyToLook]) { // Match the dataType   
                        _steps.shift();
                        if(_steps.length === 0) {
                            resolve(item.Links[0].href); // self href
                            return true; // .some() 
                        }
                        else {
                            navigate(item.Links[0].href, _steps, authorization, resolve, reject);
                            return true; // .some() 
                        }
                    }
                    else {
                        if(index + 1 == data.Items.length){
                            throw('You have objects available in this resource group but the filter {' + keyToLook + ": " + _steps[0][keyToLook] + '} did not return a valid result. Please note data types matter.');
                        }
                    }
                });
            }
            else {
                throw('{' + keyToLook + ': '+ _steps[0][keyToLook] +'} could not be found in the payload. You don\'t have any objects in this resource group.');
            }
        }
        else if(data.Links){
            var Links = data.Links;
            Links.some(function(link, index) {
                if(_steps[0] === link.rel) {
                    _steps.shift();
                    if(_steps.length === 0) {
                        resolve(link.href);
                        return true; // .some() 
                    }
                    else {
                        navigate(link.href, _steps, authorization, resolve, reject);
                        return true; // .some() 
                    }
                }
                else if(index + 1 == Links.length){
                    throw('The Link you specified could not be found in the payload');
                }
            });
        }
        else {
            throw('The link you specified could not be found in the payload. Please check host, relativeEntryPoint and steps options.');
        }
}