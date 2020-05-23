# Part 1
It seems this part requires a small application, so, ultimately the completed application will be present here, which, according to the general information of the course, is considered okay.

I will be trying to make a commit for each exercie in this part. The commit message should be of the following format: 

> feat: SUBMISSION \- <exercise number\> \- <some accompanying message\>

I will add some exercise some exercise-specific notes below:

## Exercise 1.1
I have refactored the code and made 4 components, App, Courses, Header and Total. I initially thought it would be a good idea to place all these in a components directory and export all these components via an index.js file, so any number of components could be imported via destructuring that one index file, but I realized that when one component needs another, this would lead to circular dependencies. Also, I think the root component (App) would be better placed in the root directory, because it can just take all the components it needs from the index file in the components directory (which is what I have done in the submission for this exercise), and the index.js file in the root directory which actually seems like the entry file of the project can just import the root component. Need to think of a better way to organize components.  


---