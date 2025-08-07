import axios from "axios";

const BASE_URL = "http://127.0.0.1:5001/fillblank"; // for local testing

export class FillBlankAPI {
  static async fill_blank_data() {
    return await axios.post(`${BASE_URL}`); // for local testing
  }
}
