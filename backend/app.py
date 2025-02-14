import os
import logging
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
# from werkzeug.utils import secure_filename
from routes.files import localFiles as files_blueprint
from routes.test import test as test_blueprint
# Create Flask app
app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register blueprints
app.register_blueprint(files_blueprint, url_prefix='/api/files')
app.register_blueprint(test_blueprint, url_prefix='/api/test')

# # Initialize Flask app
# app = Flask(__name__, static_folder=None)
# CORS(app)

# Configuration
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

@app.route('/')
@cross_origin()
def home():
    return jsonify({"message": "Frontend placeholder"})
# def index():
#     return send_from_directory(app.static_folder, 'index.html')

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def serve(path):
#     """Serve static files for React app in production"""
#     if path != "" and os.path.exists(app.static_folder + '/' + path):
#         return send_from_directory(app.static_folder, path)
#     return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=8000)