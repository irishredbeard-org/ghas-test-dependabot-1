# ghas-test-dependabot-1

A multi-language **Dependabot test fixture**. Every language folder is a real, buildable project
whose dependencies are pinned to **old versions with known CVEs**. Each dependency is wrapped in a
small adapter and covered by unit tests that are **green on the pinned versions**.

The dependencies deliberately mix two difficulty levels:

- **Easy** — the security fix is a patch/minor bump requiring **no code change**. The tests stay
  green straight through the upgrade, so these PRs are safe to auto-merge.
- **Complex** — the remediation is a **major-version upgrade that requires code refactoring** because
  of breaking API changes. The tests are written to **break** on the major bump (compile error,
  removed import, changed signature, or a pinned major-version assertion), so CI turns red and points
  at exactly what must be refactored.

## How the tests gate upgrades

`.github/workflows/ci.yml` builds and tests each language on every push/PR — this is the gate.
`.github/workflows/dependabot-auto-merge.yml` auto-merges `semver-patch` PRs once CI is green and
leaves majors for a human. To make auto-merge real, mark the CI checks **required** in branch
protection. (Adapter/anti-corruption-layer + characterization tests keep the blast radius of a
breaking upgrade localized to one small module.)

## Dependency catalog

| Ecosystem | Package | Pinned (old) | Upgrade target | CVE | Difficulty | What breaks / refactor needed |
|---|---|---|---|---|---|---|
| npm (js) | axios | 0.21.0 | 1.x | CVE-2023-45857 | **Complex** | `AxiosError`/`AxiosHeaders`, `paramsSerializer` becomes an object; error/normalization refactor |
| npm (js) | jsonwebtoken | 8.5.1 | 9.x | CVE-2022-23529 | **Complex** | 9.x rejects non-string/Buffer secrets & lax algorithms |
| npm (js) | lodash | 4.17.15 | 4.17.21 | CVE-2021-23337 | Easy | patch bump, no code change |
| npm (js) | minimist | 0.0.8 | 1.2.6 | CVE-2021-44906 | Easy | patch bump, no code change |
| npm (ts) | node-fetch | 2.6.1 | 3.x | CVE-2022-0235 | **Complex** | 3.x is **ESM-only** — `require()` breaks; import/module refactor |
| npm (ts) | chalk | 4.1.2 | 5.x | *(none)* | **Complex** | ESM-only major (non-security) — demonstrates version-vs-security updates |
| npm (ts) | json5 | 2.2.0 | 2.2.2 | CVE-2022-46175 | Easy | patch bump, no code change |
| pip | Flask / Werkzeug | 1.1.4 / 1.0.1 | 3.x | CVE-2023-30861 / CVE-2023-25577 | **Complex** | removes `flask.Markup`, `werkzeug.urls.url_quote`, `before_first_request` |
| pip | urllib3 | 1.24.1 | 2.x | CVE-2023-45803 | **Complex** | `Retry(method_whitelist=)`→`allowed_methods`; `.getheaders()` removed |
| pip | requests | 2.25.1 | 2.31.0 | CVE-2023-32681 | Easy | minor bump, no code change |
| pip | Pillow | 9.5.0 | 10.0.1 | CVE-2023-4863 | Easy | point release, no code change |
| maven | snakeyaml | 1.33 | 2.x | CVE-2022-1471 | **Complex** | `new Constructor(Class)`→`Constructor(Class, LoaderOptions)`; SafeConstructor default |
| maven | jackson-databind | 2.13.2 | 2.13.2.1 | CVE-2020-36518 | Easy | patch bump, no code change |
| maven | commons-text | 1.9 | 1.10.0 | CVE-2022-42889 | Easy | patch bump, no code change |
| gomod | github.com/dgrijalva/jwt-go | v3.2.0 | golang-jwt/jwt v5 | CVE-2020-26160 | **Complex** | abandoned pkg; **manual** migration — `StandardClaims`→`RegisteredClaims`/`NumericDate` |
| gomod | golang.org/x/text | 0.3.6 | 0.3.8 | CVE-2022-32149 | Easy | patch bump, no code change |
| gomod | golang.org/x/net | 0.15.0 | 0.23.0 | CVE-2023-45288 | Easy | minor bump, no code change |
| nuget | System.IdentityModel.Tokens.Jwt | 6.15.0 | 7.x | CVE-2024-21319 | **Complex** | 7.x changes default claim mapping; `ValidateToken`→`ValidateTokenAsync` |
| nuget | Newtonsoft.Json | 12.0.3 | 13.0.1 | CVE-2024-21907 | Easy | patch bump, no code change |

> **Honesty note:** for several complex entries the CVE also has an in-place fix on the old line
> (e.g. urllib3 `1.26.18`, node-fetch `2.6.7`) — Dependabot will offer that as a separate security
> update. The **major** bump listed above is the *refactoring* interest. The Go `jwt-go` case and any
> coordinate-rename migrations surface as **alerts** rather than automatic version-update PRs, because
> the module path / package identity changes.

## Layout

| Directory | Stack | Test command |
|---|---|---|
| `javascript/` | Node.js + Jest | `npm install && npm test` |
| `typescript/` | TypeScript + ts-jest | `npm install && npm test` |
| `python/` | Flask-era stack + pytest | `pip install -r requirements-dev.txt && pytest` |
| `java/` | Maven + JUnit 5 | `mvn -q test` |
| `go/` | Go modules + `go test` | `go mod tidy && go test ./...` |
| `csharp/` | .NET 8 + xUnit | `dotnet test tests/BaselineDeps.Tests.csproj` |
