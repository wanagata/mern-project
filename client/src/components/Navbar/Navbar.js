import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Avatar, Button, Typography } from '@material-ui/core'
import memories from '../../images/memories.png'
import useStyles from './styles.js';

const Navbar = () => {
    const classes = useStyles();
    const user = null;
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name}</Avatar>
                        <Typography className={classes.userName} varient="h6">{user.result.name}</Typography>
                        <Button varient="contained" className={classes.logout} color="secondary">Log Out</Button>
                    </div>
                ) :
                    <Button component={Link} to='/auth' variant="contained" color="primary">Sign in</Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar