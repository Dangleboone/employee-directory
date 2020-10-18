import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from './components/Main';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import "./App.css";


const App = () => {
  return (
    <div className="App">
   <Wrapper>
     <Header />
     <Main />
     {/* <DataArea /> */}
     {/* <DateBody />
     <DataTable /> */}
     {/* <NavBar /> */}
     {/* <SearchName /> */}

   </Wrapper>

    </div>
  );
}

export default App;