// Projekt Konfiguration laden
import config from './application.conf'

// benötigte Task Library laden
import tasks from './comon.tasks.js'

// Task Funktion ausführen um automatisierungen verfügbar zu machen
tasks(config, __dirname)
