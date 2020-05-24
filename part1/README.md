# Part 1
It seems this part requires a small application, so, ultimately the completed application will be present here, which, according to the general information of the course, is considered okay.

I will be trying to make a commit for each exercie in this part. The commit message should be of the following format: 

> feat: SUBMISSION \- <exercise number\> \- <some accompanying message\>

I will add some exercise some exercise-specific notes below:

## Exercise 1.1
I have refactored the code and made 4 components, App, Courses, Header and Total. I initially thought it would be a good idea to place all these in a components directory and export all these components via an index.js file, so any number of components could be imported via destructuring that one index file, but I realized that when one component needs another, this would lead to circular dependencies. Also, I think the root component (App) would be better placed in the root directory, because it can just take all the components it needs from the index file in the components directory (which is what I have done in the submission for this exercise), and the index.js file in the root directory which actually seems like the entry file of the project can just import the root component. Need to think of a better way to organize components.

**NOTE:** The course said that we have to make a component "**Content**" but, in my haste, and perhaps, nervousness, I named it "**Courses**" in the submission commit of 1.1, but it functions exactly in the way that is asked in the course. I have corrected this and hope it won't be an issue.


## Exercise 1.2
Introduced the Part.js component, imported and used by the Content component, as asked in the exercise. Also, I have refactored a little to put the App.js component in the root dir.

**NOTE:** There was a typo in the code due to which the output was incorrect, which was corrected after the submission commit. I have created another submission commit for this correction, Please take that as the submission for this exercise.

## Exercise 1.3
If I may say this, the way that I built the application in the first place was perhaps more preferable than what is being asked here, as I have a bit of experience working with Javascript in Node.js. Nonetheless, I made the changes in the App component. Also, if I may say so, "exercises" is not as descript a variable name as "exerciseCount", as it may well be referring to an array of objects, each of which may represent an exercise, whereas "exerciseCount" clearly implies a number.

## Exercise 1.4
Now I am asked to make an array similar to what I made earlier, because I knew that when you have a number of homogeneous objects and you have to do the same operations on each of them, the best way to deal with them is to use a list/array. So, I copied the given parts array and refactored to make it work. Notice that I only changed the App component and then replaced the "exercises" property of each object with "exerciseCount", because if I kept the original property in the objects, I would have to make the corresponding changes in the other components, but this way, I only have to change the App component. In a prod scenario, this may be seen as tech debt but I guess for the purpose of the exercise, it is fine.


---