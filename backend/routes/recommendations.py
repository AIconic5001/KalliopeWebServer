from flask import Flask, request, jsonify, send_from_directory, Blueprint, request
import os
import time
import logging
import requests
from config import (
    LOCALMACHINEADDR,
)


recommendations = Blueprint('recommendations', __name__)

MOCK_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'mock')
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('RecommendationsFetch')
logger.info("Recommendations fetch registered")
logger.info(f"Upload directory configured at: {MOCK_FOLDER}")


@recommendations.route('/', methods=['GET'])
def recommendationList():
    """Get all recommendations"""
    # TODO: Change to a dynamic file path or web socket
    file_path = 'recommendations_mock.json'
    time.sleep(2) # Simulate a long process
    
    return send_from_directory(MOCK_FOLDER, file_path), 200


@recommendations.route('/query', methods=['POST'])
def query():
    try:
        query = request.json['query']
        logger.info(f"Received query: {query}")
        post_query(query)  # Send the query to the model
    except Exception as e:
        logger.error(f"Error processing query: {e}")
        return jsonify({"error": "Failed to process query"}), 400
    return jsonify({"message": "Query received"}), 200

@recommendations.route('/getRecommendations', methods=['GET'])
def get_recommendations():
    """Get recommendations"""
    result = get_recommendations_result()
    try:
        while (result is None):
            logger.info("Waiting for recommendations result...")
            time.sleep(60)
            result = get_recommendations_result()  
        logger.info("Recommendations result received")
    except Exception as e:
        logger.error(f"Error fetching recommendations result: {e}")
        return jsonify({"error": "Failed to fetch recommendations result"}), 500
    return jsonify(result), 200


def post_query(query):
    """Post a query to the model"""
    url = f"http://{LOCALMACHINEADDR}/uploadQuery"
    try:
        response = requests.post(url, json={"query": query})
        if response.status_code == 200:
            logger.info("Query posted successfully")
        else:
            logger.error(f"Failed to post query: {response.status_code}")
    except Exception as e:
        logger.error(f"Error posting query: {e}")
        return jsonify({"error": "Failed to post query"}), 500

def get_recommendations_result():
    """Get the recommendations result"""
    url = f"http://{LOCALMACHINEADDR}/getQueryResult"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            logger.info("Recommendations result received")
            return response.json()
        else:
            logger.error(f"Failed to fetch recommendations result: {response.status_code}")
            return None
    except Exception as e:
        logger.error(f"Error fetching recommendations result: {e}")
        return None