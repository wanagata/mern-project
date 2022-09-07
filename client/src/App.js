import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux'

import Posts from './components/Posts/Posts.js'
import { getPosts } from './actions/posts.js'
import Form from './components/Form/Form.js'
import Navbar from './components/Navbar/Navbar.js'
import useStyles from './styles.js';

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId ,dispatch])

  return (
    <Container maxidth="lg">
      <Navbar />
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justiffy="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId= {setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId= {setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}
export default App;