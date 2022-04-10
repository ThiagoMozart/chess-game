import Menu from '../components/Menu';
import Chessboard from '../components/Chessboard';
import './App.css';

function App() {
  return (
    <div>
      <Menu />
      <div className="chessContent">
        <Chessboard />
      </div>
    </div>
  );
}

export default App;
