import {AState} from "../2_state/AState.js";
import {State_PlayStarted} from "./State_PlayStarted.js";
import {GameStatus} from "../4_models/GameStatus.js";


// This state represents the registration phase where Player 2 must register before the game can start.
// The game cannot proceed until Player 2 is registered.
class State_Registration extends AState{

    /**
     * This method registers player 2 and transition the game state and transition to the next state => State_PlayStarted
     * @param request - the HTTP request object containing the player's name
     * @param response - the HTTP response object
     * @returns HTTP 400 response if no name is provided, otherwise HTTP 200 response confirming registration
     */
    public startGame(request: any, response: any): any {

        const playerName:string = request.params.name;
        if (!playerName){
            return response.status(400).send('Player name is required');
        }

        // sets player 2's registration details and initialize GameStatus
        this.context.player2_registered = true;
        this.context.player2_name = { name: playerName };
        this.context.gameStatus_player2 = new GameStatus();

        // transition to "play started" state
        this.context.transitionTo(new State_PlayStarted());
        return response.status(200).json({message: `Have a nice game, ${playerName}! [Player 2]`});
    }


    /**
     * This method prevents the game from proceeding until Player 2 is registered
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response indicating that Player 2 must be registered first
     */
    public playGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `Player 2 need to be registered before playing [from State_Registration]`});
    }


    /**
     * This method prevents the game from displaying results until Player 2 is registered
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response indicating that Player 2 must be registered first
     */
    public displayResult(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `Player 2 need to be registered before playing [from State_Registration]`});
    }


    /**
     * This method prevents the game from stopping until Player 2 is registered.
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response indicating that Player 2 must be registered first
     */
    public stopGame(request: any, response: any): any {
        return response.status(400).json({message: `Player 2 need to be registered before playing [from State_Registration]`});
    }

}
export { State_Registration };