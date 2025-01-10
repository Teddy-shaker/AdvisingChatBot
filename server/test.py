import subprocess

def test_ollama_run(prompt):
    try:
        # Run the ollama command with the "run" action
        result = subprocess.run(
            ["ollama", "run", "llama3.2"],
            input=prompt,
            capture_output=True,
            text=True
        )

        # Print command and results for debugging
        print(f"Command: {result.args}")
        print(f"Return Code: {result.returncode}")
        print(f"STDOUT: {result.stdout}")
        print(f"STDERR: {result.stderr}")

        # Check if the command was successful
        if result.returncode == 0:
            print("Ollama Response:")
            print(result.stdout.strip())
        else:
            print("Error occurred:")
            print(result.stderr.strip())
    except Exception as e:
        print(f"Exception: {e}")

# Test the function with a sample prompt
test_ollama_run("Hello, how are you?")
