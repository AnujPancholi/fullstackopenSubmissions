const getCounter = (initValue=0) => {
  let counterVal = initValue;
  return {
    next: () => {
      return ++counterVal;
    }
  }
}

export default getCounter;