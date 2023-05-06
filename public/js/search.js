// Get the news articles by category from the server
const fetchNews = () => {
    const url = new URL(window.location.href);
    const query = url.search.split("q=")[1];
    
    let newsDiv = document.getElementById('newsDiv');
    newsDiv.innerHTML = `<h4>Loading...</h4><div class="spinner-border text-primary ml-2" role="status"><span class="sr-only">Loading...</span></div>`
    document.addEventListener('DOMContentLoaded', () => {
        axios.post('/getnews', {
            search_query: query
        })
        .then(response => {
                const data = response.data;
                const articles = data.articles;
                document.getElementById("query").innerHTML = `${query} (${articles.length})`;
                const res = articles.map(article => {
                    return `<div class="media" style="align-items: center">
                        <img src="${!article.urlToImage ? "https://images.hindustantimes.com/tech/img/2023/05/05/1600x900/nasa_1683259228110_1683259238025.jpg" : article.urlToImage}" style="width: 128px" class="mr-3" alt="...">
                        <div class="media-body">
                            <h5 class="mt-0"><a href="${article.url}" class="text-dark">${article.title}</a></h5>
                            <p class="mb-2">${article.description}</p>
                            <a href="${article.url}" target="_blank" class="btn btn-sm btn-outline-primary">Read More &raquo;</a>
                        </div>
                    </div>`;
                })
                newsDiv.innerHTML = res;
            })
    })
}

window.onload = fetchNews();