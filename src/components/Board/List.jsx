import React from "react";
import { connect } from "react-redux";
import { renameListAction } from "../../services/redux/lists/actions";
import validatorListName from "./validatorListName";
import { FaPlus, FaPen, FaReply, FaTrashAlt } from "react-icons/fa";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      edit: false,
      list: this.props.list,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.list.name !== state.list.name) {
      return {
        list: props.list,
      };
    }

    return null;
  }

  render() {
    const { name, list, edit } = this.state;

    return (
      <div
        className="list"
        onDragStart={(e) =>
          this.props.dragStart(e, this.props.position, list.id)
        }
        onDragOver={(e) =>
          this.props.dragEnter(e, this.props.position, list.id)
        }
        onDragEnd={this.props.dragEnd}
        draggable
      >
        <div className="titleList">
          {edit ? (
            <>
              <input
                className="inputNameEdit"
                value={name}
                onChange={this.handleChange}
                placeholder={list.name}
                onKeyUp={(e) => this.renameList(e, list.id)}
              ></input>
              <button
                className="undoEditList"
                onClick={() => this.undoEditList()}
              >
                <FaReply />
              </button>
              <button
                className="deleteList"
                onClick={() => this.deleteList(list.id, list.boardId)}
              >
                <FaTrashAlt />
              </button>
            </>
          ) : (
            <>
              <h4>{list.name}</h4>
              <button className="editList" onClick={() => this.editList()}>
                <FaPen />
              </button>
            </>
          )}
          <button className="addTodo">
            <FaPlus />
          </button>
        </div>
      </div>      
    );
  }

  editList = () => {
    this.setState({ edit: true });
  };

  undoEditList = () => {
    this.setState({ edit: false });
  };

  renameList = async (e, id) => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      let { result, message } = validatorListName(
        this.props.lists,
        this.state.name,
        this.state.list.boardId,
      );

      if (result) {
        await this.props.renameList(id, this.state.name);
        this.setState({ edit: false });
      } else {
        alert(message);
      }
    }
  };

  deleteList = async (id, boardId) => {
    let resultConfirm = window.confirm("Deseas eliminar la lista");

    if (resultConfirm) {
      await this.props.deleteList(id, boardId);
    }
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };
}

const mapDispatchToProps = (dispatch) => ({
  renameList: (id, name) => renameListAction(dispatch, id, name),
  deleteList: (id, boardId) =>
    dispatch({
      type: "DELETE_LIST",
      id,
      boardId
    }),
});

export default connect(null, mapDispatchToProps)(List);
