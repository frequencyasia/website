from flask import render_template

from app import app
from models import Show

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')