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
    }

    /**
     * 
     * @returns {string} a string representation of the ratio
     */
    toString(){
        return this.#numerator.toString()+"/"+this.#denominator.toString();
    }
}