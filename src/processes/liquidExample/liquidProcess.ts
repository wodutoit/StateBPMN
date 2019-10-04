var StateMachine = require('javascript-state-machine');

export const LiquidProcess = StateMachine.factory({
  data: function(name: string) {      //  <-- use a method that can be called for each instance
    return {
      name
    }
  },
  init: 'solid',
  transitions: [
    { name: 'melt',     from: 'solid',  to: 'liquid' },
    { name: 'freeze',   from: 'liquid', to: 'solid'  },
    { name: 'vaporize', from: 'liquid', to: 'gas'    },
    { name: 'condense', from: 'gas',    to: 'liquid' },
    { name: 'random', from: 'liquid',    to: 'liquid' }
  ],
  methods: {
    onMelt:     function() { console.log('I melted')    },
    onFreeze:   function() { console.log('I froze')     },
    onVaporize: function() { console.log('I vaporized') },
    onCondense: function() { console.log('I condensed') },
    onRandom: function() { console.log('I Randomly Did NOTHING!') },
    onInvalidTransition: (transition: any, from: any, to: any) => { console.log(`Transition is invalid : ${transition}, from: ${from}, to:${to}`)}
  }
  });