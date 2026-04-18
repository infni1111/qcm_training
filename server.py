"""Serveur Flask minimal pour le front CCNA Training.

Pour l'instant, ne sert que des fichiers statiques (index.html, app.js, data.js,
style.css). L'API/back sera ajouté au step 2.
"""

from pathlib import Path

from flask import Flask, send_from_directory

ROOT = Path(__file__).resolve().parent

app = Flask(__name__, static_folder=None)


@app.route("/")
def index():
    return send_from_directory(ROOT, "index.html")


@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(ROOT, filename)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
