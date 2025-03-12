import {AState} from "../2_state/AState.js";
import {State_PlayStarted} from "./State_PlayStarted.js";
import {Hand} from "../4_models/enums/EHand.js";


// This state represents the end of a round where results are displayed before transitioning back to a new round.
// Players cannot start or play a new round until the results have been displayed.
class State_PlayEnded extends AState{

    /**
     * This method handles an attempt to start a new game while a round result has not been finalized.
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response indicating that the round must be ended first
     */
    public startGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You must end this game first [from State_PlayEnded]`});
    }


    /**
     * This method handles an attempt to play a move while the round has already ended.
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response indicating that the round must be ended first
     */
    public playGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You have to end this round first [from State_PlayEnded]`});
    }


    /**
     * This method displays the result of the round, resets players' choices and transitions the game state
     * back to "play started" for a new round.
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 200 response displaying each player's move and result
     */
    public displayResult(request: any, response: any): any {

        const hand_player1: Hand = this.context.player1_hand;
        const hand_player2: Hand = this.context.player2_hand;

        // resets players hands after the round result is displayed
        this.context.player1_hand = null;
        this.context.player2_hand = null;

        // transition to the "play started" state (for the next round)
        this.context.transitionTo(new State_PlayStarted())
        return response.status(200).json({message: `Player 1 you ${this.context.gameStatus_player1.resultCurrentRound} this round [Your hand: ${hand_player1}] & Player 2 you ${this.context.gameStatus_player2.resultCurrentRound} this round [Your hand: ${hand_player2}]`});
    }


    /**
     * This method handles an attempt to stop the game while a round result hasn't been finalized.
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response indicating that the round must be ended first
     */
    public stopGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You have to end this round first [from State_PlayEnded]`});
    }
}
export { State_PlayEnded };