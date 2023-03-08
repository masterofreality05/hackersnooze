"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */
async function favoriteClickHandler(){
console.log("running favoriteClickHandler")
let storyObjectList = []
$allStoriesList.empty()

 console.log("clicked favourites")
 for(let faves of currentUser.favorites){
  const response = await axios({
    url: `${BASE_URL}/stories/${faves}`,
    method: "GET",
    
  });
  console.log("this is our response " +  response.data.story)
  let respondedStory = response.data.story;
  
 
  storyObjectList.push(respondedStory)
  
}
console.log("storyObjectlist" + storyObjectList)

  const stories = storyObjectList.map(story => new Story(story))
  for(let story of stories){
    let markedUpFav =generateStoryMarkup(story)
    $allStoriesList.append(markedUpFav).append(`<a id="${story.storyId}"class="remove story-user">Remove from favourites</a>`)
  
  }
 
}

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $('.navbar-brand').append('<span><a id="submitShow" class="userLink">Submit </a></span>')
  $('.navbar-brand').append('<span><a id="favorites" class="userLink">Favorites</a></span')
  $('.navbar-brand').append('<a id="myStories" class="userLink">My Stories</a>')
  $('.navbar-brand').append($newStoryForm)
  $newStoryForm.hide()

  $('#submitShow').on("click", function(e){
    
    e.preventDefault();
    console.log("hey it clicked")
    $newStoryForm.show()
   })


  
   $('#favorites').on("click", favoriteClickHandler)
  }



 









