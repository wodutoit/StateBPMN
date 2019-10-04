import { OnboardingStates } from '../states';

export function toCreateProfile(): string {
    console.log(`To Create Profile`);
    return OnboardingStates.CreateProfile;
}
export function backCreateProfile(): string {
    console.log(`Back Create Profile`);
    return OnboardingStates.CreateProfile;
}