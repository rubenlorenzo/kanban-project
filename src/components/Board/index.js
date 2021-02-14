import React from "react";
import { connect } from "react-redux";
import List from "./List";
import "./Board.scss";

class Board extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selectBoard: props.board,
      lists: props.lists,
      startPosition:null,
      endPosition:null
    }    
  }  

  render(){
    return (
      <>
        {this.state.selectBoard ? (
          <div className="Board">
            <h3>{this.state.selectBoard.name}</h3>

            <div id="lists">
              {this.state.lists.map((list,index) => (
                <List
                  name={list.name} 
                  key={index}            
                  index={index}
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

  handleDragStart = (e, position) => {    
    this.setState({startPosition: position});    
  };

  handleDragEnter = (e,position) => {    
    this.setState({endPosition: position});
  }

  handleDragEnd = async(e) => {
    const listsCopy = [...this.state.lists];    
    const dragOverListContent = listsCopy[this.state.endPosition];    

    listsCopy[this.state.endPosition] = listsCopy[this.state.startPosition];
    listsCopy[this.state.startPosition] = dragOverListContent;    
    
    this.setState({
      lists:listsCopy,
      startPosition: null,
      endPosition: null
    });    
  } 

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
