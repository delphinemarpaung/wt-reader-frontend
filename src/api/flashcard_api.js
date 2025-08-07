import axios from "axios";

const BASE_URL = "http://127.0.0.1:5001/flashcard"; // for local testing

export class FlashcardAPI {
  static async flashcard_data(payload) {
    return await axios.post(`${BASE_URL}`, payload); // for local testing
  }
}
