import React from "react";
import { connect } from "react-redux";
import validatorBoardName from "../BoardList/validatorBoardName";
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
      <div id="addList" ref={this.props.onAddList}>
        <div className="titleList">
          <input
            className="inputName"
            type="text"
            value={this.state.name}
            placeholder="nueva lista"
            onChange={this.handleChange}
            onKeyUp={(e) => this.handleSubmit(e, this.state.boardId)}
          ></input>
          <button onClick={() => this.props.onShowAddList(false)}>
            <FaReply />
          </button>
        </div>
      </div>
    );
  }

  handleChange = (event) =>{
    console.log(this.props.boardId,this.state.boardId);
    this.setState({ name: event.target.value });
  }

  handleSubmit = async (e,boardId) => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      let { result, message } = validatorBoardName(
        this.state.lists,
        this.state.name
      );
        
      if (result) {
        await this.props.addList(this.state.name,boardId);
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
