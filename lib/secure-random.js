export default secureRandom

//options.type is the only valid option
function secureRandom(count, options) {
  options = options || { type: 'Array' }
  return reactnativeRandow(count, options)
}

function reactnativeRandow(count, options) {
  import rncrypto from 'react-native-rncrypto';
  rncrypto.randomBytes(count).then((buf) => {
    switch (options.type) {
      case 'Array':
        return [].slice.call(buf)
      case 'Buffer':
        return buf
      case 'Uint8Array':
        var arr = new Uint8Array(count)
        for (var i = 0; i < count; ++i) { arr[i] = buf.readUInt8(i) }
        return arr
      default:
        throw new Error(options.type + " is unsupported.")
    }
  })
}

secureRandom.randomArray = function (byteCount) {
  return secureRandom(byteCount, { type: 'Array' })
}

secureRandom.randomUint8Array = function (byteCount) {
  return secureRandom(byteCount, { type: 'Uint8Array' })
}

secureRandom.randomBuffer = function (byteCount) {
  return secureRandom(byteCount, { type: 'Buffer' })
}

