import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FaTh } from "react-icons/fa";
import "./BoardList.scss";

const BoardList = (props) => {
  return (
    <nav>
      {props.boards.map((board) => (
        <ul key={board.id}>
          <li >
            <NavLink to={`/board/${board.id}`} activeClassName="active" exact>
              <FaTh />
              &nbsp;&nbsp;<span className="boardName">{board.name}</span>
            </NavLink>
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
