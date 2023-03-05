# Notes on the TTT project

## 20230302
I started the project today with setting up the repo. The previous lessons were filled with a lot of new things surrounding design patterns and modular programming. If I find myself struggling with some of these concepts during this project I may first enhance my knowledge on these concepts before moving on with this project.

### Assignment point 1: Set up your project with HTML, CSS and Javascript files and get the Git repo all set up.
- [x] step 1 complete
- I used my template repo so ESLint and Prettier are configured.

### Assignment Point 2
- You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.
  - Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

### progress on point 2
- I kind of went a bit fast here inside my module.
- Added some rendering functions to append divs with data-values. 

## 202303031

### Progress
- I went for 3 separate modules; gameBoard, players, game
- I got most of the functionality regarding placement working for player one and player two and after placing a symbol they switch turns.
- Now I have to start implementing checks against win conditions
- [x] check for the 8 possible win conditions
- [x] check for tie

### Pseudocode win condition check
There are 8 possible win conditions indices:
  - 0, 1, 2
  - 3, 4, 5
  - 6, 7, 8

  - 0, 3, 6
  - 1, 4, 7
  - 2, 5, 8

  - 0, 4, 8
  - 2, 4, 6

I want to write a check if any of the above 8 array index combinations match each other.
If it does, console log "we have a winner" for now

## 202303031
The above went fairly smooth.
Now I want to end the game so I'll write a function for it that triggers at either TIE or WIN

## 202303032
I want to change the UI now:

### PseudoCode UI overhaul
- First pick against player or computer.
  - computer > not functional for now
  - player > 
    - show playerOne and playerTwo input field with predetermined X and O for simplicity's sake
    - when hitting start, submit names
    - create new player objects upon submit with name
  - start game

## 20230304
I have implemented the above. I just didn't start the game yet. Some notes:
- I do sometimes run into issues with the order of the code. Some objects aren't accessible yet because of the IIFE's so I have to ake sure the objects are created before another module accesses them. 
I feel like my code still needs some better structuring. Some things I'm currently doubting or thinking about:
- are my modules clear enough?
- are all methods in the right module?
- should my factory function for creating the players be in a module?
- should I keep my players private and only make their properties available that I need in other modules?

## 202303041 
- [x] add a function to reset or stop the game (not being able to click anymore)
- [x] confine the player objects to the module and export only the needed properties

So I made the Player Object properties private and exported them with functions instead. I also managed to get some basic styling done
Some things left to do:
- [x] Remove Game selection for now since we don't have PVC yet
- [x] Sketch out view/UI steps from name input > game > endgame

## 20230305
- Some things to do today:
  - [x] remove gamemode selection and just start game with playerform for now
  - [x] add an overlay if there's a winner to ask for a new game
- [x] add overlay message when there's a tie
- [x] clear form after modal for new game
- [x] refactor
- NOTE: I could probably move everything from the game module to the gameBoard seeing as there are merely two items left... Another option would be to export the gameArray through a function and put some gameBoard functions back in the game module