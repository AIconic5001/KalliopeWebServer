import os
import logging
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
# from werkzeug.utils import secure_filename
from routes.files import localFiles as files_blueprint
from routes.test import test as test_blueprint
from routes.synopsis import synopsis as synopsis_blueprint
# Create Flask app
app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register blueprints
app.register_blueprint(files_blueprint, url_prefix='/api/files')
app.register_blueprint(test_blueprint, url_prefix='/api/test')
app.register_blueprint(synopsis_blueprint, url_prefix='/api/synopsis')


@app.route('/')
@cross_origin()
def home():
    return jsonify({"message": "Frontend placeholder"})


if __name__ == '__main__':
    app.run(debug=True, port=8000)