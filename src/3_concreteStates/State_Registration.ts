import {AState} from "../2_state/AState.js";
import {State_PlayStarted} from "./State_PlayStarted.js";

class State_Registration extends AState{

    public startGame(request: any, response: any): any {

        const playerName:string = request.params.name;
        if (!playerName){
            return response.status(400).send('Player name is required');
        }

        // sets two states variables
        this.context.player2_registered = true;
        this.context.player2_name = { name: playerName };

        this.context.transitionTo(new State_PlayStarted());
        return response.status(200).json({message: `Have a nice game, ${playerName}! [Player 2]`});

    }

    public playGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `Player 2 need to be registered before playing`});
    }

    public displayResult(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `Player 2 need to be registered before playing`});
    }

    public stopGame(request: any, response: any): any {
        return response.status(400).json({message: `Player 2 need to be registered before playing`});
    }

}
export { State_Registration };