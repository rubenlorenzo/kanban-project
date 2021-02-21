import React from "react";
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
}

export default AddTask;
