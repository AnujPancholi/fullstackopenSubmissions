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


## Exercise 2.10
Well, the app was already split into several components, so I didn't think I could do much more than this in terms of modularization, so I just added a comment to make a new commit for this exercise, and that can be considered done.

## Exercise 2.11
As the exercise asked, first I added the `db.json` file in the root directory of the phonebook app, added the `server` script in `package.json`, and used axios to fetch the data from the API (Axios is my favorite package on npm and I have some experience with it). I put this API call in a function, which I can call whenever I want to repopulate the `PhonebookListingView` with new data from the server, so I could simply call this function inside the `useEffect` callback.

Note that I did not use `.then()` but decided to go with `async-await`, which is the newest way to do promises, and a lot of devs agree that it's perhaps better than using a chain of `.then()` calls.

I wasn't quite content here - I thought that I would have to implement a "loading" feature for `PhonebookListingView` because whatever "server" we may use might take long to respond. After some deliberation, I thought that whether or not the listings are being loaded or not will be determined in the `state` of the `PhonebookListingView` component, NOT the root `App` component, because there might be a scenario where we may have to re-render only the child component and not the whole parent (for example, if we wish to provide a button to reload the data from the server because the user is expecting changes, we don't have to re-render the root component). 

With this came the challenge of changing the state of a *child* component from the *parent* component. From what I had learnt from this course so far, an action in the child component (for example, the form) could affect the state (`persons`) of the parent component, because the event handler used by the child component is defined in the parent itself, but the state of the child component would be out of the parent component's scope.

I did some research, and found [this](https://itnext.io/changing-children-state-from-another-component-with-react-hooks-5c982c042e8) article form where I learnt about another React hook - the [useRef](https://reactjs.org/docs/hooks-reference.html#useref) hook, hand how they can be used in functional components with [ref forwarding](https://reactjs.org/docs/forwarding-refs.html) to expose a few functions that are in the closure of the child component with `useImperativeHandle`. To be honest, I'm still not 100% sure how it works, so my description may not be perfect here.

When the function that populates the `persons` data from the server is called (defined in the `App` component), a function exposed in `App` via a `ref` is called, which *can* change the state of the `PhonebookListingView` component. So, at the start of the request, the `isLoading` state is set to `true` and with conditional rendering, I can render a "Loading" text. Once the request is finished, the `isLoading` state is set to false again, causing *only* the `PhonebookListingView` component to re-render, and display the fetched data.

This is how I acheived a "Loading" text to appear, which can be seen if the `setTimeout` that I wrapped the `axios` request in is uncommented (it simulates time taken by an actual server to respond).

I also had to face some edge cases, such as, if there is a search text due to which the phonebook results are getting filtered, and a new entry is added, the `persons` state would get updated, but it wouldn't be displayed, as the result was still filtered. I worked around as many such edge cases I could find.

## Exercise 2.12
I've used what I learnt in the previous exercises to make this app.

Most of the concepts that I've used are the same ones that I've used in the previous exercise, so I'm not going to dive deep into what I did and why I did it, however, there are a few key differences to note:

 - **Wrapper for the countries API**
 	Instead of hardcoding the URL and preparing the axios request in the root component itself, I built a wrapper over the API, which the root component imports for use. If the API ever changes, I can just change the wrapper, and no changes in the root component would be required, provided that the behavior of the wrapper is the same. 
 - **Timeout in the onChange handler for search input**:
 	Using the "all" endpoint as suggested in the course would, according to me, be an abhorrant practice, since no real app fetches all the available data on loading and then plays with that data on memory. For this reason, I decided to use the endpoint that accepts a "name" as a URL param, and returns all results that match the string partially. Since the `userEffect` hook that makes the API call is given the `searchString` in the second parameter (so that the callback is triggered whenever `searchString` state changes), making a handler that updates the value of the `searchString` state property with the value of the `input` in the controlled component `TextSearch` will cause too many API calls which won't even be necessary. 

 	So, instead of directly updating the state, I used `setTimeout` and `clearInterval` to only update `searchString` after some threshold time (set to 1 second) of inactivity. For instance, to search for Finland, the user would need to type "Finland" in the search box and simply wait for 1 second for the API call to be made.

I'm still not good with styling so although the results may not look too aesthetically pleasing, it has the functionality that the exercise is looking for.


## Exercise 2.13
Implementing the buttons against each country in the `CountryList` component was fairly easy, but not pretty.

I've made a `SearchResults` component that is a direct child of the root component, which handles whether to show a single country view (via the `CountryView` component), or a list of countries, or a message to ask the user for a different search input in case of 10+ results. To render a single country view, the `countries` array passed to this component must be a singleton array, and this array happens to be part of the root component's state. So, all I needed to do was to change the `countries` array in the state of the root component from whichever country's button is clicked, and make it a singleton array containing the object of that particular country.

However, the hierarchy of components is this: the `App` component has a child component `SearchResults` which in turn, depending on the passed-down `countries` state, will render a `CountryList` component, which will render a list of `CountryListItem` components, each of which will contain a new `Button` component. A function to change set the state of the root component will need to be passed down to these children.

And so it was - I made a function `setCustomCountries` in the `App` component and passed it down the App->SearchResults->CountryList->CountryListItem hierarchy via props. Yes. And I made a function inside of the `CountryListItem` component that calls this function to set the `countries` state property as a singleton array with the object of that particular country.

If it works, it works.

## Exercise 2.14
For this exercise, one thing was clear to me from the get-go: the API call for fetching the weather info would be made via a `useEffect` hook in the `CountryView` component. The question was -  where to store the result of the API call, so that any requisite information would be available? I decided to store that in the state of the `CountryView` component.

Then I made a component `CountryCapitalWeather` which would be a child component of the `CountryView` component, and the state of the `CountryView` component will be passed down to this component via props, just like the country info is being passed from the state of the root `App` component to the `CountryView` component. At any given time, we could have 3 things that we want to render in this component: "Loading", the actual data, or an error message in case the API call fails. So the state object is going to have 3 properties: `isWeatherLoaded`, a boolean to signify whether the API call is done or not, `success`, a boolean to signify whether the API call was successful or not, and `data` to actually store the response.

I initially check `isWeatherLoaded`, which, if false, will render the "Loading..." text. If it's true, then the `success` boolean is checked to determine if the fetching was successful. If true, the `data` object will contain the required data, which is used to render the weather information, else, a short error message is displayed.

**NOTE:** The WeatherStack API suggested by the course needed an API key, which I stored as an env variable via a `.env` file, and it says [this section of the create-react-app docs](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env) that I *should* include the env file in source control, however, I'm not going to do that, and have put the `.env` file in `.gitignore`. **If you wish to build and run this practice app, please use your own API key in a .env file**.

## Exercise 2.15
The statement for this exercise was short and a bit vague - by asking to push the data to a backend server, I first assumed that I would need to make a new backend server which reads from/writes to a json file or a database, but since the course has not gone that far yet, that was (thankfully) not the case. It appears that the `json-server` package sets up a default POST endpont as well, and when a json payload is supplied to this endpoint, it adds an `id` field itself (as should be the case - uuid generation should be left to either the database or some backend service) and stores the new object in the array specified in the json file.

So, all I had to do was, instead of just appending the new object to the state of the root component, I had to supply this object as a payload to the POST request (minus the `id` I was generating with a small counter I implemented, since that will now be generated by the server - a small load taken off the shoulders of the front-end developer), following which I could simply re-populate the `persons` state of the root component from a GET request to the server.

Why re-populate from the server? Because there might be other users who have opened up the application in their browsers who may have added more phonebook entries in the time that the current user makes their entry - so, when they finish making the entry, their entry - along with all other entries made in this duration - will reflect, and the data rendered in the browser will closely reflect the updated data on the server.

I was able to make this change quite quickly, because earlier, I had put the entire process of calling the GET API to populate the state of the root component in a function called `populatePersonsData`, which the callback of the `useEffect` hook calls. The reason I did this in the earlier exercises is because I anticipated this exact scenario, and so I only had to call the `populatePersonsData` function after the POST API call to update the data on the server was complete. Time to give myself a pat on the back!

## Exercise 2.16
Extracting the code that interacts with the backend API into a separate module was reasonably easy. Since all these API calls are going to be non-blocking (async) operations, all the functions that this module (`src/wrappers/backendWrapper.js`) would export would have to return promises. I made this much in the same way I had accomplished the same thing in the "countries" app - an object would be resolved with a `success` boolean, a `result` object/array in case the server returns a useful result and an `error` object.

I prepared this module and imported it in the root component as simply `backend`, so any request being made to the backend would appear in the code as `backend.functionName()`, which makes more for readable code, in that the maintainer would know whenever some interaction with the backend is happening.

## Exercise 2.17
Again, I needed to perform something from a button in the child component that would eventually cause a change of state in the root component, which I've learned to accomplish via the pass-a-function-down-the-hierarchy-of-components technique (I'm not sure if this is a bad practice; will have to do a lot more reading and research to comfirm that). However, since components only accept a function reference in props, in which I cannot pass a param (I would need to pass the `id` of the entry that I want to delete), I would have to make a function that *returns* a function that specifically deletes the entry of that id, which I made and named `getDeleteFunctionForId` in the root component, where I would have access to the `populatePersonsData` function, which I can call immediately after the delete is performed. I passed this down all the way to the `Listing` component, made a simple `Button` component and then called this function with the `id` to get the function I would need to pass to this button as an event listener.

