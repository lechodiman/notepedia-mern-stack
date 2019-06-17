const initialState = {
  notebooks: [
    {id: 1, name: "Calculus"},
    {id: 2, name: "Computer Science"},
    {id: 3, name: "Data Mining"},
    {id: 4, name: "History"}
  ]
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
