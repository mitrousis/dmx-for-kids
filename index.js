const DMX = require('dmx')
const DeviceSP4LED = require('./src/DeviceSP4LED.js')
const DeviceLED27ch = require('./src/DeviceLED27ch.js')

const dmx = new DMX()

// const driver = 'stdout'
const universeName = 'main'
const driverName = 'enttec-usb-dmx-pro' // 'null'
const universeDevLocation = '/dev/cu.usbserial-EN159033'

// dmx.registerDriver(driver, null)
dmx.addUniverse(universeName, driverName, universeDevLocation)

const devices = {
  sp4led: new DeviceSP4LED(10),
  led27: new DeviceLED27ch(20)

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

function randPowerValue () {
  return Math.floor(Math.random() * 255)
}

reset()

setInterval(() => {
  devices.sp4led.setOutputPower(1, randPowerValue())

  // const color = '#ff0000'

  devices.led27.setChanelColor(1, {
    r: 255,
    g: 255,
    b: 0
  })

  updateAll()
}, 250)
