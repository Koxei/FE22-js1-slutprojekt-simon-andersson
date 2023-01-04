// key = 6d644eb9ae05ab63fe5e7698dbd9427d
const template = document.querySelector('[data-template]');
const container = document.querySelector('[data-container]');
const search = document.querySelector('#search');
const btn = document.querySelector('#btn');
const animation = document.querySelector('.spinner-wrapper');
const form = document.querySelector('form');


// Functions to call

// Hiding animation
function hideAnimation() {
  animation.style.display = 'none';
}

// Remove previous searched topic
function removeChild(){
  let rem = document.querySelector('[data-container]');
  let child = rem.lastElementChild;
  while (child) {
      rem.removeChild(child);
      child = rem.lastElementChild;
  }
}

// Relevance of the img's
function sort(){
  let sort = document.querySelector('#sort').value;
  return sort;
}

// Which size to display the img's in
function size(){
  let size = document.querySelector('#size').value;
  return size;
}

// function to loop over fetched data
function data(data){
  console.log(data)
  let size = document.querySelector('#size').value;
  for (let i = 0; i < data.photos.photo.length; i++) {
    let clone = template.content.cloneNode(true).children[0]; 
    let img = clone.querySelector('img');
    let server = data.photos.photo[i].server;
    let id = data.photos.photo[i].id;
    let secret = data.photos.photo[i].secret;
    img.src = `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
    container.append(clone);

    hideAnimation();
  };
}

// Checking for any errors
function checkForInputErrors() {
  let foundError = false;
  let text = document.querySelector('#search').value;
  let number = document.querySelector('#number').value;
  if (text === '') {
      alert('Search field cannot be left empty')
      foundError = true;
  }
  if (number > 500 || number < 1) {
      alert('Please enter a number between 1 and 500')
      foundError = true;
  }
  return foundError;
}





// eventListener for clicking on button
btn.addEventListener('click', (e) => {
  e.preventDefault();
  animation.style.display = "block";
  anime({
    targets: '.fading-circle',
    easing: 'easeOutExpo',
    loop: true,
    scale: [0, 1],
    opacity: {
      value: [1, 0],
      easing: 'linear',
      duration: 800,
    },
    delay: (el, i) => 150 * i,
  })

  let imageCount = document.querySelector('#number').value;
  let topic = search.value;
  removeChild();
  if (!checkForInputErrors()){
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6d644eb9ae05ab63fe5e7698dbd9427d&text=${topic}&sort=${sort()}&per_page=${imageCount}&page=1}&format=json&nojsoncallback=1`)
  .then(res => {
      if (res.status >= 200 && res.status < 300) {
          return res.json();
      }
  })
  .then(data)
  .catch(() => {
    alert('ERROR')
  })
  }
})

// eventListener for pressing Enter

form.addEventListener('keypress',function(e){
  if (e.key === 'Enter') {
    e.preventDefault();
    animation.style.display = "block";
    anime({
      targets: '.fading-circle',
      easing: 'easeOutExpo',
      loop: true,
      scale: [0, 1],
      opacity: {
        value: [1, 0],
        easing: 'linear',
        duration: 800,
      },
      delay: (el, i) => 150 * i,
    })
  
    let imageCount = document.querySelector('#number').value;
    let topic = search.value;
    removeChild();
    if (!checkForInputErrors()){
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6d644eb9ae05ab63fe5e7698dbd9427d&text=${topic}&sort=${sort()}&per_page=${imageCount}&page=1}&format=json&nojsoncallback=1`)
    .then(res => {
        if (res.status >= 200 && res.status < 300) {
            return res.json();
        }
    })
    .then(data)
    .catch(() => {
      alert('ERROR')
    })
    }
}
})


