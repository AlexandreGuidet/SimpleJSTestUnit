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
    }

    #testInit(){
        this.#testInit2values();
        this.#testInit1value();
        this.#testInit0value();
        this.#testBadInit();
        this.#testInitWithNormalize();
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

    #testBadInit(){
        this.assert_throws( ()=>{const r = new Ratio(1,0);});
    }
    #testInitWithNormalize() {
        let r = new Ratio(10, 12);
        this.assert_equals("5/6", r.toString());
    }

    #testToNumber() {
        const r = new Ratio(3, 5);
        this.assert_equals_approx(0.6, r.toNumber());
    }

    #testsAdd() {
        this.#testAdditionSameDen();
        this.#testAdditionDiffDen();
    }
    #testAdditionSameDen() {
        const r1 = new Ratio(3, 5);
        const r2 = new Ratio(4, 5);
        let r = Ratio.add(r1, r2);
        this.assert_equals("7/5", r.toString());
    }
    #testAdditionDiffDen() {
        const r1 = new Ratio(3, 5);
        const r2 = new Ratio(1, 2);
        let r = Ratio.add(r1, r2);
        this.assert_equals("11/10", r.toString());
    }
    #testEquality() {
        this.#testEquals();
        this.#testNotEquals();
    }
    #testEquals() {
        const r1 = new Ratio(10, 11);
        const r2 = new Ratio(100, 110);
        this.assert(r1.equals(r2), "equals");
    }
    #testNotEquals() {
        const r1 = new Ratio(10, 11);
        const r2 = new Ratio(11, 11);
        this.assert(!r1.equals(r2), "not equal");
    }
}

window.onload = ()=>{
    const div = document.querySelector("main");
    const output = new HTMLSectionOuput(div);
    const test = new TestRatio(output);        
    test.run();
};