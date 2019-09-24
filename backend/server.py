
# Imports
from flask import Flask

# Init
app = Flask(__name__)

# Routes
@app.route('/')
def hello():
    return "Hello World!"

# Main
if __name__ == '__main__':
    app.run()