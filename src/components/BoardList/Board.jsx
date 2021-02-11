import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaTh, FaPen, FaTrashAlt, FaReply } from "react-icons/fa";
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
          <>
            <input
              className="inputNameEdit"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder={name}
              onKeyUp={(e) => this.renameBoard(e, id)}
            ></input>
            &nbsp;&nbsp;
            <span
              className="undoEditBoard"
              onClick={() => this.undoEditBoard()}
            >
              <FaReply />
            </span>
          </>
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
          <span className="deleteBoard" onClick={() => this.deleteBoard(id)}>
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

  undoEditBoard = () => {
    this.setState({ edit: false });
  };

  deleteBoard = async(id) => {
    var resultConfirm = window.confirm("Deseas eliminar el tablero");

    if(resultConfirm){
      await this.props.deleteBoard(id);
      this.props.updateBoards(this.props.boards);
    }
  }

  renameBoard = async (e, id) => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      let { result, message } = validatorBoardName(
        this.props.boards,
        this.state.name
      );

      if (result) {
        await this.props.renameBoard(id, this.state.name);
        this.setState({
          edit: false,
          board: this.props.board,
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

const mapStateToProps = (state, ownProps) => {
  return {
    boards: state.boards.boards,
    board: state.boards.boards.filter((todo) => todo.id === ownProps.id)[0],
  };
};

const mapDispatchToProps = (dispatch) => ({
  renameBoard: (id, name) => renameBoardAction(dispatch, id, name),
  deleteBoard: (id) => dispatch({
    type: "DELETE_BOARD",
    id: id,
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
