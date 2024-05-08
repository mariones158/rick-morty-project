import './App.css'
import { useEffect, useRef, useState } from "react";
import useFetch from './hooks/useFetch'
import getRandomNumber from './services/getRandomNumber';
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard';
function App() {

const [locationId, setLocatonId] = useState (getRandomNumber(126))

const url = `https://rickandmortyapi.com/api/location/${locationId}`
const [location, getLocation, hasError] = useFetch(url)

useEffect(() => {
  getLocation();

}, [locationId])


const inputId = useRef()
const handleSubmit = e =>{
  e.preventDefault()
  setLocatonId(inputId.current.value.trim())
}

  return (
<div>
   <div className='box__image'></div>
    <div className='box__items__child'>
    <h1>Rick & Morty</h1>
    <form className='search__form' onSubmit={handleSubmit}>
      <input className='input__space' ref={inputId} type="text" />
      <button className='button__style'>Search</button>
    </form>
    </div>
  
    { hasError ? (
      <h2>Hey you must provide and id 1 to 126</h2>
      ) : (
        <>
          <LocationInfo location={location} />
        <div className='card__container'> 
          {location?.residents.map((url) => (
            <ResidentCard key={url} url={url} />
          ))}
          </div>
        </>
      )}
    </div>
   );
}
export default App
