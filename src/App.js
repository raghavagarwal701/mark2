import { useState } from 'react';
import Form from './Form/Form';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Questionnere from './Questionnere/Questionnere';

const App = () => {
  
  const [userData,setUserData]=useState({});
  const updateData=(e)=>{
    setUserData(e);
  }
  
  return ( 
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Form userData={userData} updateData={updateData}/>}/>
          <Route path='/Questionnare' element={<Questionnere userData={userData} updateData={updateData}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
 
export default App;