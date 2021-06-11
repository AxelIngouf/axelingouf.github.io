/* Experience and Education */

$(document).ready(function () {
  var monthSize = 0;

  var yearStart = 2017;
  var expCount = 0;
  
  var string = "<ul>";

  var experienceLinesString = "<ul style='padding-top:0'>";
  var experienceDescriptionString = "<ul>";

  $(".exp").each(function()
  {
    monthSize += parseInt($(this).attr("month"));
    expCount++;
  });
  
  var yearString = "<ul><li class='year' style='width:" + (4 / monthSize * 100)+ "%'></li>";

  $(".exp").each(function()
  {
    var durationMonth = $(this).attr("month");
    var experienceName = $(this).attr("name");
    var experienceDescription = $(this).attr("description");
    var backgroundColor = $(this).attr("color");

    var durationWidthPercent = (durationMonth / monthSize * 100);

    string += "<li class='experience' style='background-color:" + backgroundColor + ";width:" + durationWidthPercent + "%;'>" + experienceName + "</il>";

    if(experienceName != "")
    {
      experienceLinesString += "<li style='height:40px;color:#ffffff00;display:inline-block;border-right:solid 1px #ffffff;width:"+ durationWidthPercent / 2 + "%;'>"+""+"</li><li style='height:40px;display:inline-block;width:"+ durationWidthPercent / 2 + "%'></li>";
    }
    else
    {
      experienceLinesString += "<li style='height:0px;color:#ffffff00;display:inline-block;width:"+ durationWidthPercent / 2 + "%;'></li><li style='height:40px;display:inline-block;width:"+ durationWidthPercent / 2 + "%'></li>";
    }

    experienceDescriptionString += "<li style='font-size:15px;vertical-align:top;width:" + durationWidthPercent + "%;padding:0 " + durationWidthPercent * 0.025 + "%;display:inline-block;text-align:center;'>" + experienceDescription + "</li>";

  });

  var i;
  for (i = 0; i < expCount; i++) {
    yearString += "<li class='year' style='width:" + (12 / monthSize * 100) + "%'>" + yearStart++ + "</li>";
  } 
  yearString += "<li class='year' style='width:1px'>" + yearStart++ + "</li></ul>";

  string += "</ul>" + experienceLinesString + "</ul>" + experienceDescriptionString + "</ul></div>";

  $('.history .container').append("<div class='frieze'>" + yearString + string + "</div>");
})

/* Projects duration and team size init */

$(".description-content").each(function()
{
  var string = "<div class=\"specs\"><ul>";
    $.each(this.attributes, function() {
      if(this.specified && this.name != "class" && this.name != "id") {
        string += "<li>"+this.name+": "+this.value+"</li>";
      }
    });

   $(this).append(string + "</ul></div>");
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

/* Videos autoplay */

$(document).ready(function () {
  $(".item").hover(function () {
      $(this).find("a video")[0].play();
  }, function () {
      var el = $(this).find("a video")[0];
      el.pause();
      el.currentTime = 0;
  });
});

/* Projects filters */

var currentFilters = [];

$('#projects').on('click', '.filters div', function() {
  var filterSelected = false;
  var link_name = $(this).attr('value');
  $.each(currentFilters, function(key, value)
  {  
    if(link_name == value)
    {
      filterSelected = true;
      currentFilters = jQuery.grep(currentFilters, function(valueDelete)
      {
        return valueDelete != value;
      });
      return false;
    }
  });

  if(filterSelected == false)
  {
    currentFilters.push(link_name);
    $(this).addClass("filterSelected");
  }
  else
  {
    $(this).removeClass("filterSelected");
  }

  if(currentFilters.length == 0)
  {
    $(".item").each(function()
    {
      $(this).removeClass("notfiltered");
    });
  }
  else
  {
    $(".item").each(function()
    {
      $(this).removeClass("notfiltered");
      var currentItem = $(this);
      var filterValue = currentItem.find('img').attr('alt').toLowerCase();
      var currentFiltersToLowerCase = currentFilters.map(v => v.toLowerCase());
      $.each(currentFiltersToLowerCase, function(key, value)
      {
        console.log(value);
        if(filterValue.indexOf(value) < 0)
        {
          currentItem.addClass("notfiltered");
          console.log("delete");
        }
      });
    });
  }
});