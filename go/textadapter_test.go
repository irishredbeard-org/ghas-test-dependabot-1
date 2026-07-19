package main

import "testing"

func TestCanonicalTag(t *testing.T) {
	got, err := CanonicalTag("en-US")
	if err != nil {
		t.Fatalf("CanonicalTag: %v", err)
	}
	if got != "en-US" {
		t.Fatalf("got %q want %q", got, "en-US")
	}

	if _, err := CanonicalTag("this-is-not-a-tag!!"); err == nil {
		t.Fatalf("expected error for invalid tag")
	}
}
