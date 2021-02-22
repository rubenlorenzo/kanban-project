import React from "react";
import { FaPlus, FaPen, FaReply, FaTrashAlt } from "react-icons/fa";

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
            ></input>
            <button className="undoEditTask" onClick={this.undoEditTask}>
              <FaReply/>
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

  editTask = (event) =>{
    this.setState({edit:true});
  }

  undoEditTask = (event) => {
    this.setState({edit:false});
  }
}

export default Task;
