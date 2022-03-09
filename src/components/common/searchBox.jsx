import React from "react";

const SearchBox = ({ onSearch, ...rest }) => {
  return (
    <input
      id="query"
      name="query"
      type="text"
      className="form-control"
      onChange={(e) => onSearch(e.currentTarget.value)}
      {...rest}
      placeholder="Search..."
    ></input>
  );
};

export default SearchBox;
