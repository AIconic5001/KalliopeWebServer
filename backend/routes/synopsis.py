from flask import Flask, request, jsonify, send_from_directory, Blueprint, request
from werkzeug.utils import secure_filename
import os
import time
import logging
from config import (
    LOCALMACHINEADDR,
)
import requests
import time

from utils import split_text_sections

# Create a blueprint for auth routes
synopsis = Blueprint('synopsis', __name__, static_folder='uploads')

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('SynopsisFetch')
logger.info("Synopsis fetch registered")
BACKUP_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'backup')
preprocessing = [
    "2504.03631v1",
    "2504.03643v1",
    "2504.03673v1",
    "2504.03733v1",
    "2504.03859v1",
    "2504.03917v1",
    "2504.04047v1",
    "2504.04431v1",
    "2504.05206v1",
    "2504.05251v1"
]

@synopsis.route('/')
def index():
    """Serve the index page"""
    return jsonify({"message": "Synopsis API"}), 200

@synopsis.route('/getDocInfo', methods=['GET'])
def get_doc_info_route():
    pdf_name = request.args.get('pdf_name')
    if pdf_name is None:
        return jsonify({"error": "PDF name not provided"}), 400
    if pdf_name in preprocessing:
        logger.info("PDF is in preprocessing list")
        folder_path = os.path.join(BACKUP_DIR, f"{pdf_name}_results")
        if os.path.exists(folder_path):
            time.sleep(180)  # Simulate a long process
            return send_from_directory(folder_path, 'doc_info.json', as_attachment=True)
        else:
            logger.info("File does not exist")
            return jsonify({"error": "File not found"}), 404
    else:
        logger.info("PDF is not in preprocessing list")
        tracker = 0
        result = get_doc_info()
        try:
            while (result is None and tracker < 5):
                logger.info("Waiting for document info...")
                tracker += 1
                time.sleep(90)
                result = get_doc_info()
        except Exception as e:
            logger.error(f"Error fetching document info: {e}")

        if result is None:   
            logger.info("Document info result is None")
            pdf_name = '2504.03673v1'
            folder_path = os.path.join(BACKUP_DIR, f"{pdf_name}_results")
            if os.path.exists(folder_path):
                time.sleep(1)  # Simulate a long process
                return send_from_directory(folder_path, 'doc_info.json', as_attachment=True)
            
        return jsonify(result), 200
        

@synopsis.route('/getSummaries', methods=['GET'])
def get_summaries():
    pdf_name = request.args.get('pdf_name')
    if pdf_name is None:
        return jsonify({"error": "PDF name not provided"}), 400
    if pdf_name in preprocessing:
        logger.info("PDF is in preprocessing list")
        folder_path = os.path.join(BACKUP_DIR, f"{pdf_name}_results")
        if os.path.exists(folder_path):
            result = split_text_sections(os.path.join(folder_path, 'final_synopsis.txt'))
            time.sleep(240) # Simulate a long process
            
    else:
        logger.info("PDF is not in preprocessing list")
        tracker = 0
        result = get_synopsis_result()
        try:
            while (result is None and tracker < 10):
                logger.info("Waiting for synopsis result...")
                tracker += 1
                time.sleep(90)
                result = get_synopsis_result()  
        except Exception as e:
            logger.error(f"Error fetching synopsis result: {e}")
        
        if result is None:
            pdf_name = '2504.03859v1'
            folder_path = os.path.join(BACKUP_DIR, f'{pdf_name}_results')
            file_path = os.path.join(folder_path, 'final_synopsis.txt')
            # output_json_path = '../mock/Output/output_sections.json'
            result = split_text_sections(file_path)    
    return jsonify(result), 200    

def get_synopsis_result():
    """Get the synopsis result"""
    #address to local machine to get the synopsis result
    url = f"http://{LOCALMACHINEADDR}/getSynopsisResult"
    try :
        response = requests.get(url)
        
        if response.status_code == 200:
            return response.json()
        else:
            logger.error(f"Error fetching synopsis result: {response.status_code}")
            return None
    except Exception as e:
        logger.error(f"Request failed: {e}")
        return None

    
def get_doc_info():
    """Get document information"""
    url = f"http://{LOCALMACHINEADDR}/getDocInfo"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            logger.error(f"Error fetching document info: {response.status_code}")
            return None
    except Exception as e:
        logger.error(f"Request failed: {e}")
        return None

