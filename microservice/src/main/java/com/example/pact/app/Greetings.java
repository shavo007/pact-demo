package com.example.pact.app;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Greetings {

    @Builder.Default
    private String salutation = "Mr.";
    private String name;
}
