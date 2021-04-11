//console.log('%c HI', 'color: firebrick')

// Images Load
function fetchImagesDogs(){
  const answer = fetch('https://dog.ceo/api/breeds/image/random/4')
  .then(resp => resp.json())
  .then(json =>renderDogs(json));
  return answer;
}

function renderDogs(dogs){
  /*
    console.log('perros ' +dogs);
    console.log(Object.values(dogs));
    console.log(Object.keys(dogs));
    console.log(dogs.message[0]);
    console.log('longi : ' + (dogs.message).length);
  */
    const dogImg = document.querySelector('#dog-image-container');
    for (let i=0; i< ((dogs.message).length); i++){
      const img = document.createElement('img');
      img.style.width = '200px';
      img.style.height= '200px';
      img.src= dogs.message[i];
      dogImg.appendChild(img);
    }
}


// Breeds Load
function fetchBreedsDogs(){
  const breedUrl = fetch('https://dog.ceo/api/breeds/list/all')
  .then(resp => resp.json())
  .then(json =>{
    renderBreedDogs(json);
    eventExec(json);
  })
  return breedUrl;
}


function renderBreedDogs(dogs){
  const numberBreeds = dogs.message;
  let look = Object.keys(numberBreeds);
  const dogBreedsDiv = document.querySelector('#dog-breeds');
  for (let i = 0; i < look.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = look[i];
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => li.style.color = 'orange');
    dogBreedsDiv.appendChild(li);
  }
}


function filtBreed(valueSelect, oneDogFilt) {
  const numberBreeds = oneDogFilt.message;
  let look = Object.keys(numberBreeds);
  const dogBreedsDiv = document.querySelector('#dog-breeds'); 
  let lastLi = dogBreedsDiv.lastElementChild;
  while (lastLi) {
    dogBreedsDiv.removeChild(lastLi);
    lastLi = dogBreedsDiv.lastElementChild;
  }
  let nuevoArr = (look).map((look)=>{ 
                              let ownFilter = look.startsWith(valueSelect);
                              const arrayFilter=new Array();
                              if (ownFilter){
                                const li = document.createElement('li');
                                li.innerHTML = look;
                                li.style.cursor = 'pointer';
                                li.addEventListener('click', () => li.style.color = 'orange');
                                dogBreedsDiv.appendChild(li);
                                return arrayFilter;
                              }
                  });
}


function eventExec(dogs) {
  let selBreed = document.querySelector('#breed-dropdown');
  selBreed.addEventListener('change', function (event) {
    filtBreed(event.target.value,dogs);
  });
}


document.addEventListener('DOMContentLoaded', function() {
    fetchImagesDogs();
    fetchBreedsDogs();
});