import { OnboardingProcess } from "./onboarding/onboardingProcess";
import { LiquidProcess } from "./liquidExample/liquidProcess";

export interface IRegisteredProcesses {
    name: string;
    factory: any;
}

export const Processes: Array<IRegisteredProcesses> =[
    {name:'liquid', factory: LiquidProcess},
    {name:'onboarding', factory: OnboardingProcess},
];