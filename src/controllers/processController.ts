import { Processes, IRegisteredProcesses } from "../processes/processRegister";
import { IStateMachine } from '../processes/sharedBlocks/IStateMachine';
import { States } from '../processes/sharedBlocks/transitions';
const uuidv4 = require('uuid/v4');

interface IRunningProcess {
  type: string;
  process: IStateMachine;
}

const existingProcesses = Processes.map(n => n.name);
const runningProcesses: Array<IRunningProcess> = [];

export function getProcessNames(req: any, res: any) {
    res.status(200).send({
      success: 'true',
      message: 'Registered process names retrieved successfully',
      todos: existingProcesses
    })
}

export function getRunningProcessIds(req: any, res: any) {
    res.status(200).send({
      success: 'true',
      message: 'Running process names retrieved successfully',
      processes: runningProcesses.map(p => p.process.id )
    })
}

/**
 * Launch a new instance of a process
 * The process name needs to be unique
 * Expects JSON parameters
 * {
 *	"processType":"",
 * }
 */
export function postLaunchProcess(req: any, res: any) {

    if(!req.body.processType) {
      return res.status(400).send({
        success: 'false',
        message: 'process type is a required parameter'
      });
    } else if(!existingProcesses.find(p => p === req.body.processType)) {
        return res.status(400).send({
          success: 'false',
          message: `process type: ${req.body.processType} does not exist.`
        });
      } 
    //console.log(`processName: ${req.body.process}`);
    //const factory = StateMachine.factory(Processes[req.body.process]);
    const processType: string = req.body.processType;
    const regProcess: IRegisteredProcesses = Processes.find(p => p.name === processType)!;
    const process = new regProcess.factory(uuidv4());
    runningProcesses.push({type: processType, process});
   
   return res.status(201).send({
     success: 'true',
     message: 'process launched',
     state: process.state,
     processId: process.id
   })
}

/**
 * Use the next transition if it can be made to go to the next state.
 * Expects JSON parameters 
 * {
 *  "processId":"",
 * } 
 */
export function next(req: any, res: any) {
  const process: any = findProcess(req, res);
  if(process) {
    process.next();
    const state = process.state; 
    if(process.state === States.Done) {
      const idx = runningProcesses.findIndex(p => p.process.id === process.id);
      runningProcesses.splice(idx,1);
    }
    return res.status(201).send({
      success: 'true',
      message: 'transition next called',
      state: state
    });
  } else {
    return res.status(400).send({
      success: 'false',
      message: 'process not found'
    });
  }
}

/**
 * Can the requested transition be made
 * Expects JSON parameters 
 * {
 *  "processId":"",
 *  "toState":""
 * }
 */
export function can(req: any, res: any) {

}

/**
 * Use the back transition from the current state if there is one.
 * If there is no back transition return an error.
 * Expects JSON parameters 
 * {
 *  "processId":""
 * }
 */
export function back(req: any, res: any) {
  const process: any = findProcess(req, res);
  if(process) {
    process.back();
    return res.status(201).send({
      success: 'true',
      message: 'transition next called',
      state: process.state
    });
  } else {
    return res.status(400).send({
      success: 'false',
      message: 'process not found'
    });
  }
}

function findProcess(req: any, res: any): IStateMachine | undefined {
  if(!req.body.processId) {
    return res.status(400).send({
      success: 'false',
      message: 'process id is required is required'
    });
  }
  const processId: string = req.body.processId;
  const rp = runningProcesses.find(p => p.process.id === processId);
  return rp ? rp.process : undefined;
}