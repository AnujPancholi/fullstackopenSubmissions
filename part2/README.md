# Part 2
For this part, I have chosen to revise the naming convention of the directories containing the various practice app. To avoid having to look ahead to how many exercises are encompassed in one practice app, and to account for the possibility of having to come back to the same app after several exercises, the naming convention of the directories will be:

> app<number\>-<underscore separated name of the app in the exercise name\>

For instance, the first exercise is titled "2.1: course contents step6", so the directory containing this app will be named *app1-course_contents*.

Like in part 1, the convention for any commit meant as a submission for a particular exercise will be the same:

> feat: SUBMISSION - <exercise number\> - <description of exercise solution\>

In the last part, a few commits were made for an exercise mistakenly, so submission commits for the same exercise were made again as corrections. So, if any commits are observed with the same exercise number, please consider the lastest one as the answer. I am aware that the course does not require separate commits for each exercise and only needs the final app, but still it was necessary to clarify this.

## Exercise 2.1
Since this was the continuation of the course contents app in part 1, I decided to modify my own code, so I copied everything (minus node_modules) to the new directory for this app, and edited from there. The `Course` component is made separately, and imports some supporting components as well.

All was well in this exercise, until I noticed an issue - the `Courses` component is composed of a `TitleContainer` component along with the Parts which are reduced from the `course.parts` array supplied in the props. Each part had an id which I could set as the "key" prop, however, something was still causing that nasty warning in the console (which the exercise explicitly specifies is unacceptable), and I rekoned it was because no "key" prop was being supplied to the one `TitleContainer` component on top of the `Part` components. Since there was nothing I could use as a "key", I decided to give it a default value of -1 which none of the parts would have since their ids are starting from 1, and the warning disappeared. 

**NOTE:** It has been ensured that the child components have a requisite "key" prop, and no warnings/errors are observed in the console.

## Exercise 2.2
Added up the exercises into a single variable `totalExerciseCount` and used the existing Part component to render it after the given parts. Made it bold by including a new file "Part.css" in the `Part` component and supplying the css class in the `Part` as a prop. Also learned via Google that in jsx, the "class" attribute is written as "className", I'm guessing this is done to avoid the clash with the `class` keyword.

## Exercise 2.3
I was already using reduce (sort of) in the `Course` component but that was to reduce the array of JS objects into the jsx that I needed to form the component, and in the callback funtion that is supplied in `reduce` I was simply adding the value of each of the `exercises` variables in a variable called `totalExerciseCount`, so, both the jsx and the total count were caculated with just one `reduce`.

Since this exercise explicitly requires calculation of the total using `reduce`, I havd added another `reduce` to calculate that total, but I have not removed my first approach, I've just commented it so this approach could be emphasised.

I'll add that snippet of code here so it can be contrasted:

```
const Course = ({course}) => {
	// let totalExerciseCount=0;
	let totalExerciseCount = course.parts.reduce((total,part) => total+part.exercises,0);
  const courseJsx = course.parts.reduce((jsx,part) => {
  	// totalExerciseCount+=part.exercises;
    jsx.push(<Part key={part.id} name={part.name} exercises={part.exercises} />);
    return jsx;
  },[<TitleContainer key={-1} text={course.name} />]);
  courseJsx.push(<Part key={0} name="Total" exercises={totalExerciseCount} className="part-bold"/>);
  return courseJsx;
}
```

In the above code, if you comment the first `reduce` and uncomment the two commented lines, it will still work. This component that uses `reduce` twice is not very efficient because reduce performs a pass of the whole array once, so this would involve two passes, whereas the first approach uses just one.

## Exercise 2.4
Modified the `App` component to render multiple `Course` components depending on the input, which is an array of courses. Used reduce again, which is a very powerful higher-order function in the `Array` prototype in JS.

## Exercise 2.5
Well, `Courses` was already separated as a component in a different file "Components.js" in a directory "components" in which all the components other than the root component (`App`) exist in their own files.

I still had to make a separate commit for this, so I just added a comment in "Courses.js" and made the commit.

## Exercise 2.6
Set up the practice app to add only names to a list of entries in a phonebook. Took the starter code as provided in the course and split it into few components. A `Listing` component will contain the info for one listing (which, for this exercise, contains only a name) and there is a `div` in which the listings will be displayed.

Then, of course, comes the challenge of passing a unique "key" prop to each `Listing`. In the previous tasks, we were given an `id` field which we used as the key, and new elements can be given an id of the length of the array plus 1, but, this would only work because we weren't deleting anything. So I checked the React docs to see what they recommend to use as key props, and it says [here](https://reactjs.org/docs/lists-and-keys.html#keys) that you will usually find it in your data, so, they may be referring to a uuid from a database, such as your primary key or the `_id` property generated by MongoDb for each document, so that's not applicable here either.

The approach I decided to go with is to make a simple counter (of sorts) using a closure such that the count itself is not accessible outside the counter (I'm still really trying to wrap my head around how closures work in JS but this counter of mine definitely works). It takes an initial value and has only a `next()` function that returns the next count. I could then initialize the id value of each element in the initial state array with index+1 (hardcoded for this exercise), and for the newly added entries, I could use the counter to generate the new ids.

Regarding the form itself, I wanted to make the form its own component, making it as generic as possible. Each form will have a handler function for `onSubmit` which it could take as a prop - but I there was no way for me to generalize the `onChange` handlers for inputs, because the inputs could be many and of different types. So I dropped the idea of a generic form component and made a form specifically for the phonebook entry called `PhonebookEntryForm`, which would take a handler for `onSubmit` and a handler for `onChange` for the "name" field, as props. When I later have to add an input for the phone number, I could just modify it to take an extra handler for the `onChange` of the phone number.

## Exercise 2.7
To check whether a new name that the user tries to add already exists, I decided to make a hashset of all the names in objects of the `persons` state array. There are some array functions I could have used like `Array.find`, `Array.some` or `Array.indexOf` but I just wanted to use `Set` once, and the lookup complexity of a hashset is O(1).

## Exercise 2.8
A new part of state was added in the `App` component - `newPhoneNumber`, to store the new phone number, much like `newName`. The input for phone number was added in the `PhonebookEntryForm` component and the on `onChange` handler for that input was set as a new function to make the necessary change in the state with `newPhoneNumber`. 

I also added a few validations, such as checking if the name is empty, and a regex validation that the number must be a string consisting of digits with any number of hyphens in the middle.

Also, since every listinig was not standing out well, I added a border on the `Listing` container div and a line break after each listing (still not good with CSS but this would still be OK for the exercise).

## Exercise 2.9
My first thought was that I should separate the listings as a separate component which displays the list of name-number pairs as a collection of the existing `Listing` components (which I called `PhonebookListingView`), so I did exactly that. Then it was clear to me that this search feature and search bar was not concerned with the form that I had previously made, but should only be concerned with the new `PhonebookListingView` component, hence, I included the `input` for the search feature in this component itself. Then, by declaring a variable in the state of `PhonebookListingView` as the search string, I made that `input` a controlled component by writing a handler for the `onChange` event of that `input`. The search itself would be a case-insensitive regex search via a RegExp object, and the results should show as the search string is typed (of course this would fail for a hundered thousand or million entries but it's good enough for this exercise).

There are also a few bells and whistles that show when a search string is typed, like:

 - Some text appears next to the search box which says that you are viewing filtered results

 - A span appears that says "Clear" which will clear the search string if clicked

    

---