---
# Tasks [![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard) [![Jenkins Test Status](http://ci01.crunchtime.net:8888/buildStatus/icon?job=Isdc-Core)](http://ci01.crunchtime.net:8888/view/Isdc/job/Isdc-Core/)

Dieses Readme ist nicht als Regelwerk wahrzunehmen.
Es handelt sich lediglich um best practices die ich in den letzten Jahren für mich entwickelt habe um mir die Arbeit zu erleichtern und wiederkehrende Prozesse zu automatisieren.

# README/WIKI
Jedes Projekt sollte entweder im Redmine oder im Projekt selbst (was ich für sinnvoller halte) eine Readme enthalten
welche Projektspezifische Dinge dokumentiert. Es geht dabei nicht um eine Dokumentaion des Codes.
Eher um eine Projektbeschreibung.
Dazu kann, wie auch in dieser Readme, der Header mit Badges versehen werden um etwa den zugehörigen Jenkins Job oder die eingesetzten Technologien
anzuzeigen.

# Url's/Hostnames
Wir sollten unsere Anwendungen lokal alle mit dem selben Hostname mappen.
* vorher
  * *.comon.huessi
* nachher
  * *.comon.dev

*Warum?*
* So können wir untereinander einfacher Urls austauschen
* Der Browser-Sync Prozess holt sich die Url aus der Application.conf.js des Projekts. Wenn hier jeder seine eigene Url rein basteln muss zum entwickeln kommt es immer wieder zu Konflikten bei git Vorgängen.
* Der Jenkins, unser Continuous Integration Server, welcher für uns Tests ausführt, und in Zukunft vielleicht sogar Builds, kennt diesen Hostname.
* Standartisierung!

# Projektstrukturen
Wir nutzen häufig den selben Ordner für kompilierte und Quell-Dateien.
* static/js
  * heimspiel.js
  * jquery.min.js
  * modernizer.js
  * einefancyfuktion.js
* static/css
  * heimspiel.sass
  * normalize.css
  * base.scss
  * default.min.css

Was dazu führt dass Libraries und Arbeitsdateien sich vermischen. Klar spielt das nicht so eine große Rolle, doch zur Trennung von Arbeitsdateien und einfach eingebundenen Libraries ist das nicht dienlich. Ausserdem müssen die Automatisierungen dadurch immer mit exclude filtern versehen werden um zb. 3rd party libraries nicht mit in den Test/Build einzubeziehen.

Ich würde daher empfehlen euren Static Ordner wie folgt zu strukturieren
* static/js
  * static/js/src - Arbeitsdateien/Funktionen und Libraries die ihr erstellt
  * static/js/lib - 3rd party Libraries
  * static/js/dist - Ordner der für den/die Builds genutzt wird
* static/css
  * static/css/src
  * static/css/dist

# Entwickeln
Den Server part übernimmt Gulp. Der Grund dafür ist, dass die Anwendung bei Änderungen nachgeladen werden soll und verschiedene Automationen auf verschiedene Dateiarten ausgeführt werden müssen.
Ausserdem wird durch den Einsatz von Browser-Sync die Url nach außen verfügbar gemacht und kann damit einfach mit einem Mobilgerät im Netzwerk aufgerufen werden.

Für das Verständnis von Browsersync:
Browsersync nimmt die von euch eingetragene Url (siehe application.conf.js) und proxyt diese einfach um sie von außen zugägnlich zu machen. Ausserdem werden mit dem Start des Servers verschiedene Watch prozesse gestartet. Dazu gleich mehr.


##### Server starten:
```bash
$ gulp
```

* startet den watcher prozess
** linting watcher
** css-preprocessor linter
* macht das projekt unter einer localhost-url/lokalen-ip verfügbar - siehe dazu den Output in der Kommandozeile



---

# Tasks im Überblick

## <a name="assets"></a> Assets
##### Anwendungsdateien initialisieren
Dateien und Module die in der 'application.conf.js' des Projekts konfiguriert wurden werden in ein Json
geschrieben welches für die Automatisierungen und die Builds genutzt wird.
Die Datei 'assetLib.json' wird nach Ausführen des Befehls geschrieben und ist notwendug damit die Automationen vernünftig funktionieren.
In dieser Datai kann dann auch nachvollzogen werden woher die Anwendung welche Dateien holt (auch bei Vererbung).

