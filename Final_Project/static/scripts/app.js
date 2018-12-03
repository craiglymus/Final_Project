const apiKey = `AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg`
const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?`

let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.397, lng: -100.644},
    zoom: 4.5
  });



function geoString(inputFieldData) {
  let newInputFieldStr = '';
  for (var i = 0; i < inputFieldData.length; i += 1) {
    let currentElement = inputFieldData[i];
    if (currentElement === ' ') {
      newInputFieldStr += '+'
    } else {
      newInputFieldStr += currentElement;
    }

    
  }
  return newInputFieldStr
}
$('.geoCodingForm').on('submit', function(e) {
  e.preventDefault()
  let inputFieldData = $('.addressBar').val();
  let newString = geoString(inputFieldData)
  var geoLocationUrl = `${geoUrl}address=${newString}&key=${apiKey}`
  console.log(geoLocationUrl);
  $.ajax({
    method: "GET",
    url: `${geoLocationUrl}`,
    success: addressSuccess,
    error: function addressError(err1, err2, err3) {
      console.log(err1)
      console.log(err2)
      console.log(err3)
    }

  })


function addressSuccess(response) {

  let latitudeLocation = response.results[0].geometry.location.lat;
  let longitudeLocation = response.results[0].geometry.location.lng;
  $.ajax({
    method: "GET",
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitudeLocation},${longitudeLocation}&radius=18000&type=gym&keyword=fitness&key=${apiKey}`,
    success: gymLoader,
    error: function onError(err1, err2, err3) {
      console.log(err2);
      console.log('NO GYM BITCH')
    }
  })

  function gymLoader(feedback) {
    console.log(feedback)
    console.log('gyms loading')
    let map = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      zoom: 10
    });

    for (var i = 0; i < feedback.results.length; i += 1) {
      let gym = feedback.results[i];
      let markerLatitude = gym.geometry.location.lat;
      let markerLongitude = gym.geometry.location.lng;
      
      var infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);

      service.getDetails({
        placeId: `${gym.place_id}`
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              'Phone Number ' + place.formatted_phone_number + '<br>' +
              place.formatted_address +  '<br>' + `<a href=${place.website}> ${place.website} </a>` + '</div>');
            infowindow.open(map, this);
          })
        } 
      })
    

      let markerLatitudeAndLongitude = {lat: markerLatitude, lng: markerLongitude}
      console.log(gym);
      let marker = new google.maps.Marker({
        position: markerLatitudeAndLongitude,
        map: map,
        
    })


    }

  }
  console.log(`The Latitude is ${latitudeLocation} and the longitude is ${longitudeLocation}` )
  let latlng = {lat: latitudeLocation, lng: longitudeLocation}

  document.forms['addressForm'].reset()
}

})



// const apiKey = `AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg`
// const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?`

// let map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 38.397, lng: -100.644},
//     zoom: 4.5
//   });



// function geoString(inputFieldData) {
//   let newInputFieldStr = '';
//   for (var i = 0; i < inputFieldData.length; i += 1) {
//     let currentElement = inputFieldData[i];
//     if (currentElement === ' ') {
//       newInputFieldStr += '+'
//     } else {
//       newInputFieldStr += currentElement;
//     }

    
//   }
//   return newInputFieldStr
// }
// $('.geoCodingForm').on('submit', function(e) {
//   e.preventDefault()
//   let inputFieldData = $('.addressBar').val();
//   let newString = geoString(inputFieldData)
//   var geoLocationUrl = `${geoUrl}address=${newString}&key=${apiKey}`
//   console.log(geoLocationUrl);
//   $.ajax({
//     method: "GET",
//     url: `${geoLocationUrl}`,
//     success: addressSuccess,
//     error: function addressError(err1, err2, err3) {
//       console.log(err1)
//       console.log(err2)
//       console.log(err3)
//     }

//   })


// function addressSuccess(response) {

//   let latitudeLocation = response.results[0].geometry.location.lat;
//   let longitudeLocation = response.results[0].geometry.location.lng;
//   $.ajax({
//     method: "GET",
//     url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitudeLocation},${longitudeLocation}&radius=18000&type=gym&keyword=fitness&key=${apiKey}`,
//     success: gymLoader,
//     error: function onError(err1, err2, err3) {
//       console.log(err2);
//       console.log('NO GYM BITCH')
//     }
//   })

// function gymLoader(feedback) {
//     console.log(feedback)
//     console.log('gyms loading')
//     let map = new google.maps.Map(document.getElementById('map'), {
//       center: latlng,
//       zoom: 10
//     });

//     for (var i = 0; i < feedback.results.length; i += 1) {
//       let gym = feedback.results[i];
//       let markerLatitude = gym.geometry.location.lat;
//       let markerLongitude = gym.geometry.location.lng;
    
//       let markerLatitudeAndLongitude = {lat: markerLatitude, lng: markerLongitude}
//       console.log(gym);
//       let marker = new google.maps.Marker({
//         position: markerLatitudeAndLongitude,
//         map: map,
//         title: gym.name
//     })

//     }

//   }
//   console.log(`The Latitude is ${latitudeLocation} and the longitude is ${longitudeLocation}` )
//   let latlng = {lat: latitudeLocation, lng: longitudeLocation}

//   document.forms['addressForm'].reset()
// }

// })
