import React, {Suspense} from 'react';
import './assets/css/App.css';

function App() {
  const ImagesData = React.lazy(() => import('./ImagesData'));
  return (
    <div className="App">
    <h2>
      React JS Image slider 
    </h2>
    <p style={{padding:'0 15px'}}>Used Unsplashed API for images and "superagent" for API call, developed in React JS <small>- CodeABit.io</small></p>
      <Suspense fallback={<div>Loading...</div>}> <ImagesData /></Suspense>
    </div>
  );
}

export default App;
