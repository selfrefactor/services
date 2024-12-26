https://github.com/KI-Testen/Uebungen/blob/main/Kap09.7_Testverfahren_ausw%C3%A4hlen/%C3%9Cbung_Testverfahren_ausw%C3%A4hlen.ipynb
https://web.dev/articles/css-vs-javascript?hl=de

const facts = [
  "Im Jahr 1987 überholten Katzen die Hunde als Nr.1 Haustier in Amerika.",
  "Katzen, die zusammenleben, reiben manchmal ihre Köpfe zusammen, um zu signalisieren, dass sie keine Absicht haben zu kämpfen. Dies ist vermehrt bei jüngeren Katzen zu beobachten - vorallem wenn sie aufgeregt sind.",
  "Die Katzenmutter bringt ihren Kitten bei das Katzenklo zu verwenden",
  "Um catfacts zu deabonnieren antworte mit dem folgenden Code: tj3G5de$se",
  "Das ist aber schade! Bist du sicher, dass du catfacts deabonnieren willst? Antworte mit YES oder NO",
  "Ungültiger Befehl, CatFacts!",
  "Die Art wie du deine Kitten im jungen Alter behandelst wird Einfluss auf dessen Persönlichkeit im höheren Alter haben.",
  "Entgegen der läufigen Meinung ist die Katze ein soziales Tier. Eine Hauskatze wird auf Sprache reagieren und antworten und scheint menschliche Gesellschaft zu genießen.",
  "Bei guter Behandlung können Katzen bis zu 20 oder mehr Jahre alt werden. Die durchschnittliche Lebenserwartung einer Hauskatze beträgt allerdings 14 Jahre.",
  "Das Kastrieren einer Katze verlängert ihre Lebenserwartung um zwei bis drei Jahre.",
  "Um catfacts zu deabonnieren antworte mit dem folgenden Code: tj3G5de$se",
  "Das ist aber schade! Bist du sicher, dass du catfacts deabonnieren willst? Antworte mit YES oder NO",
  "Ungültiger Befehl, CatFacts!",
  "Katzen, vorallem ältere Katzen, sind in der Lage Krebs zu bekommen. Oftmals kann diese Krankheit erfolgreich behandelt werden.",
  "Katzen können süß nicht schmecken",
  "Katzen benötigen Fett in ihrem Diätfutter, da sie dieses nicht selbst produzieren können.",
  "Einige übliche Hauspflanzen sind giftig für Katzen. Darunter sind: Efeu, Schwertlilie, Mistelzweig, Philodendron und Eibe.",
  "Paracetamol und Schokolade sind für Katzen giftig.",
  "Viele Katzen können Kuhmilch nicht richtig verdauen. Milch und Milchprodukte sorgen daher für Durchfall bei Katzen.",
  "Die durchschnittliche Katzenfutter Portion ist equivalent zu ungefähr fünf Mäusen.",
  "Katzen können durch das Fressen von Flöhen Bandwürmer bekommen. Diese Würmer leben für immer in der Katze, oder bis sie mit Medikamenten entfernt werden. Sie vermehren sich, indem sie ein Glied am Ende ihres langen Körpers abwerfen. Dieses Glied krabbelt aus dem Anus der Katze und legt Hunderte von Eiern ab. Diese Eier werden von Flohlarven aufgenommen, und der Kreislauf setzt sich fort. Auch Menschen können diese Bandwürmer bekommen, aber nur, wenn sie infizierte Flöhe essen. Katzen mit Bandwürmern sollten von einem Tierarzt entwurmt werden.",
  "Katzen können durch das Fressen von Mäusen Bandwürmer bekommen. Wenn deine Katze eine Maus fängt, ist es am besten, ihr die Beute wegzunehmen.",
  "Es existiert eine Katzen Variante von AIDS.",
  "Die Farbe der Punkte bei Siamkatzen ist wärmebedingt. Kühle Bereiche sind dunkler.",
  "Siamesische Kitten werden, aufgrund der Hitze im Uterus der Mutter, weiß geboren. Diese Wärme verhindert, dass sich die Haare der Kitten verdunkeln.",
  "Katzenallergiker sind eigentlich gegen Katzenspeichel oder Katzenschuppen allergisch. Wenn die Hauskatze regelmäßig gebadet wird, wird sie von den Allergikern besser vertragen.",
  "Studien zeigen, dass das Allergen bei Katzen mit ihren Duftdrüsen zusammenhängt. Katzen haben Duftdrüsen im Gesicht und an der Schwanzwurzel. Ausgewachsene Kater erzeugen den meisten Duft. Wenn dieses Sekret aus den Duftdrüsen das Allergen ist, sollten Allergiker kastrierte weibliche Katzen am besten vertragen.",
  "Katzen denken nicht, dass sie kleine Menschen sind. Sie denken, dass wir große Katzen sind. Das beeinflusst ihr Verhalten in vielerlei Hinsicht.",
  "Katzen sind anfällig für Zahnfleischerkrankungen und Zahnkaries. Sie sollten ihre Zähne einmal im Jahr vom Tierarzt oder vom Katzenzahnarzt reinigen lassen.",
  "Viele Menschen befürchten, sich bei Katzen mit einer Protozoenerkrankung, der Toxoplasmose, anzustecken. Diese Krankheit kann beim Menschen Krankheiten hervorrufen, aber noch schlimmer ist, dass sie bei Ungeborenen zu Missbildungen führen kann. Toxoplasmose ist eine weit verbreitete Krankheit, die manchmal über den Kot von Katzen übertragen wird. Sie wird am häufigsten durch den Verzehr von rohem oder seltenem Rindfleisch verursacht. Schwangere Frauen und Menschen mit einem geschwächten Immunsystem sollten das Katzenklo nicht berühren. Ansonsten gibt es keinen Grund, warum diese Menschen Katzen meiden sollten.",
  "Der Vorfahre aller Hauskatzen ist die Afrikanische Wildkatze, die auch heute noch existiert.",
  "Im alten Ägypten war das Töten einer Katze ein Verbrechen, das mit dem Tod bestraft wurde.",
  "Im alten Ägypten wurden Katzenmumien angefertigt, und einbalsamierte Mäuse wurden mit ihnen in die Gräber gelegt. In einer alten Stadt wurden über 300.000 Katzenmumien gefunden.",
  "Im Mittelalter wurden, während des Johannisfestes, Katzen auf den Plätzen der Städte lebendig verbrannt.",
  "Die erste Katzenshow fand 1871 im Crystal Palace in London statt.",
  "Heute gibt es etwa 100 verschiedene Rassen der Hauskatze.",
  "Wie Vögel verfügen auch Katzen über ein Heimfindevermögen. Dieses nutzt ihre biologische Uhr, den Sonnenstand und das Magnetfeld der Erde. Eine Katze, die sich weit von ihrem Zuhause entfernt hat, kann dorthin zurückfinden. Aber wenn die Besitzer einer Katze sich weit von ihrem Zuhause entfernen, kann die Katze sie nicht mehr finden.",
  "Katzen vergraben ihren Kot, um ihre Spuren vor Raubtieren zu verbergen.",
  "Katzen schlafen 16 bis 18 Stunden am Tag. Wenn Katzen schlafen, sind sie immer noch wachsam gegenüber eingehenden Reizen. Stupst man eine schlafenden Katze am Schwanz an, reagiert sie entsprechend.",
  "Außer mit der Nase können Katzen auch mit einem zusätzlichen Organ riechen, dem so genannten Jacobsonschen Organ, das sich an der Oberseite des Mundes befindet.",
  "Das Chlor in frischem Leitungswasser reizt die empfindliche Katzennase. Lass Leitungswasser 24 Stunden lang stehen, bevor du es einer Katze gibst.",
  "Abraham Lincoln liebte Katzen. Er hatte vier, als er im weißen Haus lebte.",
  "Julius Caesar, Henri II, Charles XI und Napoleon hatten alle Angst vor Katzen.",
  "Katzen haben im Durchschnitt 24 Schnurrhaare, die in vier horizontalen Reihen auf jeder Seite angeordnet sind.",
  "Das Wort 'Katze' in verschiedenen Sprachen: Französisch: chat; Deutsch: Katze; Italienisch: gatto; Spanisch/Portugiesisch: gato; Jiddisch: kats; Maltesisch: qattus; Schwedisch/Norwegisch: katt; Niederländisch: kat; Isländisch: kottur; Griechisch: catta; Hindu: katas; Japanisch:neko; Polnisch: kot; Ukrainisch: kotuk; Hawiianisch: popoki; Russisch: koshka; Latein: cattus; Ägyptisch: mau; Türkisch: kedi; Armenisch: Gatz; Chinesisch: mao; Arabisch: biss; Indonesisch: qitta; Bulgarisch: kotka; Malaiisch: kucing; Thailändisch/Vietnamesisch: meo; Rumänisch: pisica; Litauisch: katinas; Tschechisch: kocka; Slowakisch: macka; Armenisch: gatz; Baskisch: catua; Estnisch: kass; Finnisch: kissa; Suaheli: paka.",
  "Statistiken zeigen, dass Tierliebhaber in den letzten Jahren Katzen gegenüber Hunden bevorzugt haben!",
  "Katzen kann man beibringen, an der Leine zu gehen. Dies erfordert jedoch viel Zeit und Geduld. Je jünger die Katze ist, desto einfacher ist es für sie zu lernen.",
  "Schnurren bedeutet nicht immer Freude. Schnurren kann bedeuten, dass eine Katze schreckliche Schmerzen hat, z.B. bei der Geburt eines Kindes. Kitten schnurren ihrer Mutter zu, um ihr mitzuteilen, dass sie beim Säugen genug Milch bekommen. Das Schnurren ist ein Vorgang des Ein- und Ausatmens, der normalerweise mit geschlossenem Maul ausgeführt wird. Aber keine Sorge, wenn deine Katze schnurrt, während du sie sanft streichelst und mit ihr kuschelst - dann ist sie eine glückliche Katze!",
  "Die Katzenminze enthält ein Öl namens Hepetalacton, das bei Katzen das bewirkt, was Marihuana bei manchen Menschen bewirkt. Nicht alle Katzen reagieren darauf, aber die, die darauf reagieren, scheinen in einen tranceartigen Zustand zu geraten. Eine positive Reaktion äußert sich darin, dass die Katze an der Katzenminze schnüffelt, dann leckt, beißt, kaut, sich wiederholt darauf reibt und wälzt, schnurrt, miaut und sogar in die Luft springt.",
  "Von allen Katzenarten ist die Hauskatze die einzige Art, die ihren Schwanz beim Laufen senkrecht halten kann. Alle Wildkatzenarten halten ihren Schwanz beim Laufen waagerecht oder zwischen den Beinen eingeklemmt.",
  "Eine glückliche Katze hält ihren Schwanz hoch und fest.",
  "Fast 10% der Knochen einer Katze befinden sich im Schwanz, und der Schwanz dient dazu, das Gleichgewicht zu halten.",
  "Katzenfamilien spielen in der Regel am besten in gerader Zahl. Katzen und Kitten sollten nach Möglichkeit paarweise angeschafft werden.",
  "Backschokolade ist die gefährlichste Schokolade für Katzen.",
  "Den Puls einer Katze prüft man an der Innenseite des hinteren Oberschenkels, wo das Bein mit dem Körper verbunden ist. Normal für Katzen: 110-170 Schläge pro Minute.",
  "Jaguare sind die einzigen Großkatzen, die nicht brüllen.",
  "Das Sichtfeld einer Katze beträgt etwa 185 Grad.",
  "Katzen haben individuelle Vorlieben für Kratzflächen und -winkel. Einige kratzen horizontal, während andere ihr Kratzen vertikal ausüben.",
  "Die Maine Coone ist die einzige in Amerika beheimatete Langhaarrasse.",
  "Die Maine Coon ist 4 bis 5 Mal größer als die Singapura, die kleinste Katzenrasse.",
  "Man nimmt an, dass die Tabby-Katzen ihren Namen von Attab, einem Stadtteil von Bagdad, der heutigen Hauptstadt des Irak, haben.",
  "Einziehbare Krallen sind ein physikalisches Phänomen, das Katzen vom Rest des Tierreichs unterscheidet. In der Familie der Katzen können nur Geparden ihre Krallen nicht einziehen.",
  "Nicht jede Katze wird von Katzenminze 'high'. Ob eine Katze darauf anspricht oder nicht, hängt von einem rezessiven Gen ab: Kein Gen, keine Freude.",
  "Eine Katze kann mit einer Geschwindigkeit von ca. 50 Kilometer pro Stunde sprinten.",
  "Im alten Ägypten rasierten sich alle Familienmitglieder beim Tod einer Familienkatze die Augenbrauen als Zeichen der Trauer.",
  "Katzen werden erst halb so lange domestiziert wie Hunde.",
  "Man nimmt an, dass die Schnurrhaare einer Katze eine Art Radar sind, mit dessen Hilfe sie den Raum, durch den sie gehen will, abschätzen kann.",
  "Eine Katze kann fünf oder mehr Stunden am Tag damit verbringen, sich zu pflegen.",
  "Alle Katzen haben drei Gruppen von langen Haaren, die druckempfindlich sind - Schnurrhaare, Augenbrauen und die Haare zwischen den Pfotenballen.",
  "Menschen und Katzen haben identische Regionen im Gehirn, die für Emotionen zuständig sind.",
  "Um catfacts zu deabonnieren antworte mit dem folgenden Code: tj3G5de$se",
  "Das ist aber schade! Bist du sicher, dass du catfacts deabonnieren willst? Antworte mit YES oder NO",
  "Ungültiger Befehl, CatFacts!",
  "Das Gehirn einer Katze ist dem eines Menschen ähnlicher als dem eines Hundes.",
  "Eine Katze hat mehr Knochen als der Mensch; Der Mensch hat 206, die Katze 230 Knochen.",
  "Katzen haben 30 Wirbel - 5 mehr als Menschen.",
  "Katzen sind das beliebteste Haustier in den Vereinigten Staaten: Es gibt 88 Millionen Hauskatzen und 74 Millionen Hunde.",
  "Katzen haben mehr als 20 Muskeln, die ihre Ohren steuern.",
  "Eine Gruppe von Katzen nennt man Wurf.",
  "Es gibt Katzen, die Stürze aus über 32 Stockwerken (320 Metern) auf Beton überlebt haben.",
  "Katzen schlafen 70% ihres Lebens.",
  "Ein Kater ist seit 15 Jahren Bürgermeister von Talkeetna, Alaska. Sein Name ist Stubbs.",
  "Eine Katze hat 2013 für das Amt des Bürgermeisters von Mexiko-Stadt kandidiert.",
  "Bei Tigern und Tabbies ist die Mitte der Zunge mit nach hinten gerichteten Stacheln bedeckt, die zum Abreißen und Festhalten von Fleisch dienen.",
  "Wenn Katzen Grimassen schneiden, sind sie in der Regel 'geschmackssuchend'. Sie haben ein zusätzliches Organ, das es ihnen ermöglicht, bei kontrollierter Atmung, die Luft zu schmecken.",
  "Katzen können keine Süße schmecken.",
  "Das Besitzen einer Katze kann das Risiko eines Schlaganfalls oder Herzinfarkts um ein Drittel senken.",
  "Wikipedia hat eine Aufnahme einer miauenden Katze - warum auch nicht?",
  "Die größte Katze der Welt war 123,19 cm lang. https://www.youtube.com/watch?v=gc5M0aGc_EI",
  "Es gibt Hinweise darauf, dass domestizierte Katzen seit 3600 v. Chr. existieren, also 2.000 Jahre vor den ägyptischen Pharaonen.",
  "Das Schnurren einer Katze kann eine Form der Selbstheilung sein, da es sowohl ein Zeichen für Nervosität als auch für Zufriedenheit sein kann.",
  "Die Frequenz des Schnurrens einer Hauskatze ist die Gleiche, mit der sich Muskeln und Knochen selbst reparieren.",
  "Erwachsene Katzen miauen nur, um mit Menschen zu kommunizieren.",
  "Die reichste Katze der Welt ist 13 Millionen Dollar wert. Nachdem ihre Besitzerin verstorben ist, hat sie ihm ihr Vermögen hinterlassen.",
  "Deine Katze erkennt deine Stimme, tut aber so, als wäre sie zu cool, um sich darum zu kümmern (wahrscheinlich, weil sie es ist).",
  "Katzen sind oft laktoseintolerant, also gib ihnen keine Milch!",
  "Katzen können bis zum Sechsfachen ihrer Körperlänge hoch springen.",
  "Katzen haben zum Aussterben von 33 verschiedenen Arten beigetragen.",
  "Katzen können Meerwasser trinken, um zu überleben.",
  "Geparden können nicht brüllen wie Großkatzen (z.B. Löwen), sondern miauen und schnurren wie typische Hauskatzen",
];

