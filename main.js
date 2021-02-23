// api
const urlBase = "https://gateway.marvel.com/v1/public/";
const apiKey = 'fa4aa6e4fe839711358c5ab717c2ea05'
const ordenarComicsDeLaAZ = '&orderBy=title'
    // const ordenarComicsDeLaAZA = '&orderBy=-title'
    // const ordenarPesronajesAZ = '&orderBy=name'
    // const ordenarPesronajesZA = '&orderBy=-name'
    // const ordenarPorNuevos = '&orderBy=-focDate'
    // const ordenarPorviejos = '&orderBy=focDate'
const input = document.querySelector('#filtro')
    // form
const form = document.forms[0];
const tipo = document.getElementById('tipo')
const orden = document.getElementById('orden')
const botonBuscar = document.querySelector('.boton-principal')
const resultados = document.querySelector('.resultados')


//contenedores de info
const infoExtraComicYPersonajes = document.querySelector('.dataExtra-comic-y-personajes')
const contenedorInfoExtra = document.querySelector('.contenedor-info-extra')
const tituloDeInformacionExtra = document.querySelector('.subtitulo-info-extra')
const infoResultados = document.querySelector('.resultados-seccion')

//spinner
const spinner = document.querySelector('.lds-hourglass')

//paginas
const comicsPorPagina = 20;
let paginaActual = 0;
let paginaActualPersonajes = 0;
const siguientePagina = document.getElementById('siguiente-pagina')
const paginaFinal = document.getElementById('pagina-final')
const paginaPrevia = document.getElementById('pagina-previa')
const primeraPagina = document.getElementById('primera-pagina')

let contadorResultados = document.querySelector('.cuenta-resultados')


const limpiarResultados = () => {
    resultados.innerHTML = ""
}

const mostrarSpinner = () => {
    spinner.classList.remove('hidden')
}

const ocultarSpinner = () => {
    spinner.classList.add('hidden')
}

const limpiarContenedorInfoExtra = () => {
    contenedorInfoExtra.classList.add('hidden')
}



const fetchInicial = () => {
    infoResultados.classList.remove('hidden')
    fetch(`${urlBase}/comics?apikey=${apiKey}${ordenarComicsDeLaAZ}&offset=${paginaActual * comicsPorPagina}`)
        .then((res) => {
            return res.json()
        })
        .then((comics) => {

            mostrarTarjetaComics(comics)
            ocultarSpinner()

        })

}

fetchInicial()

tipo.onclick = () => {
    opcionesAlselecionarOrdenPersonajes()
}
const opcionesAlselecionarOrdenPersonajes = () => {

    console.log('hice click')

    if (tipo.value === "characters") {

        orden.innerHTML = `<option value="name">A-Z</option>;
                         <option value="-name">Z-A</option>`;

    } else if (tipo.value === 'comics') {
        orden.innerHTML = `<option value="title">A-Z</option>
        <option value="-title">Z-A</option>
        <option value="-focDate">Mas Nuevos</option>
        <option value="focDate">Mas Viejos</option>`
    }


}

opcionesAlselecionarOrdenPersonajes()

form.onsubmit = (e) => {
    e.preventDefault();
    filtrarPorInputTipoOrden(paginaActual, input, orden, tipo)
        //console.log(input.value)

}

