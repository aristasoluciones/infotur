import { InjectionKey } from "vue";
export const stepCounter:InjectionKey<any> = Symbol("STEP_COUNTER");
export const currentStepIndex:InjectionKey<any> = Symbol("CURRENT_STEP_INDEX");
export const loading:InjectionKey<any> = Symbol("LOADING");