---
layout: post
title:  "Asynchronous in NodeJS"
categories: dev nodejs
tags: nodejs promise async await
permalink: /articles/:title
---
This article briefly introduces the asynchronous programming model in NodeJS, the issue of callback functions (callback hell), and the solutions for that issue.

### Blocking vs. Non-blocking
Blocking and Non-blocking calls are the foundation of the event-based programming language, NodeJS. **Blocking** is that NodeJS process waits for an operation completing to continue executing the rest of a program. For example, the function call “fun2” will not be executed until the function call “fun1” completes.
```javascript
function func1() {
  console.log('func1');
}

function func2() {
  console.log('func2');
}

func1();
func2();

// console output:
// func1
// func2
```
**Non-blocking** is that NodeJS process executes the rest of a program without waiting for the completion of the previous operation. The execution of “func2” does not blocked by the completion of “func1”.
```javascript
function func1() { // async function
  setTimeout( () => {
    console.log('func1');
  }, 0);
}

function func2() {
  console.log('func2');
}

func1();
func2();

// console output:
// func2
// func1
```
The non-blocking behavior looks very similar to the multi-threading in other programming languages, e.g. Java, in which we can create threads and JVM will execute them simultaneously in the background. However, NodeJS is a single-threading implementation, which puts the execution of asynchronous operations, such as the those in “setTimeout”, in its [event loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/), and executes them in the event loop ticks.  

Taking **advantage** of the non-blocking execution, we can perform I/O operations, such as the interactions with disks and networks, simultaneously in NodeJS. A typical use case is
performing multiple API calls to the backend.
```javascript
function apiGetUserList(callback) { // async function
  // http call(getUserList) to backend, 2 seconds
  // callback(userList);
}

function apiGetProductList(callback) { // async function
  // http call(getProductList) to backend, 1 second
  // callback(productList);
}

function showResult(list) {
  console.log(list);
}

apiGetUserList(showResult);
apiGetProductList(showResult);

// console output:
// productList (at 1st second)
// userList (at 2nd second)
```
The code snippet fires two API calls, getUserList and getProductList, at the same time, and the backend executes them in parallel. At the 1st second, the getProductList API call returns the result, and at the 2nd second, the getUserList API call returns the result. In total, two API calls take 2 seconds to complete, which is faster than executing them in sequence (It would take 3 seconds).

### Callback Hell
In order to benefit from the non-blocking calls, we have to define callback functions to get notified as soon as the asynchronous operations are done. The following code shows a callback stack to chain multiple asynchronous functions.
```javascript
function asyncTask(msg, callback) {
    setTimeout( () => {
      console.log(msg),
      callback();
    }, 0)
}

function job1(callback) {
  asyncTask('job1 done', callback);
}

function job2(callback) {
  asyncTask('job2 done', callback);
}

function job3(callback) {
  asyncTask('job3 done', callback);
}

// main
job1( () => {
  job2( () => {
    job3( () => {
      console.log('all jobs done');
    });
  });
});
```
There are three asynchronous functions, job1, job2, and job3 in this example, and they are chained with callbacks as shown in the main code block. The code does do the job of chaining all the jobs together, but it looks really ugly and hard to understand, and it would be even harder to read if we try to stack more callback functions. The readability problem caused by nesting a callback function into another is called **callback-hell**, which is a big issue of leveraging NodeJS in a large code base.

### Solutions
To address the callback-hell issue in the language level, NodeJS introduced **Promise** object in its [ES6](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects) version. The Promise object simplifies the code structure to chain asynchronous functions, thus making the code look more intuitive and easy to read. The following code snippet shows an example of chaining three jobs with the Promise.
```javascript
function asyncTask(msg) {
  return new Promise( (resolve) => {
    setTimeout( () => {
      console.log(msg),
      resolve();
    }, 0)
  });
}

function job1() {
  return asyncTask('job1 done');
}

function job2() {
  return asyncTask('job2 done');
}

function job3() {
  return asyncTask('job3 done');
}

// main
Promise.resolve()
  .then(job1)
  .then(job2)
  .then(job3)
  .then( () => {
    console.log('all jobs done');
  });
```
By involving the Promise object, we can read the code in a more semantic way – do job1, then do job2, then do job3.  

However, the Promise solution is far from perfection. If we involve a branch statement, the code still looks a bit semantically vague, even it is much better than the callback version.
```javascript
function asyncTask(value) {
  return new Promise( (resolve) => {
    setTimeout( () => {
      console.log(value);
      resolve(value);
    }, 0)
  });
}

function job1() {
  return asyncTask(true);
}

function job2() {
  return asyncTask(2);
}

function job3(callback) {
  return asyncTask(3);
}

// main
Promise.resolve()
  .then(job1)
  .then( (jobReturn) => {
    if (jobReturn) {
      return job2();
    }
    else {
      return job3();
    }
  })
  .then( () => {
    console.log('all jobs done');
  });
```
Thanks to the **async/await** syntax introduced in [ES8](https://www.ecma-international.org/ecma-262/8.0/), we are able to simplify the code further more. Here is the code snippet, which shows an example of how to use async/await to chain our asynchronous functions.
```javascript
// skip the job definitions

async function scheduler() {
  const jobResult = await(job1());
  if (jobResult) {
    await job2();
  } else {
    await job3();
  }
  console.log('all jobs done');
}

// main
scheduler();
```
In the semantic perspective, the await keyword means waiting for the result of an asynchronous function. With the await/async support, we can chain the asynchronous functions in the same way as synchronous functions, except for adding the await keyword in front of each asynchronous function calls.  

Moreover, combining the await with the Promise, we can attain the power of **parallelism** from the Promise without losing the convenience from the await.
```javascript
// skip the job definitions

async function scheduler() {
  const jobResult = await(job1());
  if (jobResult) {
    await Promise.all([job2(), job3()]);
  }
  console.log('all jobs done');
}

// main
scheduler();
```
