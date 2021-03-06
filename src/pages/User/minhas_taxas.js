import React,{useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {Typography, Paper, Grid} from '@material-ui/core';



const useStyles = makeStyles({ 
    root:{
        width:'100%',
        display:'flex'

    },
    paper:{
        width:'100%',
        padding:'10px'
    }
});

const Taxas = ()=>{
    const classes = useStyles();
    const user = useSelector(state=> state.usuario.user);
    const dispatch = useDispatch();

    return <>
            <Paper className={classes.paper} elevation={2}>
                <div align="center">
                        <Typography variant="h6">
                            Meus dados
                        </Typography>
                </div>
                <Grid container flexDirection="row"  >
                    <Grid item xs={6} sm={4}>
                        <ul style={{listStyle:'none'}}>
                                <li>
                                      <p>
                                          <b>Nome:</b>{user.nome+" "+user.sobrenome}
                                          <br></br>
                                          <b>CPF:</b>{user.cpf}
                                          <br></br>
                                          <b>CNPJ:</b>{user.cnpj}
                                      </p>  
                                </li>
                         </ul>
                     </Grid>
                     <Grid item xs={6} sm={4}>
                        <ul style={{listStyle:'none'}}>
                                <li>
                                    <p>
                                          <b>EMAIL:</b>{user.email}
                                          <br></br>
                                          <b>CPF:</b>{user.cpf}
                                          <br></br>
                                          <b>CNPJ:</b>{user.cnpj}
                                      </p>    
                                </li>   
                         </ul>
                     </Grid>
                     

                        </Grid>
            </Paper>
    </>
}
export default Taxas;