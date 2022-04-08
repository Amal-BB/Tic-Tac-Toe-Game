
# Tic-Tac-Toe Game

## 1. Project Overview
A traditional **Tic Tac Toe** game has been developed in modern design for people who like to get in challenge to play against a computer and have fun.

![Project layout](media/gameLayout.PNG)
#### [Try it here..](https://amal-bb.github.io/Tic-Tac-Toe-Game/)

+ ### **User Stories**

   As a *visiting user*, I would like to:

  * Easly understand how to play the game.
  * Know if I've won, lost, or tied.
  * Be able to track my score from one game to another.
  * Be able to change my symbol (X or O) at any stage of playing the game.
  * Realize which player has the current turn.
  * Be able to reset my score to start new game.
  * Be able to play it on my mobile, tablet, or pc.
  * Feel I'm in the real challenge while playing against a computer.

----
## 2. Design

+ ### **Colours**

    ![colours schema](media/colorsPalette.PNG)

    * Colours schema of purple and red have been used and [color contrast](media/colorsContrast.PNG) has been tested .

+ ### **Typography**

   * [**Satisfy**](https://fonts.google.com/specimen/Satisfy?preview.text=Tic%20Tac%20Toe&preview.text_type=custom#about) font is used throughout the whole project. It gives a look of a timeless classic with a unique modern flair.

   * Serif has been used for player symbol's hover description. 

+ ### **Imagery**

   * The selected color pattern including font and colored symbols are used to give the game a modern and attractive look.

## 3. Features
  
The project has been designed to be responsive on all device sizes.

### **Existing Features**

+ ### **Game Logo and Heading** 
 
  * Featured at the top of the page, the Tic Tac Toe logo and heading is easy to see for the user. Upon viewing the page, the user will be able to see the name of the game.

    ![Game logo](media/logo.PNG)

+ ### **Game Menu**
   
   *  The menu is clear and easy to use. It allowed the user to navigate between play area and game instruction.

      ![Game Menu](media/gameMenu.PNG)


+ ### **Play Area**

   * Game Area: In this section, the user will be able to play the game. It allowed the user to put his symbol by clicking on an empty cell in the game grid. 

      ![Game Area](media/play-Area.PNG)

   * Score and Symbol Area: 
      - This section will display players' names, symbols and scores.
      - It allows the user to track his score and knows whose turn, which will be highlighted by a red border.

         ![Score Area](media/scoreArea.PNG)

      - The user will be able to change his symbol by clicking on it, the message of (click to change symbol) will appears when the player symbol is hovered.

         ![Symbol Change Msg](media/symbolMsg.png)

+ ### **Dialog Box**
    
    * This dialog box appears each time the game end. It allows the user to know who wins the game or if it ended with a tie. The user will be able to choose to continue playing or start a new game. 
      
       ![Dialog Box](media/DialogBox.PNG)

+ ### **Instruction Area**
    
    * This section will have the playing instruction, it will allow the user to know how to play the game.

        ![Instruction Area](media/gameInstruction.PNG)

### **Features Left to Implement**

   * Add option of playing level. This will allow the user to choose the level of playing easy or hard.

   * Add another option of playing against another player. This will allow the user to have more fun playing the game with his friends. 

## 5. Used Technologies

+ ### **languages**    
   * [Html5](https://en.wikipedia.org/wiki/HTML5), [CSS3](https://en.wikipedia.org/wiki/CSS), and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) languages are used in this project.

+ ### **Other Technologies**

  * [GitHub](https://github.com/) is used to store the project code and host it. 

  * [Techsini](http://techsini.com/multi-mockup/index.php) was used to generate The multi device mockup (_The image attatched here in readme_). 

  * [Coolors](https://coolors.co/) was used to genetate colours palette , and [Contrast Grid](https://contrast-grid.eightshapes.com) was used to check the colours contrast.
 
  * [Google Font](https://developers.google.com/fonts) were used to import the used font into the style.css file.

  * [Flat Icon](https://www.flaticon.com/) was used for project icons.

 ## 6. Testing and Validtor

 * The responsive view for the project has been tested in a range of screen sizes via [Chrome DevTools](https://developer.chrome.com/docs/devtools/).

 * The project was tested on **Chrome**, **IE**, and **Firefox** browsers, also has tested on a variety of devices such as: _Desktop, iPhon8, iPhone, iPhon12, Galaxy A12 and Tablet_.

+ ### **Code Validation**

   * [HTML validation](media/htmlValidator.PNG): No errors were returned for `Html Code` when passing through the offical [W3C Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Famal-bb.github.io%2FTic-Tac-Toe-Game%2F).

   * [CSS Validation](media/cssValidation.PNG): No errors were returned for `CSS Code` when passing through the offical [Jigsaw Validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Famal-bb.github.io%2FTic-Tac-Toe-Game%2F). 

   * [JS Validation](media/jsHint.PNG): No errors were returned for `Java Script Code` when passing through the offical [JSHint Validator](https://jshint.com/)

   * Project **Accessibility** has been checked through [Lighthouse](https://developers.google.com/web/tools/lighthouse) in Chrome DevTools, the result is shown below for both mobile and desktop.

     ![Accessibility](media/accessibility.PNG)

+ ### **Testing User Stories Cases**

   * Easly understand how to play the game.
     
      + Upon entering the game page, the user is greeted with a clear menu has two sections (play and instruction), the user can navigate to instruction where he will find how to play the game.
      + The menu is located in an easily identifiable location and the active page will be highlighted by red color in the menu.
      + The instruction on how to play the game is ordered in points which is easy to follow and understand.

   * Know if I've won, lost, or tied.
     
      + In case the user or computer has 3 selected cells matching one of the winning states, then just these cells will stay highlighted.
      + The dialog box will appear with a message that shows the winner's name with his symbol. 
      + In case the game ends with a tie, the dialog box will show the message "Game Over".  

   * Be able to track my score from one game to another.

     + The score area is located under the game grid, It has three boxes one for the player score, one for the tie, and one for the computer. 
     + Each time the game end by winning state or tie state the score box is automatically updated.
      
   * Be able to change my symbol (X or O) at any stage of playing the game.

     + The player symbol is shown over the player score box, by clicking on it the symbol will be changed from ( X to O ) or vice versa

   * Realize which player has the current turn.
     
     + The box under the player's name (player or computer) which contains his symbol and score will be highlighted by a red border in case of his turn.

   * Be able to reset my score to start new game.
   * Be able to play it on my mobile, tablet, or pc.
   * Feel I'm in the real challenge while playing against a computer.
    
   

