
var clickedItem = false;
var selectedItem = -1;

$('.description-content').on('click', '.quit-button', function() {
  $('.selected').fadeOut();
  $('.selected').removeClass("selected");
  deleteQuitButton();
  clickedItem = false;
  selectedItem = -1;
});


$(document).on('click', window, function() {

  if(clickedItem == false)
  {
    $('.selected').fadeOut();
    $('.selected').removeClass("selected");
    deleteQuitButton();
    selectedItem = -1;
  }
  else
  {
    clickedItem = false;
  }
});

$('.item').on('click', function()
{

  var i = ($(this).index() - 1) / 2;

  if(i != selectedItem)
  {
    $('.selected').css("display", "none");
    $('.selected').removeClass("selected");
    deleteQuitButton();

    var description = $('.project-description').eq(i);

    description.fadeIn();
    description.css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow');
    description.addClass("selected");
    addQuitButton();
  
    clickedItem = true;

    selectedItem = i;
  }
  else
  {
    $('.selected').fadeOut();
    $('.selected').removeClass("selected");
    deleteQuitButton();

    selectedItem = -1;
    clickedItem = false;
  }
});

function addQuitButton()
{
  $('.selected').children('.description-content').prepend("<div class=\"quit-button\"></div>");
}

function deleteQuitButton()
{
  $('.quit-button').animate({visibility: 0}, 200,"linear",function()
  {
      $(this).remove();
  }
)
}

$('.description-content').on('click', function()
{
  clickedItem = true;
});