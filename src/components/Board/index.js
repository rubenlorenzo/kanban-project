import React from "react";
import { connect } from "react-redux";
import List from "./List";
import AddList from "./AddList";
import { FaList, FaLevelDownAlt } from "react-icons/fa";
import "./Board.scss";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.boardId,
      selectBoard: props.board,

      lists: props.lists,

      startPosition: null,
      endPosition: null,
      startId: null,
      endId: null,

      listIdOfTheTaskToMove: null,
      taskIdOfTheTaskToMove: null,
    };

    this.addList = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.boardId === prevState.id) {
      this.addList.current.style.display = "none";
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.boardId !== state.id) {
      return {
        id: props.match.params.boardId,
        selectBoard: props.board,
        lists: props.lists,
      };
    }

    if (state.startPosition === null) {
      return {
        lists: props.lists,
      };
    }

    return null;
  }

  render() {
    return (
      <>
        {this.state.selectBoard ? (
          <div className="Board">
            <div>
              <h3>{this.state.selectBoard.name}</h3>
              <button onClick={() => this.showAddList(true)}>
                <FaList />
                <FaLevelDownAlt />
              </button>
            </div>

            <div id="lists">
              <AddList
                onAddList={this.addList}
                onShowAddList={this.showAddList}
                boardId={this.state.selectBoard.id}
                lists={this.state.lists}
              />
              {this.state.lists
                .sort((a, b) => {
                  return b.position - a.position;
                })
                .map((list) => (
                  <List
                    list={list}
                    key={list.id}
                    lists={this.state.lists}
                    position={list.position}
                    dragStart={this.handleDragStart}
                    dragEnter={this.handleDragEnter}
                    dragEnd={this.handleDragEnd}
                    dragOverTask={this.dragOverTask}
                    dragEndTask={this.dragEndTask}
                    setTaskIdToMove={this.setTaskIdToMove}
                    listIdOfTheTaskToMove={this.state.listIdOfTheTaskToMove}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="Board"></div>
        )}
      </>
    );
  }

  handleDragStart = (e, position, id) => {
    this.setState({
      startPosition: position,
      startId: id,
    });
  };

  handleDragEnter = (e, position, id) => {
    this.setState({
      endPosition: position,
      endId: id,
    });
  };

  handleDragEnd = async (e) => {
    await this.props.replacePositionLists(
      this.state.startPosition,
      this.state.startId,
      this.state.endPosition,
      this.state.endId
    );

    this.setState({
      startPosition: null,
      startId: null,
      endPosition: null,
      endId: null,
    });
  };

  showAddList = (show) => {
    if (show) {
      this.addList.current.style.display = "block";
    } else {
      this.addList.current.style.display = "none";
    }
  };

  dragOverTask = (id) => {
    this.setState({ listIdOfTheTaskToMove: id });
  };

  setTaskIdToMove = (id) => {
    this.setState({ taskIdOfTheTaskToMove: id });
  };

  dragEndTask = async (id) => {
    await this.props.moveTaskOnTheBoard(
      this.state.taskIdOfTheTaskToMove,
      this.state.listIdOfTheTaskToMove
    );

    this.setState({
      taskIdOfTheTaskToMove: null,
      listIdOfTheTaskToMove: null,
    });
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    board: state.boards.boards.filter(
      (board) => board.id === ownProps.match.params.boardId
    )[0],
    lists: state.lists.lists.filter(
      (list) => list["boardId"] === ownProps.match.params.boardId
    ),
  };
};

const mapDispatchToProps = (dispatch) => ({
  replacePositionLists: (startPosition, startId, endPosition, endId) =>
    dispatch({
      type: "REPLACE_POSITIONS_LISTS",
      startPosition,
      startId,
      endPosition,
      endId,
    }),

  moveTaskOnTheBoard: (idTask, listId) =>
    dispatch({
      type: "MOVE_TASK_ON_THE_BOARD",
      id: idTask,
      listId,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
