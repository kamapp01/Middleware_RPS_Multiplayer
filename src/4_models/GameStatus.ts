import {ResultType} from "./enums/EResult";

class GameStatus {

    wins: number;
    draws: number;
    losses: number;
    resultCurrentRound:ResultType;

    constructor() {
        this.wins = 0;
        this.draws = 0;
        this.losses = 0;
        this.resultCurrentRound = null;
    }


    recordWin() {
        this.wins++;
    }

    recordDraw() {
        this.draws++;
    }

    recordLoss() {
        this.losses++;
    }

    showResult() : string {
        return `Your game status:   Wins: ${this.wins}    Draws: ${this.draws}    Losses: ${this.losses}`;
    }
}
export {GameStatus}