import React,{useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {Typography, Paper, Grid, Slider} from '@material-ui/core';



const useStyles = makeStyles({ 
    root:{
        width:'100%',
        display:'flex'

    },
    paper:{
        width:'100%',
        padding:'10px'
    },
    dado:{
      backgroundColor:'#00acba',
      borderRadius:'15px',
      marginLeft:'10px',
      color:'white',
      paddingLeft:'10px',
      fontSize:'20px'


  }
});

const MeusPlanos = ()=>{
    const classes = useStyles();
    const esc = useSelector(state=> state.esc.esc);
    const taxa = useSelector(state=> state.esc.esc_taxas);

    const dispatch = useDispatch();
    const [valor,setValor] = useState(0);
  
  

    const PrettoSlider = withStyles({
        root: {
          color: '#00acba',
          height:'200px'
          
        },
       
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          marginTop: -8,
          marginLeft: -12,
          '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
          },
        },
        active: {},
        valueLabel: {
          left: 'calc(-50% + 4px)',
        },
        track: {
          height: 8,
          borderRadius: 4,
        },
        rail: {
          height: 8,
          borderRadius: 4,
        },
      })(Slider);
    let time = null
    let tgtv =0
    //Simples debounce para o slider
    function handleChange(e, newValue){
        clearTimeout(time)
        time = setTimeout(()=>{
           tgtv = newValue
        setValor(tgtv)
        dispatch({type:'ESC_TAXAS', taxa_geral:tgtv});
          
        }, 1000)

    }
  

    return <>
            <Paper className={classes.paper} elevation={2}>
                <div align="center">
                        <Typography variant="h6">
                            Meus planos
                        </Typography>
                </div>
                <Grid container flexDirection="row"  >
                    <Grid item xs={12} sm={6}>                        
                      <b>Limite de crédito:</b>  <div className={classes.dado}>{esc?esc.limiteDeCredito:0}</div>
                      <br></br>
                      <b>Linhas de Crédito:</b><div className={classes.dado}>{esc?esc.linhaDeCredito:0}</div>
                      <br></br>
                      <b>Ultimo Recebimento:</b><div className={classes.dado}>{esc?esc.ultimoRecebimento:0}</div>                              
                     </Grid>
                     <Grid item xs>
                         <PrettoSlider orientation="vertical" valueLabelDisplay="auto" aria-label="pretto slider"  onChange={	handleChange}/>

                     </Grid>
                     <Grid item xs>
                     <h1 style={{color:'#00acba'}}>{valor === 0?taxa: valor}% ao mês</h1>
                     </Grid>

                    </Grid>
            </Paper>
    </>
}
export default MeusPlanos;