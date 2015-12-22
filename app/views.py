from flask import render_template, jsonify

from app import app
from models import Show, Episode

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route("/api/new-episodes/")
def new_episodes():
    data = {
     "items": []
    }
    for episode in Episode.query.filter_by(showcase=True).all():
        d = episode.to_api_dict()
        d['show'] = episode.getShow()
        data["items"].append(d)
    return jsonify(data)

@app.route("/api/shows/")
def shows():
    shows_dict = {
     "shows": []
    }
    for show in Show.query.order_by('name').all():
        shows_dict["shows"].append(show.to_api_dict())
    return jsonify(shows_dict)

@app.route("/api/shows/<slug>")
def episodes(slug):
    show = Show.query.filter_by(slug=slug).first()
    show_dict = show.to_api_dict()
    show_dict['episodes'] = []
    for episode in show.get_episodes():
        show_dict['episodes'].append(episode.to_api_dict())
    return jsonify(show_dict)