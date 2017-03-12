$(document).ready(function(){

  // This variable called topics holds my Array.
  var topics = ["Baseball", "Football", "Basketball", "Soccer", "Boxing"];

  // Here im calling a request to the giphy API to get access to the images.
  function displaySportsInfo(event) {
    var sport = event.target.attributes[1].value;

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=24";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
         
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var imgDiv = $("<div class='item'>");

        var rating = response.data[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var gifImage = $("<img>");

        gifImage.attr("src", animated);
        gifImage.attr("data-still", still);
        gifImage.attr("data-animate", animated);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gifImage");


        imgDiv.append(p);
        imgDiv.append(gifImage);

        $("#Sports-appear-here").append(imgDiv);
      }
    });
  }
  // for some reason this function is not working for me.
$(document).on("click", ".sport", function(event) {
  event.preventDefault();

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
  $("#Sports-appear-here").empty();
    displaySportsInfo(event);

});

    // This function renders my array and creates them into buttons.
  function renderButtons() {

    $("#Sportbuttons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("sport");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#Sportbuttons").append(a);
    }
  }

   renderButtons();

    // Adds a new button to my list 
  $("#add-Sports").on("click", function(event) {
      event.preventDefault();
      var sport = $("#sport-input").val().trim();
      topics.push(sport);
      $("#sport-input").val("");
      renderButtons();
    });    

});