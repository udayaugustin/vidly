import React, { Component } from "react";

class ListGroup extends Component {
  state = {};
  render() {
    const {
      items,
      valueProperty,
      textProperty,
      onItemSelect,
      selectedItem,
    } = this.props;

    return (
      <ul className="list-group">
        {items.map((item) => {
          return (
            <li
              key={item[valueProperty]}
              onClick={() => onItemSelect(item)}
              className={
                selectedItem[valueProperty] === item[valueProperty]
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {item[textProperty]}
            </li>
          );
        })}
      </ul>
    );
  }
}

ListGroup.defaultProps = { textProperty: "name", valueProperty: "_id" };

export default ListGroup;
