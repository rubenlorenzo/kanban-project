import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FaTh } from "react-icons/fa";
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
          <div className="addContent"><input className="inputName" value={this.state.name} onChange={this.handleChange}></input><span onClick={() => this.handleSubmit()}>+</span></div>
        </div>
        
      </nav> 
    );
  }
  

  handleChange(event){
    this.setState({ name:event.target.value})
  }

  handleSubmit() {
    this.props.addBoard(this.state.name);
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
