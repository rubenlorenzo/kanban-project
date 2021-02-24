import React from "react";
import { connect } from "react-redux";
import Board from "./Board";
import AddBoard from "./AddBoard";
import { FaPlus } from "react-icons/fa";
import "./BoardList.scss";

class BoardList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: props.boards,
      addBoard: false,
    };
  }

  render() {
    const { addBoard } = this.state;

    return (
      <nav id="boardList">
        <ul>
          {this.state.boards.map((board) => (
            <Board
              key={board.id}
              id={board.id}
              name={board.name}
              edit={board.edit}
              updateBoards={this.updateBoards}
            />
          ))}
        </ul>
        <div className="add">
          {addBoard ? (
            <AddBoard
              updateBoards={this.updateBoards}
              undoAddBoard={this.undoAddBoard}
            />
          ) : (
            <></>
          )}
          <button onClick={() => this.onAddBoard()}>
            <FaPlus />
          </button>
        </div>
      </nav>
    );
  }

  onAddBoard = () => {
    this.setState({ addBoard: true });
  };

  undoAddBoard = () => {
    this.setState({ addBoard: false });
  };

  updateBoards = (boards) => {
    this.setState({ boards });
  };
}

const mapStateToProps = (state) => {
  return {
    boards: state.boards.boards,
  };
};

export default connect(mapStateToProps)(BoardList);
