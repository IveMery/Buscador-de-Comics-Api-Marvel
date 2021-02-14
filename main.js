// api
const urlBase = "https://gateway.marvel.com/v1/public/";
const apiKey = 'fa4aa6e4fe839711358c5ab717c2ea05'
const ordenarComicsDeLaAZ = '&orderBy=title'
const ordenarComicsDeLaAZA = '&orderBy=-title'
const ordenarPesronajesAZ = '&orderBy=name'
const ordenarPesronajesZA = '&orderBy=-name'
const filtroBusqueda = document.querySelector('#filtro')
    // form
const form = document.forms[0];
const tipo = document.getElementById('tipo')
const orden = document.getElementById('orden')
const botonBuscar = document.querySelector('.boton-principal')
const resultados = document.querySelector('.resultados')
const comicsPorPagina = 20;
let paginaActual = 0;
const siguientePagina = document.getElementById('siguiente-pagina')

const limpiarResultados = () => {
    resultados.innerHTML = ""
}

// buscar comic y personajes
const buscarComics = (url, nombre) => {
        fetch(`${urlBase + url}?apikey=${apiKey}${ordenarComicsDeLaAZ}&offset=${paginaActual * comicsPorPagina}`)
            .then((res) => {
                return res.json()
            })
            .then((comics) => {
                console.log(comics)

                limpiarResultados()
                comics.data.results.map(comic => {
                    resultados.innerHTML += `<article data-id="${comic.id}" class="comic">
<div class="comic-img-container">
   <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="" class="comic-img-portada">
</div>

<h3 class="comic-titulo"> ${comic[nombre]}</h3>
</article>
`
                })

                const listaDecomics = document.querySelectorAll('.comic');
                console.log(listaDecomics)
                listaDecomics.forEach(comic => {
                    comic.onclick = () => {

                        console.log("hice click a un comic con el id ", comic.dataset.id)
                        fetch(`https://gateway.marvel.com/v1/public/comics/${comic.dataset.id}?apikey=${apiKey}`)

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


                                fetch(`https://gateway.marvel.com/v1/public/comics/${comic.dataset.id}/characters?apikey=${apiKey}`)

                                .then(res => res.json())
                                    .then(infodataComic => {
                                        console.log(infodataComic)
                                        const infoExtraComicYPersonajes = document.querySelector('.dataExtra-comic-y-personajes')
                                        infoExtraComicYPersonajes.innerHTML = ""
                                        infodataComic.data.results.map(infoExtra => {
                                            infoExtraComicYPersonajes.classList.remove('hidden')

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
                            })



                    }



                })

            })

    }
    //buscar personaje y comic

const buscarPersonajes = (url, nombre) => {
    fetch(`${urlBase + url}?apikey=${apiKey}`)
        .then((res) => {
            return res.json()
        })
        .then((characters) => {
            console.log(characters)
            const resultados = document.querySelector('.resultados')
            resultados.innerHTML = ""
            characters.data.results.map(personajes => {
                resultados.innerHTML += `<article data-id="${personajes.id}" class="tarjeta-info-extra-contenedor">
                <div class="tarjeta-info-extra-img">
                   <img src="${personajes.thumbnail.path}.${personajes.thumbnail.extension}" alt="" class="tarjeta-info-extra-img-portada">
                </div>
                <div class="tarjeta-info-extra">
                <h3 class="tarjeta-info-extra-titulo"> ${personajes[nombre]}</h3>
                </div>
                </article>
                `
                    // <article class="tarjeta-info-extra-contenedor">
                    // <div class="tarjeta-info-extra-img">
                    // <img src="${infoExtra.thumbnail.path}.${infoExtra.thumbnail.extension}" alt="" class="tarjeta-info-extra-img-portada">
                    // </div>
                    // <div class="tarjeta-info-extra">
                    // <h2 class="tarjeta-info-extra-titulo">${infoExtra.name}</h2>
                    // </div>
                    // </article>
                    // `
            })

            const listaDePersonajes = document.querySelectorAll('.tarjeta-info-extra-contenedor');
            console.log(listaDePersonajes)
            listaDePersonajes.forEach(characters => {
                characters.onclick = () => {

                    console.log("hice click a un personaje con el id ", characters.dataset.id)
                    fetch(`https://gateway.marvel.com/v1/public/characters/${characters.dataset.id}?apikey=${apiKey}`)

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
                            fetch(`https://gateway.marvel.com/v1/public/characters/${characters.dataset.id}/comics?apikey=${apiKey}`)

                            .then(res => res.json())
                                .then(infopersonajesComics => {
                                    console.log(infopersonajesComics)
                                    const infoExtraComicYPersonajes = document.querySelector('.dataExtra-comic-y-personajes')
                                    infoExtraComicYPersonajes.innerHTML = ""
                                    infopersonajesComics.data.results.map(infoExtra => {
                                        infoExtraComicYPersonajes.classList.remove('hidden')

                                        infoExtraComicYPersonajes.innerHTML += `<article data-id="${infoExtra.id}" class="comic">
                                                          <div class="comic-img-container">
                                                      <img src="${infoExtra.thumbnail.path}.${infoExtra.thumbnail.extension}" alt="" class="comic-img-portada">
                                                             </div>
                                                         <h3 class="comic-titulo"> ${infoExtra.title}</h3>
                                                          </article>`

                                    })
                                })




                        })

                }


            })



        })
}
buscarComics("comics", "title")


form.onsubmit = (e) => {
    e.preventDefault(tipo);
    filtrarPorTipo()
}

// buscarComicOPersonajes("comics", "title")
const filtrarPorTipo = () => {
    console.log(tipo.value)
    if (tipo.value === "comics") {

        buscarComics("comics", "title")

    }
    if (tipo.value === "personajes") {
        buscarPersonajes("characters", "name")
        console.log(filtroBusqueda.value)
            // buscarComicOPersonajes("characters", "name")
    }


}



siguientePagina.onclick = () => {
    paginaActual++

    console.log('hice click en el boton seguir')
    buscarComics("comics", "title", "paginaActual")

}