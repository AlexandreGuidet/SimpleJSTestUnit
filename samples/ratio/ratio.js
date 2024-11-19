export class DivideByZeroError extends Error
{

}
/*
This class is a simple rational class to manage rational numbers in JS
*/
export class Ratio{
    #numerator;
    #denominator;

    /**
     * 
     * @param {number} num the numerator. If omited, equals to 0.
     * @param {number} den the denominator (must be not null). If omitted, equals to 1.
     * @throws DivideByZeroError if den is null
     */
    constructor(num=0, den=1){
        if(den==0)
            throw new DivideByZeroError();
        this.#numerator = num;
        this.#denominator = den;
        this.#normalize();
    }

    /**
     * 
     * @returns {string} a string representation of the ratio
     */
    toString(){
        return this.#numerator.toString()+"/"+this.#denominator.toString();
    }

    /**
     * 
     * @returns {number} approximate value of the ratio
     */
    toNumber() {
        return this.#numerator / this.#denominator;
    }

    /**
     * Add to ratio
     * @param {Ratio} r1 first rational
     * @param {Ratio} r2 second rational
     * @returns {Ratio} r1+r2
     */
    static add(r1, r2) {
        let num = r1.#numerator * r2.#denominator + r2.#numerator * r1.#denominator;
        let den = r1.#denominator * r2.#denominator;
        return new Ratio(num, den);
    }

    #normalize() {
        if (this.#numerator != 0) {
            let g = Ratio.gcd(this.#numerator, this.#denominator);
            this.#numerator /= g;
            this.#denominator /= g;
        }
    }

    /**
     * Compute GCD of a and b
     * @param {number} a
     * @param {number} b
     * @returns {number} GCD of a and b
     */
    static gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (a < b) {
            let temp = a;
            a = b;
            b = temp;
        }
        let r = a % b;
        while (r != 0) {
            a = b;
            b = r;
            r = a % b;
        }
        return b;
    }
}