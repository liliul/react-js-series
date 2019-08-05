import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


const Series = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
        .get('/api/series')
        .then(res => {
            setData(res.data.data)
        })
    }, [])

    const deleteSeries = id => {
        axios
        .delete('/api/series/' + id)
        .then(res => {

            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
    }

    const renderizalinha = record => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td><button className='btn btn-danger' onClick={() => deleteSeries(record.id)}>Remover</button>
                <Link className='btn btn-warning' to={'/series/' + record.id}>Info</Link>
                </td>
            </tr>
        )
    }

    if(DataTransfer.length !== 0){
        return(
            <div className="container">
                <h1>Series</h1>
                <Link to='/series/novo' className='btn btn-primary'>Novo Series</Link>
                <div className="alert alert-warning" role='alert'>
                    Voce Nao possui series criadas.
                </div>
            </div>
        )
    }



    return (
        <div className="container">
            <h1>Series</h1>
            <Link to='/series/novo' className='btn btn-primary'>Novo Series</Link>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizalinha)}
                </tbody>
            </table>
        </div>
    )
  }

export default Series
