from flask import Flask
from flask import request

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/server', methods=['POST'])
def server():
    data = [request.form[i] for i in [v for v in request.values]]
    assert(len(data))
    return 'OK'
