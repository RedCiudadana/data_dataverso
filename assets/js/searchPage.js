document.addEventListener('DOMContentLoaded', function(event) {
    const search = document.getElementById('search');
    const results = document.getElementById('results');
    let data = [];
    let search_term = localStorage.getItem("busqueda").toLowerCase();
    search_term = search_term.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    console.log(search_term);

    fetch('/search.json')
        .then(response => response.json())
        .then(data_server => {
            data = data_server;
            results.innerHTML = '';

            if (search_term.length <= 0) return;
            const match = new RegExp(`${search_term}`, 'i');

            // Normalizar y filtrar los datos
            let result = data.filter((item, index, self) => {
                const name_normalized = item.name_search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                const descripcion_normalized = item.descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                return (match.test(name_normalized) || match.test(descripcion_normalized)) &&
                       index === self.findIndex((t) => (
                           t.name_search === item.name_search && t.descripcion === item.descripcion
                       ));
            });

            if (result.length === 0) {
                const h1 = document.createElement('h1');
                h1.innerHTML = `No se encontraron resultados`;
                results.appendChild(h1);
            } else {
                result.forEach(e => {
                    const colDiv = document.createElement("div");
                    colDiv.classList.add("col-lg-6", "my-4");

                    const cuadroConjuntoDiv = document.createElement("div");
                    cuadroConjuntoDiv.classList.add("cuadro-conjunto");

                    const titleDiv = document.createElement("div");
                    titleDiv.classList.add("cuadro-conjunto-title");

                    const icon = document.createElement("i");
                    icon.classList.add("fa-solid", "fa-database");

                    const h4 = document.createElement("h4");
                    h4.textContent = e.name;

                    titleDiv.appendChild(icon);
                    titleDiv.appendChild(h4);

                    const bodyDiv = document.createElement("div");
                    bodyDiv.classList.add("cuadro-conjunto-body");

                    const pdescripcion = document.createElement("p");
                    pdescripcion.textContent = e.descripcion;

                    const buttonsDiv = document.createElement("div");
                    buttonsDiv.classList.add("cuadro-conjunto-body-buttons");

                    if (e.json) {
                        const jsonButton = document.createElement("a");
                        jsonButton.href = e.json;
                        jsonButton.download = e.name.toLowerCase().replace(/\s+/g, '-');
                        jsonButton.classList.add("ud-main-btn");
                        jsonButton.textContent = "json";
                        buttonsDiv.appendChild(jsonButton);
                    }

                    if (e.csv) {
                        const csvButton = document.createElement("a");
                        csvButton.href = e.csv;
                        csvButton.download = e.name.toLowerCase().replace(/\s+/g, '-');
                        csvButton.classList.add("ud-main-btn");
                        csvButton.textContent = "csv";
                        buttonsDiv.appendChild(csvButton);
                    }

                    const apiLinkP = document.createElement("p");
                    apiLinkP.textContent = "Enlace para uso de api: ";

                    const apiLinkContainer = document.createElement("div");
                    apiLinkContainer.classList.add("api-link-container");

                    const apiLink = document.createElement("a");
                    apiLink.href = `https://data-dataverso.redciudadana.org${e.url}`;
                    apiLink.id = "copyLink";
                    apiLink.classList.add("api-url");
                    apiLink.textContent = `https://data-dataverso.redciudadana.org${e.url}`;

                    apiLinkContainer.appendChild(apiLink);

                    bodyDiv.appendChild(pdescripcion);
                    bodyDiv.appendChild(buttonsDiv);
                    bodyDiv.appendChild(apiLinkP);
                    bodyDiv.appendChild(apiLinkContainer);

                    cuadroConjuntoDiv.appendChild(titleDiv);
                    cuadroConjuntoDiv.appendChild(bodyDiv);

                    colDiv.appendChild(cuadroConjuntoDiv);
                    results.appendChild(colDiv);
                });
            }
        });
});
