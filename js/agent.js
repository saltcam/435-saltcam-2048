
class Agent {

    constructor(gameManager) {
       this.game = gameManager
    }

    selectMove(game, depth) {

        let brain = new AgentBrain(this, game);
        let boardScores = [0, 0, 0, 0];
        // Use the brain to simulate moves
        for (let i = 0; i < 4; i++) {
            if(brain.move(i)) {
                // brain.reset();
                brain.move(i);
                boardScores[i] = this.evaluateGrid(game);
                if(depth < 3) {
                    boardScores[this.selectMove(game, depth+1)] += this.evaluateGrid(game);
                }
                brain.reset()
            }
        }

        let index = boardScores.indexOf(Math.max(...boardScores));
        // console.log("Index: " + index)

        return index;
        // brain.move(i)
        // i = 0: up, 1: right, 2: down, 3: left
        // brain.reset() resets the brain to the current game board

        // Is this good?????????
        // if (brain.move(0)) return 0;
        // if (brain.move(1)) return 1;
        // if (brain.move(3)) return 3;
        // if (brain.move(2)) return 2;
    };
    
    evaluateGrid(gameManager) {
        // calculate a score for the current grid configuration

        let scoreMatrix = [
            [0, -10, -50, -100],
            [10, 0, -10, -50],
            [50, 10, 0, -10],
            [100, 50, 10, 0]
        ]

        let score = 0;

        for (let i = 0; i < scoreMatrix.length; i++) {
            for (let j = 0; j < scoreMatrix[i].length; j++) {
                if(gameManager.grid.cells[i][j]) {
                    // console.log("VALUE: " + gameManager.grid.cells[i][j].value);
                    score += scoreMatrix[i][j] * Math.log2(gameManager.grid.cells[i][j].value);
                }
            }
        }

        return score;
    
    };
}
