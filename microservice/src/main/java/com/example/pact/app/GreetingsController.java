package com.example.pact.app;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class GreetingsController {

    @GetMapping(path = "/greetings/{name}")
    public Greetings greetings(@PathVariable("name") String name) {
        log.info("Greetings {}", name);

        return  Greetings.builder().name(name).salutation("Mr.").build();

    }
}
