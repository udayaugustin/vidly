import React from "react";

const SearchBox = ({ name, onChange }) => {
  return (
    <div className="mb-3">
      <input
        name={name}
        id={name}
        placeholder="Search..."
        onChange={(e) => onChange(e.currentTarget.value)}
        className="form-control"
      />
    </div>
  );
};

export default SearchBox;
