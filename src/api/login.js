import axios from "axios";

const baseUrl = "http://localhost:3001/api";

export default {
  save: async function (login) {
    return axios.post(`${baseUrl}/save-login/`, login);
  },
  getById: async function (id) {
    return axios.get(`${baseUrl}/login/, ${id}`);
  },
  getAll: async function () {
    return axios.get(`${baseUrl}/logins`);
  },
};
