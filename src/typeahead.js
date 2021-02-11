import { useState, useEffect } from 'react'
import axios from 'axios';

function TypeAhead() {
  const [state, setState] = useState({
    input: '',
    isShow: true,
    user: {
      avatar_url: '',
      login: ''
    },
    error: false
  })


  useEffect(() => {
    state.input && axios.get(`https://api.github.com/users/${state.input}`)
      .then(resp => {
        const { avatar_url, login } = resp.data;
        setState({ ...state, user: { avatar_url, login }, error: false })
        console.log(avatar_url)
      })
      .catch(e => {
        setState({...state, error: true})
        console.log('error', e.message)
      })
  }, [state.input])


  const inputChange = (e) => {
    const { id, value } = e.target
    setState({ ...state, [id]: value, isShow: true })
  }

  const selectOption = (user) => {
    const { download_url, name } = user
    setState({ ...state, input: name, isShow: false, image: download_url })
  }


  return (
    <div className="typeahead">
      { state.error && (
        <>
      <span className="error-field">
        API limit exceeded. Check out the documentation for more details: </span>
        <i>https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting</i>
        </>
      )
      }
      <input type="text" id="input" value={state.input} onChange={inputChange} />
      <div className="typeahead-content">
        {
          (state.input && state.isShow) && (
            <div
              onClick={() => selectOption(state.user.login)} className="typeahead-content-list"
            >
              <img className="typeahead-content-list-image"  src={state.user.avatar_url} width={50} height={50} alt={`${state.user.avatar_url} image`} />
              <span className="typeahead-content-list-name">{state.user.login}</span>
            </div>
          )
        }


      </div>
    </div>
  )
}


export default TypeAhead;