var prompts = {
  'introduction': {
    'de_DE': 'Mit diesem Programm kannst du Konfigurationen für die Automatisierungen deines Projekts erstellen.\nNachdem du die folgenden Fragen beantwortet hast werden verschiedenene Dateien angelegt\ndie dir Gulp-Tasks ermöglichen um dein Projekt effektiver zu nutzen,\nVorgänge zu automatiseren und Tests in deinem Projekt zu ermöglichen',
    'en_US': 'This program lets you configure automations for your projects.\nAfter answering the upcomming questions some files are going to be created that let you run gulp-tasks\nto use your project more efficient, automate workflows and test your project properly'
  },
  'config': {
    'existsOld': {
      'de_DE': 'Du hast bereits eine application.conf welche deine Tasks konfiguriert. Diese ist jedoch veraltet!',
      'en_US': 'You already have an application.conf which handles your task configuration. But it seems to be an old one!'
    },
    'existsNew': {
      'de_DE': 'Du hast bereits eine application.conf welche deine Tasks konfiguriert.',
      'en_US': 'You already have an application.conf which handles your task configuration.'
    },
    'override': {
      'de_DE': 'Möchtest du sie überschreiben? Wenn du sie nicht überschreiben möchtest wird dieses Programm beendet!',
      'en_US': 'Do you want to override it? If not this program will close!'
    }
  },
  'projectGeneral': {
    'title': {
      'de_DE': 'Allgemein',
      'en_US': 'General'
    },
    'de_DE': [
      {
        'type': 'input',
        'name': 'host',
        'default': 'http://deinprojekt.comon.dev',
        'message': 'Gib dein lokales Mapping für dieses Projekt an (dieses wird für BrowserSync benötigt um live reload und refresh zu ermöglichen).'
      },
      {
        'type': 'input',
        'name': 'prefix',
        'default': 'deinprojekt',
        'message': 'Gib einen Prefix für diese Anwendung an. Dieser Wird für das Logging genutzt damit du die Übersicht behälst falls mehrere Projekte laufen.'
      },
      {
        'type': 'input',
        'name': 'type',
        'default': 'isdc|ad|datencenter',
        'message': 'Gib einen Type für diese Anwendung an. Dieser Wird für das Logging genutzt damit du die Übersicht behälst falls mehrere Projekte laufen.'
      }
    ],
    'en_US': [
      {
        'type': 'input',
        'name': 'host',
        'default': 'http://yourproject.comon.dev',
        'message': 'Set your local mapping for this project (this is used for browsersync to live reload your application)'
      },
      {
        'type': 'input',
        'name': 'prefix',
        'default': 'yourproject',
        'message': 'Set a prefix to be displayed in your logs to keep things lucid in your console when running multiple projects'
      },
      {
        'type': 'input',
        'name': 'type',
        'default': 'isdc|ad|datacenter',
        'message': 'Set a type to be displayed in your logs to keep things lucid in your console when running multiple projects'
      }
    ]
  },
  'projectTasks': {
    'title': {
      'de_DE': 'Automationen',
      'en_US': 'Automations'
    },
    'de_DE': [
      {
        'type': 'confirm',
        'name': 'log',
        'message': 'Sollen die Tasks Logging anzeigen (hilfreich für Debugging, kann aber auch im nachhinein konfiguriert werden)',
        'default': true
      },
      {
        'type': 'checkbox',
        'name': 'log.levels',
        'message': 'Was soll geloggt werden',
        'choices': ['warn', 'error', 'debug', 'info'],
        'default': ['warn', 'error'],
        'when': (answers) => {
          return answers.log
        }
      },
      {
        'type': 'confirm',
        'name': 'test',
        'message': 'Sollen Tests integriert werden? Wenn ja folgen weitere Fragen zu Test Frameworks',
        'default': true
      },
      {
        'type': 'confirm',
        'name': 'test.unit',
        'message': 'Unit Tests?',
        'default': true,
        'when': (answers) => {
          return answers.test
        }
      },
      {
        'type': 'checkbox',
        'name': 'test.unit.types',
        'message': 'Was soll getestet werden',
        'default': ['dev'],
        'choices': ['dev', 'build'],
        'when': (answers) => {
          return answers['test.unit']
        }
      },
      {
        'type': 'multiInput',
        'name': 'test.unit.types.test',
        'message': 'Was soll getestet werden',
        'when': (answers) => {
          return answers['test.unit']
        }
      },
      {
        type: 'path',
        name: 'path',
        message: 'Enter a path',
        default: process.cwd(),
        multi: true,
        validate: function (answser) {
          return 'The path does not exist'
        },
        validateMulti: function (answers) {
          return answers.length > 0 ? true : 'You must provide at least one path'
        }
      }
    ]
  }
}

module.exports = prompts
