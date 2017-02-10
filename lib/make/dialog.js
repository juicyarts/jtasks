import inquirer from 'inquirer'
import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import locale from 'os-locale'
import fs from 'fs'

import * as fsExists from './fsExists'
import logger from '../common/logger'
import prompts from './dialog.prompts'

import iext from 'inquirer-extensions'
inquirer.registerPrompt('multiInput', iext.multiInput)

import unflatten from 'unflatten'
import util from 'util'

var config
export function make (cb) {
  clear()
  setConfig()
  introduction()

  if (fsExists.file('./application.conf.js')) {
    appConf((answer) => {
      if (!answer) {
        return cb()
      } else {
        runPrompts(() => {
          cb()
        })
      }
    })
  } else {
    runPrompts(() => {
      cb()
    })
  }
}

function runPrompts (cb) {
  let t = {}
  setProjectGeneral((general) => {
    setProjectTasks((tasks) => {
      t = registerTasks(tasks)
      console.log(util.inspect(t, false, null))
    })
  })
}

export function registerTasks (tasks) {
  let t = unflatten(tasks)
  return t
}

function setConfig () {
  config = {}
  config.locale = locale.sync() || 'en_US'
  if (config.locale.length <= 2) {
    config.locale = 'de_DE'
  }
}

function divider () {
  console.log(
    chalk.yellow('-----------------------------------------------')
  )
}

function introduction () {
  divider()
  console.log(
    chalk.yellow(
      figlet.textSync('Comon', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      }, (err) => {
        logger.error('filget error:', err)
      })
    )
  )
  divider()
  console.log(
    prompts.introduction[config.locale]
  )
}

function appConf (cb) {
  var file = fs.readFileSync('./application.conf.js').toString()
  divider()
  if (file.indexOf('tasks:') > -1) {
    console.log(
      prompts.config.existsNew[config.locale]
    )
  } else {
    console.log(
      prompts.config.existsOld[config.locale]
    )
  }
  var question = [{
    type: 'confirm',
    name: 'overrideConfig',
    message: prompts.config.override[config.locale]
  }]
  inquirer.prompt(question).then((answer) => {
    return cb(answer[question[0].name])
  })
}

function setProjectGeneral (cb) {
  divider()
  console.log(chalk.black.bgYellow(' ', prompts.projectGeneral.title[config.locale], ' '))
  inquirer.prompt(prompts.projectGeneral[config.locale]).then((answers) => {
    return cb(answers)
  })
}

function setProjectTasks (cb) {
  divider()
  console.log(chalk.black.bgYellow(' ', prompts.projectTasks.title[config.locale], ' '))
  inquirer.prompt(prompts.projectTasks[config.locale]).then((answers) => {
    return cb(answers)
  })
}
