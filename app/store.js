import Value from "./Models/Value.js";
import Car from "./Models/Car.js";

let _state = {
  activeValue: new Value({ title: "something" }),
  /** @type {Value[]} */
  values: [],
  cars: [new Car({ make: "Chevy", model: "Tracker", year: 1989, price: 2000 })]
};

// 3 create _subscribers object. List keys from state that you are editing. mark as empty arrays -step 4 below-
let _subscribers = {
  cars: []
}

//NOTE You should not need to change the code from this point down

class Store {
  /**
   * Provides access to application state data
   */
  get State() {
    return _state;
  }

  // 4. create subscribe fn. it passes a property and a fn (not invoked) -*callback function. -step 5 in controller-
  subscribe(prop, fn) {
    _subscribers[prop].push(fn)
    console.log(_subscribers)
  }

  // 1. within Store class, create a commit. will take in a prop(the thing in the state that you will edit) and data (what the edits will be from Service) -step 2 on Service-
  commit(prop, data) {
    // this line is overwriting the [prop] in state (hard save) with the data after Service has edited.
    _state[prop] = data
    // 6. This line basically invokes every function that was passed through. -step 7 in Inv controller -
    _subscribers[prop].forEach(fn => fn());
    console.log(_state)
  }

}

const store = new Store();
export default store;
