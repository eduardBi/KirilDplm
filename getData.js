
async function getPosts(url){
    const response = await fetch(url);
    const posts = await response.json();
    console.log(posts);
    return posts;
    
}
