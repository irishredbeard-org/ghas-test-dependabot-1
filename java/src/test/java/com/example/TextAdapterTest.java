package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;

class TextAdapterTest {

    @Test
    void substitutesPlaceholders() {
        TextAdapter adapter = new TextAdapter();

        Map<String, String> values = new HashMap<>();
        values.put("name", "greybeard");
        values.put("env", "prod");

        String result = adapter.substitute("Hello ${name} on ${env}", values);

        assertEquals("Hello greybeard on prod", result);
    }

    @Test
    void leavesUnknownPlaceholdersUntouched() {
        TextAdapter adapter = new TextAdapter();

        String result = adapter.substitute("value=${missing}", new HashMap<>());

        assertEquals("value=${missing}", result);
    }
}
