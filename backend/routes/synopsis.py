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
        return jsonify({"error": "Failed to fetch synopsis result"}), 500
    
    if result is None:
        file_path = 'final_synopsis.txt'
        # output_json_path = '../mock/Output/output_sections.json'
        response = split_text_sections(file_path)
        logger.info("Synopsis result received")

        time.sleep(10) # Simulate a long process

        return jsonify(response), 200
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

def get_trained_result(pdf_name):
    """Get the trained result"""
    url = f"http://{LOCALMACHINEADDR}/getTrainedResult/{pdf_name}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            logger.error(f"Error fetching trained result: {response.status_code}")
            return None
    except Exception as e:
        logger.error(f"Request failed: {e}")
        return None