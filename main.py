
from flask import Flask, render_template

app = Flask(__name__, 
    static_folder='static',
    template_folder='musclecar/templates')

@app.route('/')
def index():
    return render_template('musclecar/index.html')

@app.route('/gallery')
def gallery():
    return render_template('musclecar/gallery.html')

@app.route('/history')
def history():
    return render_template('musclecar/history.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
