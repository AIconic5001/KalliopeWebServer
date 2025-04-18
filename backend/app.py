import os
import logging
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
# from werkzeug.utils import secure_filename
from routes.files import localFiles as files_blueprint
from routes.test import test as test_blueprint
from routes.synopsis import synopsis as synopsis_blueprint
from routes.recommendations import recommendations as recommendations_blueprint
from routes.citations import citations as citations_blueprint
from routes.timeline import timeline as timeline_blueprint
# Create Flask app
app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register blueprints
app.register_blueprint(files_blueprint, url_prefix='/api/files')
# app.register_blueprint(test_blueprint, url_prefix='/api/test')
app.register_blueprint(synopsis_blueprint, url_prefix='/api/synopsis')
app.register_blueprint(recommendations_blueprint, url_prefix='/api/recommendations')
app.register_blueprint(citations_blueprint, url_prefix='/api/citations')
app.register_blueprint(timeline_blueprint, url_prefix='/api/timeline')


@app.route('/')
@cross_origin()
def home():
    return jsonify({"message": "Frontend placeholder"})


if __name__ == '__main__':
    app.run(debug=True, port=5000)