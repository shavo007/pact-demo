let pact = require('@pact-foundation/pact-node');
const path = require('path');


var opts = {
    pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],             // Array of local Pact files or directories containing them. Required.
    pactBroker: 'http://localhost',
    consumerVersion: '2.0.0',            // URL to fetch the provider states for the given provider API. Optional.
    pactBrokerUsername: 'shanelee007',
    pactBrokerPassword: 'password123',
    providerBaseUrl: 'http://localhost'
};

pact.publishPacts(opts).then(function () {
    console.log('Pacts published to broker');
});
