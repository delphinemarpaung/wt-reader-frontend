import axios from "axios";

const BASE_URL = "http://127.0.0.1:5001/reminder"; // for local testing

export class ReminderAPI {
  static async reminder_data() {
    return await axios.post(`${BASE_URL}`); // for local testing
  }
}
