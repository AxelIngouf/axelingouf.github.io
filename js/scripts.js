/* Experience and Education */

var monthPixelSize = 15;

$(document).ready(function () {
  const studies = [
    { startDate: '2020-09-01', endDate: '2021-08-31', name: 'ISART Digital Montréal', description: 'AEC Game Programming; 3D Game Engine Programming, Gameplay, AI, Network, Animation Programming, Rendering (Vulkan, DirectX10, OpenGL).' },
    { startDate: '2018-09-01', endDate: '2019-07-31', name: 'IMT Lille Douai', description: 'Engineering School; Fullstack web Programming, OOP, Network, Project Management, Debugging.' },
    { startDate: '2016-09-01', endDate: '2018-06-30', name: 'IUT de Calais', description: 'Computer Science Diploma; Procedural Programming, OOP, Web Programming, Network, Multithreading, AI, 2D Games, Databases, Architecture, Project Management.' },
  ];

  const jobs = [
    { startDate: '2022-11-10', name: 'Activision - Beenox', description: 'Gameplay Programmer' },
    { startDate: '2021-09-06', endDate: '2022-11-10', name: 'Activision - Beenox', description: 'Tools Programmer' },
    { startDate: '2018-10-01', endDate: '2019-07-31', name: 'Boulanger S.A.', description: 'Security and Web developer' },
    { startDate: '2018-04-01', endDate: '2018-07-01', name: 'Sendai College, Japan', description: 'Japan exchange programm; Python, Arduino, Project Management' },
  ];

  const $columnSection = $('<section>').addClass('column-section');

  const $studiesColumn = getExperienceTypeColumn(studies, "study");
  const $jobColumn = getExperienceTypeColumn(jobs, "job");
  const $yearsColumn = getYearsColumn();

  $columnSection.append($studiesColumn);
  $columnSection.append($yearsColumn);
  $columnSection.append($jobColumn);

  $('#history .container').append($columnSection);
})

function getYearsColumn()
{
  var maxDate = new Date('2016-09-01');
  var currentDate = new Date();
  const $column = $('<div>');

  var monthCount = 11 - maxDate.getMonth();

  for(let i = currentDate.getFullYear(); i > maxDate.getFullYear(); i--)
  {  
    const $date = $('<div>').addClass("experienceDate");
    $date.height( monthCount * monthPixelSize + "px" );
    const $dateContent = $('<div>').addClass("experienceDateContent").text(""+i);
    $date.append($dateContent);
    $column.append($date);

    monthCount = 12;
  }

  return $column;
}

function getExperienceTypeColumn(experiencesArray, experienceType)
{
  var lastDate = new Date();
  const $column = $('<div>').addClass('column');
  experiencesArray.forEach(experience => {
    var startDate = new Date(experience.startDate);
    if( typeof experience.endDate !== 'undefined' )
    {
      var endDate = new Date(experience.endDate);
    }
    else
    {
      var endDate = new Date();
    }

    if(lastDate != endDate)
    {
      generateExperienceDiv($column, lastDate, endDate);
    }
    generateExperienceDiv($column, endDate, startDate, experience, experienceType);

    lastDate = startDate;
  });

  return $column;
}

function generateExperienceDiv(column, endDate, startDate, data, experienceType)
{
  const $experience = $('<div>');
  var durationInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  durationInMonths -= startDate.getMonth() + 1;
  durationInMonths += endDate.getMonth() + 1;
  $experience.height( durationInMonths * monthPixelSize + "px" ); // Set height proportional to duration
  if(typeof data !== 'undefined')
  {
    $experience.addClass("experience").addClass(experienceType);

    const $experienceTitle = $('<h3>').addClass('experience-title').text(data.name);
    $experience.append($experienceTitle);
    
    if( typeof data.description !== 'undefined' )
    {
      const $experienceDescription = $('<p>').addClass('experience-description').text(data.description);
      $experience.append($experienceDescription);
    }
  }

  column.append($experience);
}

/* Projects specs init */

$(".description-content").each(function()
{
  var string = "<div class=\"specs\"><ul>";
    $.each(this.attributes, function() {
      if(this.specified && this.name != "class" && this.name != "id") {
        var specName = this.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
          return letter.toUpperCase();
        });
        string += "<li>"+specName+": "+this.value+"</li>";
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

    var description = $('.project-description').eq(i-1);

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
  })
}

$('.description-content').on('click', function()
{
  clickedItem = true;
});

/* Videos autoplay */

$(document).ready(function () {
  $(".item").hover(function () {
    var el = $(this).find("a video")[0];
    if(typeof el !== "undefined")
    {
      el.play();
    }
  }, function () {
    var el = $(this).find("a video")[0];
    if(typeof el !== "undefined")
    {
      el.pause();
      el.currentTime = 0;
    }
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


// Tabs

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "activeTab"
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" activeTab", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " activeTab";
}