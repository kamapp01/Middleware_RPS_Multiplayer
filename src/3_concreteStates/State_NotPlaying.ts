import {AState} from "../2_state/AState.js";
import {State_Registration} from "./State_Registration.js";

class State_NotPlaying extends AState{


    public startGame(request: any, response: any): any {

        const playerName:string = request.params.name;
        if (!playerName){
            return response.status(400).send('Player name is required');
        }

        // sets two states variables
        this.context.player1_registered = true;
        this.context.player1_name = { name: playerName };

        this.context.transitionTo(new State_Registration());
        return response.status(200).json({message: `Have a nice game, ${playerName}! [Player 1]`});
    }

    public playGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You must start the game first before playing  [playGame]`});
    }

    public displayResult(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You have to start the game first  [displayResult]}`});
    }

    public stopGame(request: any, response: any): any {
        return response.status(400).json({message: `You have to start the game first  [stopGame]`});
    }

}
export { State_NotPlaying };