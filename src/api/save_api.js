import axios from "axios";

const BASE_URL = "http://127.0.0.1:5001/save"; // for local testing

export class SaveAPI {
  static async save_data(payload) {
    return await axios.post(`${BASE_URL}`, payload); // for local testing
  }
}
