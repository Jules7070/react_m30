import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Tipado de un país
interface Country {
  cca3: string;
  name: {
    common: string;
  };
}

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Lista de Países</h1>
      <input
        type="text"
        placeholder="Buscar un país..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>
            <Link to={`/country/${country.cca3}`}>{country.name.common}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

