// data/dummyData.ts

import { Course } from "@/app/types";

export const dummyCourses: Course[] = [
  {
    id: "1",
    name: "JavaScript Basics",
    description: "Learn the fundamentals of JavaScript.",
    difficulty: "Beginner",
    modules: [
      {
        id: "1",
        title: "Introduction to JavaScript",
        description: "Understand the basics of JavaScript.",
        lessons: [
          {
            id: "1",
            title: "What is JavaScript?",
            content: `
      JavaScript is a versatile, high-level, and interpreted programming language that is primarily used for front-end web development, though it has also found significant utility in back-end development with technologies like Node.js. Originally created by Brendan Eich in 1995 for Netscape Navigator, JavaScript has since become one of the most widely used languages in the world, evolving from a simple scripting tool to a fully-fledged, powerful programming language.

      JavaScript allows developers to create dynamic and interactive websites by manipulating the Document Object Model (DOM) — the structure of a webpage. This means that developers can modify HTML elements and CSS styles based on user actions, such as clicks, form submissions, or page scrolls. For example, you can use JavaScript to create dropdown menus, image sliders, animations, and real-time content updates without needing to reload the page.

      One of the key features of JavaScript is its ability to execute code in the browser, making it a "client-side" language. This allows for fast interactions and updates, as the code is processed locally on the user's machine rather than on the server. However, JavaScript can also be used on the "server-side" with environments like Node.js, making it a full-stack language.

      JavaScript is often associated with front-end frameworks and libraries like React, Angular, and Vue.js, which simplify and enhance the process of building complex user interfaces. With these frameworks, developers can create modular, reusable components that help manage the increasing complexity of modern web applications.

      In addition to being used for web browsers, JavaScript is also utilized in mobile app development (via frameworks like React Native), desktop applications (using Electron), and even IoT (Internet of Things) devices. Its widespread usage across platforms makes JavaScript one of the most in-demand programming languages in the tech industry.

      JavaScript has several defining characteristics, including:
      - **Interpreted Language**: Unlike compiled languages such as C++ or Java, JavaScript code is executed line by line in the browser, which makes development faster and allows for quicker iterations.
      - **Dynamic Typing**: Variables in JavaScript are not bound to a specific data type. This flexibility allows developers to assign and reassign values of different types to the same variable during runtime.
      - **Prototypal Inheritance**: JavaScript uses prototypes instead of classical inheritance, which allows objects to inherit properties directly from other objects.

      Over the years, JavaScript has grown into a mature language with a rich ecosystem of tools, frameworks, and libraries. The introduction of ES6 (ECMAScript 2015) brought a significant number of features that improved the language's functionality and developer experience, such as arrow functions, template literals, classes, and modules.

      JavaScript plays a critical role in the development of Progressive Web Apps (PWAs), Single Page Applications (SPAs), and other modern web architectures that aim to provide seamless and performant user experiences across different devices.

      In summary, JavaScript is an essential tool for any web developer. Its flexibility, wide-ranging applicability, and support from all major browsers make it indispensable in modern web development. Whether you're building a simple website or a complex application, learning JavaScript is the first step toward becoming a proficient front-end or full-stack developer.
    `,
            quiz: {
              questions: [
                {
                  id: "1",
                  text: "What is JavaScript?",
                  options: [
                    "A programming language",
                    "A database",
                    "A framework",
                  ],
                  correctAnswer: "A programming language",
                },
              ],
            },
            description: undefined,
          },
          {
            id: "2",
            title: "JavaScript Variables",
            content: `
    Variables are a fundamental concept in JavaScript and any programming language. In JavaScript, variables act as containers that store data values, allowing developers to use and manipulate data throughout their code. Variables can store various types of data, including numbers, strings, objects, and more complex structures.

    There are several ways to declare variables in JavaScript. Before ES6 (ECMAScript 2015), 'var' was the primary way to define variables. However, with the introduction of 'let' and 'const', developers now have more control over the scope and behavior of variables. 

    - **var**: Variables declared with 'var' have function scope, meaning they are available throughout the function they are declared in. 'var' is hoisted, meaning it is moved to the top of its scope at runtime, which can sometimes lead to unexpected results.
    - **let**: Variables declared with 'let' are block-scoped, meaning they are only available within the block they are defined in. 'let' is a more modern and preferred way to declare variables due to its predictable behavior.
    - **const**: Like 'let', 'const' is block-scoped, but it is used to declare constants — variables whose values cannot be reassigned after they are defined. However, if the variable is an object or array, its contents can still be modified.

    JavaScript also allows for dynamic typing, meaning you don't need to specify the type of the variable (e.g., integer, string) when declaring it. The language will determine the type based on the value assigned to the variable.

    Here's an example of how to declare variables in JavaScript:

    \`\`\`js
    var name = "John";   // using var
    let age = 30;        // using let
    const city = "New York"; // using const
    \`\`\`

    Understanding variables and how to manage them is crucial for writing efficient and bug-free JavaScript code. Proper use of 'let' and 'const' over 'var' can help prevent unintended behaviors, especially in large-scale applications. 
  `,
            quiz: {
              questions: [
                {
                  id: "2",
                  text: "What are variables in JavaScript?",
                  options: ["Containers for data", "Functions", "Objects"],
                  correctAnswer: "Containers for data",
                },
              ],
            },
            description: undefined,
          },
        ],
      },
      {
        id: "2",
        title: "JavaScript Control Structures",
        description:
          "Learn about loops and conditional statements in JavaScript.",
        lessons: [
          {
            id: "3",
            title: "If Statements",
            content: `
    If statements are a fundamental control structure in JavaScript that allow you to execute specific blocks of code based on a condition. By evaluating a boolean expression (true or false), an if statement can control the flow of the program and execute different logic depending on the outcome.

    An if statement in JavaScript works like this: if the condition is true, the block of code inside the curly braces {} will be executed. If the condition is false, the program will skip the block and move on to the next piece of code. You can also use 'else' to specify what should happen if the condition is false, and 'else if' to chain multiple conditions together.

    Example of an if statement:

    \`\`\`js
    let age = 18;
    if (age >= 18) {
        console.log("You are an adult.");
    } else {
        console.log("You are not an adult.");
    }
    \`\`\`

    The above example checks if a person’s age is 18 or more, and if so, prints "You are an adult." Otherwise, it prints "You are not an adult." 

    If statements are often used alongside loops and functions to control the flow of your program. They are essential for making decisions in your code, allowing you to handle different cases dynamically as your application runs. Understanding if statements and other control structures is a core aspect of programming and problem-solving in JavaScript.
  `,
            quiz: {
              questions: [
                {
                  id: "3",
                  text: "What does an if statement do?",
                  options: [
                    "Executes code based on a condition",
                    "Declares a variable",
                    "Creates a loop",
                  ],
                  correctAnswer: "Executes code based on a condition",
                },
              ],
            },
            description: undefined,
          },
        ],
      },
      {
        id: "3",
        title: "JavaScript Functions",
        description: "In-depth exploration of functions in JavaScript.",
        lessons: [
          {
            id: "4",
            title: "Defining and Using Functions",
            content: `
    Functions in JavaScript are reusable blocks of code designed to perform specific tasks. They are one of the most important building blocks in programming, as they allow developers to organize code into smaller, manageable parts, making it easier to read, debug, and maintain.

    A function is defined using the 'function' keyword, followed by a name, parentheses, and a block of code (enclosed in curly braces {}). Functions can accept parameters, which are values passed into the function to work with, and they can also return values using the 'return' statement.

    Here's an example of a simple function:

    \`\`\`js
    function greet(name) {
      return "Hello, " + name;
    }

    let message = greet("Alice"); // "Hello, Alice"
    console.log(message);
    \`\`\`

    In the example above, the function 'greet' takes one parameter ('name') and returns a greeting message. When we call the function with "Alice" as the argument, it returns "Hello, Alice".

    Functions are essential in JavaScript because they help reduce code duplication. Instead of writing the same code multiple times, you can define a function once and reuse it whenever needed. Functions can also call other functions, allowing for more complex operations.

    JavaScript also supports anonymous functions, which are functions without a name, and arrow functions, which provide a shorter syntax for defining functions. Arrow functions, introduced in ES6, are particularly useful for concise, single-line functions and have a more predictable 'this' keyword behavior.

    Understanding how to define and use functions is crucial for mastering JavaScript, as they form the backbone of most applications and help you create more organized and maintainable code.
  `,
            quiz: {
              questions: [
                {
                  id: "4",
                  text: "How do you define a function in JavaScript?",
                  options: [
                    "function myFunction()",
                    "createFunction()",
                    "function = new Function()",
                  ],
                  correctAnswer: "function myFunction()",
                },
              ],
            },
            description: undefined,
          },
        ],
      },
    ],
    lessons: undefined,
  },
  {
    id: "2",
    name: "Python for Beginners",
    description: "An introduction to Python programming.",
    difficulty: "Beginner",
    modules: [
      {
        id: "4",
        title: "Getting Started with Python",
        description: "Basics of Python programming.",
        lessons: [
          {
            id: "5",
            title: "Python Syntax",
            content: `
    Python is known for its simplicity and readability, making it a popular choice for beginners and experienced developers alike. The syntax of Python is designed to be clean and easy to understand, emphasizing readability through indentation rather than braces or semicolons commonly found in other programming languages.

    In Python, blocks of code (like loops, functions, and conditionals) are defined by their indentation level, rather than using brackets or curly braces. This encourages developers to write neat, organized code that is easy to read and maintain.

    Here’s an example of a simple Python program:

    \`\`\`python
    def greet(name):
        return "Hello, " + name

    message = greet("Alice")
    print(message)
    \`\`\`

    In this example, the 'greet' function takes a parameter 'name' and returns a greeting message. The 'print' function outputs the result to the console. Notice that there are no curly braces or semicolons — the code is organized by indentation alone.

    Python also uses a straightforward syntax for common programming tasks, such as looping and conditionals. For instance, an 'if' statement in Python looks like this:

    \`\`\`python
    age = 18
    if age >= 18:
        print("You are an adult.")
    else:
        print("You are not an adult.")
    \`\`\`

    Python’s simplicity makes it an ideal language for beginners, but its power and flexibility also make it suitable for advanced applications like web development, data analysis, and artificial intelligence.
  `,
            quiz: {
              questions: [
                {
                  id: "5",
                  text: "What is the correct syntax for printing in Python?",
                  options: ["print()", "echo()", "console.log()"],
                  correctAnswer: "print()",
                },
              ],
            },
            description: undefined,
          },
        ],
      },
      {
        id: "5",
        title: "Python Data Types",
        description: "Understand the different data types in Python.",
        lessons: [
          {
            id: "6",
            title: "Strings and Numbers",
            content: `
        In Python, data types are classifications that determine the kind of value a variable holds. The most common data types you'll encounter are strings and numbers.

        Strings are sequences of characters, typically used to store text. Strings are enclosed in either single quotes or double quotes. You can manipulate strings in various ways, such as concatenation, slicing, and formatting.

        Here's an example of a string:
        
        \`\`\`python
        message = "Hello, World!"
        \`\`\`

        You can concatenate strings using the '+' operator:
        
        \`\`\`python
        first_name = "John"
        last_name = "Doe"
        full_name = first_name + " " + last_name
        \`\`\`

        Numbers in Python can be integers or floating-point numbers. Integers are whole numbers, while floating-point numbers (or floats) are numbers with a decimal point.

        Example of integers and floats:
        
        \`\`\`python
        age = 25  # Integer
        price = 19.99  # Float
        \`\`\`

        Python provides built-in functions to convert between these data types. For example, you can convert a string to an integer using the \`int()\` function and convert a number to a string using the \`str()\` function.

        Here's an example:
        
        \`\`\`python
        age_str = "30"
        age_int = int(age_str)  # Converts string to integer

        number = 100
        number_str = str(number)  # Converts integer to string
        \`\`\`

        Understanding how to work with strings and numbers is essential for any Python programmer. You will often need to convert between types or manipulate strings and numbers in various ways.
      `,
            quiz: {
              questions: [
                {
                  id: "6",
                  text: "How do you convert a string to an integer in Python?",
                  options: ["int()", "str()", "float()"],
                  correctAnswer: "int()",
                },
              ],
            },
            description: undefined,
          },
        ],
      },
      {
        id: "6",
        title: "Python Control Structures",
        description: "Learn how to use if statements and loops in Python.",
        lessons: [
          {
            id: "7",
            title: "If Statements in Python",
            content: `
        Control structures in Python allow you to dictate the flow of your program. One of the most fundamental control structures is the 'if' statement, which lets you execute code based on a condition.

        An 'if' statement evaluates a condition, and if the condition is true, it executes the block of code inside the 'if' statement. If the condition is false, you can use an optional 'else' statement to execute a different block of code.

        Here's a basic example of an 'if' statement in Python:

        \`\`\`python
        age = 18
        if age >= 18:
            print("You are eligible to vote.")
        else:
            print("You are not eligible to vote.")
        \`\`\`

        In this example, the 'if' statement checks if the value of 'age' is 18 or greater. If the condition is true, it prints "You are eligible to vote." If the condition is false, the 'else' block runs and prints "You are not eligible to vote."

        You can also use 'elif' (else if) to check multiple conditions in a row:

        \`\`\`python
        score = 85
        if score >= 90:
            print("Grade: A")
        elif score >= 80:
            print("Grade: B")
        else:
            print("Grade: C")
        \`\`\`

        Here, if the first condition is false, Python moves on to check the 'elif' condition. If that is also false, it executes the code in the 'else' block.

        Using 'if' statements allows you to control how your program behaves under different conditions, making it a crucial tool in programming.
      `,
            quiz: {
              questions: [
                {
                  id: "7",
                  text: "What does an if statement do in Python?",
                  options: [
                    "Executes code based on a condition",
                    "Declares a variable",
                    "Creates a loop",
                  ],
                  correctAnswer: "Executes code based on a condition",
                },
              ],
            },
            description: undefined,
          },
        ],
      },
    ],
    lessons: undefined,
  },
  {
    id: "3",
    name: "Advanced JavaScript",
    description: "Dive deeper into JavaScript for advanced topics.",
    difficulty: "Advanced",
    modules: [
      {
        id: "7",
        title: "JavaScript Closures",
        description:
          "Learn about closures and their applications in JavaScript.",
        lessons: [
          {
            id: "8",
            title: "Understanding Closures",
            content: `
        A closure is one of the most powerful features in JavaScript. It refers to a function that retains access to its lexical scope, even when the function is executed outside that scope. In other words, a closure gives you access to the variables defined within the outer function, even after the outer function has finished executing.

        Here's an example to illustrate closures:

        \`\`\`javascript
        function outer() {
          let counter = 0;
          return function inner() {
            counter++;
            return counter;
          };
        }
        
        const increment = outer();
        console.log(increment()); // Output: 1
        console.log(increment()); // Output: 2
        \`\`\`

        In this example, the function \`inner()\` forms a closure. It can access the variable \`counter\` from the \`outer()\` function's scope, even though \`outer()\` has finished executing. Every time we call \`increment()\`, the closure allows us to access and modify the \`counter\` variable.

        Closures are commonly used for data privacy and maintaining state in JavaScript. They allow you to create functions that can "remember" the state of variables over multiple invocations, making them very useful for things like event handlers, asynchronous functions, and encapsulating logic.

        Understanding closures is essential for writing advanced JavaScript, as they are frequently used in real-world applications, especially when dealing with callbacks, event listeners, and asynchronous operations.
      `,
            quiz: {
              questions: [
                {
                  id: "8",
                  text: "What is a closure in JavaScript?",
                  options: [
                    "A function that remembers its lexical scope",
                    "A method inside a class",
                    "A type of array",
                  ],
                  correctAnswer: "A function that remembers its lexical scope",
                },
              ],
            },
            description: undefined,
          },
        ],
      },
      {
        id: "8",
        title: "JavaScript Promises",
        description: "Learn about promises for handling asynchronous code.",
        lessons: [
          {
            id: "9",
            title: "Using Promises",
            content: `
        A promise in JavaScript represents a value that may be available now, in the future, or never. Promises are used to handle asynchronous operations, making it easier to work with code that executes after a certain event or time.

        A promise has three possible states:
        1. **Pending** – the operation has not completed yet.
        2. **Fulfilled** – the operation completed successfully, and the result is available.
        3. **Rejected** – the operation failed, and an error is returned.

        Here's an example of creating and using a promise:

        \`\`\`javascript
        const myPromise = new Promise((resolve, reject) => {
          const success = true;
          
          if (success) {
            resolve("Promise fulfilled!");
          } else {
            reject("Promise rejected!");
          }
        });

        myPromise
          .then(result => console.log(result)) // Output: Promise fulfilled!
          .catch(error => console.error(error));
        \`\`\`

        In this example, the \`myPromise\` promise resolves with the string "Promise fulfilled!" if the condition is true, and rejects with the string "Promise rejected!" if it fails. The \`.then()\` method is used to handle the fulfilled state, while \`.catch()\` handles any errors that occur when the promise is rejected.

        Promises are crucial in modern JavaScript, as they allow you to handle asynchronous operations like API calls, file reading, or timers more effectively. They prevent "callback hell" by chaining \`.then()\` calls instead of nesting callbacks within each other.
      `,
            quiz: {
              questions: [
                {
                  id: "9",
                  text: "What does a promise represent in JavaScript?",
                  options: [
                    "A placeholder for a future value",
                    "A loop that runs infinitely",
                    "A new type of variable",
                  ],
                  correctAnswer: "A placeholder for a future value",
                },
              ],
            },
            description: undefined,
          },
        ],
      },
      {
        id: "9",
        title: "Async/Await",
        description:
          "Learn how to simplify asynchronous code using async/await.",
        lessons: [
          {
            id: "10",
            title: "Using Async/Await",
            content: `
        Async/await is a modern way to work with asynchronous code in JavaScript, built on top of promises. It allows you to write asynchronous code in a cleaner and more readable way, making it look almost like synchronous code.

        The \`async\` keyword is placed before a function to declare it as asynchronous. Inside this function, you can use the \`await\` keyword to pause the execution of the function until a promise is resolved or rejected.

        Here's an example of using async/await:

        \`\`\`javascript
        async function fetchData() {
          try {
            let response = await fetch('https://api.example.com/data');
            let data = await response.json();
            console.log(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        
        fetchData();
        \`\`\`

        In this example, the \`fetchData()\` function is asynchronous. It pauses at the \`await\` keyword, waiting for the \`fetch()\` promise to resolve. Once the data is fetched, it continues to the next \`await\` statement, waiting for the JSON parsing to finish before logging the data.

        Async/await helps you avoid the chaining of promises with \`.then()\` and makes error handling easier using \`try/catch\`. It is widely used for managing asynchronous operations like API requests, file reading, or timers in JavaScript.

        By mastering async/await, you can write more readable, maintainable code while working with asynchronous operations, which are essential for modern web development.
      `,
            quiz: {
              questions: [
                {
                  id: "10",
                  text: "What does async/await do in JavaScript?",
                  options: [
                    "Simplifies working with promises",
                    "Creates new variables",
                    "Runs code synchronously",
                  ],
                  correctAnswer: "Simplifies working with promises",
                },
              ],
            },
            description: undefined,
          },
        ],
      },
    ],
    lessons: undefined,
  },
];
