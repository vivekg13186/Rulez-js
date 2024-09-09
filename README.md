# Rulez js

A simple decision table library


Takes rule input as CSV table string and eval the inputs
Example 
 

```js
var res = parseRule(`
eq(married),eq(sex),lt(age),action(title)
true,female,12,Jr
true,female,32,Mrs
false,female,100,Mr.Dead
true,male,12,Jr
true,male,32,Mr
true,male,100,Mr.Dead
`);

var input = { married:true ,sex:"female",age  :10 ,title :""}
evalRule(res, input);
console.log(input);

```

First row take rules and actions

Rule defined as - operation(name_of_input) 
e.g eq(name)  - name equal to the values in each row

Action is simple assigment 
action(name) - assign value from the column to the name field

Rest of the rows will have the contional value and assignment values

in the above example the input['title'] is set to 'Jr' after execution


