import { useEffect, useState } from "react";
import { Clipboard, Send, Mail } from "lucide-react";
import { useLocation } from "react-router-dom";

const EmailPage = () => {
  const location = useLocation();
  const todos = location.state?.todos || [];
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (todos.length > 0) {
      generateEmails(todos);
    } else {
      setEmails([]);
    }
    setLoading(false);
  }, [todos]);

  const generateEmails = (todos) => {
    const sampleEmails = todos.flatMap((todo) => [
      {
        recipient: "team@company.com",
        subject: "📌 Project Update & Tasks",
        body: `Dear Team,\n\nHope you're doing well! Here’s a quick update on our progress:\n\n📌 Summary:\n${todo.summary || "No summary provided"}\n\n📝 Tasks:\n${todo.tasks?.map((task) => `- ${task.task} (Due: ${task.deadline?.split("T")[0]})`).join("\n") || "No tasks listed"}\n\n🚀 Let's stay on track and meet our deadlines!\n\nBest,\nProject Manager`,
      },
      {
        recipient: "manager@company.com",
        subject: "✅ Meeting Summary & Next Steps",
        body: `Hello Manager,\n\nHere’s the summary of our latest meeting:\n\n📌 Key Points:\n${todo.summary || "No summary available"}\n\n📝 Assigned Tasks:\n${todo.tasks?.map((task) => `- ${task.task}`).join("\n") || "No tasks"}\n\nBest Regards,\nThe Team`,
      },
      {
        recipient: "client@business.com",
        subject: "🔔 Client Review Update & Deadlines",
        body: `Dear Client,\n\nWe’re reaching out with an update on the upcoming review meeting.\n\n📌 Agenda:\n${todo.summary || "No agenda specified"}\n\n📝 Next Steps:\n${todo.tasks?.map((task) => `- ${task.task}`).join("\n") || "No pending tasks"}\n\nLooking forward to your feedback!\n\nBest,\nYour Company`,
      },
    ]);

    setEmails(sampleEmails);
  };

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(
      `To: ${email.recipient}\nSubject: ${email.subject}\n\n${email.body}`
    );
    alert("📋 Email copied to clipboard!");
  };

  const handleSendEmail = (email) => {
    alert(`✅ Email successfully sent to: ${email.recipient}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          📧 Generated Email Drafts
        </h1>

        {loading ? (
          <p className="text-gray-300 text-center">⏳ Loading emails...</p>
        ) : emails.length === 0 ? (
          <p className="text-gray-300 text-center">No emails available.</p>
        ) : (
          <div className="space-y-6">
            {emails.map((email, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
              >
                <p className="text-gray-900 font-semibold">
                  <Mail className="inline w-5 h-5 mr-2 text-blue-500" />
                  <strong>To:</strong> {email.recipient}
                </p>
                <p className="text-gray-900">
                  <strong>📌 Subject:</strong> {email.subject}
                </p>

                <div className="text-gray-700 mt-3 whitespace-pre-wrap border-l-4 border-blue-500 pl-4">
                  {email.body}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => copyToClipboard(email)}
                  >
                    <Clipboard className="w-5 h-5" />
                    Copy
                  </button>

                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                    onClick={() => handleSendEmail(email)}
                  >
                    <Send className="w-5 h-5" />
                    Send
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailPage;
