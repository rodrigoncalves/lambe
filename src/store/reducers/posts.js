import {ADD_POST} from '../actions/actionTypes'

const initialState = {
  posts: [
    {
      id: Math.random(),
      nickname: 'Rafael Pereira Filho',
      email: 'rafaelprrflh@gmail.com',
      image: require('../../../assets/imgs/fence.jpg'),
      comments: [
        {
          nickname: 'John Ray Sheldon',
          comment: 'Stunning!',
        },
        {
          nickname: 'Ana Julia Arruda',
          comment: 'Foto linda! Onde foi tirada?',
        },
      ],
    },
    {
      id: Math.random(),
      nickname: 'Francisco Leandro Lima',
      email: 'fllima@gmail.com',
      image: require('../../../assets/imgs/bw.jpg'),
      comments: [],
    },
  ],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat({
          ...action.payload,
        }),
      }
    default:
      return state
  }
}
