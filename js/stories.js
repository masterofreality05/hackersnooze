"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
async function getAndShowStoriesOnStart(input) {
  storyList = await StoryList.getStories(input);
  $storiesLoadingMsg.remove();

putStoriesOnPage();
}

function generateStoryMarkup(story, favorite, own) {
  let user = currentUser.username;
  let token = currentUser.loginToken
  const hostName = story.getHostName();
  let $delete = $(`<a class="deleteStory btn-danger" id="${story.storyId}">Delete Story</a><br>`)
  let $remove = $(`<a class="deleteStory btn-warning" id="${story.storyId}">Remove from Favorites</a><br>`)
  let $favorite = $(`<a class="favorite btn-success" id="${story.storyId}">Add to Favorites</a><br>`)

  $delete.on("click", async function(e){
    let storyId = $delete.attr("id")
    await deleteStory(storyId,token,user)
    getAndShowStoriesOnStart()
    })
 
  $favorite.on("click", async function(e){
    let storyId = e.target.getAttribute('id')
    $favorite.toggle(function (){
      $(this).text("Added to Favorites")
      addtoFavorites(storyId,token, user)      
  })

})
  $remove.on("click", async function(e){
    let storyId = e.target.getAttribute('id')
  removeFromFavorites(storyId,token,user)   
  storyList = await StoryList.getStories(currentUser.username, "favorite");
  $remove.text("Removed from favorites")

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

 if(own == "ownStory"){
$markup.append($delete);
 }

if(favorite == "favorited"){
  $markup.remove($favorite).append($remove)

} else {
  $markup.append($favorite)
}

return $markup
}
/** Gets list of stories from server, generates their HTML, and puts on page. */
async function putStoriesOnPage(input) {
let favoriteIds = await createFavoriteIdArray()
let ownIds = await createOwnStoryArray()



  console.debug("putStoriesOnPage");
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) { 
    if(favoriteIds.indexOf(story.storyId)!== -1 && ownIds.indexOf(story.storyId) !== -1){

      const $story = generateStoryMarkup(story, "favorited","ownStory");
      $allStoriesList.append($story);

    } 
   

    else if(favoriteIds.indexOf(story.storyId)!== -1){

      const $story = generateStoryMarkup(story, "favorited",false);
      $allStoriesList.append($story);

    }
    
    else if(ownIds.indexOf(story.storyId) !== -1){
 
    
      const $story = generateStoryMarkup(story,false,"ownStory");
      $allStoriesList.append($story);

    }
  
    else {
      
    
      const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);

    }
    $allStoriesList.show();

    }

  
 


  }


