Doppelganger
============

![doppelganger](https://code.empac.rpi.edu/CISL/doppelganger/blob/master/static/duality-mask.png)

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
Included is a simple script that will receive from a queue (useful for simple 
testing):

Usage is:
```
python receive.py [queue_name]
```
where `queue_name` is optional and if excluded then the script will just
listen to the `hello` queue.