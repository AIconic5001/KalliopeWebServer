import axios from 'axios';

const API_URL = '/api/citations/';

const citationService = {
  getAllCitations() {
    const url = `${API_URL}`;
    try {
      return axios.get(url);
    } catch (error) {
      console.log(error);
    }
  }
};

export default citationService;
