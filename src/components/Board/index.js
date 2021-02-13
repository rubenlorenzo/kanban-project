import React from "react";
import { connect } from "react-redux";
import List from "./List";
import "./Board.scss";

const Board = (props) => {
  let selectBoard = props.board;
  let lists = props.lists;

  return (
    <>
      {selectBoard ? (
        <div className="Board">
          <h3>{selectBoard.name}</h3>

          <div id="lists">
            {lists.map((list) => (
              <List name={list.name} />
            ))}
          </div>
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
    lists: state.lists.lists.filter(
      (list) => list["boardId"] === ownProps.match.params.boardId
    ),
  };
};

export default connect(mapStateToProps)(Board);
