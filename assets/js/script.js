console.log("hello");

function changeDisplayArea(element)
{
    console.log(element);
    let activeElement=document.getElementsByClassName('active')[0];
    console.log(activeElement);
    
 
    if(element!=activeElement)
      {
        activeElement.classList.remove("active");  
        element.classList.add('active');
      }
      
    
}