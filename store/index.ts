import { createStore } from "redux"

const reducerFn = (state: any = {counter: 0},action: any) => {

    if (action.type === "ADD") {
        return {counter:state.counter+1}
    }
    return state
}

const store = createStore(reducerFn)

export default store

