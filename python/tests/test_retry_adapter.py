from app.retry_adapter import build_retry, urllib3_major


def test_urllib3_major_is_pinned():
    assert urllib3_major() == 1


def test_build_retry_allows_get():
    # On urllib3 1.x the allowed methods live on ``method_whitelist``.
    # On 2.x, build_retry() raises TypeError (renamed kwarg), so this breaks.
    retry = build_retry()
    assert "GET" in retry.method_whitelist
