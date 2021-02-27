// Api
const urlBase = "https://gateway.marvel.com/v1/public/";
const apiKey = 'fa4aa6e4fe839711358c5ab717c2ea05'
const ordenarComicsDeLaAZ = '&orderBy=title'
const input = document.querySelector('#filtro')
    // Form
const form = document.forms[0];
const tipo = document.getElementById('tipo')
const orden = document.getElementById('orden')
const botonBuscar = document.querySelector('.boton-principal')
    //Contenedores de info
const resultados = document.querySelector('.resultados')
const infoExtraComicYPersonajes = document.querySelector('.dataExtra-comic-y-personajes')
const contenedorInfoExtra = document.querySelector('.contenedor-info-extra')
const tituloDeInformacionExtra = document.querySelector('.subtitulo-info-extra')
const infoResultados = document.querySelector('.resultados-seccion')
const contadorResultadosSeleccionados = document.querySelector('.contador-resultados-detalles')
let contadorResultados = document.querySelector('.cuenta-resultados')
let resutadosDeSeleccionados = document.querySelector('.contador-resultados-seleccionados')
const descripcion = document.querySelector('.descripcion')
    //Spinner
const spinnerLoader = document.querySelector('.lds-hourglass')
const overlayLoader = document.querySelector('.overlay')
    //Paginas
const comicsPorPagina = 20;
let paginaActual = 0;
//let paginaActualPersonajes = 0;
const siguientePagina = document.getElementById('siguiente-pagina')
const paginaFinal = document.getElementById('pagina-final')
const paginaPrevia = document.getElementById('pagina-previa')
const primeraPagina = document.getElementById('primera-pagina')

const limpiarResultados = () => {
    resultados.innerHTML = ""
}

const mostrarSpinner = () => {
    overlayLoader.classList.remove('hidden')
}

const ocultarSpinner = () => {
    overlayLoader.classList.add('hidden')
}

const ocultarContenedorInfoExtra = () => {
    contenedorInfoExtra.classList.add('hidden')
}

const mostrarContenedorInfoExtra = () => {
    contenedorInfoExtra.classList.remove('hidden')
}

const limpiarResultadosInfoDetalles = () => {
    infoExtraComicYPersonajes.innerHTML = ""
}

const mostrarInfoResultados = () => {
    infoResultados.classList.remove('hidden')
}

const ocultarInfoResultados = () => {
    infoResultados.classList.add('hidden')
}

const fetchInicial = () => {
    mostrarSpinner()
    mostrarInfoResultados()
    fetch(`${urlBase}/comics?apikey=${apiKey}${ordenarComicsDeLaAZ}&offset=${paginaActual * comicsPorPagina}`)
        .then((res) => {
            return res.json()
        })
        .then((comics) => {
            mostrarTarjetaComics(comics)
            deshabilitarBotonesPrevios()
            deshabilitarBotonesPosteriores()
            ocultarSpinner()
        })

}

fetchInicial()

tipo.onclick = () => {
    opcionesAlselecionarOrdenPersonajes()
}
const opcionesAlselecionarOrdenPersonajes = () => {
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
}

