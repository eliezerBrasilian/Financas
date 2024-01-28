class Exception {
  constructor(objective: string, cause: any) {
    throw new Error(
      'Exception founded on trying to ' +
        objective +
        ' this error refers to: ' +
        cause,
    );
  }
}

export {Exception};
