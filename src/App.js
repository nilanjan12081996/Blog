// @Author Nilanjan Dasgupta
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './pages/Home';
import Blogs from './Component/Blogs';
import Blog from './Component/Blog';
import Categories from './Component/Categories';
import About from './Component/About';
import Course from './Component/Course';
import ApplyCourse from './Component/ApplyCourse';
import Contact from './Component/Contact';
function App() {
    function PrivateRoute({ children }) {
      const token = localStorage.getItem("auth") || sessionStorage.getItem("auth");
      return token !== null && token !== undefined ? (
        children
      ) : (
        <Navigate to="/login" />
      );
    }
    //public route
    const PublicRoute=[
      {
        path:'/',
        componant:<Home/>
      },
      {
        path:'/login',
        componant:<Login/>
      },
      {
        path: '/register',
        componant: <Register/>
      }
    ]
    //protected Route
    const ProtectedRoute=[
      {
          path: '/blogs',
          component: <Blogs />
        
      },
      {
        
        path:'/blog/:id',
        component:<Blog/>
      },
      {
        path:'/category/:_id',
        component:<Categories/>
      },
      {
        path:'/about',
        component:<About/>
      },
      {
        path:'/course',
        component:<Course/>
      },
      {
        path:'/course/apply/:_id',
        component:<ApplyCourse/>
      },
      {
        path:'/contact',
        component:<Contact/>
      }

    ]
  return (
   <>
   <Router>
    <Routes>
      {/* public route section */}
      {
        PublicRoute?.map((route,key)=>{
          return(
            <>
             <Route
              key={key+1}
            path={route.path}
            element={route.componant}
            />
            </>
           
          )
        })
      }
      {/* private route section */}
      {
      ProtectedRoute?.map((route,key)=>{
        return(
          <>
          <Route
          key={key+1}
          path={route.path}
          element={<PrivateRoute>{route.component}</PrivateRoute>}
          
          />
          </>
        )
      })
      }
    </Routes>
   </Router>
   
    
   </>
  );
}

export default App;
