"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const favouriteStories = []
const respondedfavourites  = []

document.body.addEventListener("click", async function(e){
  if(e.target.innerText == "Remove from favourites"){
    let removeStoryId = e.target.getAttribute('id')
    console.log("clicked a remove button") //this is now working (thanks to delegation)
    let removingIndex = currentUser.favorites.indexOf(removeStoryId);
    currentUser.favorites.splice(removeStoryId,1)
    favoriteClickHandler()
} else if (e.target.innerText == "Delete Story"){

  let storyId = e.target.getAttribute('id')
  console.log(storyId)
 
  console.log("clicked delete button")

  const token = currentUser.loginToken;
  let deleteResponse = await axios({
    url: `${BASE_URL}/stories/${storyId}`,
    method: "DELETE",
    data: { token: currentUser.loginToken }
  });

  console.log(deleteResponse)
  await getAndShowStoriesOnStart();
  /*let deleted = await axios.get(`https://hack-or-snooze.herokuapp.com/stories/${storyId}?token=${token}`)
  console.log(deleted)
  //we need to post a delete request via axios using currentUSer.login token as authentification*/
}
})
/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */
function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}
// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);

const $newStoryForm = $('<div><form id="addNewStory"><input type="text" id="authorInput" placeholder="author"><input type="text" id ="titleInput" placeholder="title"><input type="text" id="urlInput" placeholder="url"><button id="newStoryButton" type="submit">Add Story</button></form></div>')

const $newStoryButton = $('#newStoryButton')

$newStoryForm.on("submit", async function(e){
e.preventDefault()
let author = $('#authorInput').val();
let title = $('#titleInput').val();
let url = $('#urlInput').val()

let newStory = await storyList.addStory(currentUser,
  {title: `${title}`, author: `${author}`, url: `${url}`});

})
