from flask import Flask, request, jsonify, send_from_directory, Blueprint, request
from werkzeug.utils import secure_filename
import os
import time
import logging
from config import (
    LOCALMACHINEADDR,
)
import requests
import random

timeline = Blueprint('timeline', __name__, static_folder='uploads')
list_of_files = ["dummy-data0.json", "dummy-data1.json", "dummy-data2.json", "dummy-data3.json"]
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('TimelineFetch') 
logger.info("Timeline fetch registered")
TIMELINE_DATA_FOLDER = os.path.join(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'mock'), 'TimelineData')
os.makedirs(TIMELINE_DATA_FOLDER, exist_ok=True)

@timeline.route('/')
def index():
    """Serve the index page"""
    return jsonify({"message": "Timeline API"}), 200

@timeline.route('/getTimelineData', methods=['GET'])
def get_timeline_data():
    random_index = random.randint(0, 3)
    file_path = list_of_files[random_index]
    logger.info(f"folder: {TIMELINE_DATA_FOLDER}")
    logger.info(f"Timeline data file selected: {file_path}")
    return send_from_directory(TIMELINE_DATA_FOLDER, file_path), 200
