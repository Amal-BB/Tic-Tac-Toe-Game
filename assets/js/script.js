// create function for menu elements event to change the display area.
function changeDisplayArea(element)
{
    // get the active element in game menu
    let activeElement=document.getElementsByClassName('active')[0];
    // check if the clicked element isn't the active element
    if(element!=activeElement)
      {
        // remove active class from unclicked element
        activeElement.classList.remove("active"); 
        // add active class to the clicked element 
        element.classList.add('active');
        if(element.id=='play')
          {
            document.getElementById('play-area').style.display='block';
            document.getElementById('instruction-area').style.display='none';
          }
        else
        {
          document.getElementById('play-area').style.display='none';
          document.getElementById('instruction-area').style.display='block';
        }
      }   
    
}
//create function to change player icon to X or O
function changePlayerIcon()
{
  let playerIcon=document.getElementById("player-icon");
  let computerIcon=document.getElementById("computer-icon");
  console.log(playerIcon);
  console.log(playerIcon.alt);
    if (playerIcon.alt=="o-icon")
        {
          playerIcon.setAttribute("src","assets/images/x-icon.png");
          playerIcon.setAttribute("alt","x-icon");
          computerIcon.setAttribute("src","assets/images/o-icon.png");
          computerIcon.setAttribute("alt","o-icon");
        }
    else
       {
        playerIcon.setAttribute("src","assets/images/o-icon.png");
        playerIcon.setAttribute("alt","o-icon");
        computerIcon.setAttribute("src","assets/images/x-icon.png");
        computerIcon.setAttribute("alt","x-icon");
       }
} 