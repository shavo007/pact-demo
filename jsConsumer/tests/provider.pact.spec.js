describe("Client", function() {

	var projectsProvider;

	beforeAll(function(done) {

		projectsProvider = Pact({
			consumer: 'JS Consumer',
			provider: 'provider1'
		})
		// required for slower Travis CI environment
		setTimeout(function() {
			done()
		}, 2000)

		// Required if run with `singleRun: false`
		projectsProvider.removeInteractions()
	});

	afterAll(function(done) {
		projectsProvider.finalize()
			.then(function() {
				done()
			}, function(err) {
				done.fail(err)
			})
	});

	describe("Should greet provider", function() {
		beforeAll(function(done) {

			projectsProvider.addInteraction({
				uponReceiving: 'a greeting by awd',
				withRequest: {
					method: 'GET',
					path: '/greetings/awd'
				},
				willRespondWith: {
					status: 200,
					headers: {
						"Content-Type": "application/json"
					},
					body: {
						salutation: "Mr.",
						name: "awd"
					}
				}
			}).then(function() {
				done()
			}, function(err) {
				done.fail(err)
			});
		})

		it("with awd", function(done) {
			//Run the tests
			sendHelloRequest('awd')
				.then(function(data) {
					console.log("data is " + JSON.stringify(data.responseText));
					expect(JSON.parse(data.responseText)).toEqual({
						salutation: "Mr.",
						name: "awd"
					});
					done()
				})
				.catch(function(err) {
					done.fail(err)
				})
		});

		// verify with Pact, and reset expectations
		it('successfully verifies', function(done) {
			projectsProvider.verify()
				.then(function(a) {
					done()
				}, function(e) {
					done.fail(e)
				})
		})


	})
});

function sendHelloRequest(name) {

	//Makes a synchronous request
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:1234/greetings/' + name, false);
	xhr.send();

	return Promise.resolve(xhr);
}
