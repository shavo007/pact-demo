describe("Client", function() {

  var projectsProvider;

  beforeAll(function(done) {

    projectsProvider = Pact({ consumer: 'JS Consumer', provider: 'provider1' })
    // required for slower Travis CI environment
    setTimeout(function () { done() }, 2000)
  });

  afterAll(function (done) {
    projectsProvider.finalize()
      .then(function () { done() }, function (err) { done.fail(err) })
  });

  describe("Should greet provider", function () {
    beforeEach(function (done) {

      projectsProvider.addInteraction({
        uponReceiving: 'a greeting by awd',
        withRequest: {
          method: 'get',
          path: '/greetings/awd'
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json" },
          body: { salutation: "Mr.", name: "awd"}
        }
      }).then(function () { done() }, function (err) { done.fail(err) });
    })

    it("with awd", function(done) {
      //Run the tests
      sendHelloRequest('awd')
        .then(projectsProvider.verify)
        .then(function (data) {
          expect(JSON.parse(data)).toEqual({ salutation: "Mr.", name: "awd"});
          done()
        })
        .catch(function (err) {
          done.fail(err)
        })
    });
  });

  function sendHelloRequest(name) {

    //Makes a synchronous request
    var xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:1234/greetings/' + name, false);
    xhr.send();

    return Promise.resolve(xhr);
  }
});
