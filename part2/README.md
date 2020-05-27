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

---