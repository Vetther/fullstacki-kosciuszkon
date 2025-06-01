## 📝 Overview

Aplikacja backendowa w Spring Boot zarządzająca głównymi danymi produktów.

## ✨ Funkcjonalności

- RESTful API dla produktów i ich etapów łańcucha produkcyjnego
- Integracja bazy dany z JPA/Hibernate
- Dokumentacja Swagger API
- Docker support dla konteneryzacji bazy danych

##  Przegląd Endpointów API

Nasze REST API składa się z czterech głównych kategorii kontrolerów, każdy odpowiedzialny za zarządzanie różnymi aspektami systemu Digital Product Passport:

**🔄 Recycled Material Controller** <br/>Zarządza informacjami o materiałach pochodzących z recyklingu. Dostępne endpointy to: `GET /recycled-materials` do pobierania listy wszystkich materiałów z recyklingu, `POST /recycled-materials` do dodawania nowych materiałów, `GET /recycled-materials/{id}` do pobierania szczegółów konkretnego materiału oraz `GET /products/{productId}/recycled-materials` do wyświetlania materiałów z recyklingu powiązanych z określonym produktem.

**📦 Product Controller** <br/>Stanowi główny kontroler do zarządzania produktami w systemie. Oferuje następujące funkcjonalności: `GET /products` do pobierania listy wszystkich produktów, `POST /products` do tworzenia nowych produktów, `GET /products/{id}` do pobierania szczegółowych informacji o konkretnym produkcie oraz `GET /products/{id}/lock` do blokowania produktu w celu wygenerowania `public-key account` w systemie Blockchain.

**⚠️ Harmful Substance Controller** <br/>Odpowiada za zarządzanie informacjami o substancjach szkodliwych zawartych w produktach. API udostępnia endpointy: `GET /harmful-substances` do pobierania listy wszystkich substancji szkodliwych, `POST /harmful-substances` do dodawania nowych substancji do bazy danych, `GET /products/{productId}/harmful-substances` do wyświetlania substancji szkodliwych powiązanych z konkretnym produktem oraz `GET /harmful-substances/{id}` do pobierania szczegółów określonej substancji.

**🚚 Shipment Controller** <br/>Zarządza informacjami o przesyłkach i transporcie produktów. Kontroler oferuje następujące endpointy: `GET /api/shipments` do pobierania listy wszystkich przesyłek, `POST /api/shipments` do tworzenia nowych przesyłek, `GET /api/shipments/{id}` do pobierania szczegółów konkretnej przesyłki oraz `GET /api/products/{productId}/shipment` do wyświetlania informacji o przesyłce powiązanej z określonym produktem.

Wszystkie endpointy wykorzystują standardowe metody HTTP i zwracają dane w formacie JSON zgodnie ze zdefiniowanymi schematami DTO (Data Transfer Objects), takimi jak RecycledMaterialDto, ProductDto, HarmfulSubstanceDto czy ShipmentResponse.
