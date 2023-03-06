# TIC TAC TOE

## Result
[See it live and play a game here](https://manonlef.github.io/Tic-Tac-Toe/)
![Preview of my Tic Tac Toe](./notes%20and%20resources/Tic-Tac-Show.png)

## About this project
Before starting this project there was a lengthy lesson on the modular design pattern, IIFE's and Factory Functions. I learned a lot about private properties. I noticed we're getting more into organized code and I love that. 

## Objectives
- [x] create a working Tic Tac Toe game
- [x] use a Factory Function for creating your Players
- [x] make use of the modular design pattern by implementing 
- [x] the game should work in the browser (responsiveness not required)
- [x] have as little global code as possible

## Notes and lessons learned
- Once I got started I had a hard time slowing down. The modular approach really helped with that and within no time I had a working game that looked like it came straight out of the early nineties.
- Due to the above I had a lot of my objects globally editable. It took a bit of refactoring and adding functions to only export values.
- I doubted my skills after the preceding lesson. Mainly because the syntax seemed to have surprises every time I went back through the lesson. Eventually this was not something to have worried about at all. Just having the docs there was help enough to get the modules and factory functions in. 
- The code got quite messy quickly with all the functions. More planning *before* instead of *during* the process would have helped saving some time on refactoring.
- After adding my "winner/tie new game" message box, suddenly some squares on my board got unresponsive. I found out it was because of the overlaying div blocking the game board. I learned about the `pointer-events: none;` css property here. Then my buttons became irresponsive as well but I could luckily also add `pointer-events: all;` to those.
- I really had to think about how the view/UI would change. What would be the first thing you see when opening the website? What happens if you enter the names, where will we display what etc. etc.. Also one of those things I found I needed to plan out and gather inspiration for.
- Working with function return values was a lot more common in this project. I had to get used to that a bit and many parentheses have been temporarily missing and throwing errors my way.
- My squares remained clickable when showing the winner/tie alert. The fact I rendered the full board including listeners on every move made me research how to remove event listeners. I made a for..in loop that ESLint didn't like (based on airbnb guide), but it seems it also doesn't like ++ to iterate in a for loop. Some new things to research or find alternatives for eventually. 
- All in all a very nice project to do. It wasn't as difficult as I thought it would be, but that surely didn't make it easy either. I felt like I had to keep track of a lot more things than in the previous projects.

## Things to do or features to add someday/maybe
- [ ] return even less functions from their modules or merge some modules
- [ ] add a PvC mode with an unbeatable Ai
- [ ] add easy and medium Ai's
- [ ] make it more semantic and accessible  
- [ ] add a score keeper that keeps track of multiple games in a row
