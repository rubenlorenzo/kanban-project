import React from "react";
import { connect } from "react-redux";
import { FaPen, FaReply } from "react-icons/fa";

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      task: props.task,
      edit: false,
    };
  }

  render() {
    const { task, name, edit } = this.state;

    return (
      <li className="task">
        {edit ? (
          <>
            <input
              type="text"
              value={name}
              className="inputTaskNameEdit"
              placeholder={task.name}
              onChange={this.handleChange}
              onKeyUp={(e) => this.renameTask(e, task.id, name)}
            ></input>
            <button className="undoEditTask" onClick={this.undoEditTask}>
              <FaReply />
            </button>
          </>
        ) : (
          <>
            <span>{task.name}</span>
            <button className="editTask" onClick={this.editTask}>
              <FaPen />
            </button>
          </>
        )}
      </li>
    );
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  editTask = () => {
    this.setState({ edit: true });
  };

  undoEditTask = () => {
    this.setState({ edit: false });
  };

  renameTask = async (e, id, name) => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      await this.props.renameTask(id, name);
      this.undoEditTask();
    }
  };
}

const mapDispatchToProps = (dispatch) => ({
  renameTask: (id, name) =>
    dispatch({
      type: "RENAME_TASK",
      id,
      name,
    }),
});

export default connect(null, mapDispatchToProps)(Task);
