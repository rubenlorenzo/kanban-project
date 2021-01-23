import Header from './components/Header';
import BoardList from './components/BoardList';
import Board from './components/Board';
import './App.scss';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className="content">
        <BoardList/>
        <Board/>   
      </div>  
    </div>
  );
}

export default App;
