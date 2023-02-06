import React, { useState, useRef } from 'react';
import './Options.css';

const Options = () => {
    const [selected, setSelected] = useState([]);
    const [objects, setObjects] = useState([]);
    const [id, setId] = useState();
    const [chosen, setChosen] = useState({});
    
    const formRef = useRef(null);
    
    const onChange = (e) => {
    getSelected(e.target.value);
    setChosen({});
    };

    const getSelected = (selected) => {
        fetch(`https://swapi.dev/api/${selected}/`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            setObjects(response.results);
            setSelected(selected);
        });
    };

    const showSelected = () => {
        if (selected === 'films') {
        {objects.map((item, index) => {
                return (<p key={index}> {" "} {index + 1} - {item.title}{" "}</p>
                );
            })
        }
        } else {
        {objects.map((item, index) => {
                return (<p key={index}> {" "} {index + 1} - {item.name}{" "}</p>
                );
            })
        }
        }
        };

    const getChosen = () => {
        fetch(`https://swapi.dev/api/${selected}/${id}/`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            setChosen(response);
        });
    }

    const showChosen = () => {
    if (Object.keys(chosen).length === 0 && chosen.constructor === Object) {
    return "";
    } else if (selected === 'films') {
        return (
        <div>
            <h2> {chosen?.title} </h2>
            <h4> Director: {chosen?.director} </h4>
            <h4> Productor: {chosen?.producer} </h4>
            <h4> Release date: {chosen?.release_date} </h4>
        </div>
        );
    } else if (selected === 'people') {
        return (
        <div>
            <h2> {chosen?.name} </h2>
            <h4> Height: {chosen?.height} </h4>
            <h4> Gender: {chosen?.gender} </h4>
            <h4> Skin color: {chosen?.skin_color} </h4>
        </div>
        );
    } else if (selected === 'vehicles') {
        return (
        <div>
            <h2> {chosen?.name} </h2>
            <h4> Model: {chosen?.model} </h4>
            <h4> Passengers: {chosen?.passengers} </h4>
            <h4> Capacity: {chosen?.cargo_capacity} </h4>
        </div>
        );
    } else if (selected === 'species') {
        return (
        <div>
            <h2> {chosen?.name} </h2>
            <h4> Average Lifespan: {chosen?.average_lifespan} </h4>
            <h4> Lenguage: {chosen?.language} </h4>
            <h4> Designation: {chosen?.designation} </h4>
        </div>
        );
    } else if (selected === 'planets') {
        return (
        <div>
            <h2> {chosen?.name} </h2>
            <h4> Terrain: {chosen?.terrain} </h4>
            <h4> Population: {chosen?.population}  </h4>
            <h4> Climate: {chosen?.climate} </h4>
        </div>
        );
    } else if (selected === 'starships'){
        return(
        <div>
            <h2>{chosen?.name}</h2>
            <h4>Model: {chosen?.model}</h4>
            <h4>Manufacturer: {chosen?.manufacturer}</h4>
            <h4>Starship class: {chosen?.starship_class}</h4>
        </div>
        )
    }
    }

const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) data[key] = value;
    getChosen();
};


return (
    <div>
    <form onSubmit={onSubmit} ref={formRef}>
        <label htmlFor='search'>Search for: </label>
        <select name='select' id='select' onChange={onChange}>
            <option>Choose</option>
            <option value='people'>People</option>
            <option value='films'>Films</option>
            <option value='vehicles'>Vehicles</option>
            <option value='species'>Species</option>
            <option value='planets'>Planets</option>
            <option value='starships'>Starships</option>
        </select>
        <label htmlFor='number'>ID: </label>
        <input id='number' type="number" name="number"
            onChange={(e) => setId(e.target.value)}
        ></input>
        <input id='get' type="submit" value="GET" />
    </form>
    <div className="list">{showSelected()}</div>
    <div className="chosen">{showChosen()}</div>
    </div>
);
};

export default Options;
