from flask import Flask, request, jsonify, send_from_directory, Blueprint, request
from werkzeug.utils import secure_filename
import os
import time
import logging
from config import (
    LOCALMACHINEADDR,
)
import requests

# import sys
# sys.path.append('../')
# print(sys.path)
from utils import split_text_sections

# Create a blueprint for auth routes
synopsis = Blueprint('synopsis', __name__, static_folder='uploads')

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('SynopsisFetch')
logger.info("Synopsis fetch registered")

@synopsis.route('/')
def index():
    """Serve the index page"""
    return jsonify({"message": "Synopsis API"}), 200

@synopsis.route('/getSummaries', methods=['GET'])
def get_summaries():
    result = get_synopsis_result()
    try:
        while (result is None):
            logger.info("Waiting for synopsis result...")
            time.sleep(60)
            result = get_synopsis_result()  
        logger.info("Synopsis result received")
    except Exception as e:
        logger.error(f"Error fetching synopsis result: {e}")
        return jsonify({"error": "Failed to fetch synopsis result"}), 500
    return jsonify(result), 200    

@synopsis.route('/summaries', methods=['GET'])
def summaries():
    """Get all summaries"""
    file_path = 'final_synopsis.txt'
    # output_json_path = '../mock/Output/output_sections.json'
    response = split_text_sections(file_path)

    time.sleep(10) # Simulate a long process

    return jsonify(response), 200


def get_synopsis_result():
    """Get the synopsis result"""
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
