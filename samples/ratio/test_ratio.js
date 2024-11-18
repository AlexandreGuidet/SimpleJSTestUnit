/*
* this class is a unit test for the ratio class
*/
import {Ratio} from "./ratio.js"
import { UnitTest , HTMLSectionOuput} from "../../unittest.js";

class TestRatio extends UnitTest{
    constructor(output){
        super(output);
    }

    run(){
        this.run_test("Initialization",this.#testInit.bind(this));        
    }

    #testInit(){
        this.#testInit2values();
        this.#testInit1value();
        this.#testInit0value();
    }

    #testInit2values(){
        let r = new Ratio(4,3);
        this.assert("4/3"==r.toString(),"test init with 2 values");
    }

    #testInit1value(){
        let r = new Ratio(5);
        this.assert("5/1"==r.toString(),"test init 1 value");
    }

    #testInit0value(){
        let r = new Ratio();
        this.assert("0/1"==r.toString(),"test init with 0 value");
    }
}

window.onload = ()=>{
    const div = document.querySelector("main");
    const output = new HTMLSectionOuput(div);
    const test = new TestRatio(output);        
    test.run();
};