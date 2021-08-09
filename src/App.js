
import './assets/css/App.css';
import ImagesData from './ImagesData';

function App() {
  return (
    <div className="App">
    <h2>
      React JS Image slider 
    </h2>
    <p style={{padding:'0 15px'}}>Used Unsplashed API for images and "superagent" for API call, developed in React JS <small>- CodeABit.io</small></p>
      <ImagesData />
    </div>
  );
}

export default App;
