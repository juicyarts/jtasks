export default function (bro, config) {
  let appServer = bro.create('appServer')
  return appServer.init({
    port: 3005,
    proxy: config.host,
    ghostMode: false,
    logLevel: 'debug',
    logPrefix: 'bs appServer:' + config.prefix,
    locConnections: true,
    logFileChanges: true,
    notify: true,
    online: true,
    timestamp: true,
    injectChanges: true,
    startPath: config.path || ''
  })
}
