from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, 
           template_folder='templates',
           static_folder='static')

@app.route('/')
def home():
    return render_template('landing-page.html')

@app.route('/modules')
def modules():
    return render_template('index.html')

@app.route('/landing-page.html')
def landing_page():
    return render_template('landing-page.html')

@app.route('/simple-tenses')
def simple_tenses():
    return render_template('simple-tenses.html')

@app.route('/simple-tenses.html')
def simple_tenses_html():
    return render_template('simple-tenses.html')

@app.route('/continuous-tenses')
def continuous_tenses():
    return render_template('Continuous-Tenses.html')

@app.route('/Continuous-Tenses.html')
def continuous_tenses_html():
    return render_template('Continuous-Tenses.html')

@app.route('/perfect-tenses')
def perfect_tenses():
    return render_template('Perfect-Tenses.html')

@app.route('/Perfect-Tenses.html')
def perfect_tenses_html():
    return render_template('Perfect-Tenses.html')

@app.route('/perfect-continuous-tenses')
def perfect_continuous_tenses():
    return render_template('Perfect-Continuous-Tenses.html')

@app.route('/Perfect-Continuous-Tenses.html')
def perfect_continuous_tenses_html():
    return render_template('Perfect-Continuous-Tenses.html')

# Serve images
@app.route('/img/<path:filename>')
def serve_image(filename):
    return send_from_directory('img', filename)

# Serve sub_t content
@app.route('/sub_t/<path:filename>')
def serve_sub_t(filename):
    return send_from_directory('sub_t', filename)

# Handle all HTML files in sub_t directory structure
@app.route('/sub_t/Verbos/Verbos.html')
def verbos():
    return send_from_directory('sub_t/Verbos', 'Verbos.html')

@app.route('/sub_t/Could/<path:filename>')
def could_files(filename):
    return send_from_directory('sub_t/Could', filename)

@app.route('/sub_t/might/<path:filename>')
def might_files(filename):
    return send_from_directory('sub_t/might', filename)

@app.route('/sub_t/MUST/<path:filename>')
def must_files(filename):
    return send_from_directory('sub_t/MUST', filename)

@app.route('/sub_t/Should/<path:filename>')
def should_files(filename):
    return send_from_directory('sub_t/Should', filename)

@app.route('/sub_t/WOULD/<path:filename>')
def would_files(filename):
    return send_from_directory('sub_t/WOULD', filename)

@app.route('/sub_t/Tenses_Present/<path:filename>')
def tenses_present_files(filename):
    return send_from_directory('sub_t/Tenses_Present', filename)

@app.route('/sub_t/Tenses past/<path:filename>')
def tenses_past_files(filename):
    return send_from_directory('sub_t/Tenses past', filename)

@app.route('/sub_t/Tenses Future/<path:filename>')
def tenses_future_files(filename):
    return send_from_directory('sub_t/Tenses Future', filename)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
