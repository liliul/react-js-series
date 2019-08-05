import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Badge} from 'reactstrap'

const Infoserie = ({match}) => {
    const [form, setForm] = useState({
      name: ''
    })
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('EDIT')
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')

    const [data, setData] = useState({})
    useEffect(() => {
      axios
        .get('/api/series/' + match.params.id)
        .then(res => {
          setData(res.data)
          setForm(res.data)
        })
    }, [match.params.id])

    useEffect(() => {
      axios
        .get('/api/genres')
        .then(res => {
          setGenres(res.data.data)
          const genres = res.data.data
          const encontrado = genres.find(value => data.genre === value.name)
          if(encontrado){
              setGenreId(encontrado.id)
          }
        })
    }, [data])

    //custom header
    const masterHeader = {
      height: '50vh',
      minHeight: '500px',
      backgroundImage: `url('${data.background}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }

    const onChangeGenre = evt => {
    setGenreId(evt.target.value)
    }


    const onChange = field =>  evt => {
        setForm({
          ...form,
          [field]: evt.target.value})
    }

    const seleciona = value => () => {
      setForm({
        ...form,
        status: value
      })
    }


    const save = () => {
        axios
        .put('/api/series', + match.params.id, {
          ...form,
          genre_id: genreId
        })
        .then(res => {
            setSuccess(true)
        })

        }
        if(success){
            return <Redirect to='/series' />
    }
    // console.log(data)
    return (
      <div>
        <header style={masterHeader}>
          <div className="h-100" style={{background:'rgba(0,0,0,0.7)'}}>
            <div className="h-100 container">
              <div className="row h-100 align-items-center">
                <div className="col-3">
                  <img alt={data.name} className="img-fluid img-thumbnail" src={data.poster} />
                </div>
                <div className="col-8">
                  <h1 className="font-weight-light text-white">{data.name}</h1>
                  <div className="lead text-white">
                    <Badge color="success">assistido</Badge>
                    <Badge color="warning">para assistir</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div>
          <button className="btn btn-primary"  onClick={() => setMode('EDIT')}>Editar Series</button>
        </div>
        {
          mode === 'EDIT' &&

          <div className='container'>
              <h1>Nova Serie</h1>
              <button className="btn btn-warning" onClick={() => setMode('INFO')}>Cancelar</button>
              <form>
                  <div className="form-group">
                      <label htmlFor="name">Nome</label>
                      <input type="text" value={form.name} onChange={onChange} className="form-control" id="name" aria-describedby="emailHelp" placeholder="Nova Series" />
                  </div>

                  <div className="form-group">
                      <label htmlFor="name">Comentarios</label>
                      <input type="text" value={form.coments} onChange={onChange('coments')} className="form-control" id="name" aria-describedby="emailHelp" placeholder="Novo comentario" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">Genero</label>
                    <select className="form-control" onChange={onChangeGenre} value={genreId}>
                      {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                    </select>
                  </div>

                    <div className="formm-check">
                          <input className="form-check-input" type="radio" name="status" id="assistindo" value="ASSISTINDO"checked onChange={seleciona('ASSISTINDO')} />
                          <label className="form-check-label" htmlFor="assistido"></label>
                    </div>

                    <div className="form-check">
                          <input type="radio" name="status" className="form-check-input" id="assistir" value="para_ASSISTIR" onChange={seleciona('para_ASSISTIR')}/>
                          <label className="form-check-label" htmlFor="assistir"></label>
                    </div>

                  <button type='button' onClick={save} className='btn btn-primary'>Salva</button>
              </form>
          </div>
        }
        </div>
    )

    }


export default Infoserie
