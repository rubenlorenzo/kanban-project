import React from "react";
import { FaPlus } from "react-icons/fa";

class List extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div
        className="list"
        onDragStart={(e) => this.props.dragStart(e, this.props.index, this.props.id)}
        onDragOver={(e) => this.props.dragEnter(e, this.props.index, this.props.id)}
        onDragEnd={this.props.dragEnd}
        draggable
      >
        <div className="titleList">
          <h4>{this.props.name}</h4>
          <button>
            <FaPlus />
          </button>
        </div>
      </div>
    );
  }
};

export default List;
