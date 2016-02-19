import time
from datetime import datetime, timedelta
from app import db


artist_tags = db.Table('artist_tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('artist_tag.id')),
    db.Column('episode_id', db.Integer, db.ForeignKey('episode.id'))
)

country_tags = db.Table('country_tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('country_tag.id')),
    db.Column('episode_id', db.Integer, db.ForeignKey('episode.id'))
)

city_tags = db.Table('city_tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('city_tag.id')),
    db.Column('episode_id', db.Integer, db.ForeignKey('episode.id'))
)

class Show(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(255))
    slug = db.Column(db.Unicode(255), index=True, unique=True)
    imagePath = db.Column(db.Unicode(255))
    description = db.Column(db.UnicodeText())
    frequency = db.Column(db.Unicode(255))
    published = db.Column(db.Boolean)
    episodes = db.relationship('Episode', backref='show', lazy='dynamic')
    tagline = db.Column(db.Unicode(255))

    def __repr__(self):
        return self.name

    def get_episodes(self):
        # Filter out unpublished and not played yet.
        return [ep for ep in Episode.query.filter_by(show_id=self.id, published=True).all() if ep.has_started()]

    def get_image_path(self):
        if self.imagePath:
            return self.imagePath
        return 'placeholder.png'

    def to_api_dict(self):
        return {
            "id": self.id,
            "slug": self.slug,
            "name": self.name,
            "num_episodes": len(self.get_episodes()),
            "frequency": self.frequency,
            "description": self.description,
            "imagePath": self.get_image_path(),
            "tagline": self.tagline,
        }

class Episode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(255), index=True, unique=True)
    tagline = db.Column(db.UnicodeText())
    description = db.Column(db.UnicodeText())
    mixcloud_link = db.Column(db.UnicodeText())
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    showcase = db.Column(db.Boolean)
    published = db.Column(db.Boolean)
    image_path = db.Column(db.Unicode(255))
    cities = db.relationship(
        'CityTag',
        secondary=city_tags,
        backref='episode')
    countries = db.relationship(
        'CountryTag',
        secondary=country_tags,
        backref='episode')
    artists = db.relationship(
        'ArtistTag',
        secondary=artist_tags,
        backref='episode')
    show_id = db.Column(db.Integer, db.ForeignKey('show.id'))

    def has_started(self):
        return self.start_time <= datetime.now()

    def in_next_14_days(self):
        return self.start_time > datetime.now().replace(hour=0,minute=0,second=0,microsecond=0) and self.start_time <= (datetime.now() + timedelta(days=14))

    def is_published(self):
        return self.published

    def getShow(self):
        return Show.query.get(self.show_id).name

    def getShowSlug(self):
        return Show.query.get(self.show_id).slug

    def getImage(self):
        if self.image_path:
            return self.image_path
        return Show.query.get(self.show_id).get_image_path()

    def getTags(self):
        return {
            'artists': [a.to_api_dict() for a in self.artists],
            'countries': [c.to_api_dict() for c in self.countries],
            'cities': [c.to_api_dict() for c in self.cities],
        }

    def to_api_dict(self):
        return {
            "name": self.name,
            "episode_image": self.image_path,
            "tagline": self.tagline,
            "description": self.description,
            "start_time": time.mktime(self.start_time.timetuple()) * 1000,
            "end_time": time.mktime(self.end_time.timetuple()) * 1000,
            "mixcloud_link": self.mixcloud_link,
            "tags": self.getTags(),
            "show_slug": self.getShowSlug(),
        }

    def __repr__(self):
        return self.name

class ArtistTag(db.Model):
    __tablename__ = 'artist_tag'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    slug = db.Column(db.Unicode(255), index=True, unique=True)

    def to_api_dict(self):
        return {
            'link': 'artist/' + self.slug,
            'name': self.name
        }

    def get_episodes(self):
        return [episode.to_api_dict() for episode in Episode.query.all() if self in episode.artists and episode.has_started() and episode.is_published()]

    def __repr__(self):
        return self.name

class CountryTag(db.Model):
    __tablename__ = 'country_tag'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    slug = db.Column(db.Unicode(255), index=True, unique=True)

    def get_episodes(self):
        return [episode.to_api_dict() for episode in Episode.query.all() if self in episode.countries and episode.has_started() and episode.is_published()]

    def to_api_dict(self):
        return {
            'link': 'country/' + self.slug,
            'name': self.name
        }

    def __repr__(self):
        return self.name

class CityTag(db.Model):
    __tablename__ = 'city_tag'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    slug = db.Column(db.Unicode(255), index=True, unique=True)

    def get_episodes(self):
        return [episode.to_api_dict() for episode in Episode.query.all() if self in episode.cities and episode.has_started() and episode.is_published()]

    def to_api_dict(self):
        return {
            'link': 'city/' + self.slug,
            'name': self.name
        }

    def __repr__(self):
        return self.name