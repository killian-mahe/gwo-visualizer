/**
 * Generic class for an optimization problem.
 */
export class Problem {
    name: string;
    dimension: number;
    xMin: number;
    xMax: number;
    maximization: boolean;

    /**
     * Create a new problem.
     * @param name The name of the problem.
     * @param dimension The number of dimensions.
     * @param xMin The domain minimum value.
     * @param xMax The domain maximum value.
     * @param maximization Is it a maximization problem ?
     */
    constructor(name: string, dimension: number, xMin: number, xMax: number, maximization: boolean = true) {
        this.name = name;
        this.dimension = dimension;
        this.xMin = xMin;
        this.xMax = xMax;
        this.maximization = maximization;
    }

    public evaluate(_sol: Solution): number {
        return 0;
    };
}

/**
 * Generic class for discreet optimization problems.
 * @extends Problem
 */
export class DiscreetProblem extends Problem {
    constructor(name: string, dimension: number, xMin: number, xMax: number, maximization: boolean = true) {
        super(name, dimension, xMin, xMax, maximization);
    }
}

/**
 * Generic class for continuous optimization problems.
 * @extends Problem
 */
export class ContinuousProblem extends Problem {
    constructor(name: string, dimension: number, xMin: number, xMax: number, maximization: boolean = true) {
        super(name, dimension, xMin, xMax, maximization);
    }
}

/**
 * The Alpine optimization problem.
 * @extends ContinuousProblem
 */
export class AlpineProblem extends ContinuousProblem {

    /**
     * Create a new Alpine problem.
     * @param dimension The number of dimensions.
     * @param maximization Is it a maximization problem ?
     */
    constructor(dimension: number, maximization: boolean = true) {
        super("Alpine Problem", dimension, 0, 10, maximization);
    }

    /**
     * Evaluate a solution and return the fitness associated.
     * @param sol Solution to evaluate.
     * @return Fitness of the solution
     */
    public evaluate(sol: Solution): number {
        let value = 1;

        for (let i = 0; i < this.dimension; i++) {
            value *= Math.sin(sol.x[i]) * Math.sqrt(sol.x[i]);
        }

        return value;
    }
}

/**
 * The Alpine 2 optimization problem.
 * @extends ContinuousProblem
 */
export class Alpine2Problem extends ContinuousProblem {

    /**
     * Create a new Alpine problem.
     * @param dimension The number of dimensions.
     */
    constructor(dimension: number) {
        super("Alpine 2 Problem", dimension, -10, 10, false);
    }

    /**
     * Evaluate a solution and return the fitness associated.
     * @param sol Solution to evaluate.
     * @return Fitness of the solution
     */
    public evaluate(sol: Solution): number {
        let value = 0;

        for (let i = 0; i < this.dimension; i++) {
            value += Math.abs(sol.x[i] * Math.sin(sol.x[i]) + 0.1 * sol.x[i]);
        }

        return value;
    }
}

/**
 * The Sphere optimization problem.
 * @extends ContinuousProblem
 */
export class SphereProblem extends ContinuousProblem {

    /**
     * Create a new Sphere problem.
     * @param dimension The number of dimensions.
     */
    constructor(dimension: number) {
        super("Sphere Problem", dimension, -5.12, 5.12, false);
    }

    /**
     * Evaluate a solution and return the fitness associated.
     * @param sol Solution to evaluate.
     * @return Fitness of the solution
     */
    public evaluate(sol: Solution): number {
        let value = 0;

        for (let i = 0; i < this.dimension; i++) {
            value += Math.pow(sol.x[i], 2);
        }

        return value;
    }
}

/**
 * The Ackley optimization problem.
 * @extends ContinuousProblem
 */
export class AckleyProblem extends ContinuousProblem {

    /**
     * Create a new Sphere problem.
     * @param dimension The number of dimensions.
     */
    constructor(dimension: number) {
        super("Ackley Problem", dimension, -32, 32, false);
    }

    /**
     * Evaluate a solution and return the fitness associated.
     * @param sol Solution to evaluate.
     * @return Fitness of the solution
     */
    public evaluate(sol: Solution): number {
        let value1 = 0;
        let value2 = 0;

        for (let i = 0; i < this.dimension; i++) {
            value1 += Math.pow(sol.x[i], 2);
        }

        for (let i = 0; i < this.dimension; i++) {
            value2 += Math.cos(2 * Math.PI * sol.x[i]);
        }

        return -20 * Math.exp(-0.2 * Math.sqrt(1/this.dimension * value1))
                - Math.exp(1/this.dimension * value2) + 20 + Math.exp(1);
    }
}

/**
 * Class representing a solution to an optimization problem.
 */
export class Solution {
    fitness: number;
    x: number[];
    problem: Problem;

    /**
     * Create a new solution.
     * @param x The value associated with each dimension.
     * @param prob The associated problem.
     */
    constructor(x: number[], prob: Problem) {
        this.x = x;
        this.fitness = 0;
        this.problem = prob;
    }

    /**
     * Update the fitness of the solution.
     */
    public evaluate() {
        this.fitness = this.problem.evaluate(this);
    }

    /**
     * Create a partial deep-copy (excluding the problem reference) of the solution.
     * @returns A copy of the solution.
     */
    public copy(): Solution {
        let sol =  new Solution([...this.x], this.problem);
        sol.fitness = this.fitness;
        return sol;
    }
}