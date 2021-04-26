/* Projects duration and team size init */

$(".description-content").each(function()
{
  $(this).append("<div class=\"specs\"><ul><li>Team Size: " + $(this).attr("team-size") + "</li><li>Duration: "+ $(this).attr("duration") +"</li></div>");
})

/* Projects content display runtime */

var clickedItem = false;
var selectedItem = -1;

$('.description-content').on('click', '.quit-button', function() {
  $('.selected').fadeOut("fast");
  $('iframe').attr('src', $('iframe').attr('src'));
  $('.selected').removeClass("selected");
  deleteQuitButton();
  clickedItem = false;
  selectedItem = -1;
});


$(document).on('click', window, function() {

  if(clickedItem == false)
  {
    $('.selected').fadeOut("fast");
    $('.selected').removeClass("selected");
    $('iframe').attr('src', $('iframe').attr('src'));
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
    $('.selected').fadeOut("fast");
    $('.selected').removeClass("selected");
    $('iframe').attr('src', $('iframe').attr('src'));
    deleteQuitButton();

    var description = $('.project-description').eq(i);

    description.fadeIn("fast");
    description.css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'fast');
    description.addClass("selected");
    addQuitButton();
  
    clickedItem = true;

    selectedItem = i;
  }
  else
  {
    $('.selected').fadeOut("fast");
    $('.selected').removeClass("selected");
    $('iframe').attr('src', $('iframe').attr('src'));
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