Then I came back to the exercise statement and discovered that I had missed a detail - the exercise says that I may use the `window.confirm` function to confirm the delete. Although the exercise said "may", I decided to do it anyway, so, I cooked up a function that confirms the delete first, and then calls the passed-down `getDeleteFunctionForId` function to get the id-specific delete function, which I call immediately (`getDeleteFunctionForId(id)()`). It worked just fine and the desired functionality was obtained.

## Exercise 2.18
The first step was to add a function to make the PUT request, which accepts the `id` of the entry which is to be changed and the object containing the changes. I first tried the request in postman, and it seems that I would have to supply the entire object to update, *not just* the property that is to be updated (which I'm not a fan of - what if we had a large object with 40-50 properties?).

Once that function was ready in the `backendWrapper`, all I had to do was to call that function when a duplicate name was detected. Rest of it was pretty similar to a few of the previous exercises, so I'm not going to go into details.

## Exercise 2.19
This part is what I did not look forward to, given my hatred for css. Nonetheless, I made a `Notification` component and a css file for it, containing the css copied form the course, under a css class `notif-error`. I changed the color to make another class `notif-success` and a class that will be the default css class for the component `notif-inactive`, which will hide the notification component when it is not needed.

Instead of having a simple message string as the state passed down to the `Notification` component (as shown in the course), I thought that any notification should have two properties - a `type` (error, success, alert etc.) and a `message` string to display.

Since these two properties would change together, I decided to make the state for this notification an object with these two properties. There are three accepted types - "inactive" (default) "success" and "error", and on the basis of the type, the notification will be rendered. The "message" string will be rendered inside of the notification div regardless of the type.

I have put "success" notifications for successful new entry, successful phone number change and successful delete of an exiting entry, but if, for any reason, we want to display the notification for delete operation in red color (as an error), all we would have to do is change the "type" of that notification, not the notification itself, which I think is an advantage that this approach of mine offers.


---