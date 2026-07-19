"""HTTP retry policy built on urllib3 1.24.1.

Upgrade intent: pinned to urllib3 1.24.1 (CVE-2023-45803). urllib3 2.x renames
the ``method_whitelist`` kwarg to ``allowed_methods`` and drops
``HTTPResponse.getheaders()``. ``build_retry`` uses the old kwarg, so it raises
TypeError on 2.x and the tests break as designed.
"""

import urllib3
from urllib3.util.retry import Retry


def build_retry():
    """Build a Retry policy that retries GET and POST up to 3 times."""
    return Retry(total=3, method_whitelist=["GET", "POST"])  # renamed in 2.x


def urllib3_major():
    """Major version of the installed urllib3 (1 on the pinned stack)."""
    return int(urllib3.__version__.split(".")[0])
