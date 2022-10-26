import React, {useState ,useEffect} from 'react'
import { Link,useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core'
import memories from '../../images/memories.png'
import useStyles from './styles.js';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const classes = useStyles();
    const [ user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const logout = () => {
        dispatch({ type: 'LOGOUT'});
        
        navigate('/');
        setUser(null);
    }

    useEffect(() =>{
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
        //console.log('in nav effect')
        //console.log(user);
    
    },[location]);

    //console.log('In Navbar');
    //console.log(user);
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">

            <div className={classes.brandContainer}>

                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} varient="h6">{user.result.name}</Typography>
                        <Button variant="contained" color="secondary" size="small" onClick={logout}>Log Out</Button>
                        
                    </div>
                ) :
                    (
                        <Button component={Link} to='/auth' variant="contained" color="primary">Sign in</Button>
                    )
                }

            </Toolbar>
        </AppBar>
    )
}

export default Navbar