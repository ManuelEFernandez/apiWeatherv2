let formCiudad = document.getElementById("form-clima");
let cajaDisplay = document.getElementById("caja-display");
let valorInput = document.getElementById("ingresar-ciudad");
let cajaConDisplays = document.getElementById("caja-con-displays");
let buttonDelete = document.getElementById("button-delete");


let ciudades = JSON.parse(localStorage.getItem("ciudades")) || [];
let guardarLocalStorage = (listaCiudades) => {

    localStorage.setItem("ciudades", JSON.stringify(listaCiudades))
};


const dibujarCiudad = (datosCiudad) => {

    return `<div class="caja-display" id="caja-display">
    <button class="boton-cierre" data-id="${datosCiudad.id}">X</button>
    <div class="seccion-arriba">
    <div class="datos">
    <div class="ciudad-descripcion">
    
        <h2 class="nombre-ciudad">${datosCiudad.name}</h2>
    <p class="description">${datosCiudad.weather[0].description}</p>
    </div>
    
    <div class="caja-clima">
      <p class="temperatura">Temperatura: ${Math.round(datosCiudad.main.temp)}°</p>
      <p class="st">Sensación térmica: ${Math.round(datosCiudad.main.feels_like)}°</p>
    </div>
    </div>
    
    
    </div>
    <div class="seccion-abajo">
    <img src="http://openweathermap.org/img/w/${datosCiudad.weather[0].icon}.png" alt="" class="img-clima">
    <div class="datos-derecha">
    
      <p class="temp-max">Max: ${Math.round(datosCiudad.main.temp_max)}°</p>
      <p class="temp-min">Min: ${Math.round(datosCiudad.main.temp_min)}°</p>
      <p class="humedad">Humedad: ${datosCiudad.main.humidity}%</p>
    </div>
    </div>
    </div>`

};





// let buttonDeleteOne = document.querySelector(".boton-cierre");





const borrarTodo = () => {

    
    ciudades = [];
    
    cajaConDisplays.innerHTML = ``;
    guardarLocalStorage(ciudades);
}

// let ciudades = JSON.parse(localStorage.getItem("ciudades")) || [];
// const ciudadDibujada = async (ciudad) => {

//     cajaConDisplays.innerHTML = ``;
//     let datosCiudad = await requestCity(ciudad);
//     console.log(datosCiudad);
    
    
//     return cajaConDisplays.innerHTML += `
    
//     <div class="caja-display" id="caja-display">
//     <button class="boton-cierre" data-id="${datosCiudad.id}">X</button>
//     <div class="seccion-arriba">
//     <div class="datos">
//     <div class="ciudad-descripcion">
    
//         <h2 class="nombre-ciudad">${datosCiudad.name}</h2>
//     <p class="description">${datosCiudad.weather[0].description}</p>
//     </div>
    
//     <div class="caja-clima">
//       <p class="temperatura">Temperatura: ${Math.round(datosCiudad.main.temp)}°</p>
//       <p class="st">Sensación térmica: ${Math.round(datosCiudad.main.feels_like)}°</p>
//     </div>
//     </div>
    
    
//     </div>
//     <div class="seccion-abajo">
//     <img src="http://openweathermap.org/img/w/${datosCiudad.weather[0].icon}.png" alt="" class="img-clima">
//     <div class="datos-derecha">
    
//       <p class="temp-max">Max: ${Math.round(datosCiudad.main.temp_max)}°</p>
//       <p class="temp-min">Min: ${Math.round(datosCiudad.main.temp_min)}°</p>
//       <p class="humedad">Humedad: ${datosCiudad.main.humidity}%</p>
//     </div>
//     </div>
//     </div>`};
// const saveLocalStorage = (listaCiudades) => localStorage.setItem("ciudades", JSON.stringify(listaCiudades));
// const renderizarCiudades = (ciudades) => {

//     if (ciudades === ``) {

//         return;
//     }

//     if (ciudades === []) {

//         return;
//     }

//     // console.log(ciudades);
//     // let datosCiudad = await requestCity(ciudades);
//     // console.log(datosCiudad);
   

//     ciudades.map((ciudad) => ciudadDibujada(ciudad));
//     console.log(ciudades);

// }
// const submitForm = (e) => {

//     e.preventDefault();
//     let ciudadBuscada = valorInput.value.trim(); 
//     ciudades = [ciudadBuscada, ...ciudades];
//     renderizarCiudades(ciudades);

   
//     saveLocalStorage(ciudades);
// };











const requestCity = async (city) => {
	const url = ``;
    let apiKey = '';
    let urlCity = `https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&q=${city}&appid=${apiKey}]`; 
    
    let response = await fetch(urlCity);
    let data = await response.json();
    console.log(data);
    return data;
} 

// const borrarCiudad = async (e) => {
    
//     if (!e.target.classList.contains("boton-cierre")) return;
//     let filtroId = Number(e.target.dataset.id);
//     console.log(filtroId);
  
//     console.log(ciudades)

//     let datosDeCiudades = await Promise.all(ciudades.map(async (ciudad) =>  await requestCity(ciudad)));

//     let datosFinales = datosDeCiudades.filter((ciudad) => ciudad.id !== filtroId);

//     console.log(datosFinales);

//     let datosParaRender = datosFinales.map((ciudad) => ciudad.name);

//     console.log(datosParaRender);

//     saveLocalStorage(datosParaRender);

//     ciudadDibujada(datosParaRender);





    
   
// }


// const init = () => {

//     formCiudad.addEventListener("submit", submitForm);
//     renderizarCiudades(ciudades);
//     buttonDelete.addEventListener("click", borrarTodo);
//     cajaConDisplays.addEventListener("click", borrarCiudad);
    
// }

// init();

const dibujarListaCiudades = (listaCiudades) => {
       
    if (listaCiudades.length === 0) {

        cajaConDisplays.innerHTML = '';
    }
    cajaConDisplays.innerHTML = listaCiudades.map((ciudad) => dibujarCiudad(ciudad)).join(``)
};

const buscarCiudad = async (e) => {

    e.preventDefault();
    let ciudadBuscada = valorInput.value.trim();

    if (ciudadBuscada === ``) {

        return alert("Ingrese una ciudad")
    };

    let ciudadConInfo = await requestCity(ciudadBuscada);

    if (!ciudadConInfo.id) {
        formCiudad.reset();
        return alert("No existe la ciudad");
       
    }


    
    else if (ciudades.some((ciudad) => ciudad.id === ciudadConInfo.id)) {

        formCiudad.reset();
        return alert("La ciudad ya está mostrada");
    }


    ciudades = [ciudadConInfo, ...ciudades];
    dibujarListaCiudades(ciudades);
    guardarLocalStorage(ciudades);
    formCiudad.reset();
}


const borrarCiudad = (e) => {

    if (!e.target.classList.contains("boton-cierre")) {

        return
    };

    const idFiltro = Number(e.target.dataset.id);
    if(window.confirm("¿Desea eliminar la ciudad?")) {

        ciudades = ciudades.filter((ciudad) => ciudad.id !== idFiltro)
        dibujarListaCiudades(ciudades);
    guardarLocalStorage(ciudades);
    }
}






const init = () => {

    dibujarListaCiudades(ciudades);
    guardarLocalStorage(ciudades);
    formCiudad.addEventListener("submit", buscarCiudad);
    cajaConDisplays.addEventListener("click", borrarCiudad);
    buttonDelete.addEventListener("click", borrarTodo);
};

init();