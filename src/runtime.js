import { router } from './router'
import { buildEvent, normalize } from './build-event'
import pkg from '../package.json'

let configs = []

const end = (error, res, callback) => {
  logToConsole('ATOMABLE END', { error, res })
  callback(error, res)
}

const toPrettyJson = data =>
  JSON.stringify(data, null, ' ')

const logToConsole = (message, data) =>
  console.log(message, toPrettyJson(data)) // eslint-disable-line

const register = (func, config) => {
  logToConsole('ATOMABLE VERSION', pkg.version)
  const configToAdd = Object.assign({}, config)
  logToConsole('ATOMABLE EXECUTING', { name: configToAdd.name, path: configToAdd.https.path })
  configToAdd.handler = (...args) =>
    func(...args)

  if (configToAdd.https) {
    configToAdd.https.path = normalize(configToAdd.https.path)
    configToAdd.https.method = normalize(configToAdd.https.method)
  }

  configs.push(configToAdd)
}

const clear = () => {
  configs = []
}

const handle = (call, context, callback) => {
  logToConsole('ATOMABLE START', { call, context })
  if (configs && configs.length > 0) {
    router(configs, buildEvent(call))
      .then(res => end(null, res, callback))
      .catch(res => end(null, res, callback))
  } else {
    end(null, { statusCode: 404, body: 'no routes are configured' }, callback)
  }
}

export { register, handle, clear }
export default handle

