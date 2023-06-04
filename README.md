Naudojimas :

	Naudojimo režimai
	Individualus režimas leidžia pasirinkti skirtingą darbo valandų skaičių kiekvienai savaitės dienai iki nustatyto termino pabaigos.
	Vienodas režimas leidžia nustatyti vienodą darbo valandų skaičių visoms savaitės dienoms.
	Programos funkcijos
	Termino pabaigos nustatymas: Įveskite savo bakalauro darbo pabaigos datą.
	Bendras valandų skaičius: Įveskite bendrą valandų skaičių, skirtą bakalauro darbui.
	Užimtumo valandų nustatymas: Užimtumo laikas įskaito paskaitų laiką, būrelius, maistą ir kitus nenumatytus laiko tarpus. Numatyta miego trukmė - 8 valandos.
	Skaičiavimo funkcija: Galite peržiūrėti ir patikrinti įvestus duomenis, nustatyti papildomus parametrus.
	Sutikimo funkcija: Spaudžiant mygtuką "Sutikti", programa apskaičiuoja, kiek laiko reikia skirti kasdien, norint pasiekti nustatytą rezultatą. Jei laiko neužtenka, rodomas pranešimas "Nepakanka valandų".
	Kalendoriaus išsaugojimas: Galite išsaugoti kalendoriaus vaizdą, paspaudę mygtuką "Kalendoriaus nuotrauka".
	
Programos skaičiavimų logika : 

	Programa atlieka skaičiavimus siekdama padaryti labiau užimtą dieną mažiau intensyviu darbo laiku. Skaičiavimų logika apibūdinta žemiau.
	Apskaičiuojama vidutinė darbo valandų skaičius (x = Bendras valandų skaičius / darbo dienų skaičius).
	Kiekvienai dienai priskiriama vidutinė valandų skaičius, atsižvelgiant į turimą laiką ir ankstesnes dienas.
	Atsižvelgiama į dienos užimtumą ir laiko ribotumą (24 valandos).
	
Valandų skaičiavimas:
	Skaičiuojama, kiek laisvų valandų yra per dieną, atimant 8 valandas miegui ir užimtas valandas. Jei laisvų valandų per savaitę yra mažiau nei bendras darbo valandų skaičius, vidutinė valandų per dieną skaičius (x) yra tiesiog bendras darbo valandų skaičius padalintas iš darbo dienų skaičiaus.
	Valandų priskyrimas: Kiekvienai darbo dienai priskiriama vidutinė valandų skaičius. Jei diena nėra savaitgalis arba šventinė diena ir jei darbo ir poilsio laikotarpis neviršija 24 valandų, skaičiuojama, kiek valandų galima priskirti tam tikrai dienai.
	Valandų reguliavimas: Atsižvelgiama į ankstesnę dieną, kad užtikrintumėte, jog intensyvesnės dienos būtų mažiau užkrautos. Jei ankstesnė diena buvo mažiau užimta, dalis valandų yra perkeliamos iš dabartinės dienos į ankstesnę, ir atvirkščiai. Reguliavimas yra atliekamas pagal nustatytus procentus.
	Poilsio dienų valandų priskyrimas: Jei diena yra savaitgalis ar šventinė diena, priskiriamas nulis valandų. Jei vis dėlto liko laisvų valandų, jos yra priskiriamos prieš tai buvusiai dienai.
	Galutinė patikra: Patikrinama, ar priskirtų valandų suma yra lygi bendram darbo valandų skaičiui. Jei suma yra mažesnė, rodomas pranešimas "Nepakanka valandų".


