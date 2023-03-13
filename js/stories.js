"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
/** Get and show stories when site first loads. */
async function getAndShowStoriesOnStart(input) {
  storyList = await StoryList.getStories(input);
  $storiesLoadingMsg.remove();

putStoriesOnPage();
}

function generateStoryMarkup(story, favorite) {
  const hostName = story.getHostName();
  let $delete = $(`<a class="deleteStory" id="${story.storyId}">Delete Story</a>`)
  let $remove = $(`<a class="deleteStory" id="${story.storyId}">Remove from Favorites</a>`)
  let $favorite = $(`<a class="favorite" id="${story.storyId}">Add to Favorites</a>`)

  $delete.on("click", async function(e){
    let token = currentUser.loginToken;
    let storyId = $delete.attr("id")
    const response = await axios ({
    
      method: "DELETE",
      url: `${BASE_URL}/stories/${storyId}`,
      data: { token },

  })
 getAndShowStoriesOnStart()
})

  $favorite.on("click", async function(e){
    let storyId = e.target.getAttribute('id')
    let user = currentUser.username;
    let token = currentUser.loginToken
    //$favorite.remove()
    $favorite.toggle(function (){
      $(this).text("Added to Favorites")
      .stop();
  })
  

    const response = await axios ({
      method: "POST",
      url: `${BASE_URL}/users/${user}/favorites/${storyId}`,
      data: { token },
    });
  
  })
  $remove.on("click", async function(e){
    let storyId = e.target.getAttribute('id')
    let user = currentUser.username;
    let token = currentUser.loginToken

    const response = await axios ({
      method: "DELETE",
      url: `${BASE_URL}/users/${user}/favorites/${storyId}`,
      data: { token },
  
  })
  storyList = await StoryList.getStories(currentUser.username, "favorite");
  putStoriesOnPage("favorited")

})

let $markup = $(`
<li id="${story.storyId}">
  <a href="${story.url}" target="a_blank" class="story-link">
    ${story.title}
  </a>
  <small class="story-hostname">(${hostName})</small>
  <small class="story-author">by ${story.author}</small>
  <small class="story-user">posted by ${story.username}</small>
</li>
`)

favorite == "favorited"? $markup.append($remove).append($('<br>').append($delete)):$markup.append($favorite).append($('<br>')).append($delete);

return $markup
}
/** Gets list of stories from server, generates their HTML, and puts on page. */
async function putStoriesOnPage(input) {
console.log("input")
//my attemtp to parse the story list between favorited and unfavorited. .. 
let token = currentUser.loginToken;
const response = await axios.get(`${BASE_URL}/users/D` , {params: {token}})

//this was my attempt to seperate favorited stories from unfavorited, in order to 
//change the HTML markup when loading the storylist. 

  /*console.log("this is our favorites" + response.data.user.favorites)
   for (let fav of response.data.user.favorites){
    console.log("storyId should be " + fav.storyId)
    //favoriteIdArray.push(fav.storyId)
    }
    //*/

  console.debug("putStoriesOnPage");
  console.log(storyList)

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
  
    if(input == "favorited"){
      
      const $story = generateStoryMarkup(story, "favorited");
      $allStoriesList.append($story);

    } else if(input == "own"){
    
      const $story = generateStoryMarkup(story, "favorited");
      $allStoriesList.append($story);

    }
    
    else {
      
      const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
    }
      

    }
    $allStoriesList.show();
  }
 





