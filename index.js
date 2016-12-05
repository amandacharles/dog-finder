(function() {
  'use strict';

  let dogs = [];

  const renderDogs = function(){

$('#displayHere').empty();

for (const dog of dogs) {
  const $col = $('<div>').addClass('col m4');
  const $imgDiv = $('<div>').addClass('card-image waves-effect waves-block waves-light');
  const $img = $('<img>').addClass('activator')
  const $card = $('<div>').addClass('card');
  const $content = $('<div>').addClass('card-content center');

 // $img.attr({
 //   src:
 // })
 $content.text(dog.name);

$
$card.append($content);
$col.append($card)
$('#displayHere').append($col);

}
  }
// Senior Dog Button ******

$('.btn').on('click', (event) => {

  event.preventDefault();
  dogs = [];

    let theZipcode = $('#icon_prefix').val();

    if (theZipcode === '') {
      alert('please enter a zipcode');
    }

      const $xhr = $.ajax ({
        method: 'GET',
        url: 'https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=2d2685ee8c7cbfa08366ece6e45d8ddd&location='+theZipcode+'&age=senior&animal=dog&output=full&format=json',
        dataType: 'json',
      });

      $xhr.done((data) => {
        if ($xhr.status !== 200){
          return;
        }
let results = data;
let petArray = data.petfinder.pets.pet

for (let i = 0; i < petArray.length; i++) {
let onePet = petArray[i];

let dog = {
  age: onePet.age.$t,
  sex: onePet.sex.$t,
  name: onePet.name.$t,
  description: onePet.description.$t,
  email: onePet.contact.email.$t,
  // image: onePet.media.photos.photo[0].$t
}
dogs.push(dog);
}

renderDogs();
      });
    });


// Breed Buttons ************
  $('.btn').on('click', (event) => {

    dogs = [];
    event.preventDefault();

    let theBreed;
    let $clickedBtn = $(event.target);

if ($clickedBtn) {
  theBreed = $clickedBtn.attr('id');
}

      let theZipcode = $('#icon_prefix').val();

      if (theZipcode === '') {
        alert('please enter a zipcode');
      }

        const $xhr = $.ajax ({
          method: 'GET',
          url: 'https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=2d2685ee8c7cbfa08366ece6e45d8ddd&breed='+theBreed+'&location='+theZipcode+'&output=full&format=json',
          dataType: 'json',
        });

        $xhr.done((data) => {
          if ($xhr.status !== 200){
            return;
          }
let results = data;
let petArray = data.petfinder.pets.pet

for (let i = 0; i < petArray.length; i++) {
  let onePet = petArray[i];

  let dog = {
    age: onePet.age.$t,
    sex: onePet.sex.$t,
    name: onePet.name.$t,
    description: onePet.description.$t,
    email: onePet.contact.email.$t,
    // image: onePet.media.photos.photo[0].$t
  }
  dogs.push(dog);
}

renderDogs();
console.log(dogs);
console.log(typeof dogs[0].description);
console.log(data);

        });
      });

})();



// $(document).ready(function(){
//       $('.parallax').parallax();
//     });
