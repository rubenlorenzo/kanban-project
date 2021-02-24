import React from "react";
import { connect } from "react-redux";
import { FaPen, FaReply, FaTrashAlt } from "react-icons/fa";

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
      <li
        className="task"
        onDragStart={() => this.props.dragStart(task.id, task.listId)}
        draggable
      >
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
            <button
              className="deleteTask"
              onClick={() => this.deleteTask(task.id)}
            >
              <FaTrashAlt />
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

  deleteTask = async (id) => {
    let resultConfirm = window.confirm("Deseas eliminar la tarea");

    if (resultConfirm) {
      await this.props.deleteTask(id);
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

  deleteTask: (id) =>
    dispatch({
      type: "DELETE_TASK",
      id,
    }),
});

export default connect(null, mapDispatchToProps)(Task);
