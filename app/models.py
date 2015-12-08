from app import db

class Show(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(255))
    slug = db.Column(db.Unicode(255), index=True, unique=True)
    imagePath = db.Column(db.Unicode(255))
    description = db.Column(db.UnicodeText())
    frequency = db.Column(db.Unicode(255))
    episodes = db.relationship('Episode', backref='show', lazy='dynamic')

    def __repr__(self):
        return '<Show %r>' % (self.name)

    def get_episodes(self):
        return Episode.query.filter_by(show_id=self.id).all()

    def to_api_dict(self):
        return {
            "id": self.id,
            "slug": self.slug,
            "name": self.name,
            "num_episodes": len(self.get_episodes()),
            "frequency": self.frequency,
            "description": self.description,
            "imagePath": self.imagePath,
        }

class Episode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(255), index=True, unique=True)
    description = db.Column(db.UnicodeText())
    mixcloud_link = db.Column(db.UnicodeText())
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    showcase = db.Column(db.Boolean)
    show_id = db.Column(db.Integer, db.ForeignKey('show.id'))

    def to_api_dict(self):
        return {
            "name": self.name,
            "description": self.description,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "mixcloud_link": self.mixcloud_link,
        }

    def __repr__(self):
        return '<Episode %r>' % (self.name)