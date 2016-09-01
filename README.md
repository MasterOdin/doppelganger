Doppelganger
=============
![doppelganger](https://code.empac.rpi.edu/CISL/doppelganger/raw/master/static/duality-mask-30.png)

A flask application that allows an easy interface to push messages to any 
given RabbitMQ queue on the localhost machine.

Requirements:
```
Flask
pika
```

Installation:
```
pip install -r requirements.txt
```

Running:
```
python doppelganger.py
```

------
Included are two scripts to test the receiving of messages from RabbitMQ. The
first is `recieve.py` which is useful for testing just simple RabbitMQ queues.
The second is `recieve_topic.py` which is (by default) subscribed to the 
`amq.topic` exchange and then reads in from the command line some number of
topics to listen to, which accepts strings as well as `*` (wildcard one topic 
part) and `#` (wildard for multiple topic parts) where each topic part is
separated by a `.`. For example, if we knew a topic existed such that it would
always have `.transcript.final` but the first part was random, we would use
`*.transcript.final`.

Usage for these scripts are:
```
python receive.py [queue_name]
```
where `queue_name` is optional and if excluded then the script will just
listen to the `hello` queue.

```
python receive_topic.py [topic_name1] [topic_name2]
```
where you can type one or more topics to subscribe to on the `amq.topics`
exchange.