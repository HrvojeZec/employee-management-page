# **Employee Management System**

## **Funkcionalnosti projekta**

1. Učitavanje podataka
   - Dohvaćanje popisa zaposlenika s API-ja koristeći fetch GET metodu
   - handle preLoad data
2. Prikaz podataka
   - Prikaz podataka putem tablice
   - Filtriranje zaposlenika po poziciji
   - Pretraživanje zaposlenika po imenu, godini rođenja i poziciji
3. Responzivnost
   - stranica je optimizirana za prikaz na različitim veličinama zaslona
4. Navigacijska traka
   - Navigacija između stranica za prikaz zaposlenika i unos podataka
5. Unos podataka
   -  Forma za unos novih zaposlenika (ime, prezime, datum rođenja, pozicija)
   -  validacija unosa kako bi se osiguralo da polja nisu prazna
   -  Podaci se ispisuju u konzoli kada se klikne gumb "Spremi"

## **Bonus Funkcionalonsti**

1. Sortiranje:
   - Omogućuje korisniku sortiranje popisa zaposlenika prema imenu, datumu i zanimanju
2. Paginacija
   - Implementirana paginacija za ograničavanje broja prikazanih stavki po stranici
   - Prilagođavanje paginacije filtriranim podatcima
   - **Dodan "select dropdown" za odabir broja stavki po stranici u tablici**

 ## Tehnologije
 - Frontend: React
 - UI Library: Mantine
 - Date Handling: dayjs

