## Website Performance Optimization portfolio project

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
1. I took out all references to setTimeOut and setInterval with requestAnimationFrame (rAF). The former two are an outdated version of rAF, per the instruction on [Browser Rendering Optimization](https://www.udacity.com/course/browser-rendering-optimization--ud860)
2. I made variables outside the for loops in the function updatePositions because it slows down the CPU to constantly have to refer to the delineations of document.body.etc, and it's much faster to refer to variables that have cached that info already
3. I made the pizza slider less janky by performing the same optimization method as 2.
4. I optimized the images and minimized both the HTML and CSS.

##Next steps

With more time, I'd refactor the code as necessary for main.js and switch out all of the colors because my eyes are still sore from that much red.
