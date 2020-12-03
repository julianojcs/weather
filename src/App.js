import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'

function App() {
    const [weather, setWeather] = useState(null)
    const [search, setSearch] = useState('Vila Velha')
    const [input, setInput] = useState('Vila Velha')
    const [notFound, setNotFound] = useState(false)
    useEffect(() => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=8acbce21dc184e2498d205739200212&q=${search}`)
            .then(res => {
                setWeather(res.data)
                setNotFound(false)
                console.log(res.data)
            })
            .catch(err => {
                setNotFound(true)
                console.log(err)
            })
    }, [search])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(input)
    }

    return (
        <div className="App">
            {weather 
                ? 
                <>
                    <form className="search" onSubmit={handleSubmit}>
                        <input 
                            default='Vila Velha'
                            type="text"
                            value={input}
                            onChange={({target})=>setInput(target.value)}
                        />
                        <button>Search</button>
                    </form>
                    {notFound && (`Location "${search}" not found`)}
                    <div className="weather-info">
                        <h1>Weather</h1>
                        <h3>Location: {weather.location.name}</h3>
                        <h3>Region: {weather.location.region}</h3>
                        <h3>Country: {weather.location.country}</h3>
                        <div className="condition">
                            <h4>{weather.current.condition.text}</h4>
                            <img src={weather.current.condition.icon} alt=""/>
                            <h4>{weather.current.temp_c}º C</h4>
                        </div>
                    </div>
                </>
                : 'Loading...'
            }
        </div>
    );
}

export default App;
