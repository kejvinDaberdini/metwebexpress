'user strict';

const button = document.getElementsByName('editCommentbutton');

if(button){
    button.forEach((element)=>{
        element.addEventListener('click', ()=>{

            const id= element.dataset.id;
            const url='/comments/'+id+'?method=PUT';
            const text = element.dataset.text;
        

            document.getElementById('comment').textContent=text;
            document.getElementById('commentModalForm').action = url;
        })
    })
}

