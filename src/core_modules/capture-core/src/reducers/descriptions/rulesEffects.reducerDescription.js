// @flow
import { createReducerDescription } from '../../trackerRedux/trackerReducer';
import { actionTypes } from '../../rulesEngineActionsCreator/rulesEngine.actions';
import effectActions from '../../RulesEngine/effectActions.const';
import type { OutputEffect } from '../../RulesEngine/rulesEngine.types';

export const messageStateKeys = {
    ERROR: 'error',
    WARNING: 'warning',
    ERROR_ON_COMPLETE: 'errorOnComplete',
    WARNING_ON_COMPLETE: 'warningOnComplete',
};

export const eventsRulesEffectsHiddenFieldsDesc = createReducerDescription({
    [actionTypes.UPDATE_RULES_EFFECTS_EVENT]: (state, action) => {
        const newState = { ...state };

        const hideEffects: { [id: string]: Array<OutputEffect> } = action.payload.rulesEffects && action.payload.rulesEffects[effectActions.HIDE_FIELD];
        newState[action.payload.formId] = hideEffects ?
            Object.keys(hideEffects).reduce((accState, key) => {
                accState[key] = true;
                return accState;
            }, {}) :
            null;

        return newState;
    },
}, 'eventsRulesEffectsHiddenFields');

const mapMessageEffectTypeToStateKey = {
    [effectActions.SHOW_ERROR]: messageStateKeys.ERROR,
    [effectActions.SHOW_WARNING]: messageStateKeys.WARNING,
    [effectActions.SHOW_ERROR_ONCOMPLETE]: messageStateKeys.ERROR_ON_COMPLETE,
    [effectActions.SHOW_WARNING_ONCOMPLETE]: messageStateKeys.WARNING_ON_COMPLETE,
};

export const eventsRulesEffectsErrorMessagesDesc = createReducerDescription({
    [actionTypes.UPDATE_RULES_EFFECTS_EVENT]: (state, action) => {
        const newState = { ...state };

        const errorEffects: { [id: string]: Array<OutputEffect> } = action.payload.rulesEffects && action.payload.rulesEffects[effectActions.SHOW_ERROR];
        const warningEffects: { [id: string]: Array<OutputEffect> } = action.payload.rulesEffects && action.payload.rulesEffects[effectActions.SHOW_WARNING];
        const errorEffectsOnComplete: { [id: string]: Array<OutputEffect> } = action.payload.rulesEffects && action.payload.rulesEffects[effectActions.SHOW_ERROR_ONCOMPLETE];
        const warningEffectsOnComplete: { [id: string]: Array<OutputEffect> } = action.payload.rulesEffects && action.payload.rulesEffects[effectActions.SHOW_WARNING_ONCOMPLETE];

        const messageEffectsArray = [errorEffects, warningEffects, errorEffectsOnComplete, warningEffectsOnComplete];
        newState[action.payload.formId] = messageEffectsArray.reduce((accMessagesById, effects) => {
            if (!effects) {
                return accMessagesById;
            }

            return Object.keys(effects).reduce((accMessagesByIdInCurrentEffects, key) => {
                accMessagesByIdInCurrentEffects[key] = accMessagesByIdInCurrentEffects[key] || {};

                const effect = effects[key][0];
                const typeKey = mapMessageEffectTypeToStateKey[effect.type];
                accMessagesByIdInCurrentEffects[key][typeKey] = effect.message;
                return accMessagesByIdInCurrentEffects;
            }, accMessagesById);
        }, {});

        return newState;
    },
}, 'eventsRulesEffectsMessages');
