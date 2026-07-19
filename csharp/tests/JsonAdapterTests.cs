using BaselineDeps;
using Xunit;

namespace BaselineDeps.Tests;

public class JsonAdapterTests
{
    private sealed record Widget(string Name, int Count);

    [Fact]
    public void RoundTrip_PreservesValues()
    {
        var adapter = new JsonAdapter();
        var original = new Widget("gizmo", 7);

        var json = adapter.Serialize(original);
        var restored = adapter.Deserialize<Widget>(json);

        Assert.Equal(original, restored);
    }
}
