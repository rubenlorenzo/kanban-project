import React from "react";
import { FaReply } from "react-icons/fa";

class AddList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="addList" ref={this.props.onAddList}>
        <div className="titleList">
          <input className="inputName" type="text"></input>
          <button onClick={() => this.props.onShowAddList(false)}>
            <FaReply  />
          </button>
        </div>
      </div>
    );
  }
}

export default AddList;
