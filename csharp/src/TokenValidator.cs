// Upgrade intent: pinned to System.IdentityModel.Tokens.Jwt 6.15.0 (CVE-2024-21319).
// The documented fix is the 6 -> 7 major upgrade, which changes default claim
// mapping and moves toward the async ValidateTokenAsync API. This adapter
// deliberately uses the 6.x synchronous ValidateToken(...) style so the pinned
// major is asserted by tests; the bump to 7.x flips IdentityModelMajor() to 7.

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace BaselineDeps;

/// <summary>
/// Thin adapter over JwtSecurityTokenHandler using the 6.x synchronous flow.
/// </summary>
public sealed class TokenValidator
{
    private const string Issuer = "baseline-deps-issuer";
    private const string Audience = "baseline-deps-audience";

    /// <summary>
    /// Creates an HS256-signed JWT with the given subject claim.
    /// </summary>
    public string CreateHs256(string secret, string subject)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var descriptor = new SecurityTokenDescriptor
        {
            Issuer = Issuer,
            Audience = Audience,
            Subject = new ClaimsIdentity(new[] { new Claim(JwtRegisteredClaimNames.Sub, subject) }),
            SigningCredentials = credentials,
        };

        var handler = new JwtSecurityTokenHandler();
        var token = handler.CreateJwtSecurityToken(descriptor);
        return handler.WriteToken(token);
    }

    /// <summary>
    /// Validates the token (6.x synchronous ValidateToken, throws on invalid)
    /// and returns the subject claim value.
    /// </summary>
    public string GetSubject(string secret, string token)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

        var parameters = new TokenValidationParameters
        {
            ValidIssuer = Issuer,
            ValidAudience = Audience,
            IssuerSigningKey = key,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = false,
        };

        var handler = new JwtSecurityTokenHandler();
        // 6.x style: synchronous, throws on failure, yields the validated token.
        var principal = handler.ValidateToken(token, parameters, out SecurityToken validated);
        _ = validated;

        // In 6.x the "sub" claim is mapped to ClaimTypes.NameIdentifier by default;
        // read the JWT token directly to stay robust across mapping differences.
        var jwt = (JwtSecurityToken)validated;
        return jwt.Subject
            ?? principal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
            ?? principal.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? throw new SecurityTokenException("Missing subject claim.");
    }

    /// <summary>
    /// Major version of the loaded IdentityModel JWT assembly (6 while pinned).
    /// </summary>
    public static int IdentityModelMajor()
        => typeof(JwtSecurityTokenHandler).Assembly.GetName().Version!.Major;
}
