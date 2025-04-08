import axios from 'axios';

const synopsisService = {
  getDemoSummaries() {
    const url = '/api/synopsis/summaries'; // change this to the correct endpoint later
    // const url = '/api/synopsis/getSummaries';

    try {
      return axios.get(url);
    } catch (error) {
      console.error(error);
    }
  },
  getSummaries() {
    const url = '/api/synopsis/getSummaries'; // change this to the correct endpoint later

    try {
      return axios.get(url);
    } catch (error) {
      console.error(error);
    }
  }
};

export default synopsisService;
