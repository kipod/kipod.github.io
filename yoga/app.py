from flask import Flask
from flask import request

app = Flask(__name__, static_folder='/')


@app.route('/')
def index():
    # return 'Hello, World!'
    return app.send_static_file('index.html')


@app.route('/server', methods=['POST'])
def server():
    data = [request.form[i] for i in [v for v in request.values]]
    assert(len(data))
    return 'OK'
