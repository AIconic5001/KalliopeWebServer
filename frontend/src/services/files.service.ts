import axios from 'axios';
// const API_URL = '/api';
const filesService = {
  uploadFile(file: File) {
    const url = '/api/files/upload';
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getAllFiles() {
    const url = '/api/files/files';
    try {
      return axios.get(url);
    } catch (error) {
      console.error(error);
    }
  },

  getFileByName(name: string) {
    const url = `/api/files/${name}`;
    try {
      return axios.get(url);
    } catch (error) {
      console.error(error);
    }
  }
};

export default filesService;
