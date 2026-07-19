package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class YamlAdapterTest {

    @Test
    void loadsYamlIntoConfigPojo() {
        String yaml = "name: greybeard\nport: 8080\n";

        YamlAdapter adapter = new YamlAdapter();
        YamlAdapter.Config config = adapter.load(yaml);

        assertEquals("greybeard", config.getName());
        assertEquals(8080, config.getPort());
    }

    @Test
    void reportsMajorVersionOne() {
        // Green on the 1.33 pin; a 2.x bump would not compile (Constructor(Class) removed).
        assertEquals(1, YamlAdapter.snakeyamlMajor());
    }
}
