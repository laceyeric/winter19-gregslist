import _store from "../store.js"
import Car from "../Models/Car.js"

class CarService {
  delortCar(carIndex) {
    _store.State.cars.splice(carIndex, 1)
  }
  addCar(carData) {
    //carData is a POJO 
    // new Car(data) is expecting data that represents a car and returns and instance of our model
    let car = new Car(carData)
    //car is now an instance of the Car class
    _store.State.cars.push(car)
    console.log(_store.State.cars)
  }


  constructor() {
    console.log("hello from car service")
  }
}

const CARSERVICE = new CarService()

export default CARSERVICE 