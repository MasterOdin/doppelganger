var topic_exchange = 'amq.topic';

function submitForm() {
    var message_id = $("#message");
    var message = message_id.val();
    try {
        message = JSON.stringify(JSON.parse(message));
    }
    catch (err) {
        message = message_id.val();
    }
    $.ajax({
        type: "POST",
        url: "/post",
        data: {
            message: message,
            queue: $("#queue").val()
        },
        success: function(data) {
            var json = JSON.parse(data);
            $("#status").html("<i class='fa fa-check fa-1x' aria-hidden='true'></i> Message delivered. Status: " + json['success']);
            setTimeout(function() {
                $("#status").html("");
            }, 3000);
            if (json['success']) {
                $("#message").val("");
            }
        }
    })
    .error(function() {
        alert("You need to restart the doppelganger.py process");
    });
}

function addSampleGesture(gesture) {
    var obj = null;
    if (gesture == 'zoom') {
        obj =
        {
            "timeStamp": "2016-08-26 16.00.00.00",
            "cameraID": "gestureMainScreen",
            "personID": 1,
            "bodyPose": {
                "X": 1,
                "Y": 0.5,
                "Z": 3,
                "pitch": "20",
                "yaw": "15",
                "roll": "8"
            },
            "gestureType": "zoom",
            "parameters": {
                "direction": "out",
                "factor": 1.5
            }
        };
    }
    else {
        obj =
        {
            "timeStamp": "2016-08-26 16.01.00.00",
            "cameraID": "gestureMainScreen",
            "personID": 1,
            "bodyPose": {
                "X": 1,
                "Y": 0.5,
                "Z": 3,
                "pitch": "20",
                "yaw": "15",
                "roll": "8"
            },
            "gestureType": "wipe",
            "parameters": {
                "direction": "left",
                "factor": 1
            }
        };
    }

    place(obj, "", gesture);
}

function addSampleHeadPose() {
    var obj =
    {
        "timeStamp": "2015-08-25 13.32.56.23",
        "cameraID": "headPoseLeader",
        "personID": 1,
        "poseLabel": "leftSceen",
        "parameters": {
            "X": 15.5,
            "Y": 8.5,
            "Z": 30,
            "pitch": 30,
            "yaw": "25",
            "roll": "5"
        }
    };

    place(obj, "", "headpose");
}

function transcriptGoodbye() {
    var obj =
    {
        "workerID": "multichannel-transcript-worker",
        "channelIndex": 1,
        "result": {
            "alternatives": [
                {
                    "word_confidence": [
                        ["thank", 0.9999999999999348],
                        ["you", 0.9999999999999345],
                        ["Watson", 0.9878396071137343],
                        ["goodbye", 0.5647713012909412]
                    ],
                    "confidence": 0.833,
                    "transcript": "thank you Watson goodbye ",
                    "timestamps": [
                        ["thank",169.46,169.7],
                        ["you",169.7,169.8],
                        ["Watson",169.8,170.32],
                        ["goodbye",170.36,170.87]
                    ]
                },
                {
                    "transcript": "thank you Watson good bye "
                },
                {
                    "transcript": "thank you Watson good by "
                }
            ],
            "final": true
        },
        "time_captured": 1472670997988,
        "messageId":"7090da40-6faf-11e6-8cfd-fb11aeacedf0"
    };
    place(obj, topic_exchange, 'far.final.transcript')
}

function transcriptHelp() {
    var obj = {
        "workerID": "multichannel-transcript-worker",
        "channelIndex": 0,
        "result": {
            "alternatives": [
                {
                    "word_confidence": [
                        ["Watson", 0.9945242864502818],
                        ["I", 1],
                        ["need", 0.9692162659314524],
                        ["help", 0.9874941080346185],
                        ["with", 0.9947420010059536],
                        ["acquisitions", 0.9942652283960176]
                    ],
                    "confidence": 0.906,
                    "transcript": "Watson I need help with acquisitions ",
                    "timestamps": [
                        ["Watson",4.84,5.66],
                        ["I",5.91,6.17],
                        ["need",6.17,6.43],
                        ["help",6.43,6.91],
                        ["with",6.91,7.36],
                        ["acquisitions",7.43,8.76]
                    ]
                },
                {
                    "transcript":"Watson I need help with acquisitions "
                },
                {
                    "transcript":"Watson I need help with acquisitions "
                }
            ],
            "final": true},
        "time_captured": 1472670839062,
        "messageId": "11d6ab60-6faf-11e6-8cfd-fb11aeacedf0"
    };

    place(obj, topic_exchange, 'far.final.transcript');
}

function commandGoodbye() {
    var obj = {
        "incoming": "thank you Watson goodbye ",
        "timestamp": 1472670997999,
        "cmd": {
            "action": "goodbye",
            "subject": null,
            "addressee": "watson"
        }
    };

    place(obj, topic_exchange, 'acquisitions.command');
}

function commandHelp() {
    var obj = {
        "incoming": "Watson I need help with acquisitions ",
        "timestamp": 1472670839104,
        "cmd": {
            "action": "help",
            "subject": {
                "type": "acquisitions"
            },
            "addressee": "watson"
        }
    };

    place(obj, topic_exchange, 'acquisitions.command');
}

function place(message, exchange, topic) {
    $("#message").val(JSON.stringify(message, null, 2));
    $("#exchange").val(exchange);
    $("#topic").val(topic);
}