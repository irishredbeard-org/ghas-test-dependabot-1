from app.net_util import pillow_version, session_with_headers


def test_session_has_default_headers():
    session = session_with_headers()
    assert session.headers["User-Agent"] == "ghas-test-dependabot/1.0"
    assert session.headers["Accept"] == "application/json"


def test_pillow_version_is_string():
    assert isinstance(pillow_version(), str)
    assert pillow_version()
