from app import db

class Show(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, unique=True)
    episodes = db.relationship('Episode', backref='show', lazy='dynamic')

    def __repr__(self):
        return '<Show %r>' % (self.name)

    def get_episodes(self):
        return Episode.query.filter_by(show_id=self.id).all()

    def to_api_dict(self):
        return {
            "name": self.name,
            "num_episodes": len(self.get_episodes()),
        }

class Episode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, unique=True)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    show_id = db.Column(db.Integer, db.ForeignKey('show.id'))

    def to_api_dict(self):
        return {
            "name": self.name,
            "start_time": self.start_time,
            "end_time": self.end_time,
        }

    def __repr__(self):
        return '<Episode %r>' % (self.name)