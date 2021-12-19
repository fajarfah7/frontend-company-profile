import { createStore } from 'redux'

const initialState = {
  sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest }) => {
  console.log("store type", type)
  console.log("store rest", rest)
  switch (type) {
    case 'set':
      console.log(state, rest)
      return {...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
