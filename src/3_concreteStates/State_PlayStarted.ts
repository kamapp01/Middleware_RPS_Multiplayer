import {AState} from "../2_state/AState.js";
import {Hand} from "../4_models/enums/EHand.js";
import {State_NotPlaying} from "./State_NotPlaying.js";
import {ResultType} from "../4_models/enums/EResult.js";
import {State_PlayEnded} from "./State_PlayEnded.js";
import {ServerService} from "../5_service/ServerService.js";


// This state represents an active round where players take turns making their moves.
// The game will not transition until both players have made a move.
class State_PlayStarted extends AState {

    /**
     * This method handles an attempt to start a new game while a game is already in progress
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response indicating that the current game must be ended first
     */
    public startGame(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `You must end this game first [from State_PlayStarted]`});
    }


    /**
     * This method processes a player's move.
     * If player 1 hasn't played yet, their move is recorded.
     * If player 2 makes a move, the winner is determined and the game state transitions.
     * @param request - the HTTP request object containing the player's move
     * @param response - the HTTP response object
     * @returns HTTP 200 response if the move is registered successfully, or HTTP 400 if invalid choice
     */
    public playGame(request: any, response: any): any {

        const playerChoice: Hand = request.params.choice;

        // validates player choice
        if (!playerChoice || !Object.values(Hand).includes(playerChoice)) {
            return response.status(400).send('You have to choose a rock, paper or scissors!');
        }


        if (!this.context.player1_hand) {

            // assigning player1's hand
            this.context.player1_hand = playerChoice;
            return response.status(200).send(`You made your move player 1! Waiting for player 2 to make a move 💣`);

        } else {

            // assigning player2's hand
            this.context.player2_hand = playerChoice;

            // determine round result for player 1
            this.context.gameStatus_player1.resultCurrentRound = ServerService.checkWinner(this.context.player1_hand, this.context.player2_hand);

            // record result for player 1
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


            // determine and record result for player 2
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

        // transition to "play ended" state where the round result is finalized and displayed
        this.context.transitionTo(new State_PlayEnded());
        this.context.displayResult(request, response);

    }


    /**
     * This method handles an attempt to display the result while the game is still in progress
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response indicating that both players must make their moves first
     */
    public displayResult(request: any, response: any): any {

        // 400 bad request => status code
        return response.status(400).json({message: `Both players have to make their moves first [from State_PlayStarted]`});
    }


    /**
     * This method stops the game and resets the game state if both players have made a move
     * @param request - the HTTP request object
     * @param response - the HTTP response object
     * @returns HTTP 400 response if player 2 hasn't made a move yet, otherwise HTTP 200 response with results
     */
    public stopGame(request: any, response: any): any {

        const result_player1 = this.context.gameStatus_player1.showResult();
        const result_player2 = this.context.gameStatus_player2.showResult();

        if (this.context.player1_hand && !this.context.player2_hand){
            // 400 bad request => status code
            return response.status(400).json({message: `Player 2 need to make a move before ending the game`});
        }

        // resets the game and transition to the "not playing" state
        this.context.reset();
        this.context.transitionTo(new State_NotPlaying())

        return response.status(200).json({message: `Player 1: ${result_player1}   AND   Player 2: ${result_player2}`})
    }

}
export { State_PlayStarted }