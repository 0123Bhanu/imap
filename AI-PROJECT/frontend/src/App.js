import React, { useState } from "react";
import EmailList from "./components/EmailList";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [filter, setFilter] = useState("");

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.heading}>Email Aggregator</h1>
      <div style={styles.layout}>
        <Sidebar setFilter={setFilter} />
        <EmailList filter={filter} />
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  appContainer: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    padding: "20px",
  },
  heading: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px",
    marginTop: "20px",
  },
};

export default App;
