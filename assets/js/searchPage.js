document.getElementById("busqueda").innerHTML = " "+localStorage.getItem("busqueda")
document.getElementById("searchField").value = localStorage.getItem("busqueda")

document.addEventListener('DOMContentLoaded', function(event) {
    const search = document.getElementById('search');
    const results = document.getElementById('results');
    let data = [];
    let search_term = localStorage.getItem("busqueda").toLowerCase();
    search_term = search_term.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

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
                

                const col = document.createElement("div");
                col.classList.add("col-lg-3");
                col.classList.add("col-md-6");
                col.classList.add("col-12");
                col.classList.add("col-sm-6");

                const vendor_wrap = document.createElement("div");
                vendor_wrap.classList.add("vendor-wrap");
                vendor_wrap.classList.add("style-2");
                vendor_wrap.classList.add("mb-40");

                const tipo = document.createElement("div");
                tipo.classList.add("product-badges");
                tipo.classList.add("product-badges-position");
                tipo.classList.add("product-badges-mrg");

                const span = document.createElement("span");
                span.classList.add("hot");
                span.textContent = "Trámite";

                const vendor_content_wrap = document.createElement("div");
                vendor_content_wrap.classList.add("vendor-content-wrap");
                vendor_content_wrap.classList.add("w-100");

                const margin = document.createElement("div");
                margin.classList.add("mb-30");
                margin.classList.add("mt-30");

                const title = document.createElement("div");
                title.classList.add("custom-overflow-hidden");

                const h4 = document.createElement("h4");
                h4.classList.add("mb-5");

                const a_title = document.createElement("a");
                a_title.setAttribute("href", e.url);
                a_title.textContent = e.name;
                
                const vendor_info = document.createElement("div")
                vendor_info.classList.add("vendor-info")
                vendor_info.classList.add("d-flex")
                vendor_info.classList.add("justify-content-between")
                vendor_info.classList.add("align-items-end")
                vendor_info.classList.add("mt-30")

                const ul_texto = document.createElement("ul")
                ul_texto.classList.add("contact-infor")
                ul_texto.classList.add("text-muted")
                ul_texto.classList.add("overflow-hidden")
                ul_texto.style.height="70px"

                const list_texto = document.createElement("li")
                const p_texto = document.createElement("p")
                p_texto.classList.add("text-overflow2")
                p_texto.textContent = e.description

                const a_texto = document.createElement("a")
                a_texto.setAttribute("href", e.url);
                a_texto.classList.add("btn")
                a_texto.classList.add("btn-xs")
                a_texto.textContent = "Ver más";
                
                results.appendChild(col);
                col.appendChild(vendor_wrap);
                tipo.appendChild(span);
                vendor_wrap.appendChild(tipo);
                vendor_content_wrap.appendChild(margin);
                margin.appendChild(title);
                title.appendChild(h4);
                h4.appendChild(a_title);
                margin.appendChild(vendor_info)
                vendor_info.appendChild(ul_texto)
                ul_texto.appendChild(list_texto)
                list_texto.appendChild(p_texto)
                vendor_content_wrap.appendChild(a_texto)
                vendor_wrap.appendChild(vendor_content_wrap)
            });
        });;

});