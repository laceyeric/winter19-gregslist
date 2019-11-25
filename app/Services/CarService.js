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
  addCar(carData) {
    //carData is a POJO 
    // new Car(data) is expecting data that represents a car and returns and instance of our model
    let car = new Car(carData)
    //car is now an instance of the Car class
    let cars = _store.State.cars.map(c => new Car(c))
    cars.push(car)
    _store.commit("cars",cars)
  }

  loadCars(){
    // make GET request to api, then save the data to our state
    _carApi.get().then(res =>{
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