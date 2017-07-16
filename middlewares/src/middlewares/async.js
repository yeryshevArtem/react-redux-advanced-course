export default function({dispatch}) {
  return next => action => {

    if (!action.payload || !action.payload.then) {
      return next(action);
    }
    action.payload
      .then(reponse => {
        const newAction = {...action, payload: reponse};
        dispatch(newAction);
      });
  };
}
