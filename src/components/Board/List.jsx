import React from "react";
import { FaPlus } from "react-icons/fa";

const List = (props) => {
  return (
    <div className="list">
      <div className="titleList">
        <h4>
          {props.name}
        </h4>
        <button>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default List;
