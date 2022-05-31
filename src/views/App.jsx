import Menu from '../components/Menu.jsx';
import Chessboard from '../components/Chessboard.jsx';
import InformationBar from '../components/InformationBar.jsx';
import './App.css';
import { HistoryProvider } from '../context/historyContext';

function App() {
  return (
    <HistoryProvider>
        <Menu />
        <div className="chessContent">
          <InformationBar />
          <Chessboard />
        </div>
    </HistoryProvider>
  );
}

export default App;
