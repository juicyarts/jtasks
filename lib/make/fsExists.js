import fs from 'fs'
import path from 'path'
import logger from '../common/logger'

export function cwd () {
  return path.basename(process.cwd())
}

export function dir (src) {
  try {
    return fs.statSync(src).isDirectory()
  } catch (err) {
    logger.error(err)
    return false
  }
}

export function file (src) {
  try {
    return fs.existsSync(src)
  } catch (err) {
    logger.error(err)
    return false
  }
}
