import React from 'react';
import { connect } from "react-redux";
import './Board.scss';

const Board = (props) => {
  const boardId = props.match.params.boardId;
  let boardSelect = props.boards.find(board => board.id === boardId);

  return(
    <div className="Board">
      <h3>{boardSelect.name}</h3>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    boards: state.boards.boards,
  };
};

export default connect(mapStateToProps)(Board);