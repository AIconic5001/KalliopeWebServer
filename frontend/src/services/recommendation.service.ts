import axios from 'axios';
import { get } from 'http';
const url = '/api/recommendations';
const recommendationService = {
  sendQuery(query: string) {
    try {
      return axios.post(`${url}/query`, { query });
    } catch (error) {
      console.log('Error sending query: ', error);
    }
  },
  sendKeywordQuery(keyword: string) {
    try {
      return axios.post(`${url}/keyword`, { keyword });
    } catch (error) {
      console.log('Error sending keywords: ', error);
    }
  },
  getRecommendations() {
    try {
      return axios.get(`${url}`);
    } catch (error) {
      console.log('Error getting recommendations: ', error);
    }
  }
};

export default recommendationService;
