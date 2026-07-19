// Package main wraps golang.org/x/text. The pinned v0.3.6 is affected by
// CVE-2022-32149; remediation is a straightforward bump to v0.3.8+ with no
// code change required (the language API used here is stable).
package main

import "golang.org/x/text/language"

// CanonicalTag parses a BCP 47 language tag and returns its canonical form.
func CanonicalTag(tag string) (string, error) {
	t, err := language.Parse(tag)
	if err != nil {
		return "", err
	}
	return t.String(), nil
}
