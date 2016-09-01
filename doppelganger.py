#!/usr/bin/env python
from __future__ import print_function, unicode_literals
import argparse
import json
import os

from flask import Flask, render_template, request
from rabbit import Rabbit

PARSER = argparse.ArgumentParser(add_help=False)
PARSER.add_argument('--help', action='help', default=argparse.SUPPRESS,
                    help=argparse._('show this help message and exit'))
PARSER.add_argument("-h", "--host", required=False, type=str, default="localhost",
                    help="Host for RabbitMQ (default: localhost)")
PARSER.add_argument("-u", "--user", required=False, default=None, type=str,
                    help="User for accessing RabbitMQ")
PARSER.add_argument("-p", "--password", required=False, default=None, type=str,
                    help="Password for accessing RabbitMQ")
ARGS = PARSER.parse_args()

APP = Flask(__name__, static_url_path='/static')

RABBIT = Rabbit(host=ARGS.host, user=ARGS.user, password=ARGS.password)


@APP.route('/')
def index():
    return render_template('index.html')


@APP.route("/post", methods=["POST"])
def post():
    exchange = ""
    if request.values.get('exchange') is not None:
        exchange = request.values.get('exchange').strip()
    topic = request.values.get('topic').strip()
    message = request.values.get('message').strip()
    return json.dumps({"success": RABBIT.publish_message(exchange, topic, message)})


if __name__ == '__main__':
    PORT = os.getenv('PORT', 5000)
    APP.run(host='0.0.0.0', port=int(PORT), debug=True)