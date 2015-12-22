import os
import os.path

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask_admin import Admin, form
from flask_admin.form import rules
from flask_admin.contrib.sqla import ModelView

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)


# Create directory for file fields to use
file_path = os.path.join(os.path.dirname(__file__), 'static', 'files')
try:
    os.mkdir(file_path)
except OSError:
    pass

from app import views, models

class ShowView(ModelView):
    # Override form field to use Flask-Admin FileUploadField
    form_overrides = {
        'imagePath': form.FileUploadField
    }

    # Pass additional parameters to 'path' to FileUploadField constructor
    form_args = {
        'imagePath': {
            'label': 'Image',
            'base_path': file_path,
            'allow_overwrite': False
        }
    }

class EpisodeView(ModelView):
    # Override form field to use Flask-Admin FileUploadField
    form_overrides = {
        'image_path': form.FileUploadField
    }

    # Pass additional parameters to 'path' to FileUploadField constructor
    form_args = {
        'image_path': {
            'label': 'Image',
            'base_path': file_path,
            'allow_overwrite': False
        }
    }

# ADMIN STUFF
admin = Admin(app, name='microblog', template_mode='bootstrap3')
admin.add_view(ShowView(models.Show, db.session))
admin.add_view(EpisodeView(models.Episode, db.session))
