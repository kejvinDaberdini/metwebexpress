'use strict';


/*
const podcasteditbtn = document.getElementsByName('editModalBtn');
const podcastdeletebutton = document.getElementsByName('deleteModalBtn')


if(podcastEditBtn) {

        podcastEditBtn.forEach(element => {
            element.addEventListener('click',()=>{
                const podcastID = element.dataset.podcastID;
                const title = element.dataset.title;
                const description = element.dataset.description;
                const category = element.dataset.category;
                const image = element.dataset.image;
                const url = '/podcasts'+podcastID+'?method=PUT';

                document.getElementById('title').setAttribute('value', title);
                document.getElementById('description').textContent = description;
                document.getElementById('category').setAttribute('value' , category)
                document.getElementById('oldImage').setAttribute('value' , image);
                document.getElementById('podcastEdit').action = url;

            })
            
        });
}
*/
/*
  for(let i = 0; i< button.length; i++){
    podcastdelete[i].addEventListener('click', () => {
    const id = button[i].dataset.id;
    const url = '/seriepage/'+ id +'?metodo=PUT';
    const titolo = button[i].dataset.titolo;
    const descrizione = button[i].dataset.descrizione;
    const categoria = button[i].dataset.categoria;
    const immagine = button[i].dataset.immagine;

    document.getElementById('titolo').setAttribute('value' , titolo);
    document.getElementById('descrizione').textContent = descrizione;
    document.getElementById('categoria').setAttribute('value' , categoria);
    document.getElementById('oldImmagine').setAttribute('value' , immagine);
    document.getElementById('serieModifyForm').action = url;

    })
  }
  
}
*/

/*
if(buttonDelete) {
  for(let i = 0; i< button.length; i++){
    buttonDelete[i].addEventListener('click', () => {
    const id = buttonDelete[i].dataset.id;
    const immagine = buttonDelete[i].dataset.immagine;
    const url = '/seriepage/'+ id +'?metodo=DELETE';
    document.getElementById('deleteSerieForm').action = url ;
    document.getElementById('oldImmage').setAttribute('value' , immagine);
    })
  }
}
  

*/





/*

const delBtn= document.querySelectorAll('[id^=delPodcastBtn]');
console.log(delBtn.length);

if(delBtn) {
   
    delBtn.forEach(element => {
        element.addEventListener('click', () => {
            const podcastID= document.getElementById('delPodcastID').value
          fetch('/podcasts/'+podcastID, { method: 'DELETE' })
          .then;
        });
        
    });
}

*/


const delBtn= document.getElementsByName('podcastDeleteBtn');

if(delBtn) {
   
    delBtn.forEach(element => {
        element.addEventListener('click', () => {
        const podcastID= element.dataset.id;
          fetch('/podcasts/'+podcastID, { method: 'DELETE' })
          .then(()=> window.location = '/');

        })
    })
}
