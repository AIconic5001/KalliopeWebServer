import axios from 'axios';
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
  },
  getDemoRecommendations() {
    try {
      return axios.get(`${url}/getDemoRecommendations`);
    } catch (error) {
      console.log('Error getting demo recommendations: ', error);
    }
  }
};

export default recommendationService;
