#!/usr/bin/env python
from __future__ import print_function, unicode_literals
import json
import os

from flask import Flask, render_template, request

from rabbit import Rabbit

APP = Flask(__name__)

RABBIT = Rabbit('hello')


@APP.route('/')
def hello_world():
    return render_template('index.html')


@APP.route("/post", methods=["POST"])
def post():
    queue = request.values.get('queue').strip()
    message = request.values.get('message').strip()
    return json.dumps({"success": RABBIT.publish_message(queue, message)})


if __name__ == '__main__':
    PORT = os.getenv('PORT', 5000)
    APP.run(host='0.0.0.0', port=int(PORT), debug=True)
