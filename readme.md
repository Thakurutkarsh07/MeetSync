# AI-Powered Meeting Task Extractor 📝🤖  

## Overview  
This project is an AI-powered application that extracts actionable tasks and a summary from a meeting conversation. It leverages Google’s **Gemini AI** to analyze text, extract todos with deadlines, and store them in **MongoDB**. The frontend, built with **React and Tailwind CSS**, provides an intuitive UI for managing tasks and viewing them in a calendar.  

## Features ✨  
- **AI-Powered Todo Extraction** – Automatically detects tasks, assigns deadlines, and tracks status.  
- **Meeting Summary Generation** – Generates a concise summary of discussions.  
- **Calendar Integration** – Displays tasks with due dates for easy tracking.  
- **Speech-to-Text Support** – Allows voice input for seamless task extraction.  
- **Real-Time Updates** – React frontend dynamically updates tasks.  
- **REST API** – Fetch, delete, and manage tasks via API endpoints.  

---  

## Screenshots 🖼️  

### 🔹 Task Extraction Page  
![Task Extraction](https://drive.google.com/file/d/1ChIcRtuzFurQfo-yNgzuztgkUrja3qxO/view?usp=drive_link)  

### 🔹 Calendar View  
![Calendar View](https://drive.google.com/file/d/1enNI-ozbtqNZhyclyyyCtek3jpGmqW8c/view?usp=sharing)  

### 🔹 Summary UI  
![Summary](https://drive.google.com/file/d/15AvoC2kPJHhgQskjgPUk1xpoeOcefHUj/view?usp=sharing)  


---  

## Tech Stack 🛠  

### Frontend:  
- **React** – For building an interactive UI  
- **Tailwind CSS** – For styling and responsiveness  
- **FullCalendar** – For displaying tasks in a calendar view  

### Backend:  
- **Node.js & Express** – For handling API requests  
- **Google Gemini AI** – For extracting tasks and generating summaries  
- **MongoDB** – For storing extracted tasks and summaries  
- **chrono-node** – For parsing natural language dates  

---  

## Installation & Setup 🚀  

### 1️⃣ Clone the repository  
```sh  
git clone https://github.com/your-username/your-repo.git  
cd your-repo  
```

### 2️⃣ Install dependencies  
```sh  
npm install  
```

### 3️⃣ Set up environment variables  
Create a `.env` file and add:  
```env  
GOOGLE_API_KEY=your_google_api_key  
MONGO_URI=your_mongodb_connection_string  
```

### 4️⃣ Start the backend server  
```sh  
npm run server  
```

### 5️⃣ Start the frontend  
```sh  
npm start  
```

---  

## API Endpoints 🌐  

### 🔹 Extract Todos & Summary  
**POST /api/extract**  
- **Request Body:**  
  ```json  
  {  
    "paragraph": "Meeting notes go here..."  
  }  
  ```  
- **Response:**  
  ```json  
  {  
    "message": "Todos extracted, summary generated, and saved!",  
    "summary": "Summary of the meeting...",  
    "todos": [  
      { "task": "Complete budget report", "status": "pending", "deadline": "2025-04-05" }  
    ]  
  }  
  ```  

### 🔹 Fetch All Todos  
**GET /api/todos/get-todos**  

### 🔹 Delete All Todos  
**DELETE /api/todos/delete**  

### 🔹 Delete a Task by ID  
**DELETE /api/todos/:summaryId/:taskId**  

---  

## Future Enhancements 🔮  
- ✅ **Email Reminders** for due tasks  
- ✅ **Real-time Collaboration** for team members  
- ✅ **Enhanced AI Processing** for better task extraction  

## Contributing 🤝  
Pull requests are welcome! If you'd like to contribute, please fork the repo and create a new branch for your feature.  


---  

### ⭐ If you find this project useful, please give it a star!  
