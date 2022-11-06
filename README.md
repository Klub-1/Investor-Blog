# Investor-Blog
 Fullstack application developed during the "Complex Systems and Devops" course at DTU.


# Guide til at køre programmet
## Backend(not recommended):
- cd backend
- uvicorn main:app

## Frontend(not recommended):
- cd frontend
- npm install
- npm start

## Begge i Docker:
- docker-compose up -d --build

# Plan for implementering
Vi er rigtig godt igang med implementeringen af vores use cases, som der ser ud lige nu kommer vi ikke til at implementere nogle ekstra use cases, og vi vil derfor fokusere på vores hoved uses cases. Som vi efterhånden er tæt på at være færdige med. Generelt mangler vi kun kommunikationen mellem vores backend og frontend. Derudover mangler vi også nogle tests af systemet, som:
* Database test
* Endpoint test
* Integrations/E2E test i cypress/playwright
Til sidst skal vi også have skiftet over til at bruge caprover's postgresql database i stedet for sqlite. 


Vi vil være færdige med implementering af programmet i slutningen af november, så vi også har tid til at kunne dokumentere vores program.



# Sources
<https://www.youtube.com/watch?v=yKV1IGahXqA&t=315s>
<https://www.youtube.com/watch?v=5R9jFHlG6ik&t=1254s&ab_channel=PedroTech>
<https://www.youtube.com/watch?v=SLfhMt5OUPI&t=342s&ab_channel=WebDevSimplified>
