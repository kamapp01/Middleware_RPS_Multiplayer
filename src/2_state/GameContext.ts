import {AState} from "./AState.js";
import {IPlayer} from "../4_models/Player.js";
import {Hand} from "../4_models/enums/EHand.js";
import {GameStatus} from "../4_models/GameStatus.js";


class GameContext {

    // state variables
    public player_registered:boolean;
    public player_name:IPlayer;
    public player_hand:Hand;
    public computer_hand:Hand;
    public gameStatus:GameStatus;

    private state:AState;

    constructor(state:AState) {
        this.gameStatus = new GameStatus();
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
        this.state.playGame(request, response);
    }

    public displayResult(request:any, response:any):void {
        this.state.displayResult(request, response);
    }

    public stopGame(request:any, response:any){
        this.state.stopGame(request, response);
    }

    public reset(): void{
        this.player_registered = false;
        this.player_name = null;
        this.player_hand = null;
        this.computer_hand = null;
        this.gameStatus = new GameStatus();
    }

}
export { GameContext };