import {GameContext} from "./GameContext.js";

abstract class AState {

    protected context:GameContext;

    public setContext(context:GameContext):void {
        this.context = context;
    }

    public abstract startGame(request:any, response:any):any;
    public abstract playGame(request:any, response:any):any;
    public abstract displayResult(request:any, response:any):any;
    public abstract stopGame(request:any, response:any):any;
}
export { AState };