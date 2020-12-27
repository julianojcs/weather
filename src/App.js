import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'

//Material UI
import { Loop as LoopIcon } from '@material-ui/icons'
import { Button, TextField, Card, CardHeader, CardContent, Typography,  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      margin: '5rem auto',
      backgroundColor: '#e9faff'
    },
    content: {
      padding: '0px',
    },
}));

function App() {
    const [weather, setWeather] = useState(null)
    const [search, setSearch] = useState('Vila Velha')
    const [input, setInput] = useState('Vila Velha')
    const [notFound, setNotFound] = useState(false)
    const [refresh, setRefresh] = useState(false)
    // const [coordinates, setCoordinates] = useState({latitude: 1, longitude: 1})

    const classes = useStyles();

    useEffect(() => {
        axios
          .get(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${search}`
          )
          .then((res) => {
            setWeather(res.data)
            setNotFound(false)
          })
          .catch((err) => {
            setNotFound(true)
            console.log(err)
          })
    }, [search, refresh])

    useEffect(() => {
        getCoordinates()
        console.log('getCoordinates');
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(input)
    }
    const handleClick = (e) => {
        e.preventDefault()
        setSearch(input)
        setRefresh(!refresh)
    }

    const getCoordinates = () => {
        const success = (position) => {
            const coordinates = `${position.coords.latitude},${position.coords.longitude}`
            setSearch(coordinates)
            setInput(coordinates)
            console.log(coordinates)
        }
        
        const error = () => {
            return 'Vila Velha'
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            return {latitude: -20.348826, longitude: -40.2849142}
        }
    }

    return (
        <div className="App">
            {weather 
                ? 
                <>
                    <form className="search" onSubmit={handleSubmit}>
                        <TextField 
                            variant="outlined"
                            label="Location" 
                            value={input}
                            onChange={({target})=>setInput(target.value)}/>
                        {/* <button onClick={handleClick}>Search</button> */}
                        <Button onClick={handleClick} variant="contained" color="primary">Search</Button>
                    </form>
                    {notFound && (`Location "${search}" not found`)}
                    <Card className={classes.root}>
                        <CardHeader
                            title={<h3>{weather.current.condition.text}</h3>}
                            subheader={<h3>{weather.location.name}</h3>}
                        />
                        <CardContent className={classes.content}>
                            {<h1>{weather.current.temp_c}º C</h1>}
                            {<img src={weather.current.condition.icon} alt=""/>}
                            <Typography variant="body2" color="textSecondary" component="div">
                                <p>{weather.location.region}</p>
                                <p>{weather.location.country}</p>
                                <p>Local time: {weather.location.localtime}</p>
                            </Typography>
                        </CardContent>
                    </Card>
                    <Button 
                        onClick={getCoordinates}>
                        Get My Location
                    </Button>
                </>
                : 
                <>
                    {/* 'Loading...'  */}
                    <LoopIcon color="secondary" style={{ fontSize: 24 }} />
                </>
            }
        </div>
    );
}

export default App;
