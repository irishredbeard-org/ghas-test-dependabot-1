package com.example;

import java.util.Map;

import org.apache.commons.text.StringSubstitutor;

/**
 * EASY upgrade target (commons-text 1.9, CVE-2022-42889 "Text4Shell").
 *
 * <p>Upgrade intent: bumping to 1.10.0 is a drop-in patch. This adapter only
 * performs plain {@code ${name}} placeholder replacement and never enables the
 * script/url/dns interpolators, so the substitution behavior is unaffected.
 */
public class TextAdapter {

    /**
     * Replaces {@code ${key}} placeholders in {@code template} using {@code values}.
     * Uses a plain map-backed substitutor -- no default string lookups / interpolators.
     */
    public String substitute(String template, Map<String, String> values) {
        StringSubstitutor substitutor = new StringSubstitutor(values);
        return substitutor.replace(template);
    }
}
