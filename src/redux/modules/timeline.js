const initialState = {
  pins: [
    { id: 'birth', date: new Date(1956, 5, 15), title: 'Christiane erblickt das Licht der Welt', image: '/data/0023.jpg', dx: 0, dy: 0 },
    { id: 'test', date: new Date(1957, 5, 15), title: '', image: '/data/0023.jpg', dx: 0.5, dy: 0 },
    { id: 'test2', date: new Date(1958, 5, 15), title: '', image: '/data/0023.jpg', dx: 0.5, dy: 0 },
    { id: 'test3', date: new Date(1959, 5, 15), title: '', image: '/data/0023.jpg', dx: 0.5, dy: 0 },
  ]
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case
    default:
      return state;
  }
}
