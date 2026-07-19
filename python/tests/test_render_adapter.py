from app.render_adapter import escape_html, flask_major, quote_param


def test_flask_major_is_pinned():
    # Pins the major version. On the Flask 2/3 bump the module-level imports
    # (Markup, url_quote) raise ImportError, so this test never runs green.
    assert flask_major() == 1


def test_escape_html_escapes_markup():
    assert str(escape_html("<b>")) == "&lt;b&gt;"


def test_quote_param_encodes_space():
    assert quote_param("a b") == "a%20b"
