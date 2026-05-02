import LoginScreen from "./features/auth/LoginScreen";

/**
 * Main Application Component for Data Diet.
 * Currently rendering the LoginScreen for the authentication feature branch.
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LoginScreen />
    </div>
  );
}

export default App;