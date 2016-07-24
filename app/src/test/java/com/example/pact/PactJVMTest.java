package com.example.pact;

import au.com.dius.pact.consumer.Pact;
import au.com.dius.pact.consumer.dsl.PactDslJsonBody;
import org.junit.Rule;
import au.com.dius.pact.consumer.dsl.PactDslWithProvider;
import au.com.dius.pact.consumer.PactProviderRule;
import au.com.dius.pact.consumer.PactVerification;
import au.com.dius.pact.model.PactFragment;
import org.junit.Test;
import org.springframework.web.bind.annotation.RequestMethod;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.equalTo;


import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class PactJVMTest {

    @Rule
    public PactProviderRule mockProvider = new PactProviderRule("provider1", "localhost", 8080, this);


    @Pact(provider = "provider1", consumer = "consumer1")
    public PactFragment createFragment(PactDslWithProvider builder) {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json;charset=UTF-8");


        PactDslJsonBody bodyResponse = new PactDslJsonBody()
                .stringValue("name", "shane")
                .stringValue("salutation", "Mr.");

        return builder.uponReceiving("a request for Greetings")
                .path("/greetings/shane")
                .method(RequestMethod.GET.name())
                .willRespondWith()
                .headers(headers)
                .status(200).body(bodyResponse).toFragment();
    }

    @Test
    @PactVerification
    public void runTest() throws IOException {

        get("/greetings/shane").then().body("name", equalTo("shane"));
    }


}
