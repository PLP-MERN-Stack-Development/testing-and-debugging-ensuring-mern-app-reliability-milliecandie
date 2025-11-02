import { useState } from "react";

export default function App() {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState("");

  const addBug = () => {
    if (title.trim() === "") return; // don't add empty titles
    setBugs([...bugs, { id: Date.now(), title }]);
    setTitle("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Bug Tracker</h2>
      <input
        placeholder="Enter bug title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addBug}>Add Bug</button>

      <ul>
        {bugs.length === 0 ? (
          <p>No bugs reported yet</p>
        ) : (
          bugs.map((bug) => <li key={bug.id}>{bug.title}</li>)
        )}
      </ul>
    </div>
  );
}