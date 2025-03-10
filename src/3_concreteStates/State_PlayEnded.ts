import {AState} from "../2_state/AState.js";


class State_PlayEnded extends AState{


    public startGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You must end this game first  [startGame]`});
    }

    public playGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You have to end this round first  [playGame]`});
    }

    public displayResult(request: any, response: any): any {

        return response.status(200).json({message: `Player 1 you ${this.context.gameStatus_player1.resultCurrentRound} this round & Player 2 you ${this.context.gameStatus_player1.resultCurrentRound} this round. `});
    }

    public stopGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You have to end this round first  [stopGame]`});
    }
}
export { State_PlayEnded };