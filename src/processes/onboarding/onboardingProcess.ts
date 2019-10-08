import { OnboardingStates } from './states';
import { Transitions, States } from '../sharedBlocks/transitions';
import { toCreateProfile } from './states/createProfile';
import { toUserDetails, backUserDetails } from './states/userDetails';
import { toDocumentUpload, backDocumentUpload } from './states/documentUpload';
import { toGenerateContract} from './states/generateContract';
import { toDone } from './states/done';

var StateMachine = require('javascript-state-machine');

export const OnboardingProcess = StateMachine.factory({
  data: function(id: string) {      //  <-- use a method that can be called for each instance
    return {
      id
    }
  },
  init: States.Initial,
  transitions: [
    { name: Transitions.Next, from: States.Initial,  to: toCreateProfile},
    { name: Transitions.Next, from: OnboardingStates.CreateProfile, to: toUserDetails},
    { name: Transitions.Next, from: OnboardingStates.UserDetails, to: toDocumentUpload},
    { name: Transitions.Next, from: OnboardingStates.DocumentUpload, to: toGenerateContract},
    { name: Transitions.Next, from: OnboardingStates.GenerateContract, to: () => { toDone(); }},
    //{ name: Transitions.Next, from: OnboardingStates.GenerateContract, to: () => { isDone(toDone, toGenerateContract); }},

    { name: Transitions.Back, from: OnboardingStates.GenerateContract, to: backDocumentUpload},
    { name: Transitions.Back, from: OnboardingStates.DocumentUpload, to: backUserDetails},
  ],
  methods: {
    //there are a bunch of life cycle hooks available
    onNext: function() { console.log('move Next')    },
    onBack: function() { console.log('move Back')     },
    onInvalidTransition: (transition: any, from: any, to: any) => { console.log(`Transition is invalid : ${transition}, from: ${from}, to:${to}`)}
  }
  });