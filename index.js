const apikey='9ed69fd6442946ed90a7656cbdae4308'
const blogcontainer=document.getElementById('blogcontainer');
const searchfield=document.getElementById('searchinput');
const searchbutton=document.getElementById('searchbutton');
window.addEventListener('keydown',enter)
async function fetchrandomnews(){
    try{
        const apiurl=`https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apikey}`
        const response=await fetch(apiurl)
        const data=await response.json()
        return data.articles;
    }catch(error)
    {
        console.error("error fetching random news",error)
        return []
    }
}
searchbutton.addEventListener('click',searchnews)
async function searchnews()
{
    const query =searchfield.value.trim()
    if (query!==''){
        try{
            const articles=await fetchnewsquery(query)
            displayblogs(articles)
        }catch(error){
            console.log('error fetching news by query',error);
        }
    }
}
function enter(event){
    if (event.keyCode===13)
    {
        searchnews();
    }
}
async function fetchnewsquery(query){
    try{
        const apiurl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`
        const response=await fetch(apiurl)
        const data=await response.json()
        return data.articles;
        console.log(data);
    }catch(error)
    {
        console.error("error fetching random news",error)
        return []
    }
}
function displayblogs(articles){
    blogcontainer.innerHTML=''
    articles.forEach((article) => {
        const blogcard=document.createElement('div')
        blogcard.classList.add('blogcard')
        const img=document.createElement('img')
        img.src=article.urlToImage
        img.alt=article.title
        const title=document.createElement('h2')
        const trunkcatedtitle =article.title.length>30?article.title.slice(0,30)+"......":article.title;
        title.textContent=trunkcatedtitle
        const description = document.createElement('p')
        const trunkcateddescription=article.description.length>120?article.description.slice(0,120)+"......":article.description;
        description.textContent=trunkcateddescription
        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener('click',()=>
        {
            window.open(article.url,"_blank")
        })
        blogcontainer.appendChild(blogcard)
    });
}
(async()=>{
    try{
       const articles = await fetchrandomnews();
       console.log(articles);
       displayblogs(articles);
    }catch(error){

    }
})();