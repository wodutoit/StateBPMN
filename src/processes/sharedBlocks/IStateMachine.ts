import { StateMachine } from 'javascript-state-machine';

export interface IStateMachine extends StateMachine {
    id: string;
}

export type FuncParam = () => string;