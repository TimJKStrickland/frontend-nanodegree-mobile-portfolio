## Website Performance Optimization project

This project's goal is to optimize the online portfolio for speed! The critical rendering path has been optimized for index.html, and in the view folder, I made this page render more quickly by eliminating jank that occurs in main.js. I applied the techniques from [Critical Rendering Path course](https://www.udacity.com/course/ud884) and [Browser Rendering Optimization course](https://www.udacity.com/course/browser-rendering-optimization--ud860).

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Using the following code in the terminal:
  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
2. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok http 8080
  ```
3. Copy the public URL ngrok gives you and try running it through PageSpeed Insights. 

#####Outcome:
I found that the CSS could be minified and put inline (which, I don't think is the best idea for legibility, but for performance, it put it over 90 on PageSpeed), as well as minify the HTML to the same conclusion.


####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, I modified views/js/main.js until your frames per second rate is 60 fps or higher.

I did a couple things to make this work:
1. I replaced all references for querySelector and querySelectorAll and replaced them with either getElementbyId and getElementsbyClass. This was found in the forum to be a more efficient method of selecting the needed ID or class.
2. I made variables outside the for loops in the function updatePositions because it slows down the CPU to constantly have to refer to the delineations of document.body.[necessaryobject], and it's much faster to refer to variables that have cached that info already. These changes were made in the functions updatePositions and changePizzaSizes as seen below:
```
//calling this outside the switch method gives the variable definitive position
var newWidth;
  // Iterates through pizza elements on the page and changes their widths
  function changePizzaSizes(size) {
      switch(size) {
        case "1":
          newWidth = 25;
          break;
        case "2":
          newWidth = 33.3;
          break;
        case "3":
          newWidth = 50;
          break;
        default:
          console.log("bug in sizeSwitcher");
      }
      // create var outside for loop to de-jank and changed querySelectorAll to
      // the faster getElementsbyClassName
    var randomPizzas = document.getElementsByClassName("randomPizzaContainer");
    // following the advice from the reviewer, it's more efficient to save a local 
    // var for randomPizzas.length and access that in the loop (ig. a is faster than a.b)
    for (var i = 0, len=randomPizzas.length; i < len; i++) {
      randomPizzas[i].style.width = newWidth + "px";
    }
  }

  changePizzaSizes(size);
```

```
// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  ...
  // keep longer calls (a.b.c) outside loops to optimize perf
  // by calling var top and var items outside the loop. 
  // That way they're calling a versus a.b.c.
  // Plus they're easier for the browser to update
  var top = document.body.scrollTop;
  var items = document.getElementsByClassName('mover');
  // EDIT: this frees up the 5 unique values from the for loop below
  var phases = [];
  for(var i = 0; i < 5; i++){
    phases[i] = Math.sin((top / 1250)+ i);
  }
  // using transform: translateX makes the animation independent of paint by
  // making the pizzas a render layer. so less browser heavy lifting to make
 // the pizzas move. Also moved numPixels outside the loop for more efficient looping.
  var numPixels;
  for (var i = 0; i < items.length; i++) {
    // got rid of separate local var for phases
    numPixels = 100 * phases[i % 5] + 'px';
    items[i].style.transform = "translateX(" + numPixels + ")";
  }

```
4. I optimized the images and minimized both the HTML and CSS.

##Next steps

With more time, I'd refactor the code as necessary for main.js and switch out all of the colors because my eyes are still sore from that much red.
