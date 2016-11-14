// config 
module.exports = {

    // API Points
    defaultHost: 'https://deviceserver.flowcloud.systems',
    defaultAuthEndpoint: '/oauth/token',

    // Error Messages
    INVALID_KEYS_ERROR: 'Client requires valid access key and secret to be set explcitly or via the CREATOR_LOGIN_KEY and CREATOR_LOGIN_SECRET environment variables.',
    STEPS_ERROR: 'Follow flag is set to true by default, accordingly you either have to set it to false or provide steps.',
    FOLLOW_FLAG_ERROR: 'Follow flag has been set to false, accordingly you have to provide an absolute URL.',
    ONLY_RELATIVE_ERROR: 'Please only provide relative endpoints for the relativeEntryPoint option.',

    // Caching
    cachePeriod: 100,
    checkPeriod: 120,

};