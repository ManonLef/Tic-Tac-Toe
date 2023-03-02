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