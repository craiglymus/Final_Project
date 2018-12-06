# Final_Project

Github URL for GymFinder: 
https://github.com/craiglymus/Final_Project


Elevator Pitch: 
Oftentimes people that are enthusiastic about fitness are also adventuress people that love to travel. A common dilemma many of these people face when traveling is 
the inability to find a suitable location to workout. GymFinder provides traveling fitness junkies the ability search for and find local gyms that have been vouched for by 
other fitness enthusiasts. This allows those travelers to rest assured that they can travel the world while still sticking to their fitness goals.

Technologies Used: 
Django, JS, Pillow, HTML, CSS, PostgreSQL

Installation Steps & Dependencies:
To use this app simply clone the repository from the GitHub link above and go through the steps to install Django; From terminal $pip3 install Django==2.0.5, install Pillow $pip3 install Pillow, migrate $python3 manage.py makemigrations  then $python3 manage.py migrate. The app can then be viewed on localhost:8000

User Stories:
My user is the adventure seeker who travels a lot but also wants to keep fit. My user want the ability to maintain their fitness goals even while they are way from home. GymFinder allows users to see reviews from other traveling fitness enthusiasts and choose a gym that is best suited for them while they are traveling. 

Code I was proud of:

I was able to dynamically render pins on the map with any location that was entered on the search bar. This was done by looping through the API results and grabbing all the relevant information and loading it onto the info window

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
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>'  +  `<a class="favorite" href="" data-id=${gym.place_id}><i class="fa fa-star" aria-hidden="true"></i></a>` + '       ' + 'Phone Number ' + place.formatted_phone_number + '<br>' +
              place.formatted_address +  '<br>' + `<a href=${place.website}> ${place.website} </a>` + '</div>');
            infowindow.open(map, this);
          })
        } 
      })

DELETE: This code was tricky because I initally created a delete button from the templates but I realized it was better to make an ajax call and have the delete button render dynamically. By doing it this way I was able to put everything 'on the front end' which allowed the preventDefault to work allowing the function to actually run.

$('.deleteButton').on('click', function(e) {
  e.preventDefault()
  let cardId = ($(this).data())
  console.log(cardId.id)
  $(this).parent().empty()

  $.ajax({
    method: "DELETE",
    url: `${deleteEndpoint}/${cardId.id}/delete`,
    success: function deleteSuccess(response) {
      
    },
    error: function(err1, err2, err3) {
      console.log(err1)
      console.log(err2)
      console.log(err3)
    }
})
})

