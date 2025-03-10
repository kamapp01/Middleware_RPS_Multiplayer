import {GameContext} from "../2_state/GameContext.js";
import {State_NotPlaying} from "../3_concreteStates/State_NotPlaying.js";

class GameComp {

    private static context:GameContext;

    static {
        this.context = new GameContext(new State_NotPlaying());
    }



    /**
     *
     * @param request
     * @param response
     */
    public static async start(request:any , response:any){

        try{
            this.context.startGame(request, response);

        }catch(error) {

            console.log(`error message: ${error}`);
            return response.status(500).send('An error occurred when you tried to start the game...');
        }
    }


    /**
     *
     * @param request
     * @param response
     */
    public static async play(request:any , response:any){

        try{
            this.context.playGame(request, response);

        }catch (error){
            console.log(`error message: ${error}`);
            return response.status(500).send('An error occurred when you tried to play...');
        }
    }


    /**
     *
     * @param request
     * @param response
     */
    public static async stop(request:any , response:any){

        try{
            this.context.stopGame(request, response);

        }catch (error){
            console.log(`error message: ${error}`);
            return response.status(500).send('An error occurred when you tried to stop the game...');
        }
    }

}
export { GameComp }