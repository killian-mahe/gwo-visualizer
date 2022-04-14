import {Solution} from "./Problem";

/**
 * Generic class for an optimization algorithm.
 */
class Algo {}

/**
 * The Grey Wolf Optimizer algorithm.
 */
export class GWOAlgo extends Algo {
    popSize: number;
    maxIter: number;
    t: number;

    alpha: Solution | null;
    beta: Solution | null;
    delta: Solution | null;

    a: number;
    A: number[][];
    C: number[][];

    /**
     * Create a new algorithm.
     * @param popSize The population size (number of wolves)
     * @param dimension The dimension of the problem.
     * @param maxIter The maximum number of iteration.
     */
    constructor(popSize: number, dimension: number, maxIter: number = 5000) {
        super();
        this.popSize = popSize;
        this.maxIter = maxIter;
        this.t = 0;

        this.alpha = null;
        this.beta = null;
        this.delta = null;
        this.a = 2;
        this.A = new Array<number>(3).fill(0).map(() => new Array(dimension).fill(0));
        this.C = new Array<number>(3).fill(0).map(() => new Array(dimension).fill(0));
    }

    /**
     * Update the algorithm parameters (A, C and a).
     */
    public updateParameters() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < this.A[0].length; j++) {
                this.A[i][j] = this.a * (2 * Math.random() - 1);
                this.C[i][j] = 2 * Math.random();
            }
        }
        this.a = 2 * (1 - this.t/this.maxIter);
    }

    /**
     * Update the position of the given wolf and return it.
     * @param omega Wolf for which the position must be determined.
     * @returns Solution|null
     */
    public updatePositions(omega: Solution): Solution | null {
        if (!this.alpha || !this.beta || !this.delta) return null;

        this.updateParameters();

        for (let d = 0; d < omega.problem.dimension; d++) {
            const Dalpha = Math.abs(this.C[0][d] * this.alpha.x[d] - omega.x[d]);
            const X1 = this.alpha.x[d] - this.A[0][d] * Dalpha;

            const Dbeta = Math.abs(this.C[1][d] * this.alpha.x[d] - omega.x[d]);
            const X2 = this.alpha.x[d] - this.A[1][d] * Dbeta;

            const Ddelta = Math.abs(this.C[2][d] * this.alpha.x[d] - omega.x[d]);
            const X3 = this.alpha.x[d] - this.A[2][d] * Ddelta;

            let X = (X1 + X2 + X3) / 3;

            if (X < omega.problem.xMin) X = omega.problem.xMin;
            else if (X > omega.problem.xMax) X = omega.problem.xMax;

            omega.x[d] = X;
        }

        return omega;
    }

    /**
     * Update the leading wolves position.
     * @param sol The problem solutions (eg. the wolves)
     */
    public updateChiefWolves(sol: Solution[]) {

        if (sol.length && sol[0].problem.maximization) {
            sol = sol.sort((a, b) => {
                return b.fitness - a.fitness;
            })
        } else {
            sol = sol.sort((a, b) => {
                return a.fitness - b.fitness;
            });
        }

        if (!this.alpha || !this.beta || !this.delta) {
            this.alpha = sol[0].copy();
            this.beta = sol[1].copy();
            this.delta = sol[2].copy();
            return;
        }

        if (sol.length && sol[0].problem.maximization) {

            for (let i = 0; i < sol.length; i++) {
                if (sol[i].fitness < this.delta.fitness) break;

                if (sol[i].fitness > this.alpha?.fitness) {
                    this.delta = this.beta.copy();
                    this.beta = this.alpha.copy();
                    this.alpha = sol[i].copy();
                } else if (sol[i].fitness > this.beta?.fitness) {
                    this.delta = this.beta.copy();
                    this.beta = sol[i].copy();
                } else if (sol[i].fitness > this.delta?.fitness) {
                    this.delta = sol[i].copy();
                }
            }

        } else {

            for (let i = 0; i < sol.length; i++) {
                if (sol[i].fitness > this.delta.fitness) break;

                if (sol[i].fitness < this.alpha?.fitness) {
                    this.delta = this.beta.copy();
                    this.beta = this.alpha.copy();
                    this.alpha = sol[i].copy();
                } else if (sol[i].fitness < this.beta?.fitness) {
                    this.delta = this.beta.copy();
                    this.beta = sol[i].copy();
                } else if (sol[i].fitness < this.delta?.fitness) {
                    this.delta = sol[i].copy();
                }
            }

        }

    }
}