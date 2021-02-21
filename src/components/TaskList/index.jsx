import React from "react";
import { connect } from "react-redux";
import Task from "./Task";
import "./TaskList.scss";

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: props.tasks,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.tasks.length !== state.tasks.length) {
      return {
        tasks: props.tasks,
      };
    }

    return null;
  }

  render() {
    return (
      <nav className="taskList">
        <ul>
          {this.state.tasks
            .sort((a, b) => {
              return b.positionList - a.positionList;
            })
            .map((task) => (
              <Task key={task.id} task={task} />
            ))}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks.tasks.filter(
      (task) =>
        task.boardId === ownProps.boardId && task.listId === ownProps.listId
    ),
  };
};

export default connect(mapStateToProps)(TaskList);
