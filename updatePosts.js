


function updatePosts(data){
    
    
    
    for (let i = 0; i <data.length-posts.length; i++) {
                
                let container=document.querySelector('.append');
                let card = document.createElement('div');
                card.className='card';
                let cardHeader = document.createElement('div');
                cardHeader.className='card__header';
                let img = document.createElement('img');
                img.src='https://source.unsplash.com/600x400/?computer'
                cardHeader.append(img)
                card.prepend(cardHeader)

                let cardBody=document.createElement('div');
                cardBody.className='card__body'
                let cardTitle=document.createElement('a');
                cardTitle.innerText=data[posts.length+i].title
                cardTitle.href=`D:/programm/openserver/OSPanel/domains/kiriillDPLM/newIndividualPost.html?${data[i].id}`
                let cardText=document.createElement('p');
                cardText.innerText=data[posts.length+i].postText
                cardBody.append(cardTitle)
                cardBody.append(cardText)
                card.append(cardBody)

                let cardFooter=document.createElement('div');
                cardFooter.className='card__footer'
                let cardUser=document.createElement('div');
                cardUser.className='user'
                cardLikes=document.createElement('div')
                let styleLikes=data[posts.length+i].likes===true?
                'red':'gray';
                
                cardLikes.innerHTML='<i class="fa-sharp fa-solid fa-thumbs-up" style="color:'+styleLikes+'" ></i>'

                cardComments=document.createElement('a')
                cardComments.innerText=data[posts.length+i].title

                let styleDislikes=data[posts.length+i].dislikes===true?
                'black':'gray';
                
                cardDislikes=document.createElement('div')
                cardDislikes.innerHTML='<i class="fa-solid fa-thumbs-down" style="color:'+styleDislikes+'"></i>'
                
                
    
                cardLikes.children[0].setAttribute('data-id', posts.length+i)
                cardLikes.children[0].setAttribute('data-isliked', false)

                cardDislikes.children[0].setAttribute('data-disliked', false)
                cardDislikes.children[0].setAttribute('data-id', posts.length+i )

                cardDislikes.children[0].addEventListener('click',(e)=>{
                    

                    let data=document.querySelector('i[data-id="'+(e.target.dataset.id)+'"]');
                    
                    
                    
                    if(e.target.dataset.disliked=='false'){
                        e.target.setAttribute('data-disliked','true')
                        e.target.style.color='black'

                        let getLikes=data.parentNode.parentNode.children[0].children[0]
                        getLikes.style.color='gray'

                        posts[e.target.dataset.id].likes=false
                        posts[e.target.dataset.id].dislikes=true
                        
                        
                    }else{
                        e.target.setAttribute('data-disliked','false')
                        e.target.style.color='gray'
                        posts[e.target.dataset.id].dislikes=false
                    }
                    socket.send(JSON.stringify({type:'changeLikesAndDislikes',id:e.target.dataset.id,payload:posts[e.target.dataset.id]}))
                    
                })

                cardLikes.children[0].addEventListener('click',(e)=>{

                    let data=document.querySelector('i[data-id="'+(e.target.dataset.id)+'"]');
                    
                    if(e.target.dataset.isliked=='false'){
                        e.target.setAttribute('data-isliked','true')
                        e.target.style.color='red'
                        
                        let getDislike=data.parentNode.parentNode.children[2].children[0]
                        getDislike.style.color='gray'

                        posts[e.target.dataset.id].dislikes=false
                        posts[e.target.dataset.id].likes=true
                        
                        
                    }else{
                        e.target.setAttribute('data-isliked','false')
                        e.target.style.color='gray'
                        posts[e.target.dataset.id].likes=false
                    }
                    
                    socket.send(JSON.stringify({type:'changeLikesAndDislikes',id:e.target.dataset.id,payload:posts[e.target.dataset.id]}))
                    
                })


                
                cardUser.append(cardLikes)
                cardUser.append(cardComments)
                cardUser.append(cardDislikes)
                cardFooter.append(cardUser)
                
                card.append(cardFooter)

                cardDate=document.createElement('div');
                cardDate.innerText=data[posts.length+i].dataStamp;
                cardDate.className='date'
                card.append(cardDate)


                container.prepend(card)
            }
            
            posts =data;
            console.log(posts)


}