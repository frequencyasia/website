from app import app

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title="Frequency Asia")

@app.route("/shows")
def shows():
    return render_template('shows.html', title="Frequency Asia")