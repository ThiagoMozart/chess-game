import Menu from '../components/Menu.jsx';
import Chessboard from '../components/Chessboard.jsx';
import InformationBar from '../components/InformationBar.jsx';
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
