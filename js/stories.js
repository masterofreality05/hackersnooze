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
  let user = currentUser.username;
  let token = currentUser.loginToken
  const hostName = story.getHostName();
  let $delete = $(`<a class="deleteStory" id="${story.storyId}">Delete Story</a>`)
  let $remove = $(`<a class="deleteStory" id="${story.storyId}">Remove from Favorites</a>`)
  let $favorite = $(`<a class="favorite" id="${story.storyId}">Add to Favorites</a>`)

  $delete.on("click", async function(e){
    let storyId = $delete.attr("id")
    await deleteStory(storyId,token,user)
    getAndShowStoriesOnStart()
    })
 
  $favorite.on("click", async function(e){
    let storyId = e.target.getAttribute('id')
    
    //$favorite.remove()
    $favorite.toggle(function (){
      $(this).text("Added to Favorites")
      addtoFavorites(storyId,token, user)      
  })

})
  $remove.on("click", async function(e){
    let storyId = e.target.getAttribute('id')
    console.log(storyId)

  removeFromFavorites(storyId,token,user)   
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



let favoriteIds = await createFavoriteIdArray()
console.log("favorite ID array " +  favoriteIds)
//output IDs of currently favorited stories. 





//my attemtp to parse the story list between favorited and unfavorited. .. 


//this was my attempt to seperate favorited stories from unfavorited, in order to 
//change the HTML markup when loading the storylist. 



  console.debug("putStoriesOnPage");
  console.log(storyList)

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    console.log("our story id is  " + story.storyId)
  
    if(favoriteIds.indexOf(story.storyId)!== -1){
      console.log(story.storyId + " is a favorite")
      
      const $story = generateStoryMarkup(story, "favorited");
      $allStoriesList.append($story);

    } /*else if(){
    
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);

    }
    */
    else {
      
      const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
    }
      

    }
    $allStoriesList.show();
  }
 





