'use strict';



const podcastDelbtn = document.getElementsByName('podcastDelBtn');


if(podcastDelbtn) {
  
  podcastDelbtn.forEach(element => {
    element.addEventListener('click',()=>{
      const id= element.dataset.id;
      const old= element.dataset.url;
      const url='/podcasts/'+id+'?method=DELETE';
      document.getElementById('oldImageHidden').setAttribute('value', old);
      document.getElementById('podcastDeleteForm').action = url;
    });
  });
};

const episodeDelbtn = document.getElementsByName('episodeDelBtn');


if(episodeDelbtn) {
  
  episodeDelbtn.forEach(element => {
    element.addEventListener('click',()=>{
      const id= element.dataset.id;
      const old= element.dataset.url;
      const url='/episodes/'+id+'?method=DELETE';
      document.getElementById('oldFileHidden').setAttribute('value', old);
      document.getElementById('episodeDeleteForm').action = url;
    });
  });
};

