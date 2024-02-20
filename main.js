
const API_KEY = `cab5286096b34411810f315e2fcc082b`;

let news = []

const getLatestNews = async () => {
    const url = new URL(`https://koreantimes.netlify.app//top-headlines`
    );
    const response = await fetch(url);
    
    const data = await response.json()
    // json으로 뽑아줘야함 
    // json은 파일 확장자(like png, jpg etc) 종류 중 하나

    news = data.articles
    
    console.log("dddd", news)
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

