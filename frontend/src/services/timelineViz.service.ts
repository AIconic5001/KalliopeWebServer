import axios from 'axios';

const timelineService = {
  getTimelineData() {
    const url = '/api/timeline/getTimelineData';
    try {
      return axios.get(url);
    } catch (error) {
      console.error(error);
    }
  }
};

export default timelineService;
