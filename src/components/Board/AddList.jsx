import React from "react";
import { connect } from "react-redux";
import validatorListName from "./validatorListName";
import { FaReply } from "react-icons/fa";

class AddList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: "",
      boardId:props.boardId,
      lists:props.lists,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.boardId !== state.boardId) {
      return {
        name:"",
        boardId: props.boardId,
        lists: props.lists,
      };
    }

    return null;
  }

  render() {
    return (
      <div id="addList">
        <div className="titleList">
          <input
            className="inputName"
            type="text"
            value={this.state.name}
            placeholder="nueva lista"
            onChange={this.handleChange}
            onKeyUp={(e) => this.handleSubmit(e, this.state.boardId)}
          ></input>
          <button className="undoEditList" onClick={() => this.props.undoAddList()}>
            <FaReply />
          </button>
        </div>
      </div>
    );
  }

  handleChange = (event) =>{
    this.setState({ name: event.target.value });
  }

  handleSubmit = async (e,boardId) => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      let { result, message } = validatorListName(
        this.props.lists,
        this.state.name,
        this.state.boardId
      );
        
      if (result) {
        await this.props.addList(this.state.name,boardId);
        this.props.undoAddList();
      } else {
        alert(message);
      }
    }
  };
}

const mapDispatchToProps = (dispatch) => ({
  addList: (name, boardId) =>
    dispatch({
      type: "ADD_LIST",
      id: Date.now(),
      name,
      boardId,
    }),
});

export default connect(null, mapDispatchToProps)(AddList);
