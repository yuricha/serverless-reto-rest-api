import axios from "axios";

export const getPlanetSwapi = async (idPlanet)=>{
    const planet;
    try{
        const url ='https://swapi.py4e.com/api/planets/'+idPlanet
        let response = await axios.get(url);
        planet = response
        console.log(planet);

    }catch(error){
       console.log(error);
    }

    return planet;
}