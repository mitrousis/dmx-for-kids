const BaseDevice = require('./BaseDevice')

class DeviceSP4LED extends BaseDevice {
  constructor (baseChannel) {
    super(baseChannel)

    this.name = 'SP4LED Lighting Controller'
    this._channelCount = 7
  }

  /**
   *
   * @param {Number} output 1 - 4
   * @param {Number} power 0 - 255
   */
  setOutputPower (output, power) {
    this._status[this._baseChannel + 2 + output] = power // Master dimming
  }

  reset () {
    super.reset()
    this._status[this._baseChannel + 0] = 255 // Master dimming
    this._status[this._baseChannel + 1] = 0 // Set dimming mode
  }
}

module.exports = DeviceSP4LED
