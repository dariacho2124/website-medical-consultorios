import logo from './logo.svg';
import './App.css';
import MessageForm from './components/MessageForm';
import RegisterPatientForm from './components/RegisterPatientForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <MessageForm /> */}
        <RegisterPatientForm />
      </header>
    </div>
  );
}

export default App;
