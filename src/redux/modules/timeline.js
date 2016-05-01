const initialState = {
  pins: [
    { id: 'brian_eno', date: new Date(1950, 4, 15), title: '', image: 'data/same_date/brian_eno.jpg', dx: 0, dy: 0 },
    { id: 'david_cronenberg', date: new Date(1950, 4, 15), title: '', image: 'data/same_date/david_cronenberg.jpg', dx: 0.4, dy: -0.40 },
    { id: 'madeleine_albright', date: new Date(1950, 4, 15), title: '', image: 'data/same_date/madeleine_albright.jpg', dx: 0.4, dy: -0.2 },
    { id: 'mike_oldfield', date: new Date(1950, 4, 15), title: '', image: 'data/same_date/mike_oldfield.jpg', dx: 0.4, dy: 0.0 },
    { id: 'pierre_curie', date: new Date(1950, 4, 15), title: '', image: 'data/same_date/pierre_curie.jpg', dx: 0.4, dy: 0.2 },
    { id: 'richard_avedon', date: new Date(1950, 4, 15), title: '', image: 'data/same_date/richard_avedon.jpg', dx: 0.4, dy: 0.4 },
    { id: 'birth', date: new Date(1956, 4, 15), title: 'Christiane erblickt das Licht der Welt', image: 'data/0023.jpg', dx: -1.0, dy: 0.4 },
    { id: 'laika', date: new Date(1957), title: '', image: 'data/0006.jpg', background: 'data/1957_sputnik_laika.jpeg', dx: 1.0, dy: 0.4 },
    { id: 'test2', date: new Date(1958, 4, 15), title: '', image: 'data/0014.jpg', background: 'data/1957_west_side_story_premier_on_broadway.jpg', dx: 0.5, dy: 0 },
    { id: 'test3', date: new Date(1959, 4, 15), title: '', image: 'data/0034.jpg', background: 'data/2016_michelin_ramsay_text_BCKG.jpg', dx: 0.5, dy: 0 },
  ]
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case
    default:
      return state;
  }
}
