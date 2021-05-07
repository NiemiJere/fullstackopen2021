import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Checker = ({countriesToShow, setCountryFind}) => {
  if (countriesToShow.length >= 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (countriesToShow.length >= 2) {
    return (
      <div>
        {countriesToShow.map(x=>
        <div key = {x.name}>
          {x.name} <button onClick={() => 
            setCountryFind(x.name)
            }>show</button>
        </div> 
        )}
      </div>
    )
  }
  else if (countriesToShow.length === 1) {
    return (
      <div>
        <h2>{countriesToShow[0].name}</h2>
        capital {countriesToShow[0].capital}<br/>
        population {countriesToShow[0].population}
        <h3>Languages</h3>
        {countriesToShow[0].languages.map(x =>
          <div key={x.name}>
            <ul>
              <li>{x.name}</li>
            </ul>
          </div>)}
        <img style={{marginTop:"20px", height:"25vh", paddingLeft:"1vw"}} src={`${countriesToShow[0].flag}`}/>
      </div>
    )
  }
  else return <div>No countries were found</div>
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [countryFind, setCountryFind] = useState("")
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleChange = (event) => {
    event.preventDefault()
    setCountryFind(event.target.value)
  }

  const countriesToShow = showAll
      ? countries
      : countries.filter(country => country.name.toLowerCase().includes(countryFind.toLowerCase()))

  return (
    <div>
      find countries <input value = {countryFind} onChange={handleChange}></input>
      <Checker 
        countriesToShow = {countriesToShow}
        setCountryFind = {setCountryFind}
        />
    </div>
  );
}

export default App;
