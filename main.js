
const API_KEY = `cab5286096b34411810f315e2fcc082b`;

let newsList = []

// 1. 버튼들에 클릭 이벤트 주기
const menus = document.querySelectorAll('.menu button')
// 지금 버튼은 array고 버튼 하나하나씩 클릭이벤트를 줘야함
// → forEach 사용

menus.forEach((menu) => 
menu.addEventListener("click",(event) => getNewByCategory(event))
);

const getLatestNews = async () => {
    const url = new URL(`https://koreantimes.netlify.app//top-headlines`
    );
    const response = await fetch(url);
    
    const data = await response.json()
    // json으로 뽑아줘야함 
    // json은 파일 확장자(like png, jpg etc) 종류 중 하나

    newsList = data.articles
    render();
    
    
};

const getNewByCategory = async (event) => {
  
   const category = event.target.textContent.toLowerCase();
   console.log("category", category) 
   // ↑ 버튼 찍으면 카테고리별로 잘 찍히는지 확인

   // 버튼마다 카테고리별 뉴스 가져오기 함수 만들기
   const url = new URL (`https://koreantimes.netlify.app//top-headlines?category=${category}`);
   
   const response = await fetch(url);
   const data = await response.json();
   console.log("Ddd", data);

   newsList = data.articles;

   render()
}


const getNewByKeyword = async () => {
    // console.log("keyword") ◀ 검색 버튼 누르면 콘솔에 잘 찍히는지 확인

    const keyword = document.getElementById("search-input").value
    console.log("keyword", keyword)

    const url = new URL (`https://koreantimes.netlify.app//top-headlines?q=${keyword}`)
    const response = await fetch(url);
    const data = await response.json();

    newsList = data.articles;

    render();
    
}



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


// 카테고리 별 소팅하기

// 1. 버튼들에 클릭 이벤트 주기
// 2. 카테고리별 뉴스 가져오기
// 3. 그 뉴스를 보여주기
