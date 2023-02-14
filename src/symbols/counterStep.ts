import { InjectionKey } from "vue";
export const stepCounter:InjectionKey<any> = Symbol("STEP_COUNTER");
export const currentStepIndex:InjectionKey<any> = Symbol("CURRENT_STEP_INDEX");
export const schemaFormValidation:InjectionKey<any> = Symbol("SCHEMA_FORM_VALIDATION");
export const fnUpdateSchema:InjectionKey<any> = Symbol("FN_UPDATE_SCHEMA");
export const loading:InjectionKey<any> = Symbol("LOADING");