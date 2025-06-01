# Solana Account Database

Prosty serwer Flask do interakcji z bazą danych w blockchainie Solana.

## Wymagania

- Python 3.8+
- Rust `>=1.86`
- Node.js i Yarn
- Solana CLI
- Anchor CLI

## Instalacja

### 1. Instalacja Solana CLI

```bash
sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"
```

### 2. Instalacja Anchor CLI

```bash
cargo install --git https://github.com/coral-xyz/anchor avm --force
avm install latest
avm use latest
```

### 3. Instalacja Node.js i Yarn (przez NVM)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
source ~/.bashrc  # lub ~/.zshrc, zależnie od powłoki
nvm install node
npm install -g yarn
```

## Konfiguracja projektu

1. W pliku `backend.py` (lub innym głównym pliku Pythona) **zmień wartość** zmiennej `PROGRAM_ID` na swój własny Program ID:

   ```python
   PROGRAM_ID = Pubkey.from_string("TWÓJ_PROGRAM_ID")
   ```

2. Uzupełnij plik `id.json` swoim **kluczem prywatnym** w formacie JSON  
   (można go wygenerować poleceniem):

   ```bash
   solana-keygen new --outfile id.json
   ```

## Uruchomienie lokalnego blockchaina (localhost)

W pierwszym terminalu:

```bash
solana-test-validator
```

W drugim terminalu (w katalogu projektu):

```bash
cargo build-sbf -- -Znext-lockfile-bump
anchor deploy
```

## Uruchomienie backendu

Po wykonaniu powyższych kroków uruchom serwer Flask:

```bash
python backend.py
```

---

**Uwaga:** Ten projekt domyślnie pracuje z lokalnym blockchainem (`solana-test-validator`).  
Upewnij się, że masz odpowiednio ustawione środowisko (`Solana config set`, `ANCHOR_PROVIDER_URL`, itd.) w zależności od potrzeb.
