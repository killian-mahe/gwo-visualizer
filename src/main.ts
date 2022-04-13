import p5 from 'p5';
import {AlpineProblem, Problem, Solution} from "./Problem";
import {GWOAlgo} from "./Algo";

let width = window.innerWidth;
let height = window.innerHeight;
const SAMPLING = 100;
const MAP_SIZE = height;
const DIMENSION = 2;
const MAX_ITER = 500;

let sketch = function (p: p5) {
    let problem: AlpineProblem = new AlpineProblem(DIMENSION);
    let solutions: Solution[] = [];
    let algo: GWOAlgo = new GWOAlgo(3, DIMENSION, MAX_ITER);

    /**
     * Problem heatmap building
     */
    const heatmap = computeMap(problem, SAMPLING);
    let maxValue = 0;
    let minValue = 0;
    for (let i = 0; i < heatmap.length; i++) {
        for (let j = 0; j < heatmap.length; j++) {
            if (heatmap[i][j] < minValue) minValue = heatmap[i][j];
            if (heatmap[i][j] > maxValue) maxValue = heatmap[i][j];
        }
    }

    p.setup = function () {
        p.createCanvas(width, height);

        /**
         * Wolves position initialization
         */
        let sol: Solution;
        for (let i = 0; i < algo.popSize; i++) {

            sol = new Solution([], problem);
            for (let j = 0; j < problem.dimension; j++) {
                sol.x.push(Math.random() * (problem.xMax - problem.xMin) + problem.xMin);
            }
            sol.evaluate();
            solutions.push(sol);
        }

        algo.updateParameters();
        algo.updateChiefWolves(solutions);
    }

    p.draw = function () {

        width = window.innerWidth;
        height = window.innerHeight;
        p.resizeCanvas(width, height, true);
        p.background(0);
        const range = (problem.xMax - problem.xMin);

        /**
         * Visualization of the function heatmap
         */
        for (let i = 0; i < heatmap.length; i++) {
            for (let j = 0; j < heatmap.length; j++) {
                const value = heatmap[i][j];
                if (value > 0) p.fill(230, 230 - 230*value/maxValue, 25);
                else p.fill(230 - 230*value/minValue, 230, 25);
                p.noStroke();
                p.rect(i * MAP_SIZE / SAMPLING, j * MAP_SIZE / SAMPLING, MAP_SIZE / SAMPLING + 1, MAP_SIZE / SAMPLING + 1);
            }
        }

        // --------------------------------------------

        /**
         * Main algorithm
         */
        if (algo.t < algo.maxIter) {

            /**
             * Update the position of each wolf
             */
            for (let i = 0; i < algo.popSize; i++) {

                algo.updatePositions(solutions[i]);
                solutions[i].evaluate();

            }

            /**
             * Update the position of the leading wolves
             */
            algo.updateChiefWolves(solutions);

            algo.t += 1; // Increment the number of iteration
        }


        for (let i = 0; i < algo.popSize; i++) {
            p.fill('white');
            p.circle(MAP_SIZE * (solutions[i].x[0] - problem.xMin) / range, MAP_SIZE * (solutions[i].x[1] - problem.xMin)/ range, 5);
        }
    }
}

/**
 * Compute the problem heatmap
 * @param prob
 * @param sampling
 */
function computeMap(prob: Problem, sampling: number): number[][] {
    if (prob.dimension != 2) throw new RangeError("Cannot compute a map with a dimension different from 2.");
    let values = new Array(sampling).fill(0).map(() => new Array(sampling).fill(0));
    let sol: Solution;
    const delta = (prob.xMax - prob.xMin) / sampling;

    for (let i = 0; i < sampling; i++) {
        for (let j = 0; j < sampling; j++) {
            sol = new Solution([prob.xMin + i * delta, prob.xMin + j * delta], prob);
            sol.evaluate();
            values[i][j] = sol.fitness;
        }
    }

    return values;
}

new p5(sketch);