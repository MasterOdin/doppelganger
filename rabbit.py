"""
Wrapper for interacting with RabbitMQ to help handling multiple connections
to different queues, exchanges, etc.
"""

import pika
import pika.exceptions


class Rabbit(object):
    def __init__(self, host='localhost', user=None, password=None):
        if user is not None and password is not None:
            credentials = pika.PlainCredentials(user, password)
        else:
            credentials = None
        try:
            self.connection = pika.BlockingConnection(
                pika.ConnectionParameters(host,
                                          credentials=credentials))
            self.exchanges = {}  # type: dict[pika.adapters.blocking_connection.BlockingConnection]
            self.queues = {}  # type: dict[pika.adapters.blocking_connection.BlockingConnection]
        except pika.exceptions.IncompatibleProtocolError:
            print("Error Starting. You need to restart the RabbitMQ server on the host machine.")

    def new_channel(self, exchange, topic_type='topic', durable=True):
        """

        :param exchange:
        :param topic_type:
        :param durable:
        :return:
        """
        if exchange not in self.queues:
            if topic_type is None or topic_type == "":
                self.queues[exchange] = self.connection.channel()
                self.queues[exchange].queue_declare(queue=exchange)
            else:
                self.queues[exchange] = self.connection.channel()
                self.queues[exchange].exchange_declare(exchange=exchange,
                                                       type=topic_type,
                                                       durable=durable)

    def publish_message(self, exchange, topic, message):
        topic_type = "topic" if topic is not None or topic != "" else ""
        if exchange not in self.queues:
            self.new_channel(exchange, topic_type)
        if self.queues[exchange].is_closed:
            self.new_channel(exchange, topic_type)
        if topic is None or topic == "":
            return self.queues[exchange].basic_publish(exchange='',
                                                       routing_key=exchange,
                                                       body=message)
        else:
            return self.queues[exchange].basic_publish(exchange=exchange,
                                                       routing_key=topic,
                                                       body=message)

    def close(self):
        for queue in self.queues:
            self.queues[queue].close()
