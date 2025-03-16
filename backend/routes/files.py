from flask import Flask, request, jsonify, send_from_directory, Blueprint, request, send_file
from werkzeug.utils import secure_filename
import os
import requests

import logging

import asyncio
import websockets
import json


# Create a blueprint for auth routes
localFiles = Blueprint('files', __name__, static_folder='uploads')

# Set the upload folder
# UPLOAD_FOLDER = 'uploads'
# ALLOWED_EXTENSIONS = {'pdf', 'docx'}
# Configuration
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg'}

# ngrok_url = "1861-129-137-96-12.ngrok-free.app"
ngrok_url = "localhost:8000"
result ={}
# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('FileUpload')

# Create uploads directory if not exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
logger.info(f"Upload directory configured at: {UPLOAD_FOLDER}")

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

        filename = secure_filename(file.filename)
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        logger.info(f"Saving file: {filename}")
        file.save(save_path)
        logger.info(f"File saved successfully: {save_path}")
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

# @localFiles.route('/files', methods=['GET'])
# def list_files():
#     """List uploaded files"""
#     try:
#         files = os.listdir(UPLOAD_FOLDER)
#         return jsonify({
#             "files": files,
#             "count": len(files)
#         })
#     except Exception as e:
#         logger.error(f"File list error: {str(e)}")
#         return jsonify({"error": "Could not retrieve files"}), 500

# @localFiles.route('/files/<filename>', methods=['GET'])
# def download_file(filename):
#     """Download a specific file"""
#     try:
#         return send_from_directory(
#             UPLOAD_FOLDER,
#             filename,
#             as_attachment=True
#         )
#     except FileNotFoundError:
#         logger.error(f"File not found: {filename}")
#         return jsonify({"error": "File not found"}), 404
#     except Exception as e:
#         logger.error(f"Download error: {str(e)}")
#         return jsonify({"error": "File download failed"}), 500






