$(document).ready(function() {

//Initial array of characters
    var characters = ["Mickey Mouse", "Belle", "Nemo", "The Aristocats", "Steamboat Willie", "Minnie Mouse", "Ariel", "Olaf Frozen", "Donald Duck", "Pluto Disney", "Buzz Lightyear", "cars Mater", "Chewbacca", "Alladin", "Han Solo", "Genie in Alladin"];


    //displays the GIFs on the html. limited to 10 
  	// $("button").on("click",function(){
    function displayCharacters(){

  		var cast = $(this).attr("data-name");
    	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cast + "&api_key=dc6zaTOxFJmzC&limit=10";

    	$.ajax({
    		url:queryURL,
    		method: "get"
    	}).done(function(response){

    	var results = response.data;   //accesses info inside data key

    	for (var i = 0; i < results.length; i++){
    		var castDiv = $("<div class = 'castDiv'>")  //create a new div

    		var p = $("<p>").text("Rating: " + rating)  //put rating on page
    		var rating = results[i].rating;             //this is where the rating info is located

    		var castImg = $("<img>");
    		castImg.attr("src", results[i].images.fixed_height.url);
    		castDiv.append(p);
    		castDiv.append(castImg);
            castImg.addClass("play");

    		$("#gif-view").prepend(castDiv);

            $(".play").on("click", function(event){
                var dataAnimate = $(this).attr("data-animate");
                var dataStill = $(this).attr("data-still");
                var currentURL = $(this).attr("src");
                if( currentURL === dataStill){
                    $(this).attr("src", dataAnimate);
                } else {
                    $(this).attr("src", dataStill)
                }
            })
    	}
    	});
      };

    function makeButtons(){

        $("#buttonlocation").empty();

        for (var i = 0; i < characters.length; i++){
            var a = $("<button>");
            a.addClass("cast");
            a.attr("data-name", characters[i]);
            a.text(characters[i]);
            $("#buttonlocation").append(a);

        }
    }

    $("#addButton").on("click", function(event){
        event.preventDefault();
        var cast = $("addCast").val().trim();
        characters.push(cast);
        makeButtons();
    })

    $(document).on("click", ".cast", displayCharacters)

    makeButtons();

})