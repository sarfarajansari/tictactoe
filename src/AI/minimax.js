const Players = {
  X: "X",
  O: "O",
};

const isInitial = (state) => {
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state.length; j++) {
      if (state[i][j] !== " ") return false;
    }
  }

  return true;
};
export const getPlayer = (state) => {
  let numberOfX = 0;
  let numberOfO = 0;
  state.forEach((row) => {
    row.forEach((cell) => {
      if (cell === Players.X) {
        numberOfX++;
      } else if (cell === Players.O) {
        numberOfO++;
      }
    });
  });

  return numberOfO < numberOfX ? Players.O : Players.X;
};

export const utility = (state) => {
  const score = (player) => (player === Players.X ? 1 : -1);
  const isTriad = (vector) => {
    let [a, b, c] = vector;
    if (a === b && b === c && c !== " ") return score(a);

    return 0;
  };

  const column = (i) => [state[0][i], state[1][i], state[2][i]];

  for (let i = 0; i < 3; i++) {
    if (isTriad(state[i])) return isTriad(state[i]);

    if (isTriad(column(i))) return isTriad(column(i));
  }

  if (isTriad([state[0][0], state[1][1], state[2][2]]))
    return score(state[0][0]);

  if (isTriad([state[0][2], state[1][1], state[2][0]]))
    return score(state[0][2]);

  return 0;
};

export const getIsTerminal = (state) => {
  if (utility(state) !== 0) return true;

  let numberOfEmptyCells = 0;

  state.forEach((row) => {
    row.forEach((cell) => {
      if (cell === " ") {
        numberOfEmptyCells++;
      }
    });
  });

  return numberOfEmptyCells === 0;
};

const getActions = (state) => {
  const actions = [];

  state.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === " ") {
        actions.push([i, j]);
      }
    });
  });

  return actions;
};

export const getNextState = (state, action) => {
  const player = getPlayer(state);
  const newState = [[...state[0]], [...state[1]], [...state[2]]];
  newState[action[0]][action[1]] = player;

  return newState;
};

export const miniMax = (state, depth = 0) => {
  const player = getPlayer(state);

  if (getIsTerminal(state)) return [utility(state), null];

  const actions = getActions(state);

  if (isInitial(state))
    return [0, actions[Math.floor(Math.random() * actions.length)]];
  let action;
  if (player === Players.X) {
    let best = [-2, null];

    // console.log(actions, "actions");
    for (let a = 0; a < actions.length; a++) {
      action = actions[a];
      let value = miniMax(getNextState(state, action), depth + 1)[0];

      if (value > best[0]) {
        best = [value, action];
      }
    }
    // actions.forEach((action) => {
    //   let value = miniMax(getNextState(state, action), depth + 1)[0];

    //   if (value > best[0]) {
    //     best = [value, action];
    //   }
    // });

    return best;
  } else {
    let best = [2, null];

    for (let b = 0; b < actions.length; b++) {
      action = actions[b];

      let value = miniMax(getNextState(state, action), depth + 1)[0];

      if (value < best[0]) {
        best = [value, action];
      }
    }

    // actions.forEach((action) => {
    //   let value = miniMax(getNextState(state, action), depth + 1)[0];

    //   if (value > best[0]) {
    //     best = [value, action];
    //   }
    // });

    return best;
  }
};
