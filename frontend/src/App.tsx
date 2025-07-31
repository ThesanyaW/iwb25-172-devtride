import { Dashboard } from './components/Dashboard';

function App() {
  const handleNavigate = (route: string) => {
    // Implement navigation logic here (e.g., using react-router)
    console.log('Navigate to:', route);
  };

  return (
    <div className="App">
      <Dashboard onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
