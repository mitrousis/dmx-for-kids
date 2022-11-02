class BaseDevice {
  constructor (baseChannel = 0) {
    this.name = 'BaseDevice'

    this._baseChannel = baseChannel
    this._channelCount = 0
    this._status = {}
  }

  reset () {
    console.log('-- reset:', this.name)
    this._status = {}
  }

  get baseChannel () {
    return this._baseChannel
  }

  set baseChannel (channel) {
    this._baseChannel = channel
  }

  get status () {
    return this._status
  }

  get channelCount () {
    return this._channelCount
  }
}

module.exports = BaseDevice
