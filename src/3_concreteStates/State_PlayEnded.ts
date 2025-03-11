import {AState} from "../2_state/AState.js";
import {State_PlayStarted} from "./State_PlayStarted.js";
import {Hand} from "../4_models/enums/EHand";


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

        const hand_player1: Hand = this.context.player1_hand;
        const hand_player2: Hand = this.context.player2_hand;

        // resets players "hand"
        this.context.player1_hand = null;
        this.context.player2_hand = null;

        this.context.transitionTo(new State_PlayStarted())
        return response.status(200).json({message: `Player 1 you ${this.context.gameStatus_player1.resultCurrentRound} this round [Your hand: ${hand_player1}] & Player 2 you ${this.context.gameStatus_player2.resultCurrentRound} this round [Your hand: ${hand_player2}]`});
    }

    public stopGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You have to end this round first  [stopGame]`});
    }
}
export { State_PlayEnded };