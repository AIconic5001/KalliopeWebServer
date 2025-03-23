from flask import Flask, request, jsonify, send_from_directory, Blueprint
import os
import time
import logging


citations = Blueprint('citations', __name__)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('CitationsFetch')
MOCK_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'mock')

@citations.route('/', methods=['GET'])
def get_all_citations():
    # mock file path
    file_path = 'mockCitations.json'
    return send_from_directory(MOCK_FOLDER,
                               file_path), 200
