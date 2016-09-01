#!/usr/bin/env python

"""
Sample script for monitoring the amq.topic queue
"""

from __future__ import print_function, unicode_literals

import argparse
import pika
import sys

parser = argparse.ArgumentParser(description='Process to watch a RabbitMQ queue')
parser.add_argument('topic', type=str, help='RabbitMQ topic to suscribe to')

connection = pika.BlockingConnection(
    pika.ConnectionParameters(
        host='128.113.21.131',
        credentials=pika.PlainCredentials('cisl-cog', 'cisl-cog')
    )
)
channel = connection.channel()

channel.exchange_declare(exchange='amq.topic',
                         type='topic',
                         durable=True)

result = channel.queue_declare(exclusive=False)
queue_name = result.method.queue

binding_keys = sys.argv[1:]
if not binding_keys:
    sys.stderr.write("Usage: %s [binding_key]...\n" % sys.argv[0])
    sys.exit(1)

for binding_key in binding_keys:
    channel.queue_bind(exchange='amq.topic',
                       queue=queue_name,
                       routing_key=binding_key)

print(' [*] Waiting for logs. To exit press CTRL+C')


def callback(ch, method, properties, body):
    print(" [x] %r:%r" % (method.routing_key, body))

channel.basic_consume(callback,
                      queue=queue_name,
                      no_ack=True)

channel.start_consuming()