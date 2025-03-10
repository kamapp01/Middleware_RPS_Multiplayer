import { Hand } from "../4_models/enums/EHand.js";
import {ResultType} from "../4_models/enums/EResult.js";

class ServerService{

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

    /*
    checkWinner(clientChoice: string, serverChoice: string): string {
        if (clientChoice === serverChoice) {
            return ResultType.Draw;
        }

        // Objekt der definerer, hvad der vinder mod hvad
        const winConditions = {
            [Hand.Rock]: Hand.Scissors,
            [Hand.Paper]: Hand.Rock,
            [Hand.Scissors]: Hand.Paper,
        };

        // Hvis serverens valg er noget, klientens valg slår, så klienten vinder
        if (winConditions[clientChoice] === serverChoice) {
            return ResultType.Win;
        }

        return ResultType.Loss;
    }
    */

}
export { ServerService };