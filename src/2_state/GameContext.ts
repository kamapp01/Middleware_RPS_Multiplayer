import {AState} from "./AState.js";
import {IPlayer} from "../4_models/Player.js";
import {Hand} from "../4_models/enums/EHand.js";
import {GameStatus} from "../4_models/GameStatus.js";


class GameContext {

    // state variables
    public player1_registered:boolean;
    public player1_name:IPlayer;
    public player1_hand:Hand;
    public gameStatus_player1:GameStatus;

    public player2_registered:boolean;
    public player2_name:IPlayer;
    public player2_hand:Hand;
    public gameStatus_player2:GameStatus;


    private state:AState;

    constructor(state:AState) {
        this.transitionTo(state);
    }

    public transitionTo(state:AState):void {
        this.state = state;
        this.state.setContext(this);

        console.dir(this.state);
        console.log("Current state: " + this.state);
    }

    public startGame(request:any, response:any){
        this.state.startGame(request, response);
    }

    public playGame(request:any, response:any){

        console.dir(this.state);

        this.state.playGame(request, response);
    }

    public displayResult(request:any, response:any):void {
        this.state.displayResult(request, response);
    }

    public stopGame(request:any, response:any){
        this.state.stopGame(request, response);
    }

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