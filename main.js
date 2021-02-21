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

//spinner
const spinner = document.querySelector('.contenedor-spinner')
console.log(spinner)
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

fetch(`${urlBase}/comics?apikey=${apiKey}${ordenarComicsDeLaAZ}&offset=${paginaActual * comicsPorPagina}`)
    .then((res) => {
        return res.json()
    })
    .then((comics) => {

        mostrarTarjetaComics(comics)
    })


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
        fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&titleStartsWith=${input.value}&offset=${paginaActual * comicsPorPagina}`)
            .then((res) => {
                return res.json()
            })
            .then((comics) => {

                mostrarTarjetaComics(comics)


            })
    } else if (tipo.value === 'characters' && orden.value && input.value) {
        console.log('elegi personajes')
        fetch(`${urlBase}/characters?apikey=${apiKey}&orderBy=${orden.value}&nameStartsWith=${input.value}&offset=${paginaActualPersonajes * comicsPorPagina}`)
            .then((res) => {
                return res.json()
            })
            .then((characters) => {
                console.log(characters)
                mostrarTarjetaPersonajes(characters)
            })
    } else {
        inputVacio()
    }
}

const inputVacio = () => {
        if (tipo.value === 'comics' && orden.value === 'title') {

            fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((comics) => {

                    mostrarTarjetaComics(comics)
                })


        } else if (tipo.value === 'characters' && orden.value === 'name') {
            console.log('elegi personajes de la a-z')
            fetch(`${urlBase}/characters?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActualPersonajes * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((characters) => {
                    console.log(characters)
                    mostrarTarjetaPersonajes(characters)
                })

        }
        if (tipo.value === 'comics' && orden.value === '-title') {

            fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((comics) => {
                    // console.log(comics)

                    mostrarTarjetaComics(comics)
                })

        } else if (tipo.value === 'characters' && orden.value === '-name') {
            console.log('elegi personajes de la z-a')
            fetch(`${urlBase}/characters?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActualPersonajes * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((characters) => {
                    console.log(characters)
                    mostrarTarjetaPersonajes(characters)
                })

        }
        if (tipo.value === 'comics' && orden.value === '-focDate') {
            fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((comics) => {
                    mostrarTarjetaComics(comics)
                })
        }
        if (tipo.value === 'comics' && orden.value === 'focDate') {
            fetch(`${urlBase}/comics?apikey=${apiKey}&orderBy=${orden.value}&offset=${paginaActual * comicsPorPagina}`)
                .then((res) => {
                    return res.json()
                })
                .then((comics) => {
                    mostrarTarjetaComics(comics)
                })
        }
    }
    // buscar comic , hacer click en el comic y mostrar sus  personajes
const mostrarTarjetaComics = (comics) => {
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
    }
    // seleccionar comic
const infoComic = (comics) => {
    const listaDecomics = document.querySelectorAll('.comic');
    console.log(listaDecomics)
    listaDecomics.forEach(comic => {
        comic.onclick = () => {
            console.log("hice click a un comic con el id ", comic.dataset.id)
            fetch(`${urlBase}/comics/${comic.dataset.id}?apikey=${apiKey}`)
                .then(res => res.json())
                .then(dataComic => {
                    console.log(dataComic)
                    limpiarResultados()
                    dataComic.data.results.map(datosComic => {
                        resultados.innerHTML = `
                            <article class="info-comic">
                                        <div class="info-comic-img">
                                        <img src="${datosComic.thumbnail.path}.${datosComic.thumbnail.extension}" alt="" class="info-comic-img-portada">
                                        </div>
                                        <div class="info-comic-datos">
                                        <h3 class="comic-titulo"> ${datosComic.title}</h3>
                                        <p>Publicado:</p>
                                        <p>${datosComic.dates[0].date}</p>
                                        <p> Guionistas:</p>
                                        <p>${datosComic.creators.items[0].name}</p>
                                        <p> Descripción:</p>
                                        <p>${datosComic.description}</p>
                                        </div>
                                        </article>`
                    })
                    infoComicPersonajes(comic)
                })
        }
    })
}

//mostrar personajes de un comic
const infoComicPersonajes = (comic) => {

    fetch(`${urlBase}/comics/${comic.dataset.id}/characters?apikey=${apiKey}`)
        .then(res => res.json())
        .then(infodataComic => {
            console.log(infodataComic)
            infoExtraComicYPersonajes.innerHTML = ""
            infodataComic.data.results.map(infoExtra => {
                contenedorInfoExtra.classList.remove('hidden')
                tituloDeInformacionExtra.innerHTML = `Personajes`
                infoExtraComicYPersonajes.innerHTML += `
                <article class="tarjeta-info-extra-contenedor">
                <div class="tarjeta-info-extra-img">
                <img src="${infoExtra.thumbnail.path}.${infoExtra.thumbnail.extension}" alt="" class="tarjeta-info-extra-img-portada">
                </div>
                <div class="tarjeta-info-extra">
                <h2 class="tarjeta-info-extra-titulo">${infoExtra.name}</h2>
                </div>
                </article>
               `
            })
        })
}


//// buscar personajes , hacer click en el personaje y mostrar sus comics en los que
const mostrarTarjetaPersonajes = (characters) => {
    limpiarResultados()
    const resultados = document.querySelector('.resultados')
    resultados.innerHTML = ""
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
}

const infoPersonaje = () => {
    const listaDePersonajes = document.querySelectorAll('.tarjeta-info-extra-contenedor');
    console.log(listaDePersonajes)
    listaDePersonajes.forEach(characters => {
        characters.onclick = () => {
            console.log("hice click a un personaje con el id ", characters.dataset.id)
            fetch(`${urlBase}/characters/${characters.dataset.id}?apikey=${apiKey}`)
                .then(res => res.json())
                .then(dataPersonaje => {
                    console.log(dataPersonaje)
                    limpiarResultados()
                    dataPersonaje.data.results.map(datosPersonajes => {
                        resultados.innerHTML = `
                        <article class="info-comic">
                                    <div class="info-comic-img">
                                    <img src="${datosPersonajes.thumbnail.path}.${datosPersonajes.thumbnail.extension}" alt="" class="info-comic-img-portada">
                                    </div>
                                    <div class="info-comic-datos">
                        <h3 class="comic-titulo"> ${datosPersonajes.name}</h3>
                                `
                    })
                    mostrarInfoPersonajesEnComics(characters)
                })
        }
    })
}


const mostrarInfoPersonajesEnComics = (characters) => {

    fetch(`${urlBase}/characters/${characters.dataset.id}/comics?apikey=${apiKey}`)
        .then(res => res.json())
        .then(infopersonajesComics => {
            console.log(infopersonajesComics)
                //const infoExtraComicYPersonajes = document.querySelector('.dataExtra-comic-y-personajes')
            console.log(infoExtraComicYPersonajes)
            infoExtraComicYPersonajes.innerHTML = ""
            infopersonajesComics.data.results.map(infoExtra => {
                contenedorInfoExtra.classList.remove('hidden')
                infoExtraComicYPersonajes.classList.remove('hidden')
                tituloDeInformacionExtra.innerHTML = `Comics`
                infoExtraComicYPersonajes.innerHTML +=
                    `<article data-id="${infoExtra.id}" class="comic">
                              <div class="comic-img-container">
                              <img src="${infoExtra.thumbnail.path}.${infoExtra.thumbnail.extension}" alt="" class="comic-img-portada">
                              </div>
                               <h3 class="comic-titulo"> ${infoExtra.title}</h3>
                                </article>`

            })
        })
}


//Paginas
siguientePagina.onclick = () => {
    if (tipo.value === 'comics') {

        paginaActual++
        filtrarPorInputTipoOrden(paginaActual, input, orden)
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

        filtrarPorInputTipoOrden(paginaActual, input, orden)
            // } else {
            //     paginaActualPersonajes = 0
            //     buscarPersonajes('characters', 'name', 'paginaActualPersonajes')
            // }
    }
}


// const deshabilitarTodosLosBotones = () => {
//     primeraPagina.disabled = false
//     paginaPrevia.disabled = false
//     paginaFinal.disabled = false
//     siguientePagina

//     siguientePagina.onmousemove = () => {
//         console.log('deshabilite botones')
//     }
// }