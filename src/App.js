import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import RegisterPage from './Pages/RegisterPage';
import Login from './Pages/Login';
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import { useFirebase } from './firebase';


import Home from './Pages/Home';
import Add from './Pages/Add';
import Change from './Pages/Change';
import Filter from './Pages/Filter';
import Delete from './Pages/Delete';

function App() {
  const firebase=useFirebase();

  function ProtectedRoute({children}){
    if(!firebase.user){
      return <Navigate to="/register" />
    }
    return children;
  }
  

  return (<>
  <div className="wapper-about">
<BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="register" element={<RegisterPage/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="Change" element={<Change/>}/>
          <Route path="Add" element={<Add/>}/>
          <Route path="filter" element={<Filter/>}/>
          <Route path="delete" element={<Delete/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  </>
  );
}

export default App;
