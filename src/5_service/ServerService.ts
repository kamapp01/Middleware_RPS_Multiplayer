import { Hand } from "../4_models/enums/EHand.js";
import {ResultType} from "../4_models/enums/EResult.js";

class ServerService{

    /**
     * This method determines the winner of a rock-paper-scissors round based on player choices.
     * @param player1_choice - The choice made by Player 1 (rock, paper, or scissors)
     * @param player2_choice - The choice made by Player 2 (rock, paper, or scissors)
     * @returns A ResultType indicating whether Player 1 won, lost, or if the round was a draw
     */
    public static checkWinner(player1_choice:string, player2_choice:string):ResultType{

        if(player1_choice === player2_choice){
            return ResultType.Draw;
        }
        else{

            if(player1_choice === Hand.Rock && player2_choice === Hand.Scissors){
                return ResultType.Win;
            }
            else if (player1_choice === Hand.Paper && player2_choice === Hand.Rock){
                return ResultType.Win;
            }
            else if (player1_choice === Hand.Scissors && player2_choice === Hand.Paper){
                return ResultType.Win;
            }
            else {
                return ResultType.Loss;
            }
        }
    }


}
export { ServerService };