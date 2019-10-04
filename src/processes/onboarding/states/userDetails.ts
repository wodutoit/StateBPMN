import { OnboardingStates } from '../states';

export function toUserDetails(): string {
    console.log(`To User Details`);
    return OnboardingStates.UserDetails;
}
export function backUserDetails(): string {
    console.log(`Back to User Details`);
    return OnboardingStates.UserDetails;
}