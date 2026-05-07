import RegisterScreen from './features/auth/RegisterScreen';
import LoginScreen from "./features/auth/LoginScreen";



function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-10 py-10">
      {/* Login Section Preview */}
      <section>
        <h2 className="text-center text-gray-400 mb-4">--- Login Preview ---</h2>
        <LoginScreen />
      </section>

      <hr className="border-gray-200" />

      <section>
        <h2 className="text-center text-gray-400 mb-4">--- Register Preview ---</h2>
        <RegisterScreen />
      </section>
    </div>
  );
}

export default App;
