"use strict";
/******************************************************************************
 * Handling navbar clicks and updating navbar
 */
/** Show main list of all stories when click site name */
async function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  getAndShowStoriesOnStart()
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

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $('.navbar-brand').append('<span><a id="submitShow" class="userLink">Submit </a></span>')
  $('.navbar-brand').append('<span><a id="favorites" class="userLink">My Favorites </a></span')
  $('.navbar-brand').append('<a id="ownStories" class="userLink">My Stories</a>')
  $('.navbar-brand').append($newStoryForm)
  $newStoryForm.hide()

  $('#submitShow').on("click", function(e){
    e.preventDefault();
    $newStoryForm.toggle()
   })

   $('#favorites').on("click", async function(e){
    $storiesLoadingMsg.remove();
    storyList = await StoryList.getStories(currentUser.username, "favorited");
    console.log(storyList + "are favorites")
    putStoriesOnPage("favorited");

   })
   $('#ownStories').on("click", async function(e){
    storyList = await StoryList.getStories(currentUser.username, "own");
    $storiesLoadingMsg.remove();
  
    putStoriesOnPage();
   })
  }

 




 









