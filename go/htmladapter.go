// Package main wraps golang.org/x/net. The pinned v0.15.0 is affected by
// CVE-2023-45288; remediation is a straightforward bump to v0.23.0+ with no
// code change required (the html parsing API used here is stable).
package main

import (
	"strings"

	"golang.org/x/net/html"
)

// FirstText parses an HTML fragment and returns the first non-empty text node.
func FirstText(htmlStr string) (string, error) {
	root, err := html.Parse(strings.NewReader(htmlStr))
	if err != nil {
		return "", err
	}

	var found string
	var walk func(*html.Node)
	walk = func(n *html.Node) {
		if found != "" {
			return
		}
		if n.Type == html.TextNode {
			if text := strings.TrimSpace(n.Data); text != "" {
				found = text
				return
			}
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			walk(c)
		}
	}
	walk(root)

	return found, nil
}
