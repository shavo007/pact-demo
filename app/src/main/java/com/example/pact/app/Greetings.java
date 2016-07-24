package com.example.pact.app;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Greetings {

    private String salutation = "Mr.";
    private String name;
}
