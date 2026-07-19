package main

import "testing"

func TestFirstText(t *testing.T) {
	got, err := FirstText(`<div><p>  Hello, world  </p></div>`)
	if err != nil {
		t.Fatalf("FirstText: %v", err)
	}
	if got != "Hello, world" {
		t.Fatalf("got %q want %q", got, "Hello, world")
	}
}
