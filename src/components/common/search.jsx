import React from "react";

const SearchBox = ({ onSearch, ...rest }) => {
  return (
    <input
      onChange={(e) => onSearch(e)}
      {...rest}
      placeholder="Search..."
    ></input>
  );
};

export default SearchBox;
