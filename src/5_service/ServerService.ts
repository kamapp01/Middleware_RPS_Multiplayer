import { Hand } from "../4_models/enums/EHand.js";
import {ResultType} from "../4_models/enums/EResult.js";

class ServerService{

    public static getServerChoice():Hand{
        const enumValues = Object.values(Hand);
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        return enumValues[randomIndex];
    }

    public static checkWinner(clientChoice:string, serverChoice:string):ResultType{

        if(clientChoice === serverChoice){
            return ResultType.Draw;
        }
        else{

            if(clientChoice === Hand.Rock && serverChoice === Hand.Scissors){
                return ResultType.Win;
            }
            else if (clientChoice === Hand.Paper && serverChoice === Hand.Rock){
                return ResultType.Win;
            }
            else if (clientChoice === Hand.Scissors && serverChoice === Hand.Paper){
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