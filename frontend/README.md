# Battery Tracker

Aplikacja Next.js służąca do śledzenia produktów bateryjnych przez cały ich cykl życia z wykorzystaniem kodów QR. Aplikacja dostarcza kompleksowych informacji o bateriach, umożliwia śledzenie dostaw oraz zarządzanie cyklem życia produktu.

## Funkcje

- **Nawigacja przez kod QR** – użytkownik skanuje kod QR i trafia bezpośrednio na stronę produktu
- **Informacje o produkcie** – specyfikacja baterii, skład materiałowy, ślad węglowy oraz substancje niebezpieczne
- **Analiza dostawy** – status dostawy w czasie rzeczywistym oraz śledzenie etapów w łańcuchu dostaw
- **Cykl życia** – monitoring kondycji i statusu cyklu życia baterii

## Stos technologiczny

- **Framework**: Next.js (App Router)
- **Typowanie**: TypeScript
- **API**: tRPC
- **Baza danych**: Prisma ORM
- **Uwierzytelnianie**: NextAuth.js
- **Stylowanie**: Tailwind CSS
- **Komponenty UI**: shadcn/ui
- **Narzędzie startowe**: create-t3-app

## Struktura aplikacji

Aplikacja opiera się na trzech trasach dostępnych po zeskanowaniu kodu QR:

### Trasy

```
/[id]/product   - informacje o produkcie
/[id]/analysis  - analiza dostawy i łańcucha dostaw
/[id]/cycle     - stan i cykl życia baterii
```

### Kluczowe strony

- **Produkt** (`/[id]/product`)

  - Dane techniczne baterii
  - Skład materiałowy
  - Ślad węglowy
  - Substancje niebezpieczne

- **Analiza** (`/[id]/analysis`)

  - Status dostawy
  - Etapy łańcucha dostaw

- **Cykl Życia** (`/[id]/cycle`)
  - Status cyklu życia
  - Kondycja baterii

### Wymagania

- Node.js 18+
- npm/yarn/pnpm/bun
- Baza danych (zalecane PostgreSQL)

### Użycie

1. Skanuj kod QR zawierający identyfikator produktu
2. Zostaniesz przekierowany na `/[id]/product`
3. Możesz przechodzić między zakładkami: produkt, analiza, cykl
4. Aplikacja automatycznie pobiera dane z API za pomocą tRPC

## API

Aplikacja używa tRPC do obsługi zapytań:

- **Router Produktu** – informacje o produkcie
- **Router Analizy** – dane o dostawie i etapach
- **Router Cyklu** – dane o cyklu życia i kondycji baterii
