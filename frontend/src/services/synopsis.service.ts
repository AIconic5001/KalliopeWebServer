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
  getSummaries(pdf_name: string) {
    const url = `/api/synopsis/getSummaries?pdf_name=${pdf_name}`; // change this to the correct endpoint later

    try {
      return axios.get(url);
    } catch (error) {
      console.error(error);
    }
  },
  getDocInfo(pdf_name: string) {
    const url = `/api/synopsis/getDocInfo?pdf_name=${pdf_name}`; // change this to the correct endpoint later
    try {
      return axios.get(url);
    } catch (error) {
      console.error(error);
    }
  }
};

export default synopsisService;
