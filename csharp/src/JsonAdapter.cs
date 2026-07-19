// Upgrade intent: pinned to Newtonsoft.Json 12.0.3 (CVE-2024-21907).
// The fix is a patch/minor bump to 13.0.1 with no code change required; the
// round-trip test stays green across the upgrade.

using Newtonsoft.Json;

namespace BaselineDeps;

/// <summary>
/// Thin adapter over Newtonsoft.Json's JsonConvert.
/// </summary>
public sealed class JsonAdapter
{
    public string Serialize(object value)
        => JsonConvert.SerializeObject(value);

    public T? Deserialize<T>(string json)
        => JsonConvert.DeserializeObject<T>(json);
}
