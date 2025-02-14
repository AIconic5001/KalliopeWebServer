import axios from "axios";

const synopsisService = {
  getSummaries() {
    const url = "/api/synopsis/summaries";
    try {
      return axios.get(url);
    } catch (error) {
      console.error(error);
    }
  },
};

export default synopsisService;
