import React from "react";
import { connect } from "react-redux";
import  Task from "./Task";
import "./TaskList.scss";

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: props.tasks,
    }
  }

  render() {
    return (
      <nav className="taskList">
        <ul>
          {this.state.tasks.map((task) => (
            <Task key={task.id} task={task}/>
          ))}          
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  console.log("tasks:", state.tasks.tasks.filter(
    (task) => task.boardId === ownProps.boardId && task.listId === ownProps.listId
  ));

  return {
    tasks: state.tasks.tasks.filter(
      (task) => task.boardId === ownProps.boardId && task.listId === ownProps.listId
    ),
  }
}


export default connect(mapStateToProps)(TaskList);
