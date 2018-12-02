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
      let marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: "Marker Example"
  })
  }
  console.log(`The Latitude is ${latitudeLocation} and the longitude is ${longitudeLocation}` )
  let latlng = {lat: latitudeLocation, lng: longitudeLocation}

  document.forms['addressForm'].reset()
}

})

