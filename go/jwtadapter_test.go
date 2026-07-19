package main

import "testing"

func TestJWTRoundTrip(t *testing.T) {
	const secret = "s3cr3t"
	const subject = "user-42"

	token, err := SignHS256(secret, subject)
	if err != nil {
		t.Fatalf("SignHS256: %v", err)
	}

	got, err := ParseHS256(secret, token)
	if err != nil {
		t.Fatalf("ParseHS256: %v", err)
	}
	if got != subject {
		t.Fatalf("subject mismatch: got %q want %q", got, subject)
	}
}
