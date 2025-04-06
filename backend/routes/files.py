from flask import Flask, request, jsonify, send_from_directory, Blueprint, request, send_file
from werkzeug.utils import secure_filename
import os
import requests

import logging

import asyncio
import websockets
import json
from config import (
    LOCALMACHINEADDR,
)


# Create a blueprint for auth routes
localFiles = Blueprint('files', __name__, static_folder='uploads')

# Set the upload folder
# UPLOAD_FOLDER = 'uploads'
# ALLOWED_EXTENSIONS = {'pdf', 'docx'}
# Configuration
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg'}

# ngrok_url = "poor-parrots-tickle.loca.lt" # Replace with your ngrok URL
ngrok_url = LOCALMACHINEADDR
result ={}
# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('FileUpload')

# Create uploads directory if not exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
logger.info(f"Upload directory configured at: {UPLOAD_FOLDER}")


@localFiles.route('/')
def index():
    """Serve the index page"""
    return jsonify({"message": "File upload API"}), 200
    

@localFiles.route('/upload', methods=['POST'])
def upload_file():
    """Handle file uploads"""
    try:
        if 'file' not in request.files:
            logger.error("No file part in request")
            return jsonify({"error": "No file part"}), 400
            
        file = request.files['file']
        
        if file.filename == '':
            logger.error("Empty filename submitted")
            return jsonify({"error": "No selected file"}), 400

        if not (file and allowed_file(file.filename)):
            logger.error(f"Disallowed file type: {file.filename}")
            return jsonify({"error": "File type not allowed"}), 400
        # save the file
        filename = secure_filename(file.filename)
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        logger.info(f"Saving file: {filename}")
        file.save(save_path)
        logger.info(f"File saved successfully: {save_path}")
        
        # send the file to the ngrok server for processing and get the result
        result = send_post_req(save_path)
            
        
        return jsonify({
                "message": "File uploaded successfully",
                "filename": filename,
                'result': result
            }), 200
    except Exception as e:
        logger.error(f"Upload failed: {str(e)}")
        return jsonify({
            "error": "File upload failed",
            "details": str(e)
        }), 500


# helper

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def send_post_req(file_path):
    url = f'http://{ngrok_url}/uploadedFileTransaction'
    try:
        files = {'file': open(file_path, 'rb')}
        response = requests.post(url, files=files)

    except Exception as e :
        logger.error(f"Error sending file: {str(e)}")