* Quelldateien aus /static/js/src
  ```bash
  $ gulp mkAppAssets
  ```
* Schreibe assetLib.json
  ```bash
  $ gulp writeAssetLib
  ```
* Prüfe ob assetLib.json vorhanden ist
  ```bash
  $ gulp checkAssets
  ```

* Kombiniert in.. (führt die oben beschriebenen Tasks aus)
```bash
$ gulp mkAssets
```

***

## <a name="clean"></a> Clean
##### Dateien bereinigen
Löscht vorherigen build aus **/{js|css}/dist/
```bash
$ gulp clean
```

***

## <a name="doc"></a> Doc
##### Dokumentation & Js analyse generieren
* JsDoc(3) Dokumentation generieren
  ```bash
    $ gulp doc
  ```
***


## <a name="server"></a> Server
##### Proxy Server starte
* Anwendung
  ```bash
    $ gulp server
  ```
***

## <a name="lint"></a> Lint
##### Javascript linting
Hierzu wird [Standard]('http://standardjs.com/') genutzt. Um das ganze einfache rzu machen empfehle ich in eurem IDE das [Plugin]('http://standardjs.com/index.html#text-editor-plugins') dafür zu installieren oder euch die [Spezifikationen]('http://standardjs.com/rules.html') anzusehen
```bash
$ gulp lint
```

***

## <a name="uglify"></a> Uglify
##### Javascript minify
```bash
$ gulp uglify
```

Kombination aus lint und minify
```bash
$ gulp js
```

***

## <a name="css"></a> Css
##### Css generierung
Linten und alle Kompilieren
```bash
$ gulp css
```

***

## <a name="build"></a> Build
##### Build Version erstellen
das Build verfahren besteht au mehreren Aufgaben die beim Ausfüren des Skripts vollzogen werden.
- [clean](#clean)
- [install](#install)
- [mkAssets](#assets)
- [js](#js)
- [doc](#doc)
- [inject:prod](#inject)
- [test](#test)


***

## <a name="inject"></a> Inject
##### Anwendungsdateien in Anwendung integrieren
Benutzt die Datei tmpl/base/js_boilerplate.tmpl um die Resourcen für die Entwicklung oder den Build
in die Datei tmpl/base/js.tmpl zu schreiben
* wenn einzelne Dateien bwz der Zustand in der Entwicklungsumgebung injiziert werden sollen
    ```bash
    $ gulp inject:dev
    ```
* wenn die Build-Dateien injiziert werden sollen
    ```bash
    $ gulp inject:build
    ```

***

## <a name="install"></a> Install
##### Anwendungsabhängigkeiten über bower installieren
```bash
$ gulp install
```

***


## <a name="test="></a> Test
##### Unit Test
Das Testing wird in diesem projekt von [Karma](https://karma-runner.github.io/1.0/index.html) & [Jasmine](http://jasmine.github.io/2.5/introduction.html) durchgeführt.
Dazu wird ein Test-Abdeckungs-Protokoll geschrieben [Istanbul](http://gotwarlost.github.io/istanbul/).
Es gibt mehrere Testarten:
* Unit tests mit allen einzelnen Dateien - Je nach Projekt werden die presets des Projekts oder die Presets im default projekt genutzt
* Dieser Prozess bleibt am leben und wartet auf Änderungen in den betroffenen Dateien. Jede Änderung führt zum neuen durchlauf der Tests
  ```bash
  $ gulp test:unit:dev:watch
  ```
* wenn der Test nur ein mal ausgeführt werden soll
  ```bash
  $ gulp test:unit:dev:run
  ```
* test auf Build Datei (Vorsicht, js/dist/application.min.js muss existieren)
  ```bash
  $ gulp test:unit:build
  ```

***


##### Server/Task Tests | Mocha
Hier werden (so weit es geht) die automatisierungsfunktionen über gulp getestet
```bash
$ gulp test:mocha
```

---

Alle Tests
```bash
$ gulp test
```
