import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import BoardList from './components/BoardList';
import Board from './components/Board';
import './App.scss';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <div className="content">
          <BoardList/>
          <Switch>
            <Route path="/board/:boardId" component={Board} exact/> 
          </Switch>  
        </div> 
      </BrowserRouter>       
    </div>
  );
}

export default App;