// buscarComicOPersonajes("comics", "title")
const filtrarPorInputTipoOrden = (paginaActual, input, orden) => {


    if (tipo.value === 'comics' && orden.value && input.value) {
        // console.log(orden.value)
        mostrarSpinner()
        fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&titleStartsWith=${input.value}&offset=${paginaActual * comicsPorPagina}`)
            .then((res) => {
                return res.json()
            })
            .then((comics) => {

                mostrarTarjetaComics(comics)
                ocultarSpinner()
            })
    } else if (tipo.value === 'characters' && orden.value && input.value) {
        console.log('elegi personajes')
        mostrarSpinner()
        fetch(`${urlBase}/characters?apikey=${apiKey}&orderBy=${orden.value}&nameStartsWith=${input.value}&offset=${paginaActualPersonajes * comicsPorPagina}`)
            .then((res) => {
                return res.json()
            })
            .then((characters) => {

                mostrarTarjetaPersonajes(characters)
                ocultarSpinner()
            })
    } else {
        inputVacio()
    }
}

const inputVacio = () => {
        if (tipo.value === 'comics' && orden.value === 'title') {
            mostrarSpinner()
            fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((comics) => {

                    mostrarTarjetaComics(comics)
                    ocultarSpinner()
                })


        } else if (tipo.value === 'characters' && orden.value === 'name') {
            console.log('elegi personajes de la a-z')
            mostrarSpinner()
            fetch(`${urlBase}/characters?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActualPersonajes * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((characters) => {
                    console.log(characters)

                    mostrarTarjetaPersonajes(characters)
                    ocultarSpinner()
                })

        }
        if (tipo.value === 'comics' && orden.value === '-title') {
            mostrarSpinner()
            fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((comics) => {

                    mostrarTarjetaComics(comics)
                    ocultarSpinner()
                })

        } else if (tipo.value === 'characters' && orden.value === '-name') {
            mostrarSpinner()
            fetch(`${urlBase}/characters?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActualPersonajes * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((characters) => {
                    console.log(characters)

                    mostrarTarjetaPersonajes(characters)
                    ocultarSpinner()
                })

        }
        if (tipo.value === 'comics' && orden.value === '-focDate') {
            mostrarSpinner()
            fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((comics) => {

                    mostrarTarjetaComics(comics)
                    ocultarSpinner()
                })
        }
        if (tipo.value === 'comics' && orden.value === 'focDate') {
            mostrarSpinner()
            fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((comics) => {

                    mostrarTarjetaComics(comics)
                    ocultarSpinner()
                })
        }
    }
    // buscar comic , hacer click en el comic y mostrar sus  personajes
const mostrarTarjetaComics = (comics) => {
        infoResultados.classList.remove('hidden')
        contadorResultados.innerHTML = comics.data.total
        limpiarResultados()
        comics.data.results.map(comic => {
            resultados.innerHTML += `<article data-id="${comic.id}" class="comic">
              <div class="comic-img-container">
              <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="" class="comic-img-portada">
              </div>
             <h3 class="comic-titulo"> ${comic.title}</h3>
            </article>`
        })

        infoComic()

        limpiarContenedorInfoExtra()
    }
    // seleccionar comic
const infoComic = (comics) => {

    const listaDecomics = document.querySelectorAll('.comic');
    listaDecomics.forEach(comic => {
        comic.onclick = () => {
            fetch(`${urlBase}/comics/${comic.dataset.id}?apikey=${apiKey}`)
                .then(res => res.json())
                .then(dataComic => {
                    mostrarSpinner()
                    limpiarResultados()
                    dataComic.data.results.map(datosComic => {
                        resultados.innerHTML = `
                            <article class="info-comic" data-id = ${datosComic.id}>
                                        <div class="info-comic-img">
                                        <img src="${datosComic.thumbnail.path}.${datosComic.thumbnail.extension}" alt="" class="info-comic-img-portada">
                                        </div>
                                        <div class="info-comic-datos">
                                        <h3 class="comic-titulo"> ${datosComic.title}</h3>
                                        <p class="subtitulos">Publicado:</p>
                                        <p class="respuesta-subtitulos">${datosComic.dates[0].date}</p>
                                        <p class="subtitulos"> Guionistas:</p>
                                        <p class="respuesta-subtitulos">${datosComic.creators.items[0].name}</p>
                                        <p class="subtitulos"> Descripción:</p>
                                        <p class="respuesta-subtitulos">${datosComic.description}</p>
                                        </div>
                                        </article>`
                    })
                    infoResultados.classList.add('hidden')
                    infoComicPersonajes(comic)
                    ocultarSpinner()


                })
        }
    })


}

//mostrar personajes de un comic
const infoComicPersonajes = (comic) => {


    fetch(`${urlBase}/comics/${comic.dataset.id}/characters?apikey=${apiKey}`)
        .then(res => res.json())
        .then(infodataComic => {

            infoExtraComicYPersonajes.innerHTML = ""
            infodataComic.data.results.map(infoExtra => {
                contenedorInfoExtra.classList.remove('hidden')
                tituloDeInformacionExtra.innerHTML = `Personajes`
                infoExtraComicYPersonajes.innerHTML += `
                <article class="tarjeta-info-extra-contenedor" data-id="${infoExtra.id}">
                
                <div class="tarjeta-info-extra-img">
                <img src="${infoExtra.thumbnail.path}.${infoExtra.thumbnail.extension}" alt="" class="tarjeta-info-extra-img-portada">
                </div>
                <div class="tarjeta-info-extra">
                <h2 class="tarjeta-info-extra-titulo">${infoExtra.name}</h2>
               
                </div>
                </article>
               
               `

            })

            infoPersonaje(comic)


        })
}


//// buscar personajes , hacer click en el personaje y mostrar sus comics en los que aparece
const mostrarTarjetaPersonajes = (characters) => {
    infoResultados.classList.remove('hidden')
    contadorResultados.innerHTML = characters.data.total
    limpiarResultados()
    characters.data.results.map(personajes => {
        resultados.innerHTML += `<article data-id="${personajes.id}" class="tarjeta-info-extra-contenedor">
                <div class="tarjeta-info-extra-img">
                   <img src="${personajes.thumbnail.path}.${personajes.thumbnail.extension}" alt="" class="tarjeta-info-extra-img-portada">
                </div>
                <div class="tarjeta-info-extra">
                <h3 class="tarjeta-info-extra-titulo"> ${personajes.name}</h3>
                </div>
                </article>
                `
    })
    infoPersonaje()
    limpiarContenedorInfoExtra()
}

//este es de los personajes para poner en el otro
const infoPersonaje = () => {
    // infoResultados.classList.add('hidden')
    // mostrarSpinner()
    const listaDePersonajes = document.querySelectorAll('.tarjeta-info-extra-contenedor');
    listaDePersonajes.forEach(characters => {
        characters.onclick = () => {
            fetch(`${urlBase}/characters/${characters.dataset.id}?apikey=${apiKey}`)
                .then(res => res.json())
                .then(dataPersonaje => {

                    limpiarResultados()
                    dataPersonaje.data.results.map(datosPersonajes => {
                        resultados.innerHTML = `
                        <article class="info-comic" data-id="${datosPersonajes.id}">
                                    <div class="info-comic-img">
                                    <img src="${datosPersonajes.thumbnail.path}.${datosPersonajes.thumbnail.extension}" alt="" class="info-comic-img-portada">
                                    </div>
                                    <div class="info-comic-datos">
                        <h3 class="comic-titulo"> ${datosPersonajes.name}</h3>
                        <p class="respuesta-subtitulos">${datosPersonajes.description}</p>
                                `
                    })

                    infoResultados.classList.add('hidden')

                    mostrarInfoPersonajesEnComics(characters)


                })

        }
    })
}


const mostrarInfoPersonajesEnComics = (characters) => {

    fetch(`${urlBase}/characters/${characters.dataset.id}/comics?apikey=${apiKey}`)
        .then(res => res.json())
        .then(infopersonajesComics => {

            infoExtraComicYPersonajes.innerHTML = ""
            infopersonajesComics.data.results.map(infoExtra => {
                contenedorInfoExtra.classList.remove('hidden')
                    //infoExtraComicYPersonajes.classList.remove('hidden')
                tituloDeInformacionExtra.innerHTML = `Comics`
                infoExtraComicYPersonajes.innerHTML +=
                    `<article data-id="${infoExtra.id}" class="comic">
                              <div class="comic-img-container">
                              <img src="${infoExtra.thumbnail.path}.${infoExtra.thumbnail.extension}" alt="" class="comic-img-portada">
                              </div>
                               
                               <h3 class="comic-titulo"> ${infoExtra.title}</h3>
                               
                               
                                </article>`

            })

            infoComic(characters)
                //ocultarSpinner()
        })
}



//Paginas
siguientePagina.onclick = () => {
    if (tipo.value === 'comics') {

        paginaActual++
        filtrarPorInputTipoOrden(paginaActual, input, orden)

        console.log(paginaActual)
            //filtrarPorTipoYOrden(paginaActual)

        // } else {
        //     paginaActualPersonajes++
        //     buscarPersonajes('characters', 'name', 'paginaActualPersonajes')
        // }

    }
}
paginaFinal.onclick = () => {
    if (tipo.value === "comics") {
        paginaActual++
        paginaActual = 2422
        console.log(paginaActual)


        filtrarPorInputTipoOrden(paginaActual, input, orden)

        // } else {
        //     paginaActualPersonajes++
        //     paginaActualPersonajes = 74
        //     buscarPersonajes('characters', 'name', 'paginaActualPersonajes')
        // }
    }
}
paginaPrevia.onclick = () => {
    if (tipo.value === "comics") {
        paginaActual--
        paginaActual - 20
        console.log(paginaActual)

        filtrarPorInputTipoOrden(paginaActual, input, orden)
            // } else {
            //     paginaActualPersonajes--
            //     paginaActualPersonajes - 20
            //     buscarPersonajes('characters', 'name', 'paginaActualPersonajes')
            // }
    }
}
primeraPagina.onclick = () => {
    if (tipo.value === "comics") {
        paginaActual = 0
        console.log(paginaActual)


        filtrarPorInputTipoOrden(paginaActual, input, orden)
            // } else {
            //     paginaActualPersonajes = 0
            //     buscarPersonajes('characters', 'name', 'paginaActualPersonajes')
            // }
    }
}