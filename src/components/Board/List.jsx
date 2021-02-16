import React from "react";
import validatorBoardName from "../BoardList/validatorBoardName";
import { FaPlus, FaPen, FaReply } from "react-icons/fa";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      edit: false,
      list: this.props.list,
    };
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
                id="inputNameEdit"
                value={name}
                onChange={this.handleChange}
                placeholder={list.name}
                onKeyUp={(e) => this.renameList(e, list.id)}
              ></input>
              <button id="undoEditList" onClick={() => this.undoEditList()}>
                <FaReply />
              </button>
            </>
          ) : (
            <>
              <h4>{list.name}</h4>
              <button id="editList" onClick={() => this.editList()}>
                <FaPen />
              </button>
            </>
          )}
          <button>
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
      let { result, message } = validatorBoardName(
        this.props.lists,
        this.state.name
      );

      if (result) {
        console.log(id, this.state.name);
      } else {
        alert(message);
      }
    }
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };
}

export default List;
