const amenities = {};
const states = {};
const cities = {};
$('document').ready(function () {
  $('.statecheck').change(function () {
    if ($(this).is(':checked')) {
      states[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete states[$(this).attr('data-id')];
    }
    $('.locations h4').text(Object.values(states).join(', '));
  });

  $('.citycheck').change(function () {
    if ($(this).is(':checked')) {
      cities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete cities[$(this).attr('data-id')];
    }
    $('.locations h4').text(Object.values(cities).join(', '));
  });

  $('.amenities input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenities).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      for (const place of data) {
        const
        $('section.places').append(CreatePlaces(data[i]));
      }
    }
  });

  function CreatePlaces (place) {
    return `
  <article>
  <div class="title_box">
  <h2>${place.name}</h2>
  <div class="price_by_night">$${place.price_by_night}
  </div>
  </div>
  <div class="information">
  <div class="max_guest">
  ${place.max_guest} Guest
  </div>
  <div class="number_rooms">${place.number_rooms} Bedroom
  </div>
  <div class="number_bathrooms">${place.number_bathrooms} Bathroom
  </div>
  </div>
  <div class="description">${place.description}
  </div>
  <div class="reviews">
  <h2>Reviews <span class="showReview">show</span></h2>
  <ul>
  </ul>
  </div>
  </article>
  `;
  }

  $('button').click(function () {
    $('section.places').empty();
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenities),
        states: Object.keys(states),
        cities: Object.keys(cities)
      }),
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          $('section.places').append(CreatePlaces(data[i]));
        }
      }
    });
  });

  $(document).on('click', '.showReview', () => {
    $.get('')
    const placeId =
    $.get('http://0.0.0.0:5001/api/v1/places/' + $(this).attr('data-id') + '/reviews', function (data) {
      if ($('.showReview').text('show')) {
        for (let i = 0; i < data.length; i++) {
          $('.reviews ul').append('<li>${data[i].text}</li>');
        }
        $('.showReview').text('hide');
      } else if ($('.showReview').text('hide')) {
        $('.reviews ul').empty();
        $('.showReview').text('show');
      }
    });
  });
});
