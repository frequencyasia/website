from flask import render_template, jsonify

from app import app
from models import Show, Episode, ArtistTag, CityTag, CountryTag

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/new-episodes/")
def new_episodes():
    # Return all episodes with showcase set to True.
    data = {
     "items": []
    }
    for episode in Episode.query.filter_by(showcase=True).all():
        if episode.published and episode.has_started():
            d = episode.to_api_dict()
            d['show'] = episode.getShow()
            d['show_slug'] = episode.getShowSlug()
            d['image'] = episode.getImage()
            data["items"].append(d)
    return jsonify(data)

@app.route("/api/shows/")
def shows():
    shows_dict = {
     "shows": []
    }
    for show in Show.query.order_by('name').all():
        if show.published:
            shows_dict["shows"].append(show.to_api_dict())
    return jsonify(shows_dict)

@app.route("/api/shows/<slug>")
def episodes(slug):
    show = Show.query.filter_by(slug=slug).first()
    show_dict = show.to_api_dict()
    show_dict['episodes'] = []
    for episode in show.get_episodes():
        if episode.published and episode.has_started():
            show_dict['episodes'].append(episode.to_api_dict())
    return jsonify(show_dict)

@app.route("/api/tags/artist")
def artist_tags_list():
    tags = [tag.to_api_dict() for tag in ArtistTag.query.all()]
    tags = sorted(tags, key=lambda k: k['name'].lower())
    return jsonify({'tags': tags})

@app.route("/api/tags/country")
def country_tags_list():
    tags = [tag.to_api_dict() for tag in CountryTag.query.all()]
    tags = sorted(tags, key=lambda k: k['name'].lower())
    return jsonify({'tags': tags})

@app.route("/api/tags/city")
def city_tags_list():
    tags = [tag.to_api_dict() for tag in CityTag.query.all()]
    tags = sorted(tags, key=lambda k: k['name'].lower())
    return jsonify({'tags': tags})

@app.route("/api/tags/artist/<slug>")
def artist_tags(slug):
    tag = ArtistTag.query.filter_by(slug=slug).first()
    return jsonify({
        'name': tag.name,
        'episodes': tag.get_episodes(),
    })

@app.route("/api/tags/city/<slug>")
def city_tags(slug):
    tag = CityTag.query.filter_by(slug=slug).first()
    return jsonify({
        'name': tag.name,
        'episodes': tag.get_episodes(),
    })

@app.route("/api/tags/country/<slug>")
def country_tags(slug):
    tag = CountryTag.query.filter_by(slug=slug).first()
    return jsonify({
        'name': tag.name,
        'episodes': tag.get_episodes(),
    })

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def page_error(e):
    return render_template('500.html'), 500