/**
 @module Metrics Services
  This module presents a higher-level API for interacting with metrics
  within the Creator Device Server.
*/

var utils = require('../resources/utils'),
    RestClient = null;


module.exports = function (RC) {
    RestClient = RC; /* Import RC */

    function MetricsServices() { /* Placeholder */ }

    MetricsServices.getUserMetrics = function(callback) {
        return RC.request.call(RC, {
            steps: ['metrics']
        }, callback);
    };

    MetricsServices.getClientMetrics = function(clientName, callback) {
        return RC.request.call(RC, {
            steps: ['clients', {Name: clientName}, 'metrics']
        }, callback);
    };

    return MetricsServices;
};