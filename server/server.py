from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5500"}})

@app.route('/api/chat', methods=['POST'])  # Use /api/chat for clarity
def chat():
    user_message = request.json.get('message', '')
    if not user_message:
        return jsonify({"reply": "Message is empty."}), 400

    try:
        # Call the local Ollama LLaMA model
        result = subprocess.run(
            ["ollama", "run", "llama3.2"],
            input=user_message,
            capture_output=True,
            encoding='utf-8'
        )

        # Debugging logs
        print(f"Command: {result.args}")
        print(f"Return Code: {result.returncode}")
        print(f"STDOUT: {result.stdout}")
        print(f"STDERR: {result.stderr}")

        if result.returncode == 0:
            bot_reply = result.stdout.strip()
        else:
            bot_reply = f"Error: {result.stderr.strip()}"
    except Exception as e:
        bot_reply = f"Error: {str(e)}"

    return jsonify({"reply": bot_reply})

if __name__ == '__main__':
    app.run(debug=True)

