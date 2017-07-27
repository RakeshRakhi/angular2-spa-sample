import { AddUserInfo, AssignRole, AddName } from './actions'

export interface IUserProfile {
    UserInfo: any,
    Role: string,

}

export function rootReducer(state: IUserProfile, action): IUserProfile {
    switch (action.type) {
        case AssignRole:
            return { Role: action.value, UserInfo: state.UserInfo }
        case AddUserInfo:
            return { Role: state.Role, UserInfo: action.value }
        case AddName:
            return { Role: state.Role, UserInfo: state.UserInfo }
        default:
            return state;
    }
}

export const InitialState: IUserProfile = {
    Role: "", UserInfo: {}
}


