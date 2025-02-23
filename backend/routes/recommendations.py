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
def recommendationList():
    """Get all summaries"""
    # TODO: Change to a dynamic file path or web socket
    file_path = 'recommendations_mock.json'
    time.sleep(2) # Simulate a long process
    
    return send_from_directory(MOCK_FOLDER, file_path), 200


@recommendations.route('/query', methods=['POST'])
def query():
    query = request.json['query']
    logger.info(f"Received query: {query}")
    # TODO: Implement query sending to the model
    return jsonify({"message": "Query received"}), 200