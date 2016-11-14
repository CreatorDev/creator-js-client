/**
 @module DeviceServices
  This module presents a higher-level API for interacting with devices
  within the Creator DeviceServer.
*/

var utils = require('../resources/utils'),
    RestClient = null;


module.exports = function (RC) {
    RestClient = RC; /* Import RC */

    function DeviceServices() { /* Placeholder */ }

    DeviceServices.getClients = function(callback) {
        return RC.request.call(RC, {
            steps: ['clients']
        }, callback);
    };

    DeviceServices.getClientInstances = function(client, callback){
        return RC.request.call(RC, {
            steps: ['clients', {Name: client.Name}, 'objecttypes']
        }, callback);
    };

    DeviceServices.getInstanceResources = function(instance, callback){
        var instanceSelf = utils.getRelativeURL(instance.Links[0].href); 
        if(instanceSelf) {
            return RC.request.call(RC, {
                relativeEntryPoint: instanceSelf,
                steps: ['instances']
            }, callback);
        }
        else {
            throw 'Absolute URL error';
        }
    };

    return DeviceServices;
};