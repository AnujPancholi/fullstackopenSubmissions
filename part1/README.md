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

## Exercise 1.5
Copied the courses object into my code and refactored the App component to make it work. Again, not the most efficient way to do things, but I had to make very few changes to make the whole thing work.

**NOTE:** I was under the impression that the rest of the exercises in part 1 are going to be increments and additions in the same app, so the part1 directory itself contained the project. However, it seems that the later parts would need a new app altogether so, I'm putting the first app in a separate directory within part1 and will put the other practice app in another directory.

## Exercise 1.6
Copied the App component starter file and made the app as shown in the given screenshot. Could have capitalized the titles, etc. but wanted it to resemble the screenshot as closely as it could. Working with the data in the form of an array of objects, but have kept the state in parts (just like in the starting code) and not in a single object because the count of every vote is updated independently.

There might be a few extra variables that are not being used because I looked ahead to the subsequent exercises and was playing around with approaches to solve those.

Essentially there are two compenents - FeedbackPanel and Statistics, which both take the array of objects, which contains the count and the name against which they would be displayed (good, bad etc). If, for instance, any rating between "neutral" and "bad" is to be added (say, "meh"), it would only require an extra object in the existing array of objects and no other code will need to be changed. The goal was to reduce hardcoding as much as possible.   

## Exercise 1.7
I had taken the counts from the state along with the names against which they would be displayed (good,neutral,bad) in an array, which was earlier taken by both the FeedbackPanel component and the Statistics component, but now, Statistics would require some additional properties. So, I made a different array for the Statistics component which includes the gathered values and calculated values. 

I initially though that the calculated values could be made part of the state in the App component, but that would require me to set 2 different parts of the set for every new feedback vote, which I means, to calculate the new values, I wuold need all the feedback counts, regardless of the type of feedback received. For instance, if a "good" vote is received, I would not only need the current count of good votes to increase the count in the state, but also the counts of the other votes, to update the total, average, etc. Also, I would either need to call the update function for all the parts of the state (which means needless, repeated re-rendering) or I would need to put all the part of the state in one object.

To avoid the hassles mentioned above, I decided to not make the calculated values part of the state, and made another array of objects. The main challenge was, to standardize the objects representing the calculated values in such a way that if a new calculated value was required, all I would have to do is add one more object without changing a lot of the code. Since the logic being used to calculate the values was not uniform, I decided to give each object a "getValue" function, which would contain the logic of how that value was calculated. I added this to get the total count for "all" first and tested it out. Then, all I had to do was add two more objects, one with "average" in the name property and another with "positive", each having a function which would return the required value.

I then concatenated the gathered values with the calculated ones to supply to the Statistics component, and it worked just fine.

## Exercise 1.8
Saw this coming, so had alread separated this into a new component. Was going to name it StatsPanel, but when I saw that there is an exercise which asks for such a component and has named it "Statistics", changed it.



---