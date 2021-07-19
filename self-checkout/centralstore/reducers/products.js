const initialStateAdmin = []
export const adminReducer = (state = initialStateAdmin, action) => {
    switch (action.type) {
        case "ADMIN/REDUCEQUANTITY":
            var newState = state
            state.forEach((item, index)=>{
                if(action.payload.toString() === item.pid.toString()){
                    newState[index].pqty -= 1
                }
            })
            return newState
        default:
            return state
    }
}