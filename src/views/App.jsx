import Menu from "../components/Menu.jsx";
import Chessboard from "../components/Chessboard.jsx";
import InformationBar from "../components/InformationBar.jsx";
import "./App.css";
import { HistoryProvider } from "../context/historyContext";
import { PeonToEvolveProvider } from "../context/peonToEvolveContext";

function App() {
  return (
    <PeonToEvolveProvider>
      <HistoryProvider>
        <Menu />
        <div className="chessContent">
          <InformationBar />
          <Chessboard />
        </div>
      </HistoryProvider>
    </PeonToEvolveProvider>
  );
}

export default App;
