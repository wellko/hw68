import React from 'react';
import Poster from "./Containers/poster/Poster";
import Form from "./Components/Form/Form";

function App() {

  return (
    <div className="d-flex container bg-light">
     <Poster/>
      <Form/>
    </div>
  );
}

export default App;
