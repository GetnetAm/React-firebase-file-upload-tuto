
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddArticle from './Components/Articles/ArticleC';
// import AddArticle from './Components/Articles/AddArticle';
import Articles from './Components/Articles/Articles';



// import Header from './Components/Header/Header';





function App() {
  return (

    <div className='App'>
      {/* <Header /> */}
      <Articles />
      {/* <AddArticle /> */}
    <AddArticle />

    </div>
    // <BrowserRouter>
    // {/* <ToastContainer position='top-center' /> */}
    // <Header />
    // <div className="App">
      
    //  {/* <Security /> */}
    //  {/* <DataMovie /> */}
     

    //   <Routes>
    //     <Route exact path='/' element={<Home />} />
    //     <Route  path='/add' element={<AddEditUser/>} />
    //     <Route  path='/update/:id' element={<AddEditUser />} />
       
    //   </Routes>


    // </div>

    // </BrowserRouter>
  );
}

export default App;
