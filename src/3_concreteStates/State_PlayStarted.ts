import {AState} from "../2_state/AState.js";
import {Hand} from "../4_models/enums/EHand.js";
import {ServerService} from "../5_service/ServerService.js";
import {State_PlayEnded} from "./State_PlayEnded.js";
import {State_NotPlaying} from "./State_NotPlaying.js";

class State_PlayStarted extends AState{

    public startGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You must end this game first  [startGame]`});
    }

    public playGame(request: any, response: any): any {

        const playerChoice:Hand = request.params.choice;
        if (!playerChoice || (playerChoice !== 'rock' && playerChoice !== 'paper' && playerChoice !== 'scissors')){
            return response.status(400).send('You have to choose a rock, paper or scissors!');
        }

        // Assigning player hand and computer hand
        this.context.player_hand = playerChoice;
        this.context.computer_hand = ServerService.getServerChoice();

        // Result current round
        this.context.gameStatus.resultCurrentRound = ServerService.checkWinner(this.context.player_hand, this.context.computer_hand);

        this.context.transitionTo(new State_PlayEnded());
        this.context.displayResult(request, response);
    }

    public displayResult(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You have to make your move first  [displayResult]`});
    }

    public stopGame(request: any, response: any): any {

        const result = this.context.gameStatus.showResult();

        this.context.reset();
        this.context.transitionTo(new State_NotPlaying())

        return response.status(200).json({message:result})
    }

}
export { State_PlayStarted }