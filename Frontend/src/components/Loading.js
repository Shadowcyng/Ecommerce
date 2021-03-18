import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      justifyContent:'center',
      alignItems:'center',
      minHeight: '90vh'
    },
  }));
  
const Loading = () => {
    const classes = useStyles();

    return (
     
        <div className={classes.root}>
      <CircularProgress style={{size: '100px'}} />
    </div>
    
    )
}

export default Loading
