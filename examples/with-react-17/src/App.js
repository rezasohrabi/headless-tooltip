import logo from './logo.svg';
import './App.css';

// import { Tooltip } from 'headless-tooltip';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Tooltip
          content="Hi, I'm a tooltip"
          className="text-sm px-2 py-1 rounded-md shadow-lg bg-white text-black"
          arrowClassName="bg-white"
          arrow
          arrowSize={6}
        >
          <button className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
            Headless Tooltip
          </button>
        </Tooltip> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
