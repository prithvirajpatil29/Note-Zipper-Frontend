import './App.css';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from "react-router-dom";
import Header from './components/Header';
import Landingpage from './screens/Landing-Page/Landingpage';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/CreateNote/SingleNote';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
function App() {
  const [search, setSearch] = useState("");
  console.log(search)
  return (
    <BrowserRouter>
      <Header setSearch={(s) => setSearch(s)}></Header>
      <Routes>
        <Route path='/' element={<Landingpage></Landingpage>}></Route>
        
        <Route path='/login' element={<LoginScreen></LoginScreen>}></Route>
        <Route path='/register' element={<RegisterScreen></RegisterScreen>}></Route>
        <Route path='/createnote' element={<CreateNote></CreateNote>}></Route>
        <Route path='/note/:id' element={<SingleNote></SingleNote>}></Route>
          <Route path='/mynotes' search={search}   element={<MyNotes></MyNotes>}></Route>
          <Route path="/profile" element={<ProfileScreen/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
