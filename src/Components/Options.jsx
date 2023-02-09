import { useEffect, useState } from "react";
import axios from "axios";
import "./Options.css";
import obiwan from "../img/obiwan.gif";

const Options = () => {

    const [opciones, setOpciones] = useState([]);
    const [selected, setSelected] = useState("");
    const [id, setId] = useState("1");
    const [error, setError] = useState(false);
    const [result, setResult] =useState({});


    useEffect(() => {
        axios.get("https://swapi.dev/api/")
            .then(response => response.data)
            .then(result => {
                let resList = []

                for (const [key, value] of Object.entries(result)) {
                    resList.push({ label: key, url: value })
                }
                console.log(resList);
                setOpciones(resList);
                setSelected(resList[0].url);
            })
            .catch(error => {
                console.log(error);
                setError(true);
            })
    }, [])

    useEffect(() => {
        console.log(selected);
    }, [selected])

    const handleSearch = (e) => {
        e.preventDefault();
        let url = selected + id;
        axios.get(url)
            .then(response => response.data)
            .then(result => {
                setError(false);
                console.log(result);
                if(selected.includes(selected)){
                    console.log(result)
                    setResult(result);
                }
            })
            .catch(error => {
                console.log(error);
                setError(true);
            })
    }

    return (
        <>
            <form onSubmit={handleSearch}>
                <label htmlFor='search'>Search for: </label>
                <select selected={selected} onChange={(e) => setSelected(e.target.value)} >
                    {
                        opciones.map((item, index) =>
                            <option key={item.label + index} value={item.url}>{item.label}</option>)
                    }

                </select>
                <label htmlFor='number'>ID: </label>
                <input type="number" id='number' value={id} onChange={(e) => setId(e.target.value)} />
                <button type="submit" id='get'>GET</button>
            </form>
            {
                error ? (
                    <div className="error">
                        <p>These are not the droids you are looking for...</p>
                        <img src={obiwan} alt='error'></img>
                    </div>
                )
                :
                <div className="results">
                    <div>
                    {
                    result.name?
                    <div className='result'>
                    <h3>{result.name}</h3> 
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.gender?
                    <div className='result'>
                    Gender: {result.gender}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.height?
                    <div className='result'>
                    Height: {result.height}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.skin_color?
                    <div className='result'>
                        Skin Color: {result.skin_color}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.climate?
                    <div className='result'>
                        Climate: {result.climate}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.population?
                    <div className='result'>
                        Population: {result.population}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.terrain?
                    <div className='result'>
                        Terrain: {result.terrain}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.language?
                    <div className='result'>
                        Language: {result.language}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.average_lifespan?
                    <div className='result'>
                        Average Lifespan: {result.average_lifespan}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.designation?
                    <div className='result'>
                        Designation: {result.designation}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.title?
                    <div className='result'>
                        <h3>{result.title}</h3> 
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.director?
                    <div className='result'>
                        Director: {result.director}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.producer?
                    <div className='result'>
                        Producer: {result.producer}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.release_date?
                    <div className='result'>
                        Release date: {result.release_date}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.model?
                    <div className='result'>
                        Model: {result.model}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.passengers?
                    <div className='result'>
                        Passenger: {result.passengers}
                    </div>:
                    ''
                    }
                    </div>
                    <div>
                    {
                    result.cargo_capacity?
                    <div className='result'>
                        Capacity: {result.cargo_capacity}
                    </div>:
                    ''
                    }
                    </div>
            </div>
            }
        </>
    )
}

export default Options;