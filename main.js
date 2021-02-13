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

const buscarComics = (url, nombre) => {
    fetch(`${urlBase + url}?apikey=${apiKey}${ordenarComicsDeLaAZ}`)
        .then((res) => {
            return res.json()
        })
        .then((comics) => {
            console.log(comics)
            const resultados = document.querySelector('.resultados')
            resultados.innerHTML = ""
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

                    fetch(`https://gateway.marvel.com/v1/public/comics/${comic.dataset.id}?apikey=fa4aa6e4fe839711358c5ab717c2ea05`)

                    .then(res => res.json())
                        .then(dataComic => {
                            console.log(dataComic)
                            resultados.innerHTML = ""
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
                        })
                }
            })
        })
}




const buscarPersonajes = (url, nombre) => {
    fetch(`${urlBase + url}?apikey=${apiKey}${ordenarPesronajesAZ}`)
        .then((res) => {
            return res.json()
        })
        .then((comics) => {
            console.log(comics)
            const resultados = document.querySelector('.resultados')
            resultados.innerHTML = ""
            comics.data.results.map(comic => {
                resultados.innerHTML += `<article class="comic">
<div class="comic-img-container">
   <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="" class="comic-img-portada">
</div>
<h3 class="comic-titulo"> ${comic[nombre]}</h3>
</article>
`
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