import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// Tipado del parámetro recibido en la URL
interface RouteParams {
  code: string;
}

// Tipado del país
interface Country {
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  population: number;
  flags: {
    png: string;
  };
}

const CountryDetails: React.FC = () => {
  // Aquí corregimos el uso de useParams
  const { code } = useParams<Record<string, string>>(); // Cambiado a Record<string, string>
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        if (code) {
          const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
          console.log("Respuesta de la API:", response.data);  // Inspecciona la estructura
          if (response.data && response.data.length > 0) {
            setCountry(response.data[0]);
          } else {
            console.error("No se encontraron datos para el código proporcionado.");
          }
        } else {
          console.error("El parámetro 'code' no está definido.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del país:", error);
      }
    };

    fetchCountry();
  }, [code]);

  if (!country) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{country?.name?.common || "Nombre no disponible"}</h1>
      <p>Capital: {country?.capital?.join(", ") || "Capital no disponible"}</p>
      <p>Región: {country?.region || "Región no disponible"}</p>
      <p>Población: {country?.population || "Población no disponible"}</p>
      <img
        src={country?.flags?.png || ""}
        alt={`Bandera de ${country?.name?.common || "desconocido"}`}
      />
      <br />
      <Link to="/">Volver a la lista</Link>
    </div>
  );
};

export default CountryDetails;
