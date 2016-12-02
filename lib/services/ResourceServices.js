/**
 @module ResourceServices
  This module presents a higher-level API for interacting with object resources
  within the Creator DeviceServer.
*/

var utils = require('../resources/utils'),
    RestClient = null;


module.exports = function (RC) {
    RestClient = RC; /* Import RC */

    function ResourceServices() { /* Placeholder */ }

    ResourceServices.getClientObjects = function(clientName, callback){
        return RC.request.call(RC, {
            steps: ['clients', {Name: clientName}, 'objecttypes']
        }, callback);
    };

    ResourceServices.getClientObject = function(clientName, objectID, callback){
        return RC.request.call(RC, {
            steps: ['clients', {Name: clientName}, 'objecttypes', {ObjectTypeID: objectID}]
        }, callback);
    };

    ResourceServices.getClientObjectInstanceByID = function(clientName, objectID, instanceID, callback){
        return RC.request.call(RC, {
            steps: ['clients', {Name: clientName}, 'objecttypes', {ObjectTypeID: objectID}, 'instances', {InstanceID: instanceID}]
        }, callback);
    };

    ResourceServices.writeClientObjectInstanceByID = function(clientName, objectID, instanceID, data, callback) {
        return RC.request.call(RC, {
            method: 'PUT',
            steps: ['clients', {Name: clientName}, 'objecttypes', {ObjectTypeID: objectID}, 'instances', {InstanceID: instanceID}],
            data: data
        }, callback);
    };

    return ResourceServices;
};