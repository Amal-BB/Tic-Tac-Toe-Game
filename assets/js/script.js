//Wait for the DOM to finish loading before start running the game
// Add event listeners to them game cells element 

document.addEventListener("DOMContentLoaded", function(event) {
const xIconSrc='assets/images/x-icon.png';
const oIconSrc='assets/images/o-icon.png';

let game = { nextTurn: null ,
            player: {
                   playerIcon:'X',
                   states:[],
                   score:0,
            },
            computer: {
              computerIcon:'O',
              states:[],
              score:0,
            },
            ties:0,
}
const winningStates=[
  // Rows
  ['0', '1', '2'],
  ['3', '4', '5'],
  ['6', '7', '8'],

  // Columns
  ['0', '3', '6'],
  ['1', '4', '7'],
  ['2', '5', '8'],

  // Diagonal
  ['0', '4', '8'],
  ['2', '4', '6']
];
let newGame=true;
let turnCounter=0;  
const cells=document.getElementsByClassName('cell');
document.getElementById('player').addEventListener('click',function(){ changePlayerIcon(xIconSrc,oIconSrc);});

for(let cell of cells)
{
  console.log(cell.hasAttribute("data"));
  cell.addEventListener("click",function(){
    //check if the cell has been selected before
    if(game.nextTurn!='computer')
      if(! this.hasAttribute("data-type"))
      { 
        turnCounter++;
        let playerIconSrc=document.getElementById("player-icon").alt=='x-icon' ? xIconSrc : oIconSrc;   
        let computerIconSrc=playerIconSrc==oIconSrc ? xIconSrc : oIconSrc;   
        
        runGame(this,playerIconSrc,computerIconSrc);
      }
  });
}

//The main function to run the game, called after user clicked on the game grid cell
function runGame(cell,playerIconSrc,computerIconSrc)
{
  //set player icon on the game cell
  //console.log(playerIconSrc);
  //console.log(cell);
  let plyerImage='<img src='+ playerIconSrc +' />';
  //console.log(plyerImage);
  cell.innerHTML=plyerImage;
  cell.setAttribute("data-type",'player');
  game.player.playerIcon=playerIconSrc== xIconSrc ? 'x' : 'o';
  console.log("item id:"+cell.getAttribute("itemid"));
  game.player.states.push(cell.getAttribute("itemid"));
  game.nextTurn='computer';
  // check if player reach 3 play turns or more  
  if(game.player.states.length >=3 )
  {
    //check if user enter winning states
    checkGameWinner('player '+ game.player.playerIcon);
  }
  console.log("player statues:" + game.player.states);
  console.log("computer statues:" + game.computer.states);
  // set computer icon on the game cell
  let randomCell;
  let i=0;
  do
  {
    // in case of first turn for computer
    if(game.computer.states.length==0) 
      randomCell= Math.floor(Math.random() * 8) ;
    else 
      do
      {
        let state=winningStates[i++];
        console.log("turn counter"+turnCounter);
        console.log("computer states"+game.computer.states[turnCounter-2]);
        if(state.includes(game.computer.states[turnCounter-2]))
        {
          let increment=parseInt(state[2])-parseInt(state[1]);
          console.log("increment"+increment);
          randomCell=parseInt(game.computer.states[turnCounter-2]) + increment > 8 ? parseInt(game.computer.states[turnCounter-2]) - increment : parseInt(game.computer.states[turnCounter-2])+increment ;
          console.log("random1:"+randomCell);
          break;
        }
        
      }while(i<=winningStates.length)

   console.log(game.player.states.includes(randomCell.toString()));
   console.log(game.computer.states.includes(randomCell.toString()));
  
  } while( game.player.states.includes(randomCell.toString()) || game.computer.states.includes(randomCell.toString()));
 
  console.log("computer-random="+ randomCell); 
 
  let computerImage='<img src='+ computerIconSrc+' />';
  
  setTimeout(function() {
     for (let c of cells)
     {
        if(c.getAttribute("itemid") == randomCell.toString() ) 
         {
              console.log(c);
              c.innerHTML=computerImage;
              c.setAttribute("data-type",'computer');
              game.computer.playerIcon= game.playerIcon=='x' ? 'o' : 'x';
              game.computer.states.push(randomCell.toString());
              break;
         }
     }
    },1000);
     
    if(game.computer.states.length>=3)
     {
       checkGameWinner('computer ' + game.computer.computerIcon);
     }
    game.nextTurn='player';
}

});

// check if winner player 
function checkGameWinner(playerName){
    
}

// create function for menu elements click event to change the display area.
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
function changePlayerIcon(xIconSrc,oIconSrc)
{
  const playerIcon=document.getElementById("player-icon");
  const computerIcon=document.getElementById("computer-icon");
  console.log(playerIcon);
  console.log(playerIcon.alt);
    if (playerIcon.alt=="o-icon")
        {
          playerIcon.setAttribute("src",xIconSrc);
          playerIcon.setAttribute("alt","x-icon");
          computerIcon.setAttribute("src",oIconSrc);
          computerIcon.setAttribute("alt","o-icon");
        }
    else
       {
        playerIcon.setAttribute("src",oIconSrc);
        playerIcon.setAttribute("alt","o-icon");
        computerIcon.setAttribute("src",xIconSrc);
        computerIcon.setAttribute("alt","x-icon");
       }
} 
