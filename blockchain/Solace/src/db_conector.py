import json
import struct
import hashlib
import time

from solders.keypair import Keypair
from solders.pubkey import Pubkey
from solders.instruction import AccountMeta, Instruction
from solders.message import MessageV0
from solders.transaction import VersionedTransaction
from solana.rpc.api import Client
from solana.rpc.commitment import Confirmed

PROGRAM_ID = Pubkey.from_string("2J6wot16kg2KYDgEUk7H3RWWaQsidKKBtVuBMRvzxiog")
SPACE = 8 + 4 + 280
LAMPORTS = 1_000_000


def anchor_discriminator(name: str) -> bytes:
    return hashlib.sha256(f"global:{name}".encode()).digest()[:8]


def encode_initialize_data(msg: str) -> bytes:
    discriminator = anchor_discriminator("initialize")
    msg_bytes = msg.encode("utf-8")
    return discriminator + struct.pack("<I", len(msg_bytes)) + msg_bytes


def save_value_to_account(url: str, string_to_store: str):
    client = Client(url)

    # Klucze
    with open("id.json", "r") as f:
        secret_key = json.load(f)  # ← to jest lista liczb
        payer = Keypair.from_bytes(bytes(secret_key))  # ← zamieniamy na bytes
    base_account = Keypair()
    print("🔑 Base Account Pubkey:", base_account.pubkey())

    print("⛽ Airdrop dla payera...")
    client.request_airdrop(payer.pubkey(), 2_000_000)
    time.sleep(2)  # czekamy na airdrop

    # Blockhash
    bh_resp = client.get_latest_blockhash()
    bh = bh_resp.value.blockhash  # Hash object

    # 1. INSTRUCTION: initialize
    data = encode_initialize_data(string_to_store)

    init_ix = Instruction(
        program_id=PROGRAM_ID,
        accounts=[
            AccountMeta(pubkey=base_account.pubkey(), is_signer=True, is_writable=True),
            AccountMeta(pubkey=payer.pubkey(), is_signer=True, is_writable=True),
            AccountMeta(pubkey=Pubkey.from_string("11111111111111111111111111111111"), is_signer=False,
                        is_writable=False),
        ],
        data=data
    )

    # 2. MESSAGE + TRANSACTION
    msg = MessageV0.try_compile(
        payer=payer.pubkey(),
        instructions=[init_ix],
        address_lookup_table_accounts=[],
        recent_blockhash=bh,
    )
    tx = VersionedTransaction(msg, [payer, base_account])
    from solana.rpc.types import TxOpts

    print(type(tx))
    print("🚀 Wysyłanie transakcji...")
    sig = client.send_raw_transaction(bytes(tx), opts=TxOpts(skip_preflight=True, preflight_commitment=Confirmed))
    sig_str = sig.value
    p = client.confirm_transaction(sig_str, commitment=Confirmed)
    print("✅ Transakcja wysłana:", sig.value)
    print("📦 Base account:", base_account.pubkey())
    return f"{base_account.pubkey()}"


def read_value_from_account(url: str, account_pubkey: str):
    client = Client(url)


    pubkey = Pubkey.from_string(account_pubkey)
    account = client.get_account_info(pubkey).value

    if account is None:
        print("❌ Konto nie istnieje.")
        return

    raw_data = account.data

    if len(raw_data) < 12:
        print("⚠️ Dane zbyt krótkie.")
        return

    # Pomijamy 8 bajtów discriminator Anchor
    data = raw_data[8:]

    # Pierwsze 4 bajty to długość stringa (little endian)
    str_len = struct.unpack("<I", data[:4])[0]

    # Sprawdzamy długość bufora
    if len(data[4:]) < str_len:
        print("⚠️ Błąd: deklarowana długość większa niż dane.")
        return

    # Odczytujemy string
    message = data[4:4 + str_len].decode("utf-8")
    return message


if __name__ == "__main__":
    # Read from account
    url = "http://127.0.0.1:8899"

    # Save to account
    message = "I love Python!"
    account_pubkey = save_value_to_account(url, message)



