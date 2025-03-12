import {AState} from "../2_state/AState.js";
import {State_Registration} from "./State_Registration.js";
import {GameStatus} from "../4_models/GameStatus.js";


// This state represents the initial phase where the game has not started yet.
// The game must transition from this state by registering Player 1 before it can proceed.
class State_NotPlaying extends AState{


    /**
     * This method starts the game by registering player 1 and transition to the next state => State_Registration
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP response indicating success or failure
     */
    public startGame(request: any, response: any): any {

        const playerName:string = request.params.name;
        if (!playerName){
            return response.status(400).send('Player name is required');
        }

        // sets player 1's registration details and initialize GameStatus
        this.context.player1_registered = true;
        this.context.player1_name = { name: playerName };
        this.context.gameStatus_player1 = new GameStatus();

        // transition to the registration state
        this.context.transitionTo(new State_Registration());
        return response.status(200).json({message: `Have a nice game, ${playerName}! [Player 1]`});
    }


    /**
     * This method handles an attempt to play the game while in the "not playing" state
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response indicating that the game hasn't started
     */
    public playGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You must start the game first before playing [from State_NotPlaying]`});
    }


    /**
     * This method handles an attempt to display result while in the "not playing" state
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response indicating that the game hasn't started
     */
    public displayResult(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You have to start the game first [from State_NotPlaying]}`});
    }


    /**
     * This method handles an attempt to stop the game while in the "not playing" state
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response indicating that the game hasn't started
     */
    public stopGame(request: any, response: any): any {
        return response.status(400).json({message: `You have to start the game first [from State_NotPlaying]`});
    }

}
export { State_NotPlaying };