import React, { useState } from "react";

const SearchBar = ({ setSearchQuery }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(input);
  };

  return (
    <form onSubmit={handleSearch} style={styles.searchBar}>
      <input
        type="text"
        placeholder="Search emails..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Search
      </button>
    </form>
  );
};

// Inline styles
const styles = {
  searchBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    marginBottom: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    marginRight: "10px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
  },
};

export default SearchBar;
