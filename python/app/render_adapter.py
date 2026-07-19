"""HTML/URL render helpers built on Flask/Werkzeug 1.1.x.

Upgrade intent: pinned to Flask 1.1.4 / Werkzeug 1.0.1 (CVE-2023-30861,
CVE-2023-25577). Bumping to Flask 2.3/3.x removes ``flask.Markup`` and
``werkzeug.urls.url_quote`` (and ``before_first_request``), so the imports
below fail on the major upgrade and the tests break as designed.
"""

import flask
from flask import Markup  # removed in Flask 2.3+
from werkzeug.urls import url_quote  # removed in Werkzeug 2.3+


def escape_html(s):
    """Return an HTML-escaped Markup string for ``s``."""
    return Markup.escape(s)


def quote_param(s):
    """URL-quote a single query/path parameter value."""
    return url_quote(s)


def flask_major():
    """Major version of the installed Flask (1 on the pinned stack)."""
    return int(flask.__version__.split(".")[0])
