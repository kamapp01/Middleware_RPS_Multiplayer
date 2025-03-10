import {AState} from "../2_state/AState.js";
import {State_PlayStarted} from "./State_PlayStarted.js";
import {ResultType} from "../4_models/enums/EResult.js";

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

        switch (this.context.gameStatus.resultCurrentRound){
            case ResultType.Win:
                this.context.gameStatus.recordWin();
                this.context.transitionTo(new State_PlayStarted());

                return response.status(200).json({message: `You win this round!     (Your move: ${this.context.player_hand}  vs.  Opponent move: ${this.context.computer_hand})`});

            case ResultType.Draw:
                this.context.gameStatus.recordDraw();
                this.context.transitionTo(new State_PlayStarted());

                return response.status(200).json({message: `It's a draw this round! Try again!     (Your move: ${this.context.player_hand}  vs.  Opponent move: ${this.context.computer_hand})`});

            case ResultType.Loss:
                this.context.gameStatus.recordLoss();
                this.context.transitionTo(new State_PlayStarted());

                return response.status(200).json({message: `You lost this round! Better luck next time!     (Your move: ${this.context.player_hand}  vs.  Opponent move: ${this.context.computer_hand})`});

            default:
                return response.status(400).json({message: `Something went wrong displaying result!`});
        }

    }

    public stopGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You have to end this round first  [stopGame]`});
    }
}
export { State_PlayEnded };