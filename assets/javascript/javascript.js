//  Robert Zuniga
// jQuery provides a way to say the following:
// Wait until the entire HTML document is "read" by the web browser.
// Once the documen is "ready", then execute my javascript code
$( document ).ready(function() {
    // Initial array of topics
    var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider",
      "chinchilla",
      "hedgehog", "hermit crab", "gerbill", "pigmy goat", "chicken", "capybara", "salamander", "frog"
    ];
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Function for getting image request from Giphy and displaying
    function displayAnimalInfo() {
  
      var animal = $(this).attr("data-name");
      console.log("animal ==> ", animal);
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ZGFCXW4DL8GQr4WH9ycZuksvEfPaRaHm&q=" + animal +
        "&limit=10";
  
      console.log("queryURL string ==>", queryURL);
  
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
          console.log("response ==> ", response);
          console.log("response.data.length ==>", response.data.length);
          var results = response.data;
          for (var i = 0; i < response.data.length; i++) {
            if (results[i] !== "r" && results[i] !== "pg-13") {
              var animalDiv = $("<div>");
              var p = $('<p>').text("Rating: " + response.data[i].rating);
  
              console.log("Rating ==> ", response.data[i].rating);
              var animalImage = $("<img>");
              animalImage.attr('src', response.data[i].images.fixed_height_still.url);
              animalImage.attr('data-still', response.data[i].images.fixed_height_still.url);
              animalImage.attr('data-animate', response.data[i].images.fixed_height.url);
              animalImage.attr('data-state', "still");
              animalImage.attr('rating', response.data[i].rating);
              // animalImage.attr('class', response.data[i].type);
              animalImage.attr('class', 'img-fluid gif');
              animalDiv.append(p);
              animalDiv.append(animalImage);
  
              $("#images").prepend(animalDiv);
              
              
            } //end if
          } // for
        }
  
      );
    } // end function displayAnimal image and info
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    // Function for displaying animal data
    function renderButtons() {
      // Deleting the buttons prior to adding new topics
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();
      // Looping through the array of topics
      for (var i = 0; i < topics.length; i++) {
        // Then dynamically generating buttons for each animal in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of animal to our button
        a.addClass("animal");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
      }
    } // end function renderButtons 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // This function handles events where one button is clicked
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $("#add-animal").on("click", function (event) {
      event.preventDefault();
  
      // This line grabs the input from the textbox
      var animal = $("#animal-input").val().trim();
  
      // Adding the animal from the textbox to our array
      topics.push(animal);
      console.log(topics);
  
      // Empty the input form thing
      $("#animal-input").val('');
  
      // Calling renderButtons which handles the processing of our animal array
      renderButtons();
    }); // button clicked then make button
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Function for displaying the animal info
    // Using $(document).on instead of $(".animal").on to add event listeners to dynamically generated elements
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $(document).on("click", ".animal", displayAnimalInfo);
    // Calling the renderButtons function to display the initial buttons
    $(document).on("click", ".gif", function () {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      console.log("refresh?")
      var state = $(this).attr("data-state");
      console.log(state);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    renderButtons();
  });