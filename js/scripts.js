
var clickedItem = false;

$(document).on('click', window, function() {

  if(clickedItem == false)
  {
    $('.selected').css("display", "none");
    $('.selected').removeClass("selected");
  }
  else
  {
    clickedItem = false;
  }
});

$('.item').on('click', function()
{

  $('.selected').css("display", "none");
  $('.selected').removeClass("selected");

  var i = ($(this).index() - 1) / 2;
  
  var description = $('.project-description').eq(i);
  
  description.css("display", "block");
  description.addClass("selected");

  clickedItem = true;
});


$('.description-content').on('click', function()
{
  clickedItem = true;
});