import React from "react";
import { connect } from "react-redux";
import "./Board.scss";

const Board = (props) => {
  let boardSelect = props.board;

  return (
    <>
      {boardSelect ? (
        <div className="Board">
          <h3>{boardSelect.name}</h3>
        </div>
      ) : (
        <div className="Board"></div>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    board: state.boards.boards.filter(
      (board) => board.id === ownProps.match.params.boardId
    )[0],
  };
};

export default connect(mapStateToProps)(Board);
