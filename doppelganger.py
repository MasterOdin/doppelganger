#!/usr/bin/env python
from __future__ import print_function, unicode_literals
import json
import os

from flask import Flask, render_template, request
from rabbit import Rabbit

APP = Flask(__name__, static_url_path='/static')

RABBIT = Rabbit()


@APP.route('/')
def index():
    return render_template('index.html')


@APP.route("/post", methods=["POST"])
def post():
    exchange = request.values.get('exchange').strip()
    topic = request.values.get('topic').strip()
    message = request.values.get('message').strip()
    return json.dumps({"success": RABBIT.publish_message(exchange, topic, message)})


if __name__ == '__main__':
    PORT = os.getenv('PORT', 5000)
    APP.run(host='0.0.0.0', port=int(PORT), debug=True)
