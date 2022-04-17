import Menu from '../components/Menu';
import Chessboard from '../components/Chessboard';
import InformationBar from '../components/InformationBar';
import './App.css';

function App() {
  return (
    <div>
      <Menu />
      <div className="chessContent">
        <InformationBar />
        <Chessboard />
      </div>
    </div>
  );
}

export default App;
