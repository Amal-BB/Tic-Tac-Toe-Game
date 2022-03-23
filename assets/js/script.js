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