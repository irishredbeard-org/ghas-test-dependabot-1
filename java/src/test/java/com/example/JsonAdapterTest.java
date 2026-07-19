package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;

class JsonAdapterTest {

    @Test
    void roundTripsMap() {
        JsonAdapter adapter = new JsonAdapter();

        Map<String, Object> original = new LinkedHashMap<>();
        original.put("name", "greybeard");
        original.put("port", 8080);

        String json = adapter.toJson(original);
        assertTrue(json.contains("\"name\":\"greybeard\""));

        @SuppressWarnings("unchecked")
        Map<String, Object> restored = adapter.fromJson(json, Map.class);

        assertEquals("greybeard", restored.get("name"));
        assertEquals(8080, restored.get("port"));
    }
}
