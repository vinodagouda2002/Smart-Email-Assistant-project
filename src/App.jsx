import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // ✅ Import CSS

const App = () => {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("formal");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://smart-email-assistant-backend-ou5v.onrender.com", {
        emailContent,
        tone,
      });
      setGeneratedReply(response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setGeneratedReply("Error: " + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Smart Email Assistant</h1>

      <label>Email Content:</label>
      <textarea
        rows={8}
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
        placeholder="Paste your email here..."
      />

      <label>Tone:</label>
      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option value="formal">Formal</option>
        <option value="friendly">Friendly</option>
        <option value="concise">Concise</option>
        <option value="empathetic">Empathetic</option>
      </select>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Reply"}
      </button>

      <h3 style={{ marginTop: "2rem" }}>Generated Reply:</h3>
      <div className="generated-output">
        {generatedReply || "Your reply will appear here..."}
      </div>
    </div>
  );
};

export default App;