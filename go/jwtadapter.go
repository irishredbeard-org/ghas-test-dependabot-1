// Package main wraps github.com/dgrijalva/jwt-go, an abandoned library
// affected by CVE-2020-26160. There is no auto-fix: remediation is a MANUAL
// migration to github.com/golang-jwt/jwt/v5, which renames StandardClaims to
// RegisteredClaims and replaces the int64 Unix timestamps used below with
// *jwt.NumericDate. The StandardClaims/.Unix() usage here is the deliberate
// "complex" signal for that migration.
package main

import (
	"fmt"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

// SignHS256 issues an HS256-signed JWT for the given subject.
func SignHS256(secret string, subject string) (string, error) {
	claims := jwt.StandardClaims{
		Subject:   subject,
		ExpiresAt: time.Now().Add(time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

// ParseHS256 validates an HS256 token and returns its subject.
func ParseHS256(secret, token string) (string, error) {
	claims := &jwt.StandardClaims{}
	parsed, err := jwt.ParseWithClaims(token, claims, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return []byte(secret), nil
	})
	if err != nil {
		return "", err
	}
	if !parsed.Valid {
		return "", fmt.Errorf("invalid token")
	}
	return claims.Subject, nil
}
