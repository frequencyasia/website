from flask import render_template, jsonify

from app import app
from models import Show

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route("/api/shows/")
def shows():
    shows_dict = {
     "shows": []
    }
    for show in Show.query.all():
        print(show)
        shows_dict["shows"].append(show.to_api_dict())
    return jsonify(shows_dict)