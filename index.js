(function() {
  'use strict';

  let dogs = [];
  let specialArray = [];

  const renderDogs = function(){

$('#displayHere').empty();

for (const dog of dogs) {
  const $col = $('<div>').addClass('col m4');
  const $imgDiv = $('<div>').addClass('card-image waves-effect waves-block waves-light');
  const $img = $('<img>').addClass('activator responsive-img dog-image')
  const $card = $('<div>').addClass('card medium valign-center');
  const $content = $('<div>').addClass('card-content center valign');
  const $span = $('<span>').addClass('card-title grey-text text-darken-4 activator');
  const $spanX = $('<span>').addClass('activator card-title')
  const $paragraph = $('<p>').addClass('activator');
  const $link = $('<a>');
  const $revealLink = $('<a>');
  const $revealDiv = $('<div>').addClass('card-reveal');
  const $revealTitle = $('<span>').addClass('activator card-title grey-text text-darken-4');
  const $icon = $('<i>').addClass(' material-icons right');
  const $revealContent = $('<p>');


  $img.attr({
         src: dog.image,
         alt: 'picture of dog'
       });
 $span.text(dog.name);
 $revealTitle.text(dog.name);
 $revealContent.text(dog.description);
 $paragraph.text(dog.age+'  |  '+dog.sex);
 $revealContent.text(dog.description);
 $link.text(dog.email).attr('href', 'mailto:'+dog.email);
 $icon.text('close');

$('#displayHere').append($col);
$col.append($card)
$card.prepend($imgDiv);
$imgDiv.append($img);
$card.append($content);
$content.append($span, $paragraph);
$card.append($revealDiv);
$spanX.append($icon)
$revealDiv.append($spanX, $revealTitle, $revealContent, $link);
}

$('.card').hover(function(){
  $(this).toggleClass("highlight");
});
  }


// Senior Dog Button ******

$('#searchForm').on('submit', (event) => {


console.log($( "select option:selected" ).val());

if ($( "select option:selected" ).val() === 'senior') {


event.preventDefault()

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
let petArray = results.petfinder.pets.pet

for (let i = 0; i < petArray.length; i++) {
let onePet = petArray[i];

let dog = {
  age: onePet.age.$t,
  sex: onePet.sex.$t,
  name: onePet.name.$t,
  description: onePet.description.$t,
  email: onePet.contact.email.$t,
  image: onePet.media.photos.photo[2].$t
}

dogs.push(dog);

}
renderDogs();
      });
    }
    });




// Breed Buttons ************


  $('#searchForm').on('submit', (event) => {


    console.log($( "select option:selected" ).val());

    if ($( "select option:selected" ).val() === 'chihuahua' || $( "select option:selected" ).val() === 'pit bull terrier') {



    event.preventDefault();

    dogs = [];
    let theBreed;


  theBreed = $( "select option:selected").val();

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
let petArray = results.petfinder.pets.pet

for (let i = 0; i < petArray.length; i++) {
  let onePet = petArray[i];

  let dog = {
    age: onePet.age.$t,
    sex: onePet.sex.$t,
    name: onePet.name.$t,
    description: onePet.description.$t,
    email: onePet.contact.email.$t,
    image: onePet.media.photos.photo[2].$t
  }

  dogs.push(dog);

}
renderDogs();
        });
      }
      });


// SPECIAL NEEDS
$('#searchForm').on('submit', (event) => {
  if ($( "select option:selected" ).val() === 'special') {

  

  event.preventDefault();

        dogs = [];
        specialArray = [];

          let theZipcode = $('#icon_prefix').val();

          if (theZipcode === '') {
            alert('please enter a zipcode');
          }

            const $xhr = $.ajax ({
              method: 'GET',
              url: 'https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=2d2685ee8c7cbfa08366ece6e45d8ddd&location='+theZipcode+'&animal=dog&count=100&aoutput=full&format=json',
              dataType: 'json',
            });

            $xhr.done((data) => {
              if ($xhr.status !== 200){
                return;
              }

      let petArray = data.petfinder.pets.pet

for (let i = 0; i < petArray.length; i++) {
  let thisPet = petArray[i];
  let optionsArray = thisPet.options.option;
  for (let i = 0; i < optionsArray.length; i++) {
    let x = optionsArray[i]
    for (const key in x) {
    if (x[key] === 'specialNeeds'){
      specialArray.push(thisPet);
    }
    }
  }
}

      for (let i = 0; i < specialArray.length; i++) {
      let onePet = specialArray[i];

      let dog = {
        age: onePet.age.$t,
        sex: onePet.sex.$t,
        name: onePet.name.$t,
        description: onePet.description.$t,
        email: onePet.contact.email.$t,
        image: onePet.media.photos.photo[2].$t
      }
      dogs.push(dog);
      }

      renderDogs();
            });
          }
          });


          $(document).ready(function() {
    $('select').material_select();
  });
  })();
