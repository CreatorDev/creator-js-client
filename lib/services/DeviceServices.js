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

    DeviceServices.getClientByName = function(clientName, callback) {
        return RC.request.call(RC, {
            steps: ['clients', {Name: clientName}]
        }, callback);
    };

    return DeviceServices;
};