![doppelganger](https://cdn.rawgit.com/MasterOdin/doppelganger/master/static/doppelganger-header.png)
------

A flask application that allows an easy interface to push messages to any 
given RabbitMQ queue on the localhost machine.

## Requirements
```
Flask
pika
```

## Installation:
```
pip install -r requirements.txt
```

## Usage
### Server
```
python doppelganger.py
```

### Test scripts

Included are two scripts to test the receiving of messages from RabbitMQ. The
first is `recieve.py` which is useful for testing just simple RabbitMQ queues.
The second is `recieve_topic.py` which is (by default) subscribed to the 
`amq.topic` exchange and then reads in from the command line some number of
topics to listen to, which accepts strings as well as `*` (wildcard one topic 
part) and `#` (wildard for multiple topic parts) where each topic part is
separated by a `.`. For example, if we knew a topic existed such that it would
always have `~~~.transcript.final` but the first part was random, we would use
`*.transcript.final`. However, if we only knew the final part we would use 
`#.final`. Using just `#` will subscribe to all channels, and this is generally
just recommended for debugging purposes.

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

## License
The project is served under the MIT license which can be viewed under the LICENSE.md file.

## Icon/Logo
The icon uses [Mirror mirror icon](http://game-icons.net/lorc/originals/mirror-mirror.html) by 
[Lorc](http://lorcblog.blogspot.com/) under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/) and 
[Rabbit](http://game-icons.net/delapouite/originals/rabbit.html) by [Delapouite](http://delapouite.com/) under 
[CC BY 3.0](CC BY 3.0).