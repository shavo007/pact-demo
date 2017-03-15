const gulp = require('gulp');
const pact = require('@pact-foundation/pact-node');
const path = require('path');

var opts = {
    pactUrls: [path.resolve(process.cwd(), 'pacts')],             // Array of local Pact files or directories containing them. Required.
    pactBroker: 'http://localhost',
    consumerVersion: '1.0'            // URL to fetch the provider states for the given provider API. Optional.
};

var Server = require('karma').Server;

gulp.task('createPacts', function (done) {

    new Server({
        configFile:  __dirname + '/karma.conf.js',
        singleRun: true
    }, shutdownPactServer).start();

    function shutdownPactServer() {
        pact.removeAllServers();
        done();
    };
});

gulp.task('publishPacts', ['createPacts'], function (done) {
    pact.publishPacts(opts).then(function () {
        console.log('Pacts published to broker');
    }).finally(function () {
        done();
    });
});

gulp.task('pact', ['createPacts', 'publishPacts']);
