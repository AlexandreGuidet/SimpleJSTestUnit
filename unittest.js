/**
 * base class for test output (kind of interface)
 */
class TestOuput
{
    /**
     * outputs the name of the test
     * @param {string} name 
     */
    outputTestName(name){}
    /**
     * outputs the result of a test
     * @param {string} message the message to outputs
     */
    outputTestResult(message){}

    /**
     * outputs the synthesis of a test
     * @param {string} message the message to synthesis
     */
    outputTestSynthesis(message){}
}

/**
 * Outputs results on console
 */
export class ConsoleTestOutput extends TestOuput
{
    constructor()
    {
        super();
    }
    output(str){
        console.log(str);
    }
    outputTestName(str){
        this.output(str + " begin");
    }
    outputTestResult(str){
        this.output(str);
    }
    outputTestSynthesis(str){
        this.output(str + " end");
    }
}

/**
 * Outputs results on HTML list
 */
export class HTMLSectionOuput extends TestOuput
{
    /**
     * Create the outputs
     * @param {HTMLElement} parent HTML element who is the parent of the output (for example, a div)
     */
    constructor(parent){
        super();
        this.parent = parent;
    }
    outputTestName(str){
        let title = document.createElement("h2");
        title.innerHTML = str;
        this.parent.appendChild(title);
        this.currentTest = document.createElement("ul");
        this.parent.appendChild(this.currentTest);
    }
    outputTestResult(str){
        let li = document.createElement("li");
        li.innerHTML = str;
        this.currentTest.appendChild(li);  
    }
    outputTestSynthesis(str){
        let hr = document.createElement("hr");
        this.parent.appendChild(hr);
        let p = document.createElement("p");
        p.innerHTML = str;
        this.parent.appendChild(p);
    }
}

/**
 * Base class for unit tests
 */
export class UnitTest
{
    /* attributes */
    #output; // {TestOuput} link to output 
    #passed; // {number} number of tests passed
    #failed; // {number} number of failed tests

    /**
     * Create the test
     * @param {TestOuput} output object to outputs tests results
     */
    constructor(output){
        this.#output = output;
        this.#passed = 0;
        this.#failed = 0;
    }

    /**
     * Run a test case
     * @param {string} name descrption of the test
     * @param {function} testFunction function to test
     */
    run_test(name, testFunction){
        this.#output.outputTestName(name);
        try{
            testFunction();            
        }
        catch (error) {
            this.#test_failed("Test failed : an error is thrown");
        }        
    }

    /**
     * show in the page that the test passed
     * @param {string} description description of the test
     */
    #test_passed(description){
        let str = '✅ ' + description+ " - passed";
        this.#output.outputTestResult(str);     
        this.#passed++;   
    }
    
    /**
     * Show in the page that the test failed
     * @param {string} description description of the test     
     */
    #test_failed(description){
        let str = '❌ ' + description + " - failed";
        this.#output.outputTestResult(str);        
        this.#failed++;
    }
    /**
     * Realize a simple assertion
     * @param {boolean} condition condition to test
     * @param {string} message describe the test
     */
    assert(condition, message){        
        if(!condition)
            this.#test_failed(message);
        else
            this.#test_passed(message);
    }

    /**
     * Realize an equals assertion
     * @param {*} expected the value excepted
     * @param {*} value the value obtained     
     */
    assert_equals(expected, value) {
        if (expected == value) {
            this.#test_passed("equality ok");
        }
        else {
            this.#test_failed("assertion failed, " + expected + " expected but " + value + " obtained.");
        }        
    }

    /**
     * Realize an not-equals assertion
     * @param {*} expected the value excepted
     * @param {*} value the value obtained     
     */
    assert_not_equals(expected, value) {
        if (expected != value) {
            this.#test_passed("values are different");
        }
        else {
            this.#test_failed("assertion failed, values are same");
        } 
    }

    /**
     * Realize an approximative assertion, for equality of floating-point values
     * @param {number} excepted the value expected
     * @param {number} value the value obtained
     * @param {number} precision the precision of equality (if omitted, equal to 10e-7)
     */
    assert_equals_approx(excepted, value, precision=1e-7) {
        let delta = Math.abs(excepted - value);
        this.assert(delta < precision, "test approximative equality");
    }

    /**
     * Test if an exception (any kind) is thrown
     * @param {function} code_to_test 
     */
    assert_throws(code_to_test){
        try{
            code_to_test();
            this.assert(false,"exception not thrown");
        }
        catch(except_object){
            this.assert(true,"exception thrown");
        }
    }
    

    /**
    * Resume the test
    * @see TestOutput
    */
    resume(){
        this.#output.outputTestSynthesis("Tests finished. "+this.#passed.toString()+" passed and "+this.#failed.toString()+" failed.");
    }
}
