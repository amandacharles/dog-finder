(function() {
  'use strict';

  let dogs = [];
  let specialArray = [];

  // create link to go to search form

  const backToTop = function() {
    const $contain = $('<div>').addClass('container');
    const $row = $('<div>').addClass('row center');
    const $col = $('<div>').addClass('col m4 s12 center center-align');
    const $linkUp = $('<p><a href="#grass" class="purple-text text-darken-4">Back to the search form</a></p>');

    $contain.append($row).append($col).append($linkUp).appendTo('#displayHere');
  };

  // Render Dog Profile Cards ************

  const renderDogs = function() {
    $('#displayHere').empty();

    for (const dog of dogs) {
      const $col = $('<div>').addClass('col m4');
      const $imgDiv = $('<div>').addClass('card-image waves-effect waves-block waves-light');
      const $img = $('<img>').addClass('activator responsive-img dog-image');
      const $card = $('<div>').addClass('card medium valign-center');
      const $content = $('<div>').addClass('card-content center valign');
      const $span = $('<span>').addClass('card-title text-white activator');
      const $spanX = $('<span>').addClass('activator card-title');
      const $paragraph = $('<p>').addClass('activator');
      const $link = $('<a>');
      const $revealDiv = $('<div>').addClass('card-reveal');
      const $revealTitle = $('<span>').addClass('activator card-title text-darken-4');
      const $icon = $('<i>').addClass(' material-icons right black-text');
      const $revealContent = $('<p>').addClass('grey-text text-darken-4 dogbio');

      $card.addClass('addMe');
      $content.addClass('addMeToo');

      $img.attr({
        src: dog.image,
        alt: 'picture of dog'
      });
      $span.text(dog.name);
      $revealTitle.text(dog.name);
      $revealContent.text(dog.description);
      $paragraph.text(dog.age + '  |  ' + dog.sex);
      $revealContent.text(dog.description);
      $link.text(dog.email).attr('href', 'mailto:' + dog.email);
      $icon.text('close');

      $('#displayHere').append($col);
      $col.append($card);
      $card.prepend($imgDiv);
      $imgDiv.append($img);
      $card.append($content);
      $content.append($span, $paragraph);
      $card.append($revealDiv);
      $spanX.append($icon);
      $revealDiv.append($spanX, $revealTitle, $link, $revealContent);
    }
    backToTop();

    $('.card').hover(function() {
      $(this).toggleClass('highlight');
    });
  };

// Search for Senior Dogs   *********************

  $('#searchForm').on('submit', (event) => {

    if ($('select option:selected').val() === 'senior') {
      event.preventDefault();

      dogs = [];

      const theZipcode = $('#icon_prefix').val();

      if (theZipcode === '') {
        Materialize.toast('Please enter a location.', 2000);
      }

      const $xhr = $.ajax({
        method: 'GET',
        url: 'https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=2d2685ee8c7cbfa08366ece6e45d8ddd&location='+theZipcode+'&age=senior&animal=dog&output=full&format=json',
        dataType: 'json'
      });

      $xhr.done((data) => {
        if ($xhr.status !== 200) {
          return;
        }

        const results = data;
        const petArray = results.petfinder.pets.pet

        for (let i = 0; i < petArray.length; i++) {
         const onePet = petArray[i];

          const dog = {
            age: onePet.age.$t,
            sex: onePet.sex.$t,
            name: onePet.name.$t,
            description: onePet.description.$t,
            email: onePet.contact.email.$t,
            image: onePet.media.photos.photo[2].$t
          };
          dogs.push(dog);
        }
        renderDogs();
      });
    }
  });

//  Search by Breed ************

  $('#searchForm').on('submit', (event) => {

    if ($('select option:selected').val() === 'chihuahua' || $('select option:selected').val() === 'pit bull terrier') {

      event.preventDefault();

      dogs = [];
      const theBreed;

      theBreed = $('select option:selected').val();

      const theZipcode = $('#icon_prefix').val();

      if (theZipcode === '') {
        Materialize.toast('Please enter a location.', 2000);
      }

        const $xhr = $.ajax ({
          method: 'GET',
          url: 'https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=2d2685ee8c7cbfa08366ece6e45d8ddd&breed='+theBreed+'&location='+theZipcode+'&output=full&count=66&format=json',
          dataType: 'json'
        });

    $xhr.done((data) => {
      if ($xhr.status !== 200) {
        return;
      }
let results = data;
const petArray = results.petfinder.pets.pet

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

// Search for Special Needs Dogs ************

$('#searchForm').on('submit', (event) => {
  if ($('select option:selected').val() === 'special') {
    event.preventDefault();

    dogs = [];
    specialArray = [];

      let theZipcode = $('#icon_prefix').val();

    if (theZipcode === '') {
      Materialize.toast('Please enter a location.', 2000);
    }

    const $xhr = $.ajax({
      method: 'GET',
      url: 'https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=2d2685ee8c7cbfa08366ece6e45d8ddd&location='+theZipcode+'&animal=dog&count=100&aoutput=full&format=json',
      dataType: 'json'
    });

    $xhr.done((data) => {
      if ($xhr.status !== 200){
        return;
      }

      const petArray = data.petfinder.pets.pet

      for (let i = 0; i < petArray.length; i++) {
        const thisPet = petArray[i];
        const optionsArray = thisPet.options.option;

        for (let i = 0; i < optionsArray.length; i++) {
          const current = optionsArray[i];

          for (const key in x) {
            if (current[key] === 'specialNeeds'){
              specialArray.push(thisPet);
            }
          }
        }
      }
      for (let i = 0; i < specialArray.length; i++) {
        let onePet = specialArray[i];

        const dog = {

        age: onePet.age.$t,
        sex: onePet.sex.$t,
        name: onePet.name.$t,
        description: onePet.description.$t,
        email: onePet.contact.email.$t,
        image: onePet.media.photos.photo[2].$t
      };
        dogs.push(dog);
      }
      renderDogs();
    });
  }
});

// Materialize Initializers ************

  $(document).ready(function (){
    $('select').material_select();
  });
  $(document).ready(function(){
      $('.parallax').parallax();
    });
    $(".button-collapse").sideNav();
  })();
