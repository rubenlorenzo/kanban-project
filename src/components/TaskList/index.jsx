import React from "react";
import "./TaskList.scss";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="taskList">
        <ul>
          <li>Tarea1</li>
          <li>Tarea2</li>
          <li>Tarea3</li>
        </ul>
      </nav>
    );
  }
}

export default TaskList;