häufig - often
außerdem - besides; furthermore
das Geschlecht - gender
langweilig - boring; bored
unheimlich - scary; eerie; incredibly; really
vorbei - over; finished; by
stehlen - to steal
fehlen - to lack
abonnieren - to subscribe to
das Opfer - victim
der Unfall - accident
zeigen - to show
die Zahlen - numbers
der Beruf - profession
wen - to whom; whom
das Feuerzeug - lighter
reichen - to range
das Hauptgereicht - main course
die Tante - aunt
die Nichte - niece
der Besuch - visit
folgen - to follow
gehören - to belong
die Geschwister - siblings
der Zaun - fence
das Gutschein - coupon
ab - from
abhängig - addicted
ähnlich - similar
aktuelle - current
allerdings - however
allgemein - general
als - as; than
am - at the; on the
an - to; at; on
anders - different
ändern - to change
der Anfang - beginning
der Anfänger - beginner
ansonsten - otherwise
der Arbeitnehmer - employee
der Ärger - trouble; anger
auf - on; to; in
aufs - on to
das Augenblick - moment
aus - from; of; off; out
ausgezeichnet - excellent
das Ausland - abroad
der Back - creek
bauen - to build
die Bauer - farmer
die Bedienung - service
begeistert - excited
bei - at, in, with
bekannt - well-known
benutzen - to use
der Bereich - area
bereit - ready
der Beruf - profession
besonderen - special
besonders - especially
bestellen - to order
der Bezirk - district
die Bildung - education
bisher - so far
bisschen - a little
der Blitz - lightning
bluten - to bleed
der Boden - ground
böse - angry
brennen - to burn
die Brücke - bridge
das Bundesland - state
dabei - with
dadurch - thereby
daher - therefore
damals - at that time
damit - in order to
danach - after that
darüber - about that
darum - for that reason
dass - that
die Dauer - the duration
davon - from that
denn - because
deshalb - that's why
deutlich - clearly
der Donner - thunder
dran - turn
draußen - outside
drin - in
drinnen - inside
drüben - over there
drückt - to press
durchaus - absolutely
durch - through, by
echt - genuine
egal - does not matter
ehemalige - former
eher - rather
ehrlich - honest
eigentlich - actually
eindeutig - clear
der Eindruck - impression
einfach - simple
einzelnen - individual
einzige - single
der Enkel - grandson
entlang - along
entweder - either
der Entwickler - developer
die Erfindung - invention
erlauben - to allow
die Ernährung - nutrition
erneut - again
ernst - serious
ersetzen - to replace
erweitern - to expand
die Erziehung - upbringing
etwas - something
euch - you
euer - your
die Fachrichtung - subject area
der Fahrer - driver
fallen - to fall
fast - almost
Fehlen - to be lacking
fest - firm
die Festplatte - hard drive
die Fläche - surface
die Forschung - research
früh - early
der Frühling - Spring
führen - to lead
ganzen - whole
ganz - completely
gar - at all
das Gebot - bid
der Gebrauch - usage
der Gedanken - thoughts
gegen - against
gegenüber - across from
der Gegner - opponent
die Gelegenheit - opportunity
gemeinsam - together
genauso - as
gerade - just
gesamte - entire
der Geschäftsführer - manager
geschehen - to have happened
die Geschichte - story
das Gespräch - conversation
gestern - yesterday
der Gewinn - prize
das Gewitter - thunderstorm
gewöhnlich - usually
gingen - to have gone
gleiche - same
großartig - great
größte - biggest
das Grundstück - property
günstige - cheap
der Gutschein - voucher
die Hälfte - half
die Halle - hall
halten - to hold
der Handel - trade
das Handwerk - craft
hatten - to have had
der Hauptgereicht - main course
die Heimat - home
heraus - out
herein - inside
her - from
der Hersteller - producer
herum - around
herunter - down
herzlich - cordial
hierher - here
hilfreich - helpful
hinaus - out
hin - to
hinten - at the back
hinter - behind
der Hinweise - clues
höchste - highest
der Hof - yard
hoffen - to hope
hohe - high
der Inhaber - owner
die Insel - island
inzwischen - by now
jedenfalls - definitely
jedoch - however
je - ever
jemand - someone
jugendlich - teenage
das Kabel - cable
kamen - to have come
die Karriere - career
kaum - barely
keinerlei - no
die Kenntnis - knowledge
die Kenntnisse - skills
die Kleinanzeigen - classified ads
knapp - scarce
die Kneipe - bar
komisch - strange
kontaktieren - to contact
die Krankenversicherung - health insurance
das Kupfer - copper
lachen - to laugh
die Lage - position
lasen - to have been reading
das Leben - life
die Leber - liver
leider - unfortunately
der Leser - reader
die Leibe - love
links - left
die Lösungen - solutions
die Luft - air
die Lust - desire
lustig - funny
der Magen - stomach
manche - some
manchmal - sometimes
man - one
die Mauer - wall
das Medien - media
meditieren - to meditate
die Meinung - opinion
meisten - most
meist - usually
merken - to notice
mieten - to rent
mindestens - at least
das Mitglieder - members
möglich - possible
der Mund - mouth
der Nachbar - neighbor
nachdem - after
nach - to
die Nachricht - message
der Nachtisch - dessert
der Nachweis - proof
die Nähe - closeness
naja - well
nass - wet
nebenan - next door
neben - next to
nehmen - to take
nennen - to call
nett - nice
neuesten - newest
die Nichten - nieces
niemals - never
niemand - nobody
noch - still
normalerweise - normally
die Not - distress
die Noten - grades
der Notfall - emergency
notwendig - necessary
nun - now
oben - up
der Oberschenkel - thigh
ob - if
obwohl - though
öffentlichen - public
passenden - matching
die Pflanzen - plants
der Platz - place
plötzlich - suddenly
politischen - political
praktisch - practical
die Presse - press
prüfen - to check
die Prüfung - test
das Publikum - audience
raus - out
der Regenbogen - rainbow
reich - rich
rein - pure
der Reiseführer - guide
reiten - to ride
der Rollstuhl - wheelchair
der Rücken - back
die Ruhe - quiet
ruhig - quiet
die Sache - thing
sagten - to have said
sahen - to have seen
sammeln - to collect
der Satz - sentence
sauber - clean
das Säugetiere - mammal
der Abschluss - degree
der Abschnitt - section
die Abteilung - department
achten - to pay attention to
die Achtung - careful
die Agentur - agency
die Ahnung - ideas
die Aktien - shares
aktivieren - to activate
die Aktivitäten - activities
die Analyse - analysis
änderten - to have changed
die Änderung - change
die Angaben - specifications
das Angebote - offers
die Anlagen - facilities
die Anmeldung - registration
die Anregungen - suggestions
der Ansatz - approach
die Ansicht - view
der Anteil - share
der Antrag - application
die Anzeige - advertisement
die Art - type
die Aufgabe - task
die Auflage - edition
die Aufnahme - record
der Auftrag - assignment
der Augenblick - moment
die Ausbildung - training
der Ausdruck - expression
die Ausgabe - edition
die Ausnahme - exception
außen - outside
außer - except
das Außerirdische - alien
die Ausstellung - exhibition
der Austausch - exchange
basieren - to be based
der Bauch - belly
beachten - to pay attention to
beantworten - to answer
bearbeiten - to edit
der Bedarf - demand
bedeuten - to mean
die Bedeutung - meaning
beenden - to end
der Begriff - term
behalten - to keep
behandeln - to treat
die Behörden - authorities
das Beine - legs
das Beispiel - example
beißen - to bite
der Beitrag - contribution
bekannt - known
bekommen - to get
benötigen - to need
beraten - to be advised
die Beratung - counsel
berechnen - to calculate
berechtigen - to authorize
berichten - to report
der Bernstein - amber
die Beschreibung - description
bestätigen - to confirm
die Bestätigung - confirmation
bestehen - to consist
die Bestellungen - orders
beten - to pray
die Betreuung - supervision
der Betrieb - business
betreffen - to concern
bewegen - to move
die Bewegung - movement
die Bewerbung - application
bewerten - to evaluate
das Bewusstsein - consciousness
die Bezeichnung - labeling
der Bezug - salary
der Bezüge - covers
biegen - to turn
die Börse - stock market
die Branche - industries
der Briefkasten - mailbox
buchen - to book
die Bühne - ramp
die Chancen - chances
der Christ - Christian
daran - about it
darauf - to that
der Darm - intestine
dazu - for
definieren - to define
der Delfine - dolphin
dennoch - nevertheless
derzeit - currently
desto - the
deswegen - that is why
dick - fat
die Dienstleistung - service
das Ding - thing
der Dirigent - conductor
der Drache - dragon
der Druck - pressure
drücken - to shake
dünn - thin
der Durchschnitt - average
die Ebene - level
ebenfalls - also
das Eichhörnchen - squirrel
die Eigenschaften - traits
einfache - simple
der Einfluss - influence
die Einführung - introduction
die Einheit - unity
das Einhorn - unicorn
der Einsatz - deployment
einschließlich - including
die Einstellungen - settings
der Eintrag - entry
der Eintritt - admission
der Einzelhandel - retail
die Einzelheiten - details
der Ellbogen - elbows
der Empfang - reception
empfehlen - to recommend
die Empfehlung - recommendation
entfernt - removed
die Entfernung - distance
die Entscheidung - decision
der Entwurf - draft
das Ereignisse - events
erfahren - to find out
Erfahrungen - experiences
der Erfolg - success
das Ergebnisse - results
ergeben - to make
erhalten - to receive
erhöhen - to increase
erklären - to explain
die Erklärung - Explanation
erleben - to experience
ermitteln - to investigate
ermöglichen - to make possible
erreichen - to reach
erscheinen - to appear
erwarten - to expect
erzählen - to tell
die Eule - owl
externe - external
der Fachbereich - department
die Fähre - ferry
die Fassung - version
das Feld - field
die Ferse - heel
die Firma - company
fliegen - to fly
die Folge - sequence
fördern - to support
die Förderung - funding
die Freude - joy
der Fuchs - fox
gaben - to have been
die Gans - goose
die Gefahr - danger
gefährlich - dangerous
das Gefühl - feeling
der Gegensatz - contrast
der Gehirn - brain
der Geist - ghost
die Genehmigung - permit
genügten - to have been enough
die Geschwindigkeit - speed
das Gesetze - laws
die Gewalt - violence
das Gewicht - weight
das Gleichgewicht - equilibrium
glücklich - happy
die Grundlage - foundation
die Gründung - founding
das Handgelenk - wrist
hart - hard
hätten - to would have
heilig - holy
die Herkunft - origin
das Herzen - heart
heutigen - today's
das Haxe - witch
hingegen - on the other hand
der Höfe - courts
die Hoffnung - hope
das Horn - horn
die Hüfte - hip
der Inhalten - contents
insbesondere - particularly
das Kamele - camels
der Kampf - battle
das Kinn - chin
das Klavier - piano
klingen - to sound
klangen - to have sounded
das Knie - knees
das Knöchel - ankle
das Knochen - bone
der Köpfe - heads
die Kraft - power
der Kreis - circle
der Krieg - war
die Kunst - art
die Länge - length
lassen - to let
legen - to put
leisten - to accomplish
die Leistungen - accomplishments
die Leitdung - leadership
lieber - prefer
das Lieder - songs
liefern - to deliver
die Lieferung - delivery
die Liga - league
die Liste - list
der Liter - liter
lösen - to solve
die Magie - magic
die Marke - brand
markieren - to mark
die Menge - amount
das Merkmale - features
die Messe - fair
messen - to measure
mittlerweile - now
das Modell - model
der Mönch - monk
mussten - to have had to
Die Nutzung - usage
das Ohr - ear
die Oper - opera
die Pappe - cardboard
die Parteien - parties (political)
die Partys - parties
passende - fitting
der Präsident - president
der Prozess - trial
die Quellen - sources
der Rahmen - frame
das Raumschiff - space ship
die Regel - rule
die Regie - direction
die Reihe - series
die Reparatur - repair
retten - to rescue
das Risiken - risks
die Rubrik - section
sah - to have seen
der Sänger - singer
der Schäden - damages
schafften - to manage
der Schauspieler - actor
schenken - to give
die Schere - scissors
das Schicksal - destiny
die Schildkröte - turtle
die Schlange - snake
schlau - smart
schließen - to close
schließlich - finally
schmutzig - dirty
die Schrift - writing
der Schritt - step
die Schulter - shoulder
der Schutz - protection
die Seele - soul
die Sehenswürdigkeiten - sights
die Seite - page
seit - since
selbstverständlich - of course
selten - rarely
das Seminare - seminars
die Sicherheit - safety
die Sicht - view
sichtbar - visible
der Sieg - victory
der Sinne - senses
sinnvoll - meaningful
der Sitz - seat
skeptisch - skeptical
sobald - soon
soeben - just
sofort - right
sogar - even
solange - so long as
das Sonderangebot - special offer
sondern - but rather
sonst - else
soweit - as far as
sowohl - both
soziale - social
die Spalte - column
der Spargel - asparagus
spätestens - at the latest
speziellen - special
der Spieler - player
die Spiritualität - spirituality
der Standort - location
der Start - start
stechen - to sting
steigen - to flow
die Stelle - position (job)
das Stellenangebot - job offer
der Stil - style
die Stimme - voice
die Stirn - forehead
stolz - proud
die Strahlung - radiation
die Strecke - route
die Streifen - stripes
der Strom - electricity, river
der Stück - piece of
das Studium - studies
die Stufe - step
der Sturm - storm
der Südpol - southpole
ausrichten - to line up
die Aussprache - pronunciation
der Akzent - accent
in der Mitte von - in the middle of
das Lager - the warehouse
einschalten - to turn on
rauchen - to smoke
die Aushilfe - temporary position
die Schicht - shift
die Kündigung - termination
abgeben - to submit
zum Beispiel - for example
Ich sah komisch aus - I looked funny
der Anlass - occasion
zahlreiche - numerous
die Mitteilungen - messages
wählen - to choose
der Abschied - farewell
der Ruhestand - retirement
kämmen - to comb
umziehen - to move
beeilen - to hurry up
erkälten - to catch a cold
(sich) anziehen - to get dressed
(sich) duschen - to shower
(sich) rasieren - to shave
(sich) verspäten - to be late
(sich) ausruhen - to rest
(sich) setzen - to sit down
(sich) hinlegen - to lie down
hassen - to hate
einander - each other
(sich) etwas überlegen - to think something over
(sich) erinnern an - to remember
(sich) erholen - to recover
(sich) etwas vorstellen - to imagine something
(sich) freuen auf - to look forward to
(sich) interessieren für - to be interested in
kümmern - to take care of
tapfer - brave
die Tastaturen - keyboards
die Tätigkeit - job
tatsächlich - actually
technischen - technical
die Teilnahme - participation
der Tempel - temple
tief - deep
der Ton - sound
tragen - to wear, to carry
treffen - to meet
treten - to kick
das Trinkgeld - tip
trocken - dry
die Trommel - drum
trotzdem - anyway
tun - to do
tut - does
der Überblick - overview
überhaupt - at all
überlegen - to be thinking
übernehmen - to take over
überprüfen - to check
die Übersetzung - transition
die Übersicht - overview
übrigens - by the way
die Übung - practice
der Umfang - circumference
der Umgang - interaction
die Umgebung - environment
die Umsetzung - implementation
die Umwelt - environment
unabhängig - independent
unbekannt - unknown
unglaublich - incredible
unsichtbar - invisible
unten - downstairs
die Unterhaltung - conversation
die Unterkunft - accommodation
der Unternehmen - business
der Unterricht - class
unterschiedliche - different
die Unterstützung - support
die Untersuchung - investigation
unterwegs - on the road
der Urenkel - great-grandson
erinnern - to remember
vereinbaren - to agree
der Fehler - error
unbedingt - absolutely
klappen - to fold
regelmäßig - regularly
verändern - to change
verantwortlich - responsible
die Verantwortung - responsibility
die Verbesserung - improvement
verdienen - to earn
das Verfahren - procedure
verfügbar - available
verfügen - to decree
vergangenen - past
vergeben - to forgive
der Vergleich - comparison
vergleichen - to compare
das Verhalten - behavior
verhandeln - to negotiate
verheiratet - married
verhindern - to prevent
das Verkehr - traffic
verlassen - to have left
der Verlauf - course
der Verlust - loss
vermeiden - to avoid
vermitteln - to communicate
die Vermittlung - mediation
verpflichtet - obliged
die Verpflichtungen - obligations
verrückt - crazy
verschiedenen - different
die Versicherung - insurance
die Versorgung - supply
die Verspätung - delay
das Verständnis - understanding
der Versuch - attempt
der Verträge - contracts
vertreten - to represent
die Verwaltung - administration
die Verwandte - relatives
die Verwendung - use
das Verzeichnis - directory
die Verzeihung - pardon
das Volk - people
völlig - totally
voraus - ahead
von - from
die Vorbereitung - preparation
vorher - before
vorne - front
der Vorschläge - suggestions
die Vorschriften - rules
vorsichtig - careful
die Vorstellung - idea
der Vorteil - advantage
die Vorwahl - area code
Glückwünsche - congratulations
der Schneider - tailor
das Zeugnis - testimony
während - while
wahrscheinlich - probably
wahr - true
die Ware - merchandise
warten - to wait
der Wechsel - change
wechseln - to change
weder - neither
wegen - because
weg - away
weich - soft
die Weise - way
die Weiterbildung - training
weiterer - another
weiterhin - continue to
weit - far
de Welle - wave
der Weltraum - space
wenden - to turn
die Werbung - advertising
die Wertung - rating
wertvoll - valuable
die Wespen - wasps
wessen - whose
der Wettbewerb - competition
die Wiedergeburt - reincarnation
wieder - again
die Wiese - meadow
die Wirklichkeit - reality
wirken - to appear
die Wissenschaftlerin - scientist
wissen - to know
der Witz - joke
witzig - funny
woher - where from
wohin - where in
wohl - well
die Wolke - cloud
worüber - about
wunderschöne - beautiful
wurden - to have been
werden - would
die Wüste - desert
der Zeh - toe
das Zeichen - sign
die Zeitschrift - magazine
das Ziele - goals
ziemlich - pretty
zitieren - to cite
das Zubehör - equipment
zufälliger - random
zufrieden - satisfied
der Zugang - access
zugleich - simultaneously
zumindest - at least
die Zusammenarbeit - collaboration
die Zusammenfassung - summary
der Zusammenhang - connection
zusätzlichen - additional
der Zuschauer - spectator
der Zustand - condition
zuständigen - responsible
die Zustimmung - consent
zuvor - before
der Zweck - purpose
das Steuerberater - tax consultant
(sich) bewerben - to apply
der Tesafilm - scotch tape
holen - to get
geliehen - to lend, to borrow
auf jeden Fall - definitely
die Schnur - string
der Ehering - wedding ring
der Brautigam - the groom
die Braut - bride
die Eintrittskarte - ticket
die Trauung - wedding
das Standesamt - registry office
hupen - to honk
der Strauß - bouquet
entscheiden - to decide
einladen - to invite
ankommen - to arrive
die Flitterwochen - honeymoon
der Bescheid - decision
der Vorschlag - suggestion
der Ratschlag - advice
ausstellen - to issue
der Zinssatz - interest rate
angeben - to specify
aufschreiben - to write down
eintippen - to type in
ausleihen - to borrow
die Erholung - recreation
die Hauptsache - main thing
die Ampel - traffic light
aufkleben - to glue
einwerfen - to interject
weigen - to weigh
leeren - to empty
melden - to announce
beantragen - to apply for
Solche - such
sächlich - neutral
töten - to kill
üblich - normal
schützen - to protect
künftig - in the future
stürzen - to fall
grob - rough
nieseln - to drizzle
ziehen - to pull
etwas ahnen - to suspect something
Ehre - honor
Esel - donkey
Gitter - grill, lattice
Handel - trade, commerce
Henkel - handle
Muße - leisure
Rachen - throat
Risiko - risk
Saal - hall
Stoß - push
Ziege - goat
Zunge - tongue
bitten - to ask for something
dämlich - stupid
erbärmlich - wretched
merkwürdig - weird
sachte - soft
siegen - to win
vornehm - noble
wiegen - to weigh
weinen - to cry
brechen - to break
rechen - to calculate
das Seil - rope
der Bleistift - pencil
das RInd - cow
der Sack - sack
der Nagel - nail
der Kaktus - cactus
der Vorhand - curtain
der Turm - tower
zelebrieren - to celebrate
kommunizieren - to communicate
gratulieren - to congratulate
kontaminieren - to contaminate
kontemplieren - to contemplate
kooperieren - to cooperate
kreieren - to create
dekorieren - to decorate
dividieren - to divide
formulieren - to formulate
frustrieren - to frustrate
illustrieren - to illustrate
motivieren - to motivate
reparieren - to repare
telefonieren - to telephone

