import _store from "../store.js";

function drawInventory() {
  document.querySelector("#inventory").textContent = _store.State.cars.length.toString()
}
export default class InventoryController {
  constructor() {
    // 7. within constructor creating similar fn to CarsController, but to update Inventory instead.
    _store.subscribe("cars", drawInventory)
    drawInventory()
  }
}