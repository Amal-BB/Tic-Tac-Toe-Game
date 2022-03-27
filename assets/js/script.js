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
            availableCells:['0','1','2','3','4','5','6','7','8'],
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
    if(game.availableCells.length!=0)
    {
    // check if it is not computer turn
    if(game.nextTurn!='computer')
      if(! this.hasAttribute("data-type"))//check if the cell has been selected before
       { 
          turnCounter++;
          let playerIconSrc=document.getElementById("player-icon").alt=='x-icon' ? xIconSrc : oIconSrc;   
          let computerIconSrc=playerIconSrc==oIconSrc ? xIconSrc : oIconSrc;   
          runGame(this,playerIconSrc,computerIconSrc);
       }
      }   
      else
      {
          gameOver();
      }
    
  });
}

//The main function to run the game, called after user clicked on the game grid cell
async function runGame(cell,playerIconSrc,computerIconSrc)
{
  //set player icon on the game cell
  //console.log(playerIconSrc);
  //console.log(cell);
  //let plyerImage='<img src='+ playerIconSrc +' />';
  //console.log(plyerImage);
  
     //setTimeout(function() {resolve("I love You !!");}, 3000);
  game.nextTurn='computer';
  let myPromise = new Promise(function(resolve) {
    resolve('<img src='+ playerIconSrc +' />');});
       
  cell.innerHTML= await myPromise;
  cell.setAttribute("data-type",'player'); 
  game.player.playerIcon=playerIconSrc== xIconSrc ? 'x' : 'o';
  console.log("item id:"+cell.getAttribute("itemid"));
  game.player.states.push(cell.getAttribute("itemid"));
  // remove selected cell number from game avaliableCells
  removeSlectedCell(cell.getAttribute("itemid"));
  
  // check if player reach 3 play turns or more  
  if(game.player.states.length >=3 )
  {
    //check if player has winning states
    console.log("check user palyer winning states");
    checkGameWinner(game.player);
  }
  console.log("player statues:" + game.player.states);
  console.log("computer statues:" + game.computer.states);
  
  if(game.availableCells.length==0)
  {
      gameOver();
  }
  else
  {
  // set computer state for computer turn
  let computerState=getComputerState();

  console.log("computer-random="+ computerState); 
 
  //let computerImage='<img src='+ computerIconSrc+' />';
  myPromise = new Promise(function(resolve) {
    setTimeout(function() {resolve('<img src='+ computerIconSrc+' />')}, 900);
  });
     for (let c of cells)
     {
        if(c.getAttribute("itemid") == computerState ) 
         {
              console.log(c);
              c.innerHTML=await myPromise;
              c.setAttribute("data-type",'computer');
              game.computer.playerIcon= game.playerIcon=='x' ? 'o' : 'x';
              game.computer.states.push(computerState);
              removeSlectedCell(computerState);
              break;
         }
     }
   
    game.nextTurn='player'; 
    if(game.computer.states.length>=3)
     {
       console.log("check if computer winning states");
       checkGameWinner(game.computer);
     }

    
    
  }
}



// remove cell number from game available cells
function removeSlectedCell(cellId){
  let index=game.availableCells.indexOf(cellId);
  if(index!=-1)
    game.availableCells.splice(index,1);
}  

function getComputerState(){
  let match=null;
  if(game.computer.states.length>=2)
    {
      match=checkMatchedState(game.computer.states);
      if (match != null) return match;
    }
  if(game.player.states.length>=2)
    {
      match=checkMatchedState(game.player.states);
      if (match != null) return match; 
    }
  return game.availableCells[Math.floor(Math.random()*game.availableCells.length)];
  
}     
 
function checkMatchedState(playerStates){
  if(playerStates != null)
   { 
    let i=0;
    let state;
    do{ 
       state=winningStates[i++];
       console.log("winning state"+ i-1 + ": "+ state);
       console.log("playerStates: "+ playerStates);
       let matchedStates=0;
       playerStates.forEach( s=> {
         if (state.includes(s))
            ++matchedStates;
       });
       if((playerStates.length>=2 && matchedStates==2) || (playerStates.length==1 && matchedStates!=0))
          for(let j=0;j<3;j++)
          {
            console.log("include States: "+ state[j]);
            if(game.availableCells.includes(state[j]))
              {
                console.log("game.availableCells: "+ game.availableCells);
                return state[j];
                
              }
          }

      } while(i<winningStates.length);
    return null;
  }
}
 


// check the winner player 
function checkGameWinner(player){
  console.log("player states : "+ player.states);
  for(let state of winningStates)
    if(state.every(s=> player.states.includes(s)) )
    {
      console.log("check : "+ state);
      
       window.alert(player.playerIcon + " Win !");
       break;
      //gameOver();
    }
  
}

// end the game
function gameOver()
{
  console.log("game over");

}

});
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
