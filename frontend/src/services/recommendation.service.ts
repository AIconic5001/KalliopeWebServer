import axios from 'axios';
import theme from '../assets/theme';
const url = '/api/recommendations';
const recommendationService = {
  sendQuery(query: string) {
    try {
      return axios.post(`${url}/query`, { query });
    } catch (error) {
      console.log('Error sending query: ', error);
    }
  },

  getRecommendations() {
    try {
      // change this to the correct endpoint later
      // return axios.get(`${url}/`); // testing purposes
      return axios.get(`${url}/getRecommendations`);
    } catch (error) {
      console.log('Error getting recommendations: ', error);
    }
  }
};

export default recommendationService;
