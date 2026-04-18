"""Flask server for the CCNA Training React app.

Serves the Vite build output from ./dist.
Build first:   npm install && npm run build
Then run:      python3 server.py       (binds 0.0.0.0:8080)
"""

from pathlib import Path

from flask import Flask, send_from_directory

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"

app = Flask(__name__, static_folder=None)


@app.route("/")
def index():
    return send_from_directory(DIST, "index.html")


@app.route("/<path:filename>")
def static_files(filename):
    # Vite hashes asset filenames so we can serve them directly.
    # Falls back to index.html if the file doesn't exist (SPA routing).
    target = DIST / filename
    if target.is_file():
        return send_from_directory(DIST, filename)
    return send_from_directory(DIST, "index.html")


if __name__ == "__main__":
    if not DIST.is_dir():
        raise SystemExit(
            f"{DIST} not found. Run `npm install && npm run build` first."
        )
    app.run(host="0.0.0.0", port=8080, debug=True)
