import Menu from "../components/Menu.jsx";
import Chessboard from "../components/Chessboard.jsx";
import InformationBar from "../components/InformationBar.jsx";
import "./App.css";
import { HistoryProvider } from "../context/historyContext";
import { PeonToEvolveProvider } from "../context/peonToEvolveContext";
import { IATurnProvider } from "../context/IATurnContext";

function App() {
  return (
    <IATurnProvider>
      <PeonToEvolveProvider>
        <HistoryProvider>
          <Menu />
          <div className="chessContent">
            <InformationBar />
            <Chessboard />
          </div>
        </HistoryProvider>
      </PeonToEvolveProvider>
    </IATurnProvider>
  );
}

export default App;
