import { OnboardingStates } from '../states';

export function toGenerateContract(): string {
    console.log(`To Generate Contract`);
    return OnboardingStates.GenerateContract;
}
export function backGenerateContract(): string {
    console.log(`Back Generate Contract`);
    return OnboardingStates.GenerateContract;
}