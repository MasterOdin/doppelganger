from six import string_types

import pika


class Rabbit(object):
    def __init__(self, channels=None):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        self.queues = {} # type: dict[pika.adapters.blocking_connection.BlockingConnection]
        if channels is not None:
            if isinstance(channels, string_types):
                self.new_channel(channels)
            elif isinstance(channels, list):
                for channel in channels:
                    self.new_channel(channel)
            else:
                raise TypeError("Invalid type for channels argument, can only be list or string")

    def new_channel(self, queue):
        self.queues[queue] = self.connection.channel()
        self.queues[queue].queue_declare(queue=queue)

    def publish_message(self, queue, message):
        if queue not in self.queues:
            self.new_channel(queue)
        if self.queues[queue].is_closed:
            self.new_channel(queue)
        return self.queues[queue].basic_publish(exchange='', routing_key=queue, body=message)

    def close(self):
        for queue in self.queues:
            self.queues[queue].close()
