
const API_KEY = `cab5286096b34411810f315e2fcc082b`;

let newsList = []

let url = new URL(`https://koreantimes.netlify.app//top-headlines`)

// 1. 버튼들에 클릭 이벤트 주기
const menus = document.querySelectorAll('.menu button')
// 지금 버튼은 array고 버튼 하나하나씩 클릭이벤트를 줘야함
// → forEach 사용

menus.forEach((menu) => 
menu.addEventListener("click",(event) => getNewByCategory(event))
);

const getLatestNews = async () => {
    url = new URL(`https://koreantimes.netlify.app//top-headlines`
    );
    // const response = await fetch(url);
    
    // const data = await response.json()
    // // json으로 뽑아줘야함 
    // // json은 파일 확장자(like png, jpg etc) 종류 중 하나

    // newsList = data.articles
    // render();

    // ▲▲▲▲▲▲▲▲▲▲▲▲ getNews()로 대체
    getNews();
};

const getNewByCategory = async (event) => {
  
   const category = event.target.textContent.toLowerCase();
   console.log("category", category) 
   // ↑ 버튼 찍으면 카테고리별로 잘 찍히는지 확인

   // 버튼마다 카테고리별 뉴스 가져오기 함수 만들기
   url = new URL (`https://koreantimes.netlify.app//top-headlines?category=${category}`);
   
//    const response = await fetch(url);
//    const data = await response.json();
//    console.log("Ddd", data);

//    newsList = data.articles;

//    render()
getNews();
}


const getNewByKeyword = async () => {
    // console.log("keyword") ◀ 검색 버튼 누르면 콘솔에 잘 찍히는지 확인

    const keyword = document.getElementById("search-input").value
    console.log("keyword", keyword)

    url = new URL (`https://koreantimes.netlify.app//top-headlines?q=${keyword}`)
    // const response = await fetch(url);
    // const data = await response.json();

    // newsList = data.articles;

    // render();
    getNews();
}

// pagination 시작점 ↓ 우리가 정하는 값들

let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5



// 코드 리펙토링 → 반복되는 것을 하나로 묶기 

const getNews = async () => {
   try {

    url.searchParams.set("page", page)
    // ▲ page라는 파라미터를 page란 값으로 셋팅 => &page=page
    url.searchParams.set("pageSize", pageSize);
    // ▲▲▲▲▲▲호출하기 전에 셋팅

    const response = await fetch(url);
   
    

    const data = await response.json();

    if(response.status === 200) {

           if(data.articles.length === 0) {
            throw new Error("No result for this keyword")
           }

        newsList = data.articles;
        totalResults = data.totalResults
        // ▲ API 받을 때 totalResult 값도 들고오기

        render();
        paginationRender();
        // response status가 정상적일 때 = code # 200 일 때
        // 정상적으로 코드 작동 
    } else {
        throw new Error(data.message)
    }

    newsList = data.articles;

    render();
   } catch(error) {
     renderError(error.message)
   }
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


  // 검색 enter key 활성화

function enterActive(event) {

 if(event.key == "Enter") {
   
   getNewByKeyword()

   document.getElementById("search-input").value = "";
   // ▲ enter 누르고 기입한 keyword(text) 삭제
 }

}

// 에러 메세지 보여주는 function

const renderError = (errorMessage) => {
  const errorHTML = `<div class="showError">
     ${errorMessage}
  </div>`

   document.getElementById("news-board").innerHTML = errorHTML;

}






// pagination 

// 알 수 있는 정보 from API 
// 1. page size = 20 by default
// 2. 현재 보고 있는 page = 3(임의로)
// 3. totalResult (전체 페이지 정보) = 101 (임의로)

// total = 101 
// pagesize = 10
// 내가 현재 보고있는 페이지 = 3 
// pagination 을 어떻게 프린트 해야될까?

// → totalpage = 11

// groupsize = 5 (보여지는 페이지 수)

// pagegroup = page / groupsize = 3/5 = 0..3 = 올림하면 1 
                               // 7/5 = 1..5 = 올림하면 2 

// so what is requested information ?
// 1. totalResult → api에 주어짐
// 2. pagesize → 우리가 정함
// 3. page → 우리가 정함
// 4. groupsize → 우리가 정함
// 5. totalpage → 구해야됨 math.celi(반올림)(tr/ps)
// 6. pagegroup → 구해야됨 math.celi(반올림)(page/groupsize)
// 7. 마지막 = pagegroup x groupsize
// 8. 첫번째 = 마지막 - (gs-1)





const paginationRender = () => {
   // totalResult 
   // page
   // pageSize
   // groupSize
   // totalPages
   const totalPages = Math.ceil(totalResults/pageSize)

 // ▲▲▲▲▲▲▲▲▲ 위에서 initialize 해줌


   // pageGroup
   const pageGroup = Math.ceil(page/groupSize);
   // lastPage
   const lastPage = pageGroup * groupSize;
   // 마지막 페이지 그룹이 그룹사이즈보다 작다? lastPage = totalPage

   if (lastPage>totalPages) {
    lastPage = totalPages
   }




   // firstPage
   const firstPage = lastPage - (groupSize-1) <= 0? 1: lastPage - (groupSize-1)


   let paginationHTML = ``

   for (let i=firstPage; i<=lastPage; i++){
    paginationHTML += `<li class="page-item ${i===page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>
    `
   }

   // pagination 누울 자리
   document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage = (pageNum) => {
  console.log("moveToPage",pageNum);
  // ▲▲▲▲▲ page 버튼 잘먹는지 확인

  page = pageNum;
  getNews()
}

getLatestNews();