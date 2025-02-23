import { useEffect, useState } from "react";
import { Clipboard, Send } from "lucide-react";

const EmailList = ({ todos }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (todos.length > 0) {
      generateEmails(todos);
    } else {
      setEmails([]); // Clear emails when no todos exist
    }
  }, [todos]);

  const generateEmails = (todos) => {
    if (!todos.length) return;

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
    alert(`📋 Email copied to clipboard!`);
  };

  const handleSendEmail = (email) => {
    alert(`✅ Email successfully sent to: ${email.recipient}`);
  };

  return (
    <div className="p-6 bg-white/30 shadow-lg rounded-lg w-full">
      <h2 className="text-2xl font-bold text-white mb-4">📧 Email Drafts</h2>

      {emails.length === 0 ? (
        <p className="text-gray-200">No email drafts available.</p>
      ) : (
        emails.map((email, index) => (
          <div key={index} className="bg-white p-5 rounded-lg mb-4 shadow-md">
            <p className="text-gray-900">
              <strong>📨 To:</strong> {email.recipient}
            </p>
            <p className="text-gray-900">
              <strong>📌 Subject:</strong> {email.subject}
            </p>

            <div className="text-gray-800 mt-3 whitespace-pre-wrap">{email.body}</div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                onClick={() => copyToClipboard(email)}
              >
                <Clipboard className="w-4 h-4" />
                Copy Email
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                onClick={() => handleSendEmail(email)}
              >
                <Send className="w-4 h-4" />
                Send Email
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EmailList;
