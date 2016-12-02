/**
 @module Subscription Services
  This module presents a higher-level API for interacting with subscriptions
  within the Creator Device Server.
*/

var utils = require('../resources/utils'),
    RestClient = null;


module.exports = function (RC) {
    RestClient = RC; /* Import RC */

    function SubscriptionServices() { /* Placeholder */ }

    SubscriptionServices.getUserSubscriptions = function(callback) {
        return RC.request.call(RC, {
            steps: ['subscriptions']
        }, callback);
    };

    SubscriptionServices.getClientSubscriptions = function(clientName, callback) {
        return RC.request.call(RC, {
            steps: ['clients', {Name: clientName}, 'subscriptions']
        }, callback);
    };

    return SubscriptionServices;
};