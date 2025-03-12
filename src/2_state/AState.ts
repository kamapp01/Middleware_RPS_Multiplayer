import {GameContext} from "./GameContext.js";

abstract class AState {

    // reference to the GameContext allowing states to interact with it
    protected context:GameContext;

    /**
     * Sets the game context for this state
     * @param context - the current game context
     */
    public setContext(context:GameContext):void {
        this.context = context;
    }

    // abstract methods to be implemented by concrete states
    public abstract startGame(request:any, response:any):any;
    public abstract playGame(request:any, response:any):any;
    public abstract displayResult(request:any, response:any):any;
    public abstract stopGame(request:any, response:any):any;
}
export { AState };