
const API_KEY = `cab5286096b34411810f315e2fcc082b`;

let newsList = []

const getLatestNews = async () => {
    const url = new URL(`https://koreantimes.netlify.app//top-headlines`
    );
    const response = await fetch(url);
    
    const data = await response.json()
    // json으로 뽑아줘야함 
    // json은 파일 확장자(like png, jpg etc) 종류 중 하나

    newsList = data.articles
    render();
    
    console.log("dddd", newsList)
};


const render=() => {
    let newsHTML = ``
    
    newsHTML = newsList.map(news=>` <div class="articles">
    <div>
     <img src="${news.urlToImage}" alt="no image">
    </div>
    <div class="text">
     <h2>${news.title}</h2>
     <p>${
        news.description == null || news.description == ""
        ? "내용 없음"
        : news.description.length > 200
        ? news.description.substring(0, 200) + "..."
        : news.description
    }</p>
     <div>
      ${news.source.name} ${news.publishedAt}
     </div>
    </div>
</div>`).join("");

    document.getElementById('news-board').innerHTML = newsHTML
}

// 사이드바 만들기 

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

// 검색창 보이고 숨기기
const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };


  
getLatestNews();





// async function getNews() {

//     let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
//     // url 설정

//     console.log("uuu",url)
//     // url 프린트 테스트

//     const response = await fetch(url)
//     // url 주소 요청
//     // 비동기처리 시, async ↔ await 사용

//     console.log("rrr",response)
//     // response 프린트

// };

