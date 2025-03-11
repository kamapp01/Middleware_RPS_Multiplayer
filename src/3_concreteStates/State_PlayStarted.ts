import {AState} from "../2_state/AState.js";
import {Hand} from "../4_models/enums/EHand.js";
import {State_NotPlaying} from "./State_NotPlaying.js";
import {ResultType} from "../4_models/enums/EResult.js";
import {State_PlayEnded} from "./State_PlayEnded.js";
import {ServerService} from "../5_service/ServerService.js";


class State_PlayStarted extends AState {

    public startGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You must end this game first.`});
    }

    public playGame(request: any, response: any): any {

        const playerChoice: Hand = request.params.choice;
        if (!playerChoice || !Object.values(Hand).includes(playerChoice)) {
            return response.status(400).send('You have to choose a rock, paper or scissors!');
        }


        if (!this.context.player1_hand) {

            console.log("player 1 chooice: " + playerChoice);

            // Assigning player1 hand
            this.context.player1_hand = playerChoice;
            return response.status(200).send(`You made your move player 1! Waiting for player 2 to make a move 💣`);

        } else {

            console.log("player 2 chooice: " + playerChoice);

            // Assigning player2 hand
            this.context.player2_hand = playerChoice;


            console.log("gameStatus_player1 before setting result:", this.context.gameStatus_player1);
            console.log("gameStatus_player2 before setting result:", this.context.gameStatus_player2);


            // Result current round player 1
            this.context.gameStatus_player1.resultCurrentRound = ServerService.checkWinner(this.context.player1_hand, this.context.player2_hand);

            // recording result from current round
            switch (this.context.gameStatus_player1.resultCurrentRound){
                case ResultType.Draw:
                    this.context.gameStatus_player1.recordDraw();
                    break;
                case ResultType.Win:
                    this.context.gameStatus_player1.recordWin();
                    break;
                case ResultType.Loss:
                    this.context.gameStatus_player1.recordLoss();
                    break;
            }


            // Result current round player 2 and recording result from current round
            switch (this.context.gameStatus_player1.resultCurrentRound) {
                case ResultType.Draw:
                    this.context.gameStatus_player2.resultCurrentRound = ResultType.Draw;
                    this.context.gameStatus_player2.recordDraw();
                    break;
                case ResultType.Win:
                    this.context.gameStatus_player2.resultCurrentRound = ResultType.Loss;
                    this.context.gameStatus_player2.recordLoss();
                    break;
                case ResultType.Loss:
                    this.context.gameStatus_player2.resultCurrentRound = ResultType.Win;
                    this.context.gameStatus_player2.recordWin();
                    break;
                default:
                    return response.status(400).json({message: `Something went wrong while getting the result!`});
            }
        }

        this.context.transitionTo(new State_PlayEnded());
        this.context.displayResult(request, response);

    }



    public displayResult(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `Both players have to make their moves first.`});
    }

    public stopGame(request: any, response: any): any {

        const result_player1 = this.context.gameStatus_player1.showResult();
        const result_player2 = this.context.gameStatus_player2.showResult();

        if (this.context.player1_hand && !this.context.player2_hand){

            // 400 bad request => status code
            return response.status(400).json({message: `Player 2 need to make a move before ending the game`});
        }

        this.context.reset();
        this.context.transitionTo(new State_NotPlaying())

        return response.status(200).json({message: `Player 1: ${result_player1}   AND   Player 2: ${result_player2}`})
    }

}
export { State_PlayStarted }