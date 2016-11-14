var assert = require('assert'); /* test dep */
var config = require('./config'); /* import access keys */

var creator = require('../lib')(config.accessKey, config.accessSecret);

describe('Testing the base request(); function', function() {
    describe('it works', function() {
        it('should return a valid versions object', function(done) {
            this.timeout(5000); // accounting for potential latency issues 
            creator.request({
                steps: ['versions']
            }, function(versions){
                assert.equal(typeof versions, "object");
                done();
            });
        });
    });
});

describe('Testing a service layer function getClients();', function() {
    describe('it works', function() {
        it('should return a valid clients wrapper object', function(done) {
            creator.clients.getClients(function(clients){
                assert.equal(typeof clients, "object");
                done();
            });
        });
    });
});