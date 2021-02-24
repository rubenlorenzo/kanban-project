import React from "react";
import { connect } from "react-redux";
import validatorBoardName from "./validatorBoardName";
import { FaReply } from "react-icons/fa";

class AddBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let { name } = this.state;

    return (
      <div className="addBoard">
        <input
          className="inputName"
          value={name}
          onChange={this.handleChange}
          onKeyUp={this.handleSubmit}
        ></input>
        <button onClick={(e) => this.props.undoAddBoard(e)}>
          <FaReply />
        </button>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  async handleSubmit(e) {
    if (e.keyCode === 13 && e.target.value.trim()) {
      let { result, message } = validatorBoardName(
        this.props.boards,
        this.state.name
      );

      if (result) {
        await this.props.addBoard(this.state.name);
        this.props.updateBoards(this.props.boards);
        this.props.undoAddBoard();
      } else {
        alert(message);
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.boards.boards,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addBoard: (name) =>
    dispatch({
      type: "ADD_BOARD",
      name: name,
      id: Date.now(),
      edit: false,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBoard);
