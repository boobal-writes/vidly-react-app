import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  items,
  keyProperty,
  textProperty,
  onItemSelect,
  allItemsLabel,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      <li
        className={"list-group-item" + (!selectedItem ? " active" : "")}
        onClick={() => onItemSelect(null)}
      >
        {allItemsLabel}
      </li>
      {items.map((item) => (
        <li
          key={item[keyProperty]}
          className={
            "list-group-item" +
            (selectedItem && item[keyProperty] === selectedItem[keyProperty]
              ? " active"
              : "")
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  keyProperty: "_id",
  textProperty: "name",
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  allItemsLabel: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
};

export default ListGroup;
