// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf) {
  const ret = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT')
      realName = Number(realName)

    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      }
      catch (error) {
        realName = ''
      }
    }
    ret[envName] = realName
    if (typeof realName === 'string')
      process.env[envName] = realName

    else if (typeof realName === 'object')
      process.env[envName] = JSON.stringify(realName)
  }
  return ret
}
