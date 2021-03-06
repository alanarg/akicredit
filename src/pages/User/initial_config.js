import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import api from '../../services/api';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {CircularProgress, TextField, Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';




export default function Initial(){
  const [openErro,setOpenErro] = useState(false);
  const [openSucc,setSucc] = useState(false);
    const [open, setOpen] = useState(true);
    const [nomeEsc, setNome] = useState("");
    const user= useSelector (state=> state.usuario.user)
    const [cep, setCep] = useState("");
    const [telefone, setTelefone] = useState("");
    const [montante, setMontante] = useState("");
    const [taxa, setTaxa] = useState(0);
    const [cidades, setCidades] = useState([0]);
    const [planos, setPlanos] = useState([0]);
    const [load, setLoad] = useState(false);

    const dispath = useDispatch();

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    
    async function handlePronto(){
      setOpen(true);
      setLoad(true);
        const values = {
            cpf:user.cpf,
            nomeResponsavel:user.nome,
            cnpj:user.cnpj,
            taxaGeral:taxa,
            nomeESC:nomeEsc,
            email:user.email,
            cep:cep,
            telefone:telefone,
            limiteDeCredito:montante,
            cidadesLimites:cidades,
            linhaDeCredito:planos,
            logo:" "
        
        };

        try{
          const re = await axios.get(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${values.cep}/json/unicode/`);
          dispath({type:'ESC_LOC', esc:re});
          console.log(re);

        }catch(error){
          setOpen(true);
          setOpenErro(true);
          console.log(error.response);

        }
        try{
          await api.post('/esc/create', values,  {headers:{'Authorization': localStorage.getItem('U_ID')}} )
          setSucc(true);
          setLoad(false);
          dispath({type:'ESC_OBJECT', esc:{esc_object:values}})
          setOpen(false);
        }catch(error){
          setOpen(true);
          setLoad(false);
          console.log(error.response);
          setOpenErro(true);
        }
    }
    return <>   
        <div>
          <Dialog open={open} ia-labelledby="form-dialog-title" style={{borderRadius:'15px'}}>
        <DialogTitle id="form-dialog-title">Bem vindo à plataforma de auxílio ESCs, para começar configure o ambiente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vamos começar!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            required
            id="name"
            label="Nome da ESC"
            type="text"
            onBlur={e=> e.preventDefault(setNome(e.target.value)) }
            fullWidth
          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="CEP"
            type="number"
            onBlur={e=> e.preventDefault(setCep(e.target.value)) }
            fullWidth
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Telefone"
            required
            type="number"
            onBlur={e=> e.preventDefault(setTelefone(e.target.value)) }
            fullWidth
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="R$00,00"
            label="Montante"
            type="number"
            required
            onBlur={e=> e.preventDefault(setMontante(e.target.value)) }
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            required
            id="taxa"
            label="Taxa nominal"
            type="number"
            onBlur={e=> e.preventDefault(setTaxa(e.target.value)) }
            fullWidth
          />  
          <TextField
          autoFocus
          margin="dense"
          id="name"
          required
          placeholder="Cidade1, cidade2, cidade3..."
          label="Cidades limítrefes"
          type="text"
          onBlur={e=> e.preventDefault(setCidades(e.target.value)) }
          fullWidth
        />
         <TextField
          autoFocus
          margin="dense"
          id="name"
          placeholder="Autmóveis, imóveis, planos..."
          label="Linhas de financiamento"
          type="text"
          required
          onBlur={e=> e.preventDefault(setPlanos(e.target.value)) }
          fullWidth
        />
        </DialogContent>
        <DialogActions>
        {load && <CircularProgress />}
          <Button onClick={handlePronto} style={{backgroundColor:"#00acba", color:"white"}}>
            Atualizar
          </Button>
        </DialogActions>

      </Dialog>
      <Snackbar open={openErro} autoHideDuration={6000} >
        <Alert severity="error">
         Preencha corretamente os campos!
        </Alert>
      </Snackbar>
      <Snackbar open={openSucc} autoHideDuration={6000} >
        <Alert severity="success">
          Atualizado!
        </Alert>
      </Snackbar>
    </div>
            
        </>
}