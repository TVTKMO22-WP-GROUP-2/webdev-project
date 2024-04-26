![image](https://github.com/TVTKMO22-WP-GROUP-2/webdev-project/assets/143529308/6544e2a6-9259-460f-83b8-5008a4c4e8e8)GROUP 2:  
Niklas Pihlajaniemi — rowancape  
Tuomas Parpala — Tumbsi  
Nikolas Mäkikangas — nnasu  
Janne Puolamaa - Jellonaa

Web-ohjelmoinnin sovellusprojekti
Ryhmä 2
Nikolas Mäkikangas, Tuomas Parpala, Niklas Pihlajaniemi, Janne Puolamaa
https://github.com/TVTKMO22-WP-GROUP-2/webdev-project
Web-ohjelmoinnin sovellusprojekti
Projektissa on ollut mukana neljä toisen vuoden tieto- ja viestintätekniikan opiskelijaa Oulun ammattikorkeakoulusta. Projekti oli 15 opintopisteen suoritus, joka suoritettiin kuudessa viikossa.  

Projektin kuvaus ja tavoite
Projektin tarkoituksena oli luoda netissä toimiva web-sovellus, joka toimii elokuvia tarjoavan palvelun sivuna, tarjoten käyttäjille tietoa ja mahdollisuuden tutkia erilaisia elokuvia. Pyrimme kehittämään käyttäjäystävällisen alustan, josta tarvittavan tiedon löytäminen ja elokuvien selaileminen olisi mahdollisimman yksinkertaista ja helppokäyttöistä. 
Alustalla pystyy luomaan oman henkilökohtaisen käyttäjän, jota käyttäen käyttäjä pystyy mm. jättämään elokuville arvosteluita, luomaan ja liittyä ryhmiin sekä jakamaan elokuvasuosituksia muiden ryhmäläisten kanssa. Tavoitteena oli luoda informatiivinen elokuvasivusto, jossa käyttäjät voivat vaivatta tutustua elokuvamaailman tarjontaan.

Projektin luonne ja toteutus
Projekti on toteutettu neljän hengen ryhmänä, jossa jokainen ryhmäläinen pääsee toteuttamaan toiminnallisuutta omien taitojensa mukaisesti. Projektissa hyödynnettiin sekä Kanban, että Scrum -tyylistä prosessia. Kanban toteutuksessa sovelluksen tavoitteet listattiin ylös, ja niiden toteutumista seurattiin kerran viikossa Scrum -tyylillä ohjaavan opettajan kanssa. 
Opettajan ohjaustuntien jälkeen ryhmä kerääntyi yhteen keskustelemaan mahdollisista ongelmista ja jatkotoimista tarkemmin sekä päätti tulevan viikon ohjelman, että aikataulutuksen. Yhteinen koodaus oli vähäistä, lukuun ottamatta ongelmatilanteita, joissa ryhmä tai osa ryhmäläisistä ratkaisi ongelmia porukassa.

Projektin teknologiat
Projektimme on toteutettu käyttäen Reactia ja MongoDB:tä. Se on elokuvasivusto, joka hyödyntää TMDB:n API:a elokuvien hakemiseen ja näyttämiseen. Käyttäjät voivat selata laajaa elokuvavalikoimaa, katsoa tietoja elokuvista kuten kuvaus, arvostelut ja näyttelijät sekä hakea elokuvia eri kriteereillä.
Reactin avulla pystymme rakentamaan dynaamisen ja responsiivisen käyttöliittymän, kun taas MongoDB tarjoaa joustavan tietokantaratkaisun. Yhdistämällä nämä teknologiat luomme käyttäjäystävällisen ja toimivan elokuvakokemuksen verkossa.
Tekijät
Projektia ovat työstäneet Nikolas Mäkikangas, Tuomas Parpala, Niklas Pihlajaniemi ja Janne Puolamaa. Tehtävienjako on suoritettu Trellolla, jonka ansiosta ryhmäläiset ovat saaneet itse valita mitä puuttuvaa toiminnallisuutta he koodaavat. Tästä syystä tehtävänjako ei ole millään tavalla järjestelmällinen (esim. joku tekisi vain backendiä tms.), vaan kaikki pääsivät toteuttamaan heille mieluisinta toimivuutta. Toki uusien toiminnallisuuksien implementointijärjestyksestä käytiin keskustelua ryhmäläisten kesken, jotta yleiset toimivuudet saatiin toteutettua ensin.

Miten otetaan käyttöön
Projekti otetaan käyttöön kloonaamalla tiedostot GitHubista omalle tietokoneelle ja asentamalla tarvittavat riippuvuudet tarkalleen frontend- ja backend kansioiden juureen, joita sovellus tarvitsee toimiakseen. Väärään kansioon asentaminen aiheuttaa konflikteja. 
Lisäksi projektin käyttöönotto vaatii MongoDB tietokantasovelluksen, johon on säädettävä oikeat yhteydet tietokannan ja sovelluksen välille. MongoDB:hen on luotava “database” niminen tietokanta, johon tulee luoda kokoelmat: “reviews”, “sessions” ja “users” jotta tietokanta ja ohjelma kommunikoivat oikein.
Ohjelman frontend käynnistetään komennolla “npm run dev” ja backend komennolla “npm run start:dev”. Koodiohjelman terminaali antaa suoran paikallisen nettilinkin sovellukseen.
 
Ylemmässä kuvassa on näkymä elokuvasivulle, jossa pystyy suodattamaan elokuvia esimerkiksi genren, tai vuoden perusteella.

 ![image](https://github.com/TVTKMO22-WP-GROUP-2/webdev-project/assets/143529308/6544e2a6-9259-460f-83b8-5008a4c4e8e8)
 ![image](https://github.com/TVTKMO22-WP-GROUP-2/webdev-project/assets/143529308/cf5b5f1b-e56f-43e8-b9a9-a70dbe6d545b)

Yllä olevassa kuvassa näkyy toiminnallisuutta arvostelujen jättämiselle elokuville, kirjautuneiden käyttäjätunnus, sekä arvostelun päivämäärä.



 
Yllä oleva kuva on kuvakaappaus sovelluksen kirjautumissivulta, josta voi sekä luoda käyttäjän, että kirjautua olemassa olevilla tunnuksilla.
 
Ylemmässä kuvassa on kuvakaappaus Reviews -sivulta, josta käyttäjä löytää kaikki jättämänsä arvostelut elokuvista. Sivu näyttää myös arvostelun jättämisen päivämäärän, sekä kellonajan.


