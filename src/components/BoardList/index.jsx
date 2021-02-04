import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FaTh, FaPlus } from "react-icons/fa";
import validator from "validator";
import "./BoardList.scss";


class BoardList extends React.Component{
  constructor(props){
    super(props);
    this.state = { name: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  render(){
    return (
      <nav>
        {this.props.boards.map((board) => (
          <ul key={board.id}>
            <li >
              <NavLink to={`/board/${board.id}`} activeClassName="active" exact>
                <FaTh />
                &nbsp;&nbsp;<span className="boardName">{board.name}</span>
              </NavLink>
            </li>
          </ul> 
        ))}
        <div className="add">
          <div className="addBoard">
            <input className="inputName" value={this.state.name} onChange={this.handleChange}></input>
            <span onClick={() => this.handleSubmit()}><FaPlus/></span>
          </div>
        </div>
        
      </nav> 
    );
  }
  

  handleChange(event){
    this.setState({ name:event.target.value})
  }

  handleSubmit() {
    if(validator.isAlpha(this.state.name.replace(/ /g, ""))){
      
      let sentence = "";
      let words = this.state.name.split(" ");
      
      for(let i = 0; i < words.length; i++){
        if(i >= 0 && i < words.length-1){
          sentence = sentence + words[i] + " ";
        }else{
          sentence = sentence + words[i];
        }
      }
      
      let boardExist=false;
      this.props.boards.forEach(board => {
        if(board.name.toLowerCase() === this.state.name.toLowerCase()){
          boardExist=true;
          alert("Tablero repetido")
        }
      });

      if(!boardExist){
        this.props.addBoard(this.state.name); 
      }  
    }else{
      alert("Nombre del tablero, con solo letras del alfabeto")
    }
    
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
  })
})

export default connect(mapStateToProps,mapDispatchToProps)(BoardList);
