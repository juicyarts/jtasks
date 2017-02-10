Die folgenden Dinfe sind nicht als Regelwerk wahrzunehmen.
Es handelt sich lediglich um best practices die ich in den letzten Jahren für mich entwickelt habe um mir die Arbeit zu erleichtern.
Ausserdem sind diese Dinge teilweise für die Tasks wichtig.

### README/WIKI
Jedes Projekt sollte entweder im Redmine oder im Projekt selbst (was ich für sinnvoller halte) eine Readme enthalten
welche Projektspezifische Dinge dokumentiert. Es geht dabei nicht um eine Dokumentaion des Codes.
Eher um eine Projektbeschreibung.
Dazu kann, wie auch in dieser Readme, der Header mit Badges versehen werden um etwa den zugehörigen Jenkins Job oder die eingesetzten Technologien
anzuzeigen.

### Url's/Hostnames
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

### Projektstrukturen
Wir nutzen häufig den selben Ordner für kompilierte und Quell-Dateien.

```
+-- static/js/
    +-- heimspiel.js
    +-- jquery.min.js
    +-- modernizer.js
    +-- einefancyfuktion.js
+-- static/css/
    +-- heimspiel.sass
    +-- normalize.css
    +-- base.scss
    +-- default.min.css
```

Was dazu führt dass Libraries und Arbeitsdateien sich vermischen. Klar spielt das nicht so eine große Rolle, doch zur Trennung von Arbeitsdateien und einfach eingebundenen Libraries ist das nicht dienlich. Ausserdem müssen die Automatisierungen dadurch immer mit exclude filtern versehen werden um zb. 3rd party libraries nicht mit in den Test/Build einzubeziehen.

Ich würde daher empfehlen euren Static Ordner wie folgt zu strukturieren

```
+--- static/js/
    +--- src/ - Arbeitsdateien/Funktionen und Libraries die ihr erstellt
    +--- lib/ - 3rd party Libraries
    +--- dist/ - Ordner der für den/die Builds genutzt wird
+--- static/css/
    +--- src/
    +--- dist/
```

