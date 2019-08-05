import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Novogenero = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = evt => {
        setName(evt.target.value)
    }

    const save = () => {
        axios
        .post('/api/genres/', {
            name
        })
        .then(res => {
            setSuccess(true)
        })

        }
        if(success){
            return <Redirect to='/generos' />
    }
    return (
        <div className='container'>
            <h1>Novo Generos</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="name" aria-describedby="emailHelp" placeholder="Algum Genero!" />
                </div>
                <button type='button' onClick={save} className='btn btn-primary'>Salva</button>
            </form>
        </div>
    )

    }


export default Novogenero
