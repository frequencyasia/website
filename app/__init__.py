from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

from app import views, models

# ADMIN STUFF
admin = Admin(app, name='microblog', template_mode='bootstrap3')
admin.add_view(ModelView(models.Show, db.session))
admin.add_view(ModelView(models.Episode, db.session))
