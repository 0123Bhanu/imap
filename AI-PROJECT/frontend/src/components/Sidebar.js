import React from "react";

const Sidebar = ({ setFilter }) => {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.heading}>Filters</h3>
      <button style={styles.button} onClick={() => setFilter("")}>
        All Emails
      </button>
      <button style={styles.button} onClick={() => setFilter("Interested")}>
        Interested
      </button>
      <button style={styles.button} onClick={() => setFilter("Meeting Booked")}>
        Meeting Booked
      </button>
      <button style={styles.button} onClick={() => setFilter("Not Interested")}>
        Not Interested
      </button>
      <button style={styles.button} onClick={() => setFilter("Spam")}>
        Spam
      </button>
      <button style={styles.button} onClick={() => setFilter("Out of Office")}>
        Out of Office
      </button>
    </div>
  );
};

// Inline styles
const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRight: "1px solid #ddd",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    marginBottom: "15px",
    color: "#333",
    fontSize: "18px",
  },
  button: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default Sidebar;
