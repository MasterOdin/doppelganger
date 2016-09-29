"""
Wrapper for interacting with RabbitMQ to help handling multiple connections
to different queues, exchanges, etc.
"""

import pika
import pika.exceptions


class Rabbit(object):
    def __init__(self, host='localhost', user=None, password=None):
        self.host = host
        self.user = user
        self.password = password
        self.connection = None
        self.queues = {}  # type: dict[pika.adapters.blocking_connection.BlockingConnection]
        self.connect()

    def connect(self):
        if self.user is not None and self.password is not None:
            credentials = pika.PlainCredentials(self.user, self.password)
        else:
            credentials = None
        try:
            self.connection = pika.BlockingConnection(
                pika.ConnectionParameters(self.host, credentials=credentials))
        except (pika.exceptions.IncompatibleProtocolError, pika.exceptions.ConnectionClosed):
            raise SystemExit("Error Starting. Please start or restart the RabbitMQ server.")

    def new_channel(self, exchange, topic_type='topic', durable=True):
        if exchange not in self.queues:
            if topic_type is None or topic_type == "":
                self.queues[exchange] = self.connection.channel()
                #self.queues[exchange].queue_declare(queue=exchange)
            else:
                self.queues[exchange] = self.connection.channel()
                self.queues[exchange].exchange_declare(exchange=exchange,
                                                       type=topic_type,
                                                       durable=durable)

    def publish_message(self, exchange, topic, message, retry=True):
        try:
            return self._publish(exchange, topic, message)
        except pika.exceptions.ConnectionClosed:
            if retry:
                self.disconnect()
                self.connect()
                return self.publish_message(exchange, topic, message, False)
            else:
                return False

    def _publish(self, exchange, topic, message):
        if self.connection.is_closed:
            self.connect()
        topic_type = "topic" if exchange is not None and exchange != "" else ""
        if exchange is None or exchange == "":
            use_exchange = ""
            queue = topic
        else:
            use_exchange = exchange
            queue = exchange
        if queue not in self.queues or self.queues[queue].is_closed:
            self.new_channel(queue, topic_type)
        return self.queues[queue].basic_publish(exchange=use_exchange,
                                                routing_key=topic,
                                                body=message)

    def disconnect(self):
        try:
            self.connection.close()
        except pika.exceptions.ConnectionClosed:
            # connection already closed
            pass
        self.queues = {}
        self.connection = None
