# MeetSync

MeetSync is an AI-powered meeting assistant that extracts actionable to-dos and summaries from meeting conversations. It provides a seamless interface to search, edit, and manage tasks while also sending reminder emails before deadlines.

## Features

- **AI-Powered Extraction**: Automatically extracts to-dos and meeting summaries from conversations.
- **Text & Voice Search**: Search tasks using text or voice input.
- **Real-Time Transcription**: Displays transcribed meeting content in real time.
- **Task Management**: Edit extracted tasks, mark them as completed, and delete them as needed.
- **Pagination Support**: Easily navigate through tasks.
- **Email Reminders**: Sends email reminders one day before the task deadline.

## Tech Stack

### Frontend:
- React
- Tailwind CSS
- Voice Recognition API (for voice search)

### Backend:
- Node.js with Express
- MongoDB
- AI-powered text extraction module
- Nodemailer (for email reminders)

## API Endpoints

### Extraction
- `POST /extract` → Extracts to-dos & summary from a meeting conversation.

### Task Management
- `GET /todos` → Fetches all extracted to-dos.
- `DELETE /todos` → Deletes all to-dos.

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Thakurutkarsh07/meetsync.git
   cd meetsync
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=your_mongodb_uri
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   GOOGLE_API_KEY=gemini_api_key
   ```

4. Start the backend server:
   ```sh
   npm run server
   ```

5. Start the frontend:
   ```sh
   cd client
   npm start
   ```

## Usage
- Upload or input a meeting transcript.
- Let AI extract actionable to-dos and a summary.
- Search, edit, or delete tasks.
- Get automatic email reminders before deadlines.

## License
MIT License

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss the proposed changes.

## Contact
For any questions or support, reach out at [your-email@example.com](mailto:thakurutkarsh.0700@example.com).

