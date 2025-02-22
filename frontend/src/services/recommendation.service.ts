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
  sendKeywordQuery(keyword: string) {
    try {
      return axios.post(`${url}/keyword`, { keyword });
    } catch (error) {
      console.log('Error sending keywords: ', error);
    }
  }
};

export default recommendationService;
