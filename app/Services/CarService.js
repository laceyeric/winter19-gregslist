import _store from "../store.js"
import Car from "../Models/Car.js"

// @ts-ignore
let _carApi = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/cars",
  timeout: 3000
})

class CarService {
  delortCar(carIndex) {
    _store.State.cars.splice(carIndex, 1)
  }

  // This fn shows how to add an object to memory
  addCar(carData) {
    //carData is a POJO 
    // new Car(data) is expecting data that represents a car and returns an instance of our model aka morphs into class Car object.
    //car will now be an instance of the Car class
    let car = new Car(carData)
    // 2. line below variable is making a copy of everything on our state at .cars. map iterates through and returns a new array to our variable.
    let cars = _store.State.cars.map(c => new Car(c))
    // We then push our new Car above to the end of our copy of state.cars array
    cars.push(car)
    // We no longer "saveState." we send the data to commit and let _store do the actual saving. *"cars" is key in state, always a string. 2nd parameter- cars is our variable and represents the copy of state that we have edited  -step 3 back on store-
    _store.commit("cars", cars)
  }

  loadCars() {
    // make GET request to api, then save the data to our state
    _carApi.get().then(res => {
      console.log(res)
      let cars = res.data.data.map(c => new Car(c))
      _store.commit("cars", cars)
    })

  }


  constructor() {
    console.log("hello from car service")
    this.loadCars()
  }
}

const CARSERVICE = new CarService()

export default CARSERVICE 