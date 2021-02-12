import React from "react";
import { connect } from "react-redux";
import validatorBoardName from "./validatorBoardName";
import { FaPlus } from "react-icons/fa";

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
      <div className="add">
        <div className="addBoard">
          <input
            className="inputName"
            value={name}
            onChange={this.handleChange}
          ></input>
          <span onClick={() => this.handleSubmit()}>
            <FaPlus />
          </span>
        </div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  async handleSubmit() {
    let { result, message } = validatorBoardName(
      this.props.boards,
      this.state.name
    );

    if (result) {
      await this.props.addBoard(this.state.name);
      this.props.updateBoards(this.props.boards);
    } else {
      alert(message);
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
      payload: name,
      id: Date.now(),
      edit: false,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBoard);
