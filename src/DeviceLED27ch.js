const BaseDevice = require('./BaseDevice')

class DeviceLED27ch extends BaseDevice {
  constructor (baseChannel) {
    super(baseChannel)

    this.name = '27 Channel LED Controller'
    this._channelCount = 27
  }

  /**
   *
   * @param {number} channel 1 - 27
   * @param {number} power 0 - 255
   */
  setChannelPower (channel, power) {
    this._status[this._baseChannel + channel - 1] = power // Master dimming
  }

  /**
   *
   * @param {number} channel
   * @param {string | object} color
   */
  setChanelColor (channel, color = { r: 0, g: 0, b: 0 }) {
    if (typeof color === 'string') {
      color = this._hexToRgb(color)
    }

    this.setChannelPower(channel + 0, color.r)
    this.setChannelPower(channel + 1, color.g)
    this.setChannelPower(channel + 2, color.b)
  }

  reset () {
    super.reset()
    for (let ch = 0; ch < this._channelCount; ch++) {
      this._status[this._baseChannel + ch] = 0
    }
  }

  _hexToRgb (hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null
  }
}

module.exports = DeviceLED27ch
