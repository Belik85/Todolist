import {resolveAny} from "dns";

type StateType = {
    age: number,
    childrenCount: number,
    name: string
}

type ActionType = {
    type: string,
    [key: string]: any,
}


export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let copyState = {...state}

            copyState.age = state.age + 1;
            return copyState;

        // state.age = state.age + 1;
        // return state;

        case 'INCREMENT-CHILDREN-COUNT':
            let newState = {...state}
            newState.childrenCount = state.childrenCount + 1;
            return newState;

            // return {
            //     ...state,
            //     childrenCount: state.childrenCount + 1
            // }


            //
            // state.childrenCount = state.childrenCount + 1;
            // return state;
            case 'CHANGE-NAME':
               return {
                   ...state,
                   name: action.newName
               }

        default:
            throw new Error('I dont understand this')
    }
}