# SimpleJSTestUnit

A simple JavaScript unit test framework

## How to install

Simply copy ``unittest.js`` file in your project, and import the used class in your javascript file.
The test unit can be used on any javascript project, even a simple JS file included in a HTML one.

## How to use

*Note* : in the `samples` folder you have some samples of unit tests using this framework.

To create a unit test, you must create a class who inherit from `UnitTest` (in `unittest.js`). 
You must defined a constructor and provides an `TestOuput` object.
You may choose to output test results on JavaScript console : you must use the `ConsoleTestOutput` class.
If you want to output tests on a HTML page, you must use the `HTMLSectionOuput` class and provided an HTMLElement (the parent in which you want to output the results).
Both classes inherit from `TestOuput` class and have same operations.
For example :
`
class TestRatio extends UnitTest{
    constructor(output){
        super(output);
    }
`

To run a test case, you must call the `run_test` function. This function have two parameters :
- a string message : the name of the test case
- a function : the function to call to make the test case

A test case can call several "assert" operations (inherited from `UnitTest`). 

## Documentation

List of public operations of the `UnitTest` class :

- `constructor(output)` : create the test. 
    + `output` parameter : an `TestOutput` object to output tests results
- `run_test(name, testFunction)` : run a test case.
	+ `name` parameter : description of the test
	+ `function` parameter : function to test
- `resume()` : resume the test
- `assert(condition, message)` : Realize a simple assertion
	+ `condition` parameter : a boolean condition (the test pass is condition is true)
	+ `message` parameter : describe the test
- `assert_equals(expected, value)` : Realize an equals assertion. The test pass if expected==value
	+ `expected` parameter : value expected
	+ `value` parameter : value obtained.
- `assert_equals_approx(excepted, value, precision=1e-7)` : assertion for floating-point values equality. The test pass if both values are equals, at precision...
	+ `expected` parameter : value expected
	+ `value` parameter : value obtained.
	+ `precision` parameter : the precision of equality (if omitted, equal to 10e-7)
- `assert_throws(code_to_test)` : test if a code throws an exception. 
	+ `code_to_test` parameter : a function (or lambda) with the code who must throw the exception
	
