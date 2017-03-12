  $(document).ready(function(){

    // This variable called topics holds my Array.
     var topics = ["Baseball", "Football", "Basketball", "Soccer", "Hockey"];

    // Here im calling a request to the giphy API to get access to the images.
    function displaySportsInfo(event) {
      var sport = event.target.attributes[1].value;

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=5";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
         
              var results = response.data;
                for (var i = 0; i < results.length; i++) {
                  var imgDiv = $("<div class='item'>");

                  var rating = response.data[i].rating;

                  var p = $("<p>").text("Rating: " + rating);

                  var gifImage = $("<img>");
                  var play = gifImage.attr("src", results[i].images.fixed_height.url);
                  var still = gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                  var animate = gifImage.attr("data-animate", results[i].images.fixed_height.url);
                  var state = gifImage.attr("data-state");
                  // gifImage.addClass("gif");
                  imgDiv.prepend(p);
                  imgDiv.prepend(gifImage);

                  $("#Sports-appear-here").prepend(imgDiv);
                }
      });
    }

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

  $(document).on("click", ".sport", function(event) {
      event.preventDefault();
      $("#Sports-appear-here").empty();
      displaySportsInfo(event);
    });    

})