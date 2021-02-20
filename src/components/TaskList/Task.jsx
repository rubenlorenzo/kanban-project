import React from "react";

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: props.task,
    }
  }

  render() {
    const { name } = this.state.task;
    return (
        <li>{name}</li>
    );
  }
}

export default Task;