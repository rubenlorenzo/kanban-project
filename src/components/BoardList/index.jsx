import React from "react";

import { connect } from "react-redux";
import { FaPlus } from "react-icons/fa";

import validatorBoardName from './validatorBoardName';
import "./BoardList.scss";
import  Board  from "./Board";


class BoardList extends React.Component{
  constructor(props){
    super(props);
    
    this.state = { 
      name: '', 
      boards: props.boards,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  render(){
    return (
      <nav>
        <ul>
        {this.state.boards.map((board) => (
          <Board key={board.id} id={board.id} name={board.name} edit={board.edit} updateBoards={this.updateBoards}/>
        ))}
        </ul>
        <div className="add">
          <div className="addBoard">
            <input className="inputName" value={this.state.name} onChange={this.handleChange}></input>
            <span onClick={() => this.handleSubmit()}><FaPlus/></span>
          </div>
        </div>
        
      </nav> 
    );
  };

  

  handleChange(event){
    this.setState({ name:event.target.value})
  }

  async handleSubmit () {
    let { result, message } = validatorBoardName(this.props.boards,this.state.name);

    if(result){
      await this.props.addBoard(this.state.name); 
      this.setState({boards: this.props.boards});  
    }else{
      alert(message)
    }
  }

  updateBoards = (boards) =>{
    this.setState({boards})
  }
};



const mapStateToProps = (state) => {
  return {
    boards: state.boards.boards,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addBoard:(name) => dispatch({
    type: "ADD_BOARD",
    payload: name,
    id: Date.now(),
    edit:false,
  }),
});

export default connect(mapStateToProps,mapDispatchToProps)(BoardList);
