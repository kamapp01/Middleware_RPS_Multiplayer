import {AState} from "./AState.js";
import {IPlayer} from "../4_models/Player.js";
import {Hand} from "../4_models/enums/EHand.js";
import {GameStatus} from "../4_models/GameStatus.js";


class GameContext {

    // player 1 state variables
    public player1_registered:boolean;
    public player1_name:IPlayer;
    public player1_hand:Hand;
    public gameStatus_player1:GameStatus;

    // player 2 state variables
    public player2_registered:boolean;
    public player2_name:IPlayer;
    public player2_hand:Hand;
    public gameStatus_player2:GameStatus;


    // current state of the game
    private state:AState;

    // initializes the game context with a given state
    constructor(state:AState) {
        this.transitionTo(state);
    }


    /**
     * This method transitions the game to a new state and updates the state context
     * @param state - the new state to transition to
     */
    public transitionTo(state:AState):void {
        this.state = state;
        this.state.setContext(this);

        // log to track the current state and state variables
        console.dir(this.state);
    }


    /**
     * This method starts the game by delegating to the current state's startGame method
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     */
    public startGame(request:any, response:any){
        this.state.startGame(request, response);
    }


    /**
     * This method handles gameplay actions by delegating to the current state's playGame method
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     */
    public playGame(request:any, response:any){

        // log to track the current state and state variables during gameplay
        console.dir(this.state);
        this.state.playGame(request, response);
    }


    /**
     * This method displays the game result by delegating to the current state's displayResult method
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     */
    public displayResult(request:any, response:any):void {
        this.state.displayResult(request, response);
    }


    /**
     * This method stops the game by delegating to the current state's stopGame method
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     */
    public stopGame(request:any, response:any){
        this.state.stopGame(request, response);
    }


    /**
     * This method resets the game state by clearing all player data
     */
    public reset(): void{
        this.player1_registered = false;
        this.player1_name = null;
        this.player1_hand = null;
        this.gameStatus_player1 = new GameStatus();

        this.player2_registered = false;
        this.player2_name = null;
        this.player2_hand = null;
        this.gameStatus_player2 = new GameStatus();
    }

}
export { GameContext };