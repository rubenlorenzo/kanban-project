import React from "react";
import { FaPlus } from "react-icons/fa";

const List = (props) => {
  return (
    <div
      className="list"
      onDragStart={(e) => props.dragStart(e, props.index, props.id)}
      onDragOver={(e) => props.dragEnter(e, props.index, props.id)}
      onDragEnd={props.dragEnd}
      draggable
    >
      <div className="titleList">
        <h4>{props.name}</h4>
        <button>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default List;
