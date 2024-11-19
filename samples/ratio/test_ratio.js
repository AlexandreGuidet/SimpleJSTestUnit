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
        this.run_test("Initialization", this.#testInit.bind(this));
        this.run_test("Compute to number", this.#testToNumber.bind(this));
        this.run_test("Additions", this.#testsAdd.bind(this));
        this.run_test("Equality", this.#testEquality.bind(this));
        this.run_test("Inequality", this.#testIsLess.bind(this));        
    }

    #testInit() {
        let r = new Ratio(4, 3);
        this.assert("4/3" == r.toString(), "test init with 2 values");

        r = new Ratio(5);
        this.assert("5/1" == r.toString(), "test init 1 value");

        r = new Ratio();
        this.assert("0/1" == r.toString(), "test init with 0 value");

        this.assert_throws(() => { const r = new Ratio(1, 0); });

        r = new Ratio(10, 12);
        this.assert_equals("5/6", r.toString());        
    }

    #testToNumber() {
        const r = new Ratio(3, 5);
        this.assert_equals_approx(0.6, r.toNumber());        
    }

    #testsAdd() {
        const r1 = new Ratio(3, 5);
        const r2 = new Ratio(1, 2);
        let r = Ratio.add(r1, r2);
        this.assert_equals("11/10", r.toString());
    }

    #testEquality() {
        const r1 = new Ratio(10, 11);
        const r2 = new Ratio(100, 110);
        this.assert(r1.equals(r2), "equals");
        const r3 = new Ratio(11, 11);
        this.assert(!r1.equals(r3), "not equal");
    }    

    #testIsLess() {
        const r1 = new Ratio(2, 3);
        const r2 = new Ratio(1, 1);
        this.assert(r1.isLessThan(r2),"2/3 < 1");
        this.assert(!r2.isLessThan(r1),"1 > 2/3");
        this.assert(!r1.isLessThan(r1),"< != ==");
    }    
}

window.onload = ()=>{
    const div = document.querySelector("main");
    const output = new HTMLSectionOuput(div);
    const test = new TestRatio(output);        
    test.run();
    test.resume();
};