const API_KEY = "456ca6ec48d8445a964799f7d0446254";

const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load', () => fetchDisasterNews());

async function fetchDisasterNews() {
    const disasterQuery = "disaster"; // Change the query to search for disaster-related news
    const res = await fetch(`${url}${disasterQuery}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    //  to reset the containers upto 100 articles only
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (article.urlToImage != null) {
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);
            cardsContainer.appendChild(cardClone);
            console.log(article);
        }
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    const date = new Date(article.publishedAt).toLocaleString("en-UK", {
        timeZone: "Asia/Jakarta"
    });

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = `${article.source.name}: ${date}`;
    newsDesc.innerHTML = article.description;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    });
}



const newsLogo = document.getElementById('news-logo');
newsLogo.addEventListener('click',()=>{
    fetchNews('India');
});