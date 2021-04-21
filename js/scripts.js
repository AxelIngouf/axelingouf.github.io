
var clickedItem = false;
var selectedItem = -1;

$(document).on('click', window, function() {

  if(clickedItem == false)
  {
    $('.selected').css("display", "none");
    $('.selected').removeClass("selected");
    selectedItem = -1;
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

  if(i != selectedItem)
  {
    var description = $('.project-description').eq(i);

    description.css("display", "block");
    description.addClass("selected");
  
    clickedItem = true;

    selectedItem = i;
  }
  else
  {
    selectedItem = -1;
    clickedItem = false;
  }
});


$('.description-content').on('click', function()
{
  clickedItem = true;
});