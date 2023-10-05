document.addEventListener('DOMContentLoaded', () => {
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            let input = document.getElementById('inputBuscar');
            let listaElement = document.getElementById('lista');

            document.getElementById('btnBuscar').addEventListener('click', () => {

                let encontrados = [];

                function starGenerator(score) {
                    const maxStars = 10;
                    const fullStar = '⭐';
                    const starRating = fullStar.repeat(score);
                    return starRating;
                }

                data.forEach(dato => {
                    let generos = dato.genres.map(genre => genre.name.toLowerCase()); // Extract genre names

                    if (
                        dato.title.toLowerCase().includes(input.value.toLowerCase()) ||
                        dato.tagline.toLowerCase().includes(input.value.toLowerCase()) ||
                        dato.overview.toLowerCase().includes(input.value.toLowerCase()) ||
                        generos.includes(input.value.toLowerCase()) // Check for genre
                    ) {
                        encontrados.push(dato);
                    }
                });

                // Clear the existing list
                listaElement.innerHTML = '';

                encontrados.forEach(pelicula => {
                    let listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <h1>${pelicula.title}</h1>
                        <p>${pelicula.tagline}</p>
                        <h2>${starGenerator(Math.floor(pelicula.vote_average))}</h2>
                        <div class="dropdown">
                            <a href="#" role="button" id="perfil-a" data-bs-toggle="dropdown">
                                More
                            </a>
                            <ul class="dropdown-menu">
                                <li class="dropdown-list">Year : ${pelicula.release_date}</li>
                                <hr style="color: grey;">
                                <li class="dropdown-list">Runtime : ${pelicula.runtime}</li>
                                <hr style="color: grey;">
                                <li class="dropdown-list">Budget : ${pelicula.budget}</li>
                                <hr style="color: grey;">
                                <li class="dropdown-list">Revenue : ${pelicula.revenue}</li>
                            </ul>
                        </div>
                    `;

                    listaElement.appendChild(listItem);
                });
            });
        })
        .catch(error => console.error(error))
});
