package com.example;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * EASY upgrade target (jackson-databind 2.13.2, CVE-2020-36518).
 *
 * <p>Upgrade intent: bumping to 2.13.2.1 is a drop-in patch; the round-trip
 * behavior exercised here is unaffected.
 */
public class JsonAdapter {

    private final ObjectMapper mapper = new ObjectMapper();

    /** Serializes any bean to a JSON string. */
    public String toJson(Object value) {
        try {
            return mapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Unable to serialize value to JSON", e);
        }
    }

    /** Deserializes a JSON string into an instance of the given type. */
    public <T> T fromJson(String json, Class<T> type) {
        try {
            return mapper.readValue(json, type);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Unable to deserialize JSON to " + type.getName(), e);
        }
    }
}
