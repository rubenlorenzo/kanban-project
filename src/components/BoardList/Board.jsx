import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaTh, FaPen, FaTrashAlt } from "react-icons/fa";
import { renameBoardAction } from "../../services/redux/boards/actions";
import validatorBoardName from "./validatorBoardName";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      name: "",
      board: {
        id: props.id,
        name: props.name,
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { id, name } = this.state.board;
    return (
      <li className="board">
        <>{/* Board Name)*/}</>
        {this.state.edit ? (
          // Input Name
          <input
            className="inputNameEdit"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder={name}
            onKeyUp={(e) => this.renameBoard(e, id)}
          ></input>
        ) : (
          // Link Name
          <NavLink to={`/board/${id}`} activeClassName="active" exact>
            <FaTh />
            &nbsp;&nbsp;
            <span className="boardName">{name}</span>
          </NavLink>
        )}

        <>{/*Button options*/}</>
        {this.state.edit ? (
          //Edit
          <span className="boardDelete">
            <FaTrashAlt />
          </span>
        ) : (
          //Delete
          <span className="boardEdit" onClick={() => this.editBoard()}>
            <FaPen />
          </span>
        )}
      </li>
    );
  }

  editBoard = () => {
    this.setState({ edit: true });
  };

  renameBoard = async (e, id) => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      let { result, message } = validatorBoardName(this.props.boards,this.state.name);

      if (result) {
        await this.props.renameBoard(id, this.state.name);
        this.setState({
          edit: false,
          board: this.props.boards.filter(
            (board) => board.id === this.props.id
          )[0],
        });
      } else {
        alert(message);
      }
    }
  };

  handleChange(event) {
    this.setState({ name: event.target.value });
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.boards.boards,
  };
};

const mapDispatchToProps = (dispatch) => ({
  renameBoard: (id, name) => renameBoardAction(dispatch, id, name),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
