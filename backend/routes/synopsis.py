from flask import Flask, request, jsonify, send_from_directory, Blueprint, request
from werkzeug.utils import secure_filename
import os
import time
import logging
from werkzeug.exceptions import RequestEntityTooLarge

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

@synopsis.route('/summaries', methods=['GET'])
def summaries():
    """Get all summaries"""
    file_path = 'final_synopsis.txt'
    # output_json_path = '../mock/Output/output_sections.json'
    response = split_text_sections(file_path)

    time.sleep(10) # Simulate a long process

    return jsonify(response), 200