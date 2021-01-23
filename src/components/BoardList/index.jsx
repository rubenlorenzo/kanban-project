import React from "react";
import { connect } from "react-redux";
import { FaTh } from "react-icons/fa";
import "./BoardList.scss";

const BoardList = (props) => {
  return (
    <nav>
      {props.boards.map((board) => (
        <ul key={board.id}>
          <li>
            <FaTh />
            &nbsp;&nbsp;<span class="boardText">{board.text}</span>
          </li>
        </ul>
      ))}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    boards: state.boards.boards,
  };
};

export default connect(mapStateToProps)(BoardList);
