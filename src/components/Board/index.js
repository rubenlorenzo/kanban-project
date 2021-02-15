import React from "react";
import { connect } from "react-redux";
import List from "./List";
import "./Board.scss";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectBoard: props.board,

      lists: props.lists,

      startPosition: null,
      endPosition: null,
      startId: null,
      endId: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.startPosition === null) {
      return {
        lists: props.lists,
      };
    }

    return null;
  }

  render() {
    return (
      <>
        {this.state.selectBoard ? (
          <div className="Board">
            <h3>{this.state.selectBoard.name}</h3>

            <div id="lists">
              {this.state.lists
                .sort((a, b) => {
                  return a.position - b.position;
                })
                .map((list, index) => (
                  <List
                    name={list.name}
                    key={index}
                    index={index}
                    id={list.id}
                    dragStart={this.handleDragStart}
                    dragEnter={this.handleDragEnter}
                    dragEnd={this.handleDragEnd}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="Board"></div>
        )}
      </>
    );
  }

  handleDragStart = (e, position, id) => {
    this.setState({
      startPosition: position,
      startId: id,
    });
  };

  handleDragEnter = (e, position, id) => {
    this.setState({
      endPosition: position,
      endId: id,
    });
  };

  handleDragEnd = async (e) => {
    await this.props.replacePositionLists(
      this.state.startPosition,
      this.state.startId,
      this.state.endPosition,
      this.state.endId
    );

    this.setState({
      startPosition: null,
      startId: null,
      endPosition: null,
      endId: null,
    });
  };
}

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

const mapDispatchToProps = (dispatch) => ({
  replacePositionLists: (startPosition, startId, endPosition, endId) =>
    dispatch({
      type: "REPLACE_POSITIONS_LISTS",
      startPosition,
      startId,
      endPosition,
      endId,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
