const DMX = require('dmx')
const DeviceSP4LED = require('./src/DeviceSP4LED.js')

const dmx = new DMX()

// const driver = 'stdout'
const universeName = 'main'
const driverName = 'enttec-usb-dmx-pro' // 'null'
const universeDevLocation = '/dev/cu.usbserial-EN159033'

// dmx.registerDriver(driver, null)
dmx.addUniverse(universeName, driverName, universeDevLocation)

const devices = {
  sp4led: new DeviceSP4LED(10)
}

function sendStatus (device) {
  console.log('-- send:', device.name, device.status)
  dmx.update(universeName, device.status)
}

function updateAll () {
  for (const deviceId in devices) {
    const device = devices[deviceId]
    sendStatus(device)
  }
}

function reset () {
  for (const deviceId in devices) {
    const device = devices[deviceId]
    device.reset()
  }

  updateAll()
}

reset()

setInterval(() => {
  const randPower = Math.floor(Math.random() * 255)
  devices.sp4led.setOutputPower(1, randPower)
  updateAll()
}, 250)
