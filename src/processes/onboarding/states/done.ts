import { States } from '../../sharedBlocks/transitions';
import { FuncParam } from '../../sharedBlocks/IStateMachine';

export function toDone(): string {
    console.log(`To Done`);
    return States.Done;
}

export function isDone(yesState:FuncParam, noState:FuncParam): string {
    console.log(`Decide if the the response is yes or now then call that function`);
    return yesState();
}
