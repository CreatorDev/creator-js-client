var config = require('./config'); 

/* Returns the relative URL from an absolute one
 * If and only if the absoluteURL is using the defaultHost 
 */
exports.getRelativeURL = function (absoluteURL){
    if(absoluteURL.indexOf(config.defaultHost) > -1 ){
        return absoluteURL.replace(config.defaultHost, '');
    }
    else return false;
};