
import HomePage from './scenes/homePage';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ProfilePage from './scenes/profilePage';
import { ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {useSelector,useDispatch} from 'react-redux'
import {useEffect, useMemo} from 'react'
import {themeSettings} from './theme'
import GeneralPage from './scenes/generalPage';
import {setLogin} from './state'

function App() {
  const {mode,user,token} = useSelector((state)=>state.authReducer.mode)
  const dispatch = useDispatch()
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
  console.log(mode)

  window.onload = (event) => {
    
    const res =JSON.parse(sessionStorage.getItem("res"))
    if(res){
    dispatch(setLogin(res))
    }
  };
  return (
    
    <div className="App">

      
    <Router>
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/home' element={<GeneralPage/>}/>
      <Route path='/profile/:userId' element={<ProfilePage/>}/>
    </Routes>
    </ThemeProvider>
    </Router>
    
    </div>
    
  );
}

export default App;
