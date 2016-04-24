from flask import render_template, jsonify, request
from urlparse import urljoin
from werkzeug.contrib.atom import AtomFeed

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

@app.route("/api/schedule/")
def schedule():
    # Returns Episodes scheduled in next 14 days
    data = {}
    for episode in Episode.query.filter_by(published=True).all():
        if episode.in_next_14_days():
            d = episode.to_api_dict()
            d['show'] = episode.getShow()
            date = episode.start_time.strftime("%d-%m-%y")
            if date in data:
                data[date] += d
            else:
                data[date] = [d]
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

def make_external(url):
    return urljoin(request.url_root, url)

@app.route('/shows.atom')
def shows_feed():
    feed = AtomFeed('Frequency Asia - New Shows',
                    feed_url=request.url, url=request.url_root)
    episodes = Episode.query.order_by(Episode.start_time.desc()).all()
    for episode in episodes:
        if episode.has_started() and episode.is_published():
            feed.add(episode.name, unicode(episode.get_feed_content()),
                     content_type='html',
                     author=episode.getShow(),
                     url=make_external("/#shows/" + episode.getShowSlug() + "/" + episode.get_slug()),
                     updated=episode.start_time,
                     published=episode.start_time)
    return feed.get_response()

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def page_error(e):
    return render_template('500.html'), 500