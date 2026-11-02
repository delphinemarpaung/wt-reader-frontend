# 📖 WT Reader — Frontend

[![Frontend Repository](https://img.shields.io/badge/Repository-wt--reader--frontend-blue?logo=github)](https://github.com/delphinemarpaung/wt-reader-frontend)
[![Backend Repository](https://img.shields.io/badge/Backend-wt--reader--backend-green?logo=github)](https://github.com/delphinemarpaung/wt-reader-backend)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The **WT Reader Frontend** is the client-side user interface for the WT Reader application, a specialized tool designed to help users learn Mandarin through reading Chinese comics and manga.

> 🔗 **Looking for the API & Backend Server?** Check out the [WT Reader Backend Repository](https://github.com/delphinemarpaung/wt-reader-backend).

---

## 🎯 Project Background

Learning a new language can be daunting, but reading native material like comics makes it engaging and fun. **WT Reader** is built specifically to bridge the gap for Mandarin learners wanting to read raw Chinese manga/comics. 

The application works by taking comic images, extracting the raw Chinese text using OCR (Optical Character Recognition), and breaking it down for the learner. It tokenizes the text and provides full sentence translations alongside individual word meanings. Within the app, users see the text cleanly separated, complete with **Pinyin** and definitions. To reinforce learning, users can save words to a personal **Vocabulary List** and test their knowledge with an interactive **Memory Game** that prompts them to type the correct word based on a comic panel.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Related Repositories](#-related-repositories)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Project Structure](#-project-structure)
- [Connecting to Backend](#-connecting-to-backend)
- [Building & Deployment](#-building--deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🖼️ **Immersive Comic Reader:** Responsive, mobile-friendly viewer for reading Chinese comics and manga.
- 🔤 **Interactive Text Breakdown:** Extracted OCR text is displayed with clear word separators, Pinyin overlays, and instant translations for both individual words and full sentences.
- 📚 **Personal Vocabulary List:** Users can easily save difficult or new words directly from the comic into a personalized vocabulary list for later review.
- 🧠 **Contextual Memory Game:** An interactive mini-game that shows a previously read comic panel and challenges the user to type the correct missing Mandarin word from memory.
- 🌙 **Theme Support:** Dark mode and light mode toggle for optimal reading comfort.
- ⚡ **Fast Loading:** Efficient client-side state management for smooth panel-to-panel transitions.

---

## 🛠 Tech Stack

- **Framework:** React / Next.js
- **Styling:** Tailwind CSS / CSS Modules
- **State Management:** Context API / Redux Toolkit / Zustand
- **HTTP Client:** Axios / Fetch API
- **Icons:** Lucide React / React Icons

---

## 🔗 Related Repositories

| Repository | Role | Link |
| :--- | :--- | :--- |
| **`wt-reader-frontend`** | Client Application | *(This Repo)* |
| **`wt-reader-backend`** | REST API & Core Services | [github.com/delphinemarpaung/wt-reader-backend](https://github.com/delphinemarpaung/wt-reader-backend) |

---

## 🚀 Getting Started

Follow these steps to get a local development instance up and running.

### Prerequisites

- **Node.js**: `v18.x` or higher
- **npm**, **yarn**, or **pnpm**
- Running instance of [WT Reader Backend](https://github.com/delphinemarpaung/wt-reader-backend)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/delphinemarpaung/wt-reader-frontend.git
   cd wt-reader-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` (or `.env`) file in the root directory and specify the URL of your backend API:

```env
# URL for the WT Reader Backend API
VITE_API_BASE_URL=http://localhost:5000/api
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` (or the port specified in your terminal) in your browser.

---

## 📂 Project Structure

```text
wt-reader-frontend/
├── public/              # Static assets (images, favicon, etc.)
├── src/
│   ├── components/      # UI components (Reader, VocabList, MemoryGame, Cards)
│   ├── context/         # Auth and Theme context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Route views / pages
│   ├── services/        # API service layer connecting to backend
│   ├── utils/           # Helper functions & Pinyin formatters
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Application entry point
├── .env.example         # Example environment variables template
├── package.json
└── README.md
```

---

## 📡 Connecting to Backend

This frontend communicates directly with the **[WT Reader Backend](https://github.com/delphinemarpaung/wt-reader-backend)** server, which handles the heavy lifting of OCR, tokenization, and translation.

- Ensure your backend API is running locally.
- Check that `CORS` is configured on the backend server to allow origins from your frontend's port.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.