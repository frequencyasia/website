from app import db

class Show(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, unique=True)
    episodes = db.relationship('Episode', backref='show', lazy='dynamic')

    def __repr__(self):
        return '<Show %r>' % (self.name)

class Episode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, unique=True)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    show_id = db.Column(db.Integer, db.ForeignKey('show.id'))

    def __repr__(self):
        return '<Episode %r>' % (self.name)