der Tisch; die Tische - table
der Kuli - pen
der Bleistift; die Bleistifte - pencil
die Umleitung; die Umleitungen - detour
das Erdgeschoss; die Erdgeschosse - ground floor
die Erste Stock - first floor
das Kaufhaus; die Kaufhäuser - department store
das Kino; die Kinos - movie theater
das Postampt - post office
die Bank; die Banken - bank
das Hotel; die Hotels - hotel
die Tankstelle; die Tankstellen - gas station
die Metzgerei; die Metzgereien - butcher's shop
die Reinigung; die Reinigungen - cleaners, dry-cleaners
das Feinkostgeschäft - delicatessen
die Apotheke; die Apotheken - pharmacy
der Parkplatz; die Parkplätze - parking lot
der Kiosk; die Kioske - kiosk
der Supermarkt; die Supermärkte - supermarket
der Markt; die Märkte - market
der Tabakladen; die Tabakläden - tobacco shop
das Reisbüro; die Reisbüros - travel agency
die Buchhandlung; die Buchhandlungen - bookstore
der Blumenladen; die Blumenläden - florist
das Obstgeschäft; die Obstgeschäfte - fruit vendor
das Lebensmittelgeschäft; die Lebensmittelgeschäfte - grocery store
die Bäckerei; die Bäckereien - bakery
die Konditorei; die Konditoreien - pastry shop
die Wäscherei; die Wäschereien - laundromat
die Suppe; die Suppen - soup
der Salat; die Salate - salad
die Vorspeise; die Vorspeisen - appetizer
das Getränk; die Getränke - beverage
das Gemüse; die Gemüse - vegetable
die Zeitung; die Zeitungen - newspaper
die Zeitschrift; die Zeitschriften - magazine
die Speisekarte; die Speisekarten - menu
die Rechnung; die Rechnungen - bill
das Rezept; die Rezepte - recipe
die Quittung; die Quittungen - receipt
der Zoo; die Zoos - zoo
die Zivilisation; die Zivilisationen - civilization
der Zirkus; die Zirkusse - circus
die Zigarre; die Zigarren - cigar
die Zigarette; die Zigaretten - cigarette
die Zeremonie; die Zeremonien - ceremony
das Zentrum; die Zentren - center
der Zentimeter - centimeter
die Pension; die Pensionen - boarding house
das Abendessen - dinner
das Mittagessen - lunch
das Frühstück; die Frühstücke - breakfast
die Reservierung; die Reservierungen - reservation
das Rathaus; die Rathäuser - city hall
der Ratskeller - restaurant in Rathaus
die Weinstube; die Weinstuben - wine tavern
der Schnellimbiß; die Schnellimbiße - snack bar
das Gasthaus; die Gasthäuser - Inn
das Andenken; die Andenken - souvenir
die Ankunft; die Ankünfte - arrival
die Abfahrt; die Abfahrten - departure
die Wechselstube; die Wechselstuben - currency exchange office
die Bushaltestelle; die Bushaltestellen - bus stop
die Straßenbahnhaltestelle; die Straßenbahnhaltestellen - streetcar stop
die U-Bahnhaltestelle; die U-Bahnhaltestellen - subway stop
die Straßenbahn; die Straßenbahnen - streetcar
die Ewige Stadt - the eternal city
die Stadt; die Städte - city
die U-Bahn; die U-Bahnen - subway
die Telefonzelle; die Telefonzellen - telephone booth
das Telefongespräch - telephone conversation
das Trinkgeld; die Trinkgelder - tip
das Abteil; die Abteile - compartment
der Bahnhof; die Bahnhöfe - train station
der Flughafen; die Flughäfen - airport
der Hafen; die Häfen - harbor
der Orangensaft; die Orangensäfte - orange juice
der Apfelsaft; die Apfelsäfte - apple juice
die Schlagsahne - whipped cream
das Südafrika - south africa
das Frankreich - France
das Israel - Israel
das Belgien - Belgium
das Australien - Australia
das Irland - Ireland
das Büro; die Büros - office
der Vorhang; die Vorhänge - curtains
das Fenster; die Fenster - window
die Blume; die Blumen - flower
der Garten; die Gärten - garden
die Tür; die Türen - door
das Fernseher; die Fernseher - television
der Spiegel; die Spiegel - mirror
das Sofa; die Sofas - sofa
das Wohnzimmer; die Wohnzimmer - living room
die Toilette; die Toiletten - toilet
das Tuch; die Tücher - towel
die Tasse; die Tassen - cup
das Glas; die Gläser - glass
der Teller; die Teller - plate
der Schlüssel; die Schlüssel - key
die Schüssel; die Schüsseln - bowl
die Gabel; die Gabeln - fork
das Messer; die Messer - knife
der Löffel; die Löffel - spoon
das Hemd; die Hemden - shirt
das t-shirt; die t-shirts - t-shirt
die Hose; die Hosen - pants
die Jeans; die Jeans - jeans
der Schuh; die Schuhe - shoe
der Stiefel; die Stiefel - boot
die Socke; die Socken - sock
der Hut; die Hüte - hat
die Krawatte; die Krawatten - tie
das Bett; die Betten - bed
das Kissen; die Kissen - pillow
der Teppich; die Teppiche - carpet
die Nummer; die Nummern - numbers
gestern - yesterday
heute - today
die Familie; die Familien - family
der Film; die Filme - film
jetzt - now
das England - England
das Eis; die Eis - ice
die Adresse; die Adressen - address
das Salz - salt
die Tochter; die Töchter - daughter
der Sohn; die Söhne - son
der Onkel; die Onkel - uncle
die Tante; die Tanten - aunt
der Apfel; die Äpfel - apple
die Zwiebel; die Zwiebeln - onion
die Milch - milk
der Kühlschrank; die Kühlschränke - refrigerator
die Banane; die Bananen - banana
das Bier; die Biere - beer
die Woche; die Wochen - week
die Jacke; die Jacken - jacket
das Wort; die Wörter - word
katholisch - catholic
das Licht; die Lichter - light
die Karotte; die Karotten - carrot
die Farbe; die Farben - color
die Antwort; die Antworten - answer
das Land; die Länder - country
der Akt; die Akte - act
das Schiff; die Schiffe - ship
die Schokolade; die Schokoladen - chocolate
die Schule; die Schulen - school
der Pass; die Pässe - passport
der Koffer; die Koffer - suitcase
die Handtasche; die Handtaschen - handbag
die Brieftasche; die Brieftaschen - wallet
die Kamera; die Kameras - camera
die Batterie; die Batterien - battery
die Sonnenbrille - sunglasses
der Badeanzug; die Badeanzüge - swimsuit
die Badehose - swim trunks
die Sandalen - sandals
die Zahnbürste; die Zahnbürsten - toothbrush
die Zahnpasta - toothpaste
die Seife; die Seifen - soap
das Deo - deodorant
der Kamm; die Kämme - comb
der Mantel; die Mäntel - coat
der Regenschirm - umbrella
der Anzug; die Anzüge - suit
der Junge; die Jungen - boy
der Fuß; die Füße - foot
das Mädchen; die Mädchen - girl
der Baum; die Bäume - tree
der Stuhl; die Stühle - chair
etwas - something
Leute und Dinge - People and Things
das Arbeitsheft; die Arbeitshefte - workbook
das Dach; die Dächer - roof
das Zimmermädchen; die Zimmermädchen - maid
die Badewanne; die Badewannen - bathtub
der Lehrer; die Lehrer - teacher
der Polizist; die Polizisten - policeman
die Ampel; die Ampeln - traffic light
der Mond; die Monde - moon
die Verabredung; die Verabredungen - private meeting, appointment, date
irgendetwas - anything
jemand - someone
irgendjemand - anyone
der See; die Seen - lake
das Meer; die Meere - sea
vielleicht - maybe
das Zimmer; die Zimmer - room
der Rücken; die Rücken - back
der Wal; die Wale - whale
die Wahl; die Wahlen - vote, choice, election
die Bank; die Bänke - bench
das Schließfach; die Schließfächer - locker
der Fahrplan; die Fahrpläne - train schedule
der Bahnsteig; die Bahnsteige - train platform
der Wartesaal; die Wartesäle - waiting room
das Beispiel; die Beispiele - example
die Welt; die Welten - world
die Erde; die Erden - earth
der Weg; die Wege - way, path
das Benzin - gas, petrol
einbahnstraße - one-way street
der Reifen; die Reifen - tire
das Lenkrad; die Lenkräder - steering wheel
das Zelt; die Zelte - tent
die Decke; die Decken - blanket
der Korb; die Körbe - basket
der Eimer; die Eimer - bucket
der Schlafsack; die Schlafsäcke - sleeping bag
die Taschenlampe; die Taschenlampen - flashlight
die Jahreszeit; die Jahreszeiten - season
feucht - humid
schwül - muggy
neblig - foggy
der Dom; die Dome - cathedral
der Witz; die Witze - joke
die Nachricht; die Nachrichten - message, piece of news
das Geschenk; die Geschenke - gift
das Geld; die Gelder - money
der Schüler; die Schüler - pupil (male)
die Schülerin; die Schülerinnen - pupil (female)
der Student; die Studenten - student (male)
die Studentin; die Studentinnen - student (female)
die Nichte; die Nichten - niece
der Neffe; die Neffen - nephew
die Geschichte; die Geschichten - story
manchmal - sometimes, occasionally
immer - always
die Mappe; die Mappen - folder, file, portfolio
das Dokument; die Dokumente - document
der Drucker; die Drucker - printer
die Operation; die Operationen - operation, procedure, surgery
die Höflichkeit - politeness
die Tugend; die Tugenden - virtue
die Wohnung; die Wohnungen - apartment
der Autor; die Autoren - author
der Mann; die Männer - man, husband
die Frau; die Frauen - woman, wife
der Rückspiegel; die Rückspiegel - rear view mirror
der Kofferraum; die Kofferraum - trunk, boot
der Scheinwerfer; die Scheinwerfer - headlight
der Flur; die Flure - hallway, corridor
der Preis; die Preise - price
der Fahrstuhl; die Fahrstühle - elevator "f"
der Fußgänger; die Fußgänger - pedestrian
bis nächstes Mal - 'til next time
neunzehnhundertneunundneunzig - 1999
zweitausendvierzehn - 2014
null Uhr drei - 0.03 (time)
die Nacht; die Nächte - night
die Währung; die Währungen - currency
eine Million - million
eine Milliarde - billion
ein Grad unter Null - -1°
der Arzt; die Ärzte - medical doctor (male)
der Ausweis; die Ausweise - identity card
die Verwandte; die Verwandten - relative
das Trikot; die Trikots - jersey, team colors
das Geheimnis; die Geheimniße - secret
fertig - done, finished, ready
bereit - prepared to do, ready to do
das Holz; die Hölzer - wood, timber, lumber
leider - unfortunately
dort - there
dort drüben - over there
wenig - not much, little, hardly, rarely
der Zoll; die Zölle - customs duty
die Botschaft; die Botschaften - embassy
die Aufgabe; die Aufgaben - job, task, exercise, homework
der Aufzug; die Aufzüge - elevator "a"
der Satz; die Sätze - sentence
wieder - (adv) again
ziemlich - quite, rather, really
ein paar - a pair, a few
die Nonne; die Nonnen - nun
der Juwelier; die Juweliere - jeweler
das Verbrechen; die Verbrechen - crime
der Himmel; die Himmel - heaven, sky
der Fluss; die Flusse - river
die Fledermaus; die Fledermäuse - bat
der Bach; die Bäche - stream, creek
der Wald; die Wälder - forest, woods
der Pfannkuchen; die Pfannkuchen - pancake
das Gleis; die Gleise - train track; train platform (g)
die Tasche; die Taschen - bag, pocket
das Hähnchen; die Hähnchen - chicken
das Brötchen; die Brötchen - bread roll
der Imbiss; die Imbiss - snack, food stand, snack bar
der Internetanschluss; die Internetanschlüsse - internet connection
der Flugkartenschalter; die Flugkartenschalter - flight ticket counter
der Flugsteig; die Flugsteige - airplane gate
die Paßkontrolle - passport control
die Flugbegleiterin; die Flugbegleiterinnen - flight attendant (female)
der Notausgang; die Notausgänge - emergency exit
lieber - preferably, rather
das Stück; die Stücke - piece, bit, part, slice
der Mensch; die Menschen - mankind, humans
die Lebensmittel - groceries
der Honig; die Honige - honey
die Birne; die Birnen - pear
der Bus; die Busse - bus
die Straßenbahn; die Straßenbahnnen - streetcar, tram
der Glaube; die Glaubens - belief, faith
das Formular; die Formulare - form
das Cafe; die Cafe - cafe
das Treffen; die Treffen - meeting
das Schwimmbad; die Schwimmbäder - swimming pool
das Konzert; die Konzerte - concert
der Fußball; die Fußbälle - football
der Termin; die Termine - date, deadline, appointment
die Anzeige; die Anzeigen - advertisement
der Balkon; die Balkone - balcony
der Quadratmeter; die Quadratmeter - square meter
einmal - once, once again
sicher - safe, secure, certain, definitely
nur - only, just
die Stelle; die Stellen - place, location, spot, job, office, department
der Kunde; die Kunden - customer
der Prospekt; die Prospekte - brochure
das Angebot; die Angebote - suggestion, offer, selection
die Dame; die Damen - lady
die Herrschaften - "Ladies and Gentlemen"
der Mann; dieser Mann - the man; this/that man
der Lehrer; dieser Lehrer - the teacher; this/that teacher
die Schule; diese Schule - the school; this/that school
die Blume; diese Blume - the flower; this/that flower
das Kind; dieses Kind - the child; this/that child
das Fenster; dieses Fenster - the window; this/that window
der Buchstabe; die Buchstaben - alphabet letter
das Fahrrad; die Fahrräder - bicycle
die Hausaufgabe; die Hausaufgaben - homework
die Klasse; die Klassen - class, grade
der Kugelschreiber; die Kugelschreiber - pen
die erste Klasse - the first grade
in der Zeit - meanwhile, in the meantime
der Chef; die Chefs - boss
der Job; die Jobs - job
die E-Mail; die E-Mails - email
die Bar; die Bars - bar, pub
der Beruf; die Berufe - job, career, occupation
der Arbeitsplatz; die Arbeitsplätze - workplace, place of work
der Fahrer; die Fahrer - driver (male)
die Fahrerin; die Fahrerinnen - driver (female)
das Praktikum; die Praktika - internship, work experience
der Blick; die Blicke - look, view, glance
der Mieter; die Mieter - tennant (male)
die Mieterin; die Mieterinnen - tennant (female)
wessen - whose
denn - because, for
dann - then, in that case
die Ecke; die Ecken - corner
die Frage; die Fragen - question
der Herd; die Herde - stove
die Kasse; die Kassen - till, cashier, box office
circa - approximately (adverb)
die Uhr; die Uhren - clock, watch
der Arm; die Arme - arm
das Auge; die Augen - eye
der Bauch; die Bäuche - stomach
das Bein; die Beine - leg
der Doktor; die Doktoren - doctorate
die Ärztin; die Ärztinnen - medical doctor (female)
die Hand; die Hände - hand
der Kopf; die Köpfe - head
das Lokal; die Lokale - pub
der Mund; die Münder - mouth
das Fieber; die Fieber - fever
die Praxis; die Praxen - doctor's practice, surgery
der Schnupfen; die Schnupfen - head cold
die Handschrift; die Handschriften - handwriting
die CD; die CDs - CD
das Gepäck - luggage, baggage
die Lösung; die Lösungen - solution
die Party; die Partys - party
der Reiseführer; die Reiseführer - travel guide
der Verein; die Vereine - sports club (team)
der Cent; die Cent - cent
die Größe; die Größen - size
der Verkäufer; die Verkäufer - sales assistant
der Ort; die Orte - place, location, village, small town
das Dorf; die Dörfer - village
der Fehler; die Fehler - fault, mistake, error, defect
das Feuer; die Feuer - fire
der Fisch; die Fische - fish
das Fleisch; die Fleisch - meat
das Geschäft; die Geschäfte - shop
die Reparatur; die Reparaturen - repair
der Schauspieler; die Schauspieler - actor
die Schauspielerin; die Schauspielerinnen - actress
die Eile - a hurry, in a rush
der Boden; die Böden - ground, floor, bottom, base, soil
zuerst - (adverb) first, at first
sonst - (adverb) otherwise
die Einladung; die Einladungen - invitation
der Feiertag; die Feiertage - public holiday
der Glückwunsch - congratulations
die Geburt; die Geburten - birth
das Hobby; die Hobbys - hobby
das Konto; die Konten - bank account
der Hunger; die Hunger - hunger
der Durst; die Durst - thirst
der Unsinn; die Unsinn - nonsense, mischief
das Ding; die Dinge - thing, object, matter
die Übung; die Übungen - exercise, practice, drill, tutorial
die Überraschung; die Überraschungen - surprise
die Nähe - vicinity, proximity, closeness
die Idee; die Ideen - idea
das Geheimnis; die Geheimnisse - secret
fast - (adverb) almost, nearly
fast neu - almost new
völlig - completely, totally
Er ist in Ordnung. - completely in order, ok
in der Nähe - nearby, in the vicinity
die Sprache; die Sprachen - language
die Muttersprache; die Muttersprachen - mother tongue, native language
das Brasilien - Brazil
das Rumänien - Romania
die Probe; die Proben - test
das Kreuz; die Kreuze - cross
die Flagge; die Flaggen - flag
die Hauptstadt; die Hauptstädte - capital city
der Nachbar; die Nachbarn - neighbor (male)
die Nachbarin; die Nachbarinnen - neighbor (female)
die Kellnerin; die Kellnerinnen - waitress
der Kellner; die Kellner - waiter
der Kirchenchor; die Kirchenchöre - church choir
der Teil; die Teile - part
der Informatiker; die Informatiker - IT specialist (male)
die Informatikerin; die Informatikerinnen - IT specialist (female)
das Gewitter; die Gewitter - thunderstorm
die Schürze; die Schürzen - apron
das Geräusch; die Geräusche - noise, sound
der Reichtum; die Reichtümer - riches, wealth
die Kneipe; die Kneipen - pub, bar
die Ausstellung; die Ausstellungen - exhibition, show, fair
das Fußballspiel; die Fußballspiele - football match
die Küste; die Küsten - coast
das Segelboot; die Segelboote - sailboat
das Boot; die Boote - boat
miteinander - (adv) with each other, together
meistens - (adv) most of the time, usually
überall - (adv) everywhere
dringend - (adv) urgently, strongly
das Blatt; die Blätter - leaf
die Wiese; die Wiesen - meadow
der Strumpf; die Strümpfe - stocking
die Mütze; die Mützen - cap
die Mode; die Moden - fashion
der Gürtel; die Gürtel - belt
die Gelegenheit; die Gelegenheiten - opportunity, occasion
wann - when
wenn - if
der Kommilitone; die Kommilitonen - fellow male students
die Kommilitonin; die Kommilitoninnen - fellow female students
der Schwager; die Schwäger - brother-in-law
die Schwägerin; die Schwägerinnen - sister-in-law
der Palast; die Paläste - palace
der Vortrag; die Vorträge - lecture
der Fall; die Fälle - case, instance, eventuality
der Blumenstrauß; die Blumensträuße - bouquet
der Unterricht; die Unterrichte - lessons, classes
die Aussprache; die Aussprachen - pronunciation, discussion
die Flasche; die Flaschen - bottle
der Bekannte; die Bekannten - acquaintance
eilig - urgently, hurriedly (adv)
das Obst - fruit
der Reis; die Reises - rice
der Schinken; die Schinken - ham
die Anmeldung; die Anmeldungen - booking, registration, licensing, enrollment
der Ausflug; die Ausflüge - day trip, excursion
die Auskunft; die Auskünfte - information, directory
die Durchsage; die Durchsagen - announcement
das Datum; die Daten - date
der Eintritt; die Eintritte - admission, entry
der Erwachsene; die Erwachsenen - adult
die Führung; die Führungen - guided tour, leadership, management
der Jugendliche; die Jugendlichen - teenager
die Rezeption; die Rezeptionen - reception
das Schild; die Schilder - sign, notice, label, shield
die Sehenswürdigkeit; die Sehenswürdigkeiten - sight (worth seeing)
die Philosophie; die Philosophien - philosophy
die Medizin; die Medizinnen - medicine
die Theologie - theology
das Tor; die Tore - goal
die Klinik; die Kliniken - clinic
die Bestellung; die Bestellungen - order
das Thema; die Themen - theme, topic, subject
die Reportage; die Reportagen - report
die Ehre; die Ehren - honor
die Treue - loyalty
der Besuch; die Besuche - visit
die Liste; die Listen - list
die Handlung; die Handlungen - action, plot, deed
der Inhalt; die Inhalte - contents, capacity, volume
die Wirtschaft; die Wirtschaften - economy
die Kultur; die Kulturen - culture
die Politik - politics
der Engel; die Engel - angel
die Gesellschaft; die Gesellschaften - society, company
der Tennisspieler; die Tennisspieler - tennis player (male)
die Tennisspielerin; die Tennisspielerinnen - tennis player (female)
die Eifersucht - jealousy
die Sehnsucht; die Sehnsüchte - longing for, yearning for
das Abenteuer; die Abenteuer - adventure, affair, fling
die Natur; die Naturen - nature, character
die Wissenschaft; die Wissenschaften - science
die Ernährung - diet, livelihood, feeding
die Partnerschaft; die Partnerschaften - relationship
die Hoffnung; die Hoffnungen - hope
die Kraft; die Kräfte - strength, force, power
die Kleidung - clothes, clothing
der Urlaub; die Urlaube - vacation, holiday
das Rindfleisch - beef
das Rind; die Rinder - bull, cow, cattle
das Schloss; die Schlösser - castle
der Gedanke; die Gedanken - thought, opinion
die Geschwister - siblings
die Theorie; die Theorien - theory
der Tunnel; die Tunnel - tunnel
niemals - never (adv)
das Gleiche - the same
die Wahrheit; die Wahrheiten - truth
der Roman; die Romane - novel
der Komponist; die Komponisten - composer (male)
die Komponistin; die Komponistinnen - composer (female)
das Genie; die Genies - genius
der Kumpel; die Kumpels - buddy, mate
das Prinzip; die Prinzipien - principle
der Scherz; die Scherze - joke
wann; wenn - when; if
dann; denn - then; because
wieder; weiter - again; further
der Erfolg; die Erfolge - success
die Versammlung; die Versammlungen - assembly, gathering
der Gast; die Gäste - guest
nie - never (adverb)
das Geburtsdatum - date of birth
der Geburtsort - place of birth
