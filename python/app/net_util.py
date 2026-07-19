"""Networking helpers built on requests 2.25.1 and Pillow 9.5.0.

Upgrade intent: pinned to requests 2.25.1 (CVE-2023-32681) and Pillow 9.5.0
(CVE-2023-4863). These are patch/minor security bumps with a stable public API,
so this module needs no code change across the upgrade.
"""

import PIL
import requests

# Default headers applied to every session this module builds.
DEFAULT_HEADERS = {
    "User-Agent": "ghas-test-dependabot/1.0",
    "Accept": "application/json",
}


def session_with_headers():
    """Return a configured requests.Session (no network calls performed)."""
    session = requests.Session()
    session.headers.update(DEFAULT_HEADERS)
    return session


def pillow_version():
    """Installed Pillow version as a string."""
    return PIL.__version__
