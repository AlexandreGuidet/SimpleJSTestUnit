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
class ConsoleTestOutput extends TestOuput
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
class HTMLSectionOuput extends TestOuput
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
class UnitTest
{
    /**
     * Create the test
     * @param {TestOuput} output object to outputs tests results
     */
    constructor(output){
        this.output = output;
        this.passed = 0;
        this.failed = 0;
    }

    /**
     * Run a test case
     * @param {string} name descrption of the test
     * @param {function} testFunction function to test
     */
    run_test(name, testFunction){
        this.output.outputTestName(name);
        try{
            testFunction();            
        }
        catch(error){
            // todo quoi faire ?
        }        
    }

    /**
     * show in the page that the test passed
     * @param {string} description description of the test
     */
    test_passed(description){
        let str = '✅ ' + description+ " - passed";
        this.output.outputTestResult(str);     
        this.passed++;   
    }
    
    /**
     * Show in the page that the test failed
     * @param {string} description description of the test     
     */
    test_failed(description){
        let str = '❌ ' + description + " - failed";
        this.output.outputTestResult(str);        
        this.failed++;
    }
    /**
     * Realize a simple assertion
     * @param {boolean} condition condition to test
     * @param {string} message describe the test
     */
    assert(condition, message){        
        if(!condition)
            this.test_failed(message);
        else
            this.test_passed(message);
    }

    resume(){
        this.output.outputTestSynthesis("Tests finished. "+this.passed.toString()+" passed and "+this.failed.toString()+" failed.");
    }
}
