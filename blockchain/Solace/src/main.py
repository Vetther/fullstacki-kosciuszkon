from flask import Flask, request, jsonify
from db_conector import save_value_to_account, read_value_from_account

app = Flask(__name__)
URL = "http://127.0.0.1:8899"
@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/database/save", methods=["GET"])
def save_account():
    hash_code = request.args.get("hash_code")
    if not hash_code:
        return "Missing 'hash_code' parameter", 400

    pKey = save_value_to_account(URL,hash_code)

    return jsonify({"pKey": pKey})

@app.route("/database/read", methods=["GET"])
def get_from_account():
    pKey = request.args.get("pKey")
    if not pKey:
        return "Missing 'pKey' parameter", 400

    value = read_value_from_account(URL,pKey)

    return jsonify({"value": value})

if __name__ == "__main__":
    app.run(debug=True)
