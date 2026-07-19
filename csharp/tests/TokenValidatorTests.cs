using BaselineDeps;
using Xunit;

namespace BaselineDeps.Tests;

public class TokenValidatorTests
{
    private const string Secret = "this-is-a-32-byte-minimum-hs256-secret!!";

    [Fact]
    public void IdentityModelMajor_IsSix_WhilePinned()
    {
        // Pins the major. The 6 -> 7 upgrade flips this to 7 and fails,
        // signaling that the JWT API surface (claim mapping / async) changed.
        Assert.Equal(6, TokenValidator.IdentityModelMajor());
    }

    [Fact]
    public void CreateThenGetSubject_RoundTrips()
    {
        var validator = new TokenValidator();

        var token = validator.CreateHs256(Secret, "user-123");
        var subject = validator.GetSubject(Secret, token);

        Assert.Equal("user-123", subject);
    }
}