const filtrarPorInputTipoOrden = (paginaActual, input, orden) => {
    mostrarSpinner()
    if (tipo.value === 'comics' && orden.value && input.value) {
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
        fetch(`${urlBase}/characters?apikey=${apiKey}&orderBy=${orden.value}&nameStartsWith=${input.value}&offset=${paginaActual * comicsPorPagina}`)
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
        mostrarSpinner()
        if (tipo.value === 'comics' && orden.value === 'title') {
            fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((comics) => {
                    mostrarTarjetaComics(comics)
                    ocultarSpinner()
                })
        } else if (tipo.value === 'characters' && orden.value === 'name') {
            fetch(`${urlBase}/characters?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((characters) => {
                    mostrarTarjetaPersonajes(characters)
                    ocultarSpinner()
                })
        }
        if (tipo.value === 'comics' && orden.value === '-title') {
            fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((comics) => {
                    mostrarTarjetaComics(comics)
                    ocultarSpinner()
                })
        } else if (tipo.value === 'characters' && orden.value === '-name') {
            fetch(`${urlBase}/characters?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((characters) => {
                    mostrarTarjetaPersonajes(characters)
                    ocultarSpinner()
                })
        }
        if (tipo.value === 'comics' && orden.value === '-focDate') {
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
    // Buscar comic , hacer click en el comic y mostrar sus  personajes
const mostrarTarjetaComics = (comics) => {
    mostrarSpinner()
    mostrarInfoResultados()
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
    ocultarSpinner()
    deshabilitarBotonesPosteriores()
    deshabilitarBotonesPrevios()
    ocultarContenedorInfoExtra()
}


// Seleccionar comic
const infoComic = (comics) => {
    mostrarSpinner()
    const listaDecomics = document.querySelectorAll('.comic');
    listaDecomics.forEach(comic => {
        comic.onclick = () => {
            fetch(`${urlBase}/comics/${comic.dataset.id}?apikey=${apiKey}`)
                .then(res => res.json())
                .then(dataComic => {
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
                        <p class="respuesta-subtitulos">${convertirFecha(datosComic).toLocaleDateString()=== "Invalid Date" ? "No disponible" : convertirFecha(datosComic).toLocaleDateString()}</p>
                        
                        <p class="subtitulos"> Guionistas:</p>
                        <p class="respuesta-subtitulos">${buscarEscritor(datosComic)}</p>
                        <p class="subtitulos"> Descripción:</p>
                        <p class="respuesta-subtitulos descripcion">${descripcionComic(datosComic)}</p>
                        </div>
                        </article>`
                    })
                    ocultarInfoResultados()
                    infoComicPersonajes(comic)
                    ocultarSpinner()
                    deshabilitarTodosLosBotones()
                })
        }
    })
}

const buscarEscritor = (datosComic) => {
    return datosComic.creators.items.map(creador => {
        return creador.role === 'writer' ? `${creador.name}` : ''
    })
}

const descripcionComic = (datosComic) => {
    return datosComic.description === null ? 'No disponible' : `${datosComic.description}`
}

const convertirFecha = (datosComic) => {
    let fecha = datosComic.modified
    let formatoFecha = new Date(fecha)
    return formatoFecha
}

//Mostrar personajes de un comic
const infoComicPersonajes = (comic) => {
    mostrarSpinner()
    fetch(`${urlBase}/comics/${comic.dataset.id}/characters?apikey=${apiKey}`)
        .then(res => res.json())
        .then(infoDataComic => {
            limpiarResultadosInfoDetalles()
            infoDataComic.data.results.map(infoExtra => {
                mostrarContenedorInfoExtra()
                tituloDeInformacionExtra.innerHTML = `Personajes`
                resutadosDeSeleccionados.innerHTML = infoDataComic.data.total
                infoExtraComicYPersonajes.innerHTML += `
                <article class="tarjeta-info-extra-contenedor" data-id="${infoExtra.id}">
                <div class="tarjeta-info-extra-img">
                <img src="${infoExtra.thumbnail.path}.${infoExtra.thumbnail.extension}" alt="" class="tarjeta-info-extra-img-portada">
                </div>
                <div class="tarjeta-info-extra">
                <h2 class="tarjeta-info-extra-titulo">${infoExtra.name}</h2>
                </div>
                </article>`
            })
            infoPersonaje(comic)
            ocultarSpinner()
        })
}

// Buscar personajes , hacer click en el personaje y mostrar sus comics en los que aparece
const mostrarTarjetaPersonajes = (characters) => {
    mostrarSpinner()
    mostrarInfoResultados()
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
            </article>`
    })
    infoPersonaje()
    ocultarSpinner()
    deshabilitarBotonesPrevios()
    deshabilitarBotonesPosteriores()
    ocultarContenedorInfoExtra()

}

const infoPersonaje = () => {
    mostrarSpinner()
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
                    <p class="respuesta-subtitulos">${datosPersonajes.description}</p>`
                    })
                    ocultarInfoResultados()
                    ocultarSpinner()
                    deshabilitarTodosLosBotones()
                    mostrarInfoPersonajesEnComics(characters)
                })
        }
    })
}


const mostrarInfoPersonajesEnComics = (characters) => {
    mostrarSpinner()
    fetch(`${urlBase}/characters/${characters.dataset.id}/comics?apikey=${apiKey}`)
        .then(res => res.json())
        .then(infoPersonajesComics => {
            resutadosDeSeleccionados.innerHTML = infoPersonajesComics.data.total
            limpiarResultadosInfoDetalles()
            infoPersonajesComics.data.results.map(infoExtra => {
                mostrarContenedorInfoExtra()
                tituloDeInformacionExtra.innerHTML = `Comics`
                infoExtraComicYPersonajes.innerHTML += `<article data-id="${infoExtra.id}" class="comic">
                <div class="comic-img-container">
                <img src="${infoExtra.thumbnail.path}.${infoExtra.thumbnail.extension}" alt="" class="comic-img-portada">
                </div>
                <h3 class="comic-titulo"> ${infoExtra.title}</h3>
                </article>`
            })
            infoComic(characters)
            ocultarSpinner()
        })
}

//Paginas
siguientePagina.onclick = () => {
    paginaActual++
    deshabilitarBotonesPosteriores()
    filtrarPorInputTipoOrden(paginaActual, input, orden)
    console.log(paginaActual)

}

paginaPrevia.onclick = () => {
    paginaActual--
    paginaActual - 20
    console.log(paginaActual)
    deshabilitarBotonesPrevios()
    filtrarPorInputTipoOrden(paginaActual, input, orden)

}

primeraPagina.onclick = () => {
    paginaActual = 0
    console.log(paginaActual)
    deshabilitarBotonesPrevios()
    filtrarPorInputTipoOrden(paginaActual, input, orden)

}

paginaFinal.onclick = () => {
    if (tipo.value === "comics") {
        paginaActual++
        paginaActual = 2426
        console.log(paginaActual)
        deshabilitarBotonesPosteriores()
        filtrarPorInputTipoOrden(paginaActual, input, orden)
    } else {
        paginaActual++
        paginaActual = 74
        console.log(paginaActual)
        deshabilitarBotonesPosteriores()
        filtrarPorInputTipoOrden(paginaActual, input, orden)
    }
}

const deshabilitarBotonesPrevios = () => {
    if (paginaActual === 0) {
        primeraPagina.disabled = true
        paginaPrevia.disabled = true
    } else if (paginaActual !== 0) {
        primeraPagina.disabled = false
        paginaPrevia.disabled = false
    }
}

// Llegar al final y deshabilitar botones

const deshabilitarBotonesPosteriores = () => {
    if (paginaActual >= 2426) {
        paginaFinal.disabled = true
        siguientePagina.disabled = true

    } else {
        paginaFinal.disabled = false
        siguientePagina.disabled = false
    }
    if (tipo.value === 'characters' && paginaActual == 74) {
        paginaFinal.disabled = true
        siguientePagina.disabled = true
    } else if (tipo.value === 'characters' && paginaActual !== 74) {
        paginaFinal.disabled = false
        siguientePagina.disabled = false
    }
}

const deshabilitarTodosLosBotones = () => {
    primeraPagina.disabled = true
    paginaPrevia.disabled = true
    paginaFinal.disabled = true
    siguientePagina.disabled = true
}