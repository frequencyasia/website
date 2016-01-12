import time
from datetime import datetime
from app import db

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
        return Episode.query.filter_by(show_id=self.id).all()

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
    show_id = db.Column(db.Integer, db.ForeignKey('show.id'))

    def has_started(self):
        if not self.start_time:
            return False
        return self.start_time >= datetime.now()

    def getShow(self):
        return Show.query.get(self.show_id).name

    def getShowSlug(self):
        return Show.query.get(self.show_id).slug

    def getImage(self):
        if self.image_path:
            return self.image_path
        return Show.query.get(self.show_id).get_image_path()

    def to_api_dict(self):
        return {
            "name": self.name,
            "episode_image": self.image_path,
            "tagline": self.tagline,
            "description": self.description,
            "start_time": time.mktime(self.start_time.timetuple()) * 1000,
            "end_time": time.mktime(self.end_time.timetuple()) * 1000,
            "mixcloud_link": self.mixcloud_link,
        }

    def __repr__(self):
        return self.name