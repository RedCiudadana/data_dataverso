
document.addEventListener('DOMContentLoaded', function(event) {
    const search = document.getElementById('search');
    const results = document.getElementById('results');
    let data = [];
    let search_term = localStorage.getItem("busqueda").toLowerCase();
    search_term = search_term.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    console.log(search_term)

    fetch('/search.json')
        .then(response => response.json())
        .then(data_server => {
            data = data_server;
            results.innerHTML = '';
            
            if (search_term.length <= 0) return;
            const match = new RegExp(`${search_term}`, 'gi');
            let result = data.filter(name => match.test(name.name_search,name.description));
            
            if (result.length == 0) {
                const h1 = document.createElement('h1');
                h1.innerHTML = `No se encontraron resultados`;
                results.appendChild(h1);
            }
            result.forEach(e => {

                const a_title = document.createElement("a");
                a_title.setAttribute("href", e.url);
                a_title.textContent = e.name;

                results.appendChild(a_title);
            });
        });;

});