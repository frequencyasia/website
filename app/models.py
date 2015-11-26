from app import db

class Show(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, unique=True)

    def __repr__(self):
        return '<Show %r>' % (self.name)