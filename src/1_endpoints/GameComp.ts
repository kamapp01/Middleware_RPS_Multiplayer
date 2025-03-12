import {GameContext} from "../2_state/GameContext.js";
import {State_NotPlaying} from "../3_concreteStates/State_NotPlaying.js";

class GameComp {

    // static instance of GameContext that keeps track of the game's state
    private static context:GameContext;

    // initialize the context with the starting state "State_NotPlaying"
    static {
        this.context = new GameContext(new State_NotPlaying());
    }



    /**
     * This method starts the game by calling the startGame method on GameContext.
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     */
    public static async start(request:any , response:any){

        try {
            this.context.startGame(request, response);

        } catch(error) {
            console.log(`error message: ${error}`);
            return response.status(500).send('An error occurred when you tried to start the game...');
        }
    }


    /**
     * This method handles the main gameplay action, calling the playGame method on GameContext.
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     */
    public static async play(request:any , response:any){

        try {
            this.context.playGame(request, response);

        } catch (error){
            console.log(`error message: ${error}`);
            return response.status(500).send('An error occurred when you tried to play...');
        }
    }


    /**
     * This method stops the game by calling the stopGame method on GameContext.
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     */
    public static async stop(request:any , response:any){

        try {
            this.context.stopGame(request, response);

        } catch (error){
            console.log(`error message: ${error}`);
            return response.status(500).send('An error occurred when you tried to stop the game...');
        }
    }

}
export { GameComp }