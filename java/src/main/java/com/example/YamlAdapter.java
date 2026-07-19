package com.example;

import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.constructor.Constructor;

/**
 * COMPLEX upgrade target (snakeyaml 1.33, CVE-2022-1471).
 *
 * <p>Upgrade intent: bumping snakeyaml to 2.x removes the single-arg
 * {@code new Constructor(Class)} constructor (replaced by
 * {@code Constructor(Class, LoaderOptions)}) and defaults to a SafeConstructor.
 * The {@code new Constructor(Config.class)} call below fails to COMPILE on 2.x,
 * so the build breaks on the major bump -- that break is the intended signal.
 */
public class YamlAdapter {

    /**
     * Loads a small YAML document into a {@link Config} POJO.
     *
     * <p>Uses the single-arg {@code Constructor(Class)} removed in snakeyaml 2.x.
     */
    public Config load(String yaml) {
        Constructor constructor = new Constructor(Config.class);
        Yaml parser = new Yaml(constructor);
        return parser.load(yaml);
    }

    /**
     * Returns the major version of the snakeyaml implementation on the classpath.
     * Reads the version from the package's implementation version, guarded for null.
     */
    public static int snakeyamlMajor() {
        String version = new Yaml().getClass().getPackage().getImplementationVersion();
        if (version == null || version.isBlank()) {
            // Fallback: the pinned version in this fixture is 1.33.
            return 1;
        }
        String firstSegment = version.split("\\.")[0].trim();
        try {
            return Integer.parseInt(firstSegment);
        } catch (NumberFormatException e) {
            return 1;
        }
    }

    /** Simple POJO target for YAML binding. Public fields for snakeyaml. */
    public static class Config {
        public String name;
        public int port;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getPort() {
            return port;
        }

        public void setPort(int port) {
            this.port = port;
        }
    }
}
