import React from "react";
import { connect } from "react-redux";
import { FaReply } from "react-icons/fa";

class AddTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  render() {
    const { name } = this.state;

    return (
      <div className="addTask">
        <input
          type="text"
          className="inputName"
          value={name}
          onChange={this.handleChange}
          onKeyUp={(e) =>
            this.handleSubmit(e, name, this.props.boardId, this.props.listId)
          }
          placeholder="nueva tarea"
        ></input>
        <button onClick={() => this.props.undoAddTask()}>
          <FaReply />
        </button>
      </div>
    );
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = async (e, name, boardId, listId) => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      await this.props.addTask(this.state.name, boardId, listId);
      this.props.undoAddTask();
    }
  };
}

const mapDispatchToProps = (dispatch) => ({
  addTask: (name, boardId, listId) =>
    dispatch({
      type: "ADD_TASK",
      name: name,
      id: Date.now(),
      boardId: boardId,
      listId: listId,
    }),
});

export default connect(null, mapDispatchToProps)(AddTask);
