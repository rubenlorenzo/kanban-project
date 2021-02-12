import React from "react";
import { connect } from "react-redux";
import  Board  from "./Board";
import AddBoard from "./AddBoard";
import "./BoardList.scss";

class BoardList extends React.Component{
  constructor(props){
    super(props);
    
    this.state = { 
      name: '', 
      boards: props.boards,
    };
  };

  render(){
    return (
      <nav>
        <ul>
        {this.state.boards.map((board) => (
          <Board key={board.id} id={board.id} name={board.name} edit={board.edit} updateBoards={this.updateBoards}/>
        ))}
        </ul>
        <AddBoard updateBoards={this.updateBoards}/>
      </nav> 
    );
  };

  updateBoards = (boards) =>{
    this.setState({boards})
  }
};



const mapStateToProps = (state) => {
  return {
    boards: state.boards.boards,
  };
};

export default connect(mapStateToProps,)(BoardList);
