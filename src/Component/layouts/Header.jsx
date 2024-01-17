// @Author Nilanjan Dasgupta
import { toast } from "react-toastify"
import { useAuth } from "../../Context/Auth"
import { NavLink } from "react-router-dom"
import { Avatar, IconButton, Typography } from "@mui/material"
import './header.css'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Header=()=>{
    const[auth,setAuth]=useAuth()
    const handleLogout=()=>{
        setAuth(
            {...auth,user:null,token:''}
        )
        localStorage.removeItem('auth')
      toast.success('successfully logout')
    }
    
    return(
        <>
        
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,color:'green' }} />
  <Typography 
  variant="h5"
  sx={{
    fontFamily: 'monospace',
       fontWeight: 700,
  }}
  ><NavLink className="navbar-brand" to="#">PATHSHALA</NavLink></Typography>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <Typography
    variant="h6"
    noWrap
     sx={{
       mr: 2,
       display: { xs: 'none', md: 'flex' },
       fontFamily: 'monospace',
       fontWeight: 400,
       letterSpacing: '.1rem',
       color: 'inherit',
       textDecoration: 'none',
    }}>
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/about">About <span className="sr-only">(current)</span></NavLink>
      </li>
     
    
      {
        !auth.user?(
            <>
      <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
       <li className="nav-item active">
        <NavLink className="nav-link" to="/course">Course <span className="sr-only"></span></NavLink>
      </li> 
      <li className="nav-item active">
        <NavLink className="nav-link" to="/blogs">Blog <span className="sr-only"></span></NavLink>
      </li>
            </>
        ):(
                <>
                  <li className="nav-item active">
        <NavLink className="nav-link" to="/course">Course <span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/blogs">Blog <span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/contact">Contact <span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item">
              <NavLink onClick={handleLogout} className="nav-link" to="/login">logout</NavLink>
            </li>
                 <li className="nav-item">
                 
                 <IconButton  sx={{ p: 0, marginLeft:70, }}>
                <Avatar  sx={{
                 
                }} src={`${process.env.REACT_APP_API}/${auth.user.photo}`} alt={auth.user.name}/>
              </IconButton>
            {/* <NavLink className="nav-link">Welcome {auth.user.name}</NavLink>  */}
            
            </li>
           
                </>
        )
      }
    </ul>
    </Typography>
 
  </div>
</nav>
{/* <ResponsiveAppBar/> */}

        </>
    )
}
export default Header