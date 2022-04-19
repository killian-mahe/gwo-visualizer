import p5 from 'p5';
import './style.css';
import {AlpineProblem, Problem, Solution, SphereProblem} from "./Problem";
import {GWOAlgo} from "./Algo";

const SAMPLING = 100;

let MAP_HEIGHT = Math.min(document.getElementById('map-container')!.offsetHeight, document.getElementById('map-container')!.offsetWidth);
let MAP_WIDTH = MAP_HEIGHT;

enum SimulationState {
    notInitialized,
    initialized,
    started,
    paused,
    stopped
}

let CANVAS: p5.Renderer;

const DIMENSION = 2;
const MAX_ITER = 250;

let problem: Problem = new AlpineProblem(DIMENSION);
let solutions: Solution[] = [];
let simulationState = SimulationState.notInitialized;
let algo: GWOAlgo = new GWOAlgo((document.getElementById('wolves-number') as HTMLInputElement).valueAsNumber, DIMENSION, MAX_ITER);

/**
 * HTML DOM initialization
 */
document.getElementById('control-button-start')!.addEventListener('click', () => {
    if (simulationState === SimulationState.stopped) {
        init();
        simulationState = SimulationState.started;
    } else if (simulationState !== SimulationState.notInitialized) {
        simulationState = SimulationState.started;
    }
})

document.getElementById('wolves-number')!.addEventListener('change', (e) => {
    algo.popSize = (e.target as HTMLInputElement).valueAsNumber;
    init();
})

/**
 * Problem heatmap building
 */
let heatmap = new Array(SAMPLING).fill(0).map(() => new Array(SAMPLING).fill(0));
let maxValue = 0;
let minValue = 0;

let sketch = function (p: p5) {

    p.setup = function () {
        CANVAS = p.createCanvas(MAP_WIDTH, MAP_HEIGHT);
        CANVAS.parent("map-container");

        init();

        algo.updateParameters();
        algo.updateChiefWolves(solutions);
    }

    p.draw = function () {
        updateSettings();
        updateCanvasPosition();
        p.resizeCanvas(MAP_WIDTH, MAP_HEIGHT, true);
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
                p.rect(i * MAP_WIDTH / SAMPLING, j * MAP_HEIGHT / SAMPLING, MAP_WIDTH / SAMPLING + 1, MAP_HEIGHT / SAMPLING + 1);
            }
        }

        // --------------------------------------------

        /**
         * Main algorithm
         */
        if (algo.t < algo.maxIter && simulationState === SimulationState.started) {

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

            document.getElementById('best-solution-fitness')!.innerHTML = algo.alpha!.fitness.toString();

            algo.t += 1; // Increment the number of iteration
        }

        if (algo.t >= algo.maxIter) {
            simulationState = SimulationState.stopped;
        }


        for (let i = 0; i < algo.popSize; i++) {
            p.fill('white');
            p.circle(MAP_WIDTH * (solutions[i].x[0] - problem.xMin) / range, MAP_HEIGHT * (solutions[i].x[1] - problem.xMin)/ range, 7);
        }
    }
}

/**
 * Compute the problem heatmap
 */
function computeMap() {
    if (problem.dimension != 2) throw new RangeError("Cannot compute a map with a dimension different from 2.");
    heatmap = new Array(SAMPLING).fill(0).map(() => new Array(SAMPLING).fill(0));
    let sol: Solution;
    const delta = (problem.xMax - problem.xMin) / SAMPLING;

    for (let i = 0; i < SAMPLING; i++) {
        for (let j = 0; j < SAMPLING; j++) {
            sol = new Solution([problem.xMin + i * delta, problem.xMin + j * delta], problem);
            sol.evaluate();
            heatmap[i][j] = sol.fitness;
        }
    }
}

/**
 * Update the canvas size and position.
 */
function updateCanvasPosition() {
    MAP_HEIGHT = Math.min(document.getElementById('map-container')!.offsetHeight, document.getElementById('map-container')!.offsetWidth);
    MAP_WIDTH = MAP_HEIGHT;
}

function updateSettings() {
    let problemType = (document.getElementById("problem-select") as HTMLSelectElement).value;

    switch (problemType) {
        case 'alpine':
            if (!(problem instanceof AlpineProblem))
            {
                problem = new AlpineProblem(DIMENSION);
                init();
            }
            break;
        case 'sphere':
            if (!(problem instanceof SphereProblem))
            {
                problem = new SphereProblem(DIMENSION);
                init();
            }
            break;
        default:
            if (!(problem instanceof AlpineProblem))
            {
                problem = new AlpineProblem(DIMENSION);
                init();
            }
            break;
    }
}

function init() {
    simulationState = SimulationState.notInitialized;
    minValue = 0;
    maxValue = 0;
    computeMap();
    algo.reset();
    for (let i = 0; i < heatmap.length; i++) {
        for (let j = 0; j < heatmap.length; j++) {
            if (heatmap[i][j] < minValue) minValue = heatmap[i][j];
            if (heatmap[i][j] > maxValue) maxValue = heatmap[i][j];
        }
    }

    let sol: Solution;
    solutions = [];
    for (let i = 0; i < algo.popSize; i++) {

        sol = new Solution([], problem);
        for (let j = 0; j < problem.dimension; j++) {
            sol.x.push(Math.random() * (problem.xMax - problem.xMin) + problem.xMin);
        }
        sol.evaluate();
        solutions.push(sol);
    }

    simulationState = SimulationState.initialized;
}

new p5(sketch);