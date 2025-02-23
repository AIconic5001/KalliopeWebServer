from flask import Flask, request, jsonify, send_from_directory, Blueprint, request
import os
import time
import logging


recommendations = Blueprint('recommendations', __name__)

MOCK_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'mock')
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('RecommendationsFetch')
logger.info("Recommendations fetch registered")
logger.info(f"Upload directory configured at: {MOCK_FOLDER}")


@recommendations.route('/', methods=['GET'])
def summaries():
    """Get all summaries"""
    file_path = 'recommendations_mock.json'

    # output_json_path = '../mock/Output/output_sections.json'
    # response = split_text_sections(file_path)

    time.sleep(2) # Simulate a long process
    
    return send_from_directory(MOCK_FOLDER, file_path), 200