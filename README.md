
[![Build Status](https://codeship.com/projects/83d91880-d1d8-0134-3203-761d9909bfc2/status?branch=master)](https://app.codeship.com/projects/201652)
---

#  Tasks
Dieses Projekt beinhaltet Automatisierungen und Mechanismen um wiederkehrende Aufgaben zu übernehmen und euch Tools anzubieten um eure Workflows zu automatisieren und eure Projekte zu testen.

Aktuell kann das ganze nur "manuell" aufgesetzt werden aber ich bin parallel dabei auch diesen Schritt über ein Tool in eurer Kommdanozeile zu automatisieren.
In Zukunft soll dieses Tool für euch auch neue Projekte sofort mit entsprechenden Einstellungen initialisieren können.

---

## Installation
Um diese Automatisierungen zum laufen zu bekommen benötigt Ihr zu aller erst folgende Dinge:

### Node und Npm
Javascript engine und Paket Management

* [node](https://nodejs.org/en/)
    * server side javascript.
* [npm](https://www.npmjs.org)
    * Paketmanager zum Installieren von Abhängigkeiten in der Entwicklungsumgebung
* Installation
    * [mac (brew)](https://changelog.com/install-node-js-with-homebrew-on-os-x/)
    * [windows](http://blog.teamtreehouse.com/install-node-js-npm-windows)
    * [alternativ](https://nodejs.org/en/download/)

### Gulp 
Node Modul für Automatisierungen
Diese Pakete müssen Global verfügbar sein

* [gulp](http://gulpjs.com)
* um gulp global zu initialisieren und über die Kommandozeile verfügbar zu machen

```bash
$ npm install -g gulp
```

### Bower
Optional, Externe Dependencies wie Jquery installieren
* Paketmanager zum Installieren von Abhängigkeiten innerhalb der Applikation
* [bower](http://bower.io/)

```bash
$ npm install -g bower
```

### Abhaengigkeiten initialisieren
Sind diese prerequisits installiert ist das initiliaisieren der Umgebung einfach:
```bash
$ npm install -g bower
```

---

## Konfiguration
Euere Projekt benötigt Ihr einige Dateien um die Automatisierungen zu ermöglichen

> Die angeführten Inhalte sind beispielhaft anhand des Projekts 'prj/isdc/v3/default'

### application.conf.js
Konfiguration der Tasks. Mindestens diese Angaben, alles weitere folgt unter dem Punkt [Tasks](#tasks).
Hier können natürlich auch eigene key-value angaben die man benötigt abgelegt werden.

```javascript
'use strict'
var applicationConf = {
  host: 'http://default.v3.isdc.comon.dev',
  prefix: 'default',
  type: 'isdc',
  tasks : {
    ...
  }
}
module.exports = applicationConf
```

### gulpfile.babel.js
Dieses Beispiel zeigt wie die task library 'comon.tasks' eingebunden wird. Falls jemand eine
eigene Tasks benötigt könnten sie in dieser Datei definiert werden.
Ausserdem kann hier auch die Library ausgetauscht werden falls man selbst eine bauen möchte.

```javascript
// Referenz zur Konfigurationsdatai
import config from './application.conf'

// Referenz zur Library
import tasks from '../../../tasks/comon.tasks.js'

// Task Funktion ausführen um Automatisierungen verfügbar zu machen
tasks(config, __dirname)
```

### .bowerrc (optional)
Wenn das Projekt Abhängigkeiten zu Libraries wie jquery und co hat sollten diese über bower installiert werden.
Die Datei .bowerrc definiert wo diese Dateien hingelegt werden.
Tendenziell dienen diese Dateien zum lokalen testen der Funktionalität und sollten für eine Produktivumgebung nicht genutzt werden.
Hier sollten die entsprechenden Quellen durch Quellen unter CDN's ersetzt werden.
Das ganze versuche ich auch noch zu automatisieren.

```javascript
{
  "directory": "./static/js/lib"
}
```

---

## [Weiter gehts mit den Tasks](docs/documentation/tutorials/tasks)
