/**
 * @module RestClient
 *  This module presents a higher-level API for interacting with resources
 *  within the Creator DeviceServer.
 */

var _ = require('underscore'),
    util = require('util'),
    Client = require('./Client');

/**
 RestClient
    @constructor
    @inherits Client
    @extends services (service layer modules)
        @param {string} key - Login access key, as seen in the creator developer console
        @param {string} secret - Login access secret token, as seen in the creator developer console
        @param {object} options (optional) - optional config for the REST client
            - @member {string} host - host for the Creator Device Server REST API
**/

function RestClient(key, secret, options) {
    options = options || {};
    RestClient.super_.call(this, key, secret, options.host, options.timeout);

    /* Importing RestClient service layer modules */
    var deviceServices = require('./services/DeviceServices')(this);
    var metricsServices = require('./services/MetricsServices')(this);
    var resourceServices = require('./services/ResourceServices')(this);
    var subscriptionServices = require('./services/SubscriptionServices')(this);
    
    this.clients = deviceServices;
    this.metrics = metricsServices;
    this.resources = resourceServices;
    this.subscriptions = subscriptionServices;

    _.extend(this, deviceServices);
    _.extend(this, metricsServices);
    _.extend(this, resourceServices);
    _.extend(this, subscriptionServices);


}

util.inherits(RestClient, Client); /* RestClient should inherit Client */

RestClient.prototype.request = function(options, callback) {
    return RestClient.super_.prototype.request.call(this, options, callback);
};


module.exports = RestClient;
