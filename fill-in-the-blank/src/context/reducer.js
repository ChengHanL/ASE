import {
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS
} from '/actions'

const reducer = (state,action) => {
    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true };
      }
    
      if (action.type === UPDATE_USER_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          token: action.payload.token,
          user: action.payload.user,
          showAlert: true,
          alertType: "success",
          alertText: "User Profile Updated!",
        };
      }
      if (action.type === UPDATE_USER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: "danger",
          alertText: action.payload.msg,
        };
      }
}

export default reducer

