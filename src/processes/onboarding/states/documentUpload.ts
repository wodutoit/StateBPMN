import { OnboardingStates } from '../states';

export function toDocumentUpload(): string {
    console.log(`To document upload`);
    return OnboardingStates.DocumentUpload;
}
export function backDocumentUpload(): string {
    console.log(`Back to Document Upload`);
    return OnboardingStates.DocumentUpload;
}