---
title : Interview Questions
description : Tech interview questions
tags : []
---

# Interview Questions

[[toc]]

### Tech-Question-1
Write a function to recursively read a directory and print the list of all the files as an array.
e.g.
```
.
├─ folder-1
|    ├─ file-1
|    └─ folder-1.1
|        └─ file-2
├─ folder-2
|    ├─ file-3
|    └─ file-4
└─ file-5

result : ['file-1', 'file-2', 'file-3', 'file-4', 'file-5']
```


Function signature:
```js
import * as fs from 'fs';
import * as path from 'path';
function recursiveReadDir(dirPath : string) : string[] {
    //...your code goes here
}
```

### Tech-Question-2
How to create a simple server in Node js that returns Hello World ?

### Tech-Question-3
```js
const arr = [10, 12, 15, 21]
for (var i = 0;i < arr.length;i++) {
    setTimeout(function(){
        console.log(`Index: ${i}, element: ${arr[i]}`);
    }, 3000);
}
```

### Tech-Question-4
Write a function to reverse a String without using any pre-defined functions.
```js
function reverseString(text : string) : string {
    //...your code goes here
}
```

### Tech-Question-5
Count the number of appearances of letters in a string, and print the result as explained in the examples below.
```js
/** Example 1:
* AABBCCDD
* A2B2C2D2
*/

/** Example 2:
* AEDCCC
* A1E1D1C3
*/

function countLetters(text : string) : string {
    //...your code goes here
}
```

### Tech 4
You are given a string containing characters  and  only. Your task is to change it into a string such that there are no matching adjacent characters. To do this, you are allowed to delete zero or more characters in the string.

Your task is to find the minimum number of required deletions.

For example, given the string s = "AABAAB" , remove an  at positions  and  to make  in  deletions.

### Concept Questions
1. What are modules in JavaScript?
2. What is lazy loading, in general?
3. How do you implement LAZY loading in angular/React
4. code splitting/chunk splitting
5. What are commonjs modules?
6. Can we `require` json files
7. Difference between `require` and `import`
8. Can we use `import` statement natively in node.js?
9. What is the difference between various module definitions e.g AMD/ requirejs/ UMD modules e.t.c
10. How Node.js resolves modules
11. Explain the difference between readFile and createReadStream in Node js ?
12. List types of Http requests?
13. What is hoisting in JavaScript?
14. Build systems/ webpack e.t.c
15. What are micro-services?
16. Prototypal inheritance
17. React hooks
18. React lifecycle methods
19. React virtual DOM
20. Purpose of package-lock.json
21. Difference between ES6, ES7 Syntax
22. What are Polyfills?
23. Server side rendering
24. Semantic versioning
25. Middlewares in express

add firebase qquestions
aws lambda
serverless
