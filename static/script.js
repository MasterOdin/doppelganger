var exchange_topic = 'amq.topic';
var topic_transcript = 'far.final.transcript';
var topic_command = 'acquisitions.command';

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
            exchange: $("#exchange").val(),
            topic: $("#topic").val()
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
        },
        error: function() {
            alert("Error trying to communicate with RabbitMQ.");
        }
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

    publish(obj, "", "gesture");
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

    publish(obj, "", "headpose");
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

    publish(obj, exchange_topic, topic_transcript);
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

    publish(obj, exchange_topic, topic_command);
}

function transcriptShowCompanies() {
    var obj = {
        "workerID": "e999fa73-e577-4a9a-a0ef-aa6747c2e902",
        "channelIndex": 0,
        "result": {
            "alternatives": [
                {
                    "word_confidence": [
                        ["Watson", 0.9946844894547195],
                        ["show", 0.7171658939202544],
                        ["me", 0.7069206032177959],
                        ["companies", 0.9935573561991417],
                        ["with", 0.9906431067408652],
                        ["revenue", 0.8769511209384738],
                        ["between", 0.9981212667240013],
                        ["two", 1],
                        ["hundred", 0.999999999999971],
                        ["million", 0.9999999999999727],
                        ["and", 1],
                        ["six", 1],
                        ["hundred", 1],
                        ["million", 0.9526599887760382],
                        ["pertaining", 0.9999999999999803],
                        ["to", 0.9999999999999981],
                        ["analytics", 0.9946311863613608]
                    ],
                    "confidence": 0.969,
                    "transcript":"Watson show me companies with revenue between 800000000 pertaining to analytics ","timestamps":[["Watson",45.91,46.68],["show",46.72,47.04],["me",47.04,47.18],["companies",47.18,47.98],["with",48.13,48.34],["revenue",48.34,48.7],["between",48.7,49.24],["two",49.37,49.57],["hundred",49.57,49.92],["million",49.92,50.31],["and",50.31,50.56],["six",50.56,50.83],["hundred",50.83,51.13],["million",51.13,51.53],["pertaining",51.56,52.04],["to",52.04,52.16],["analytics",52.16,53.05]]},{"transcript":"Watson Shomi companies with revenue between 800000000 pertaining to analytics "},{"transcript":"Watson show ME companies with revenue between 800000000 pertaining to analytics "}],"final":true},"time_captured":1472757460409,"messageId":"c02f4a90-7078-11e6-bff1-1766b5cdc518"}
    publish(obj, exchange_topic, topic_transcript);
}

function commandShowCompanies() {
    var obj = {  "incoming": "Watson show me companies with revenue between 800000000 pertaining to analytics ",  "timestamp": 1472757460438,  "cmd": {    "action": "show",    "subject": {      "type": "company",      "criteria": {        "concepts": [          "analytics"        ]      }    },    "addressee": "watson"  }};
    publish(obj, exchange_topic, topic_command);
}

function transcriptInformationCompany() {
    var obj = {"workerID":"e999fa73-e577-4a9a-a0ef-aa6747c2e902","channelIndex":0,"result":{"alternatives":[{"word_confidence":[["Watson",0.9940718882956818],["show",0.9999999999999475],["me",0.999999999999993],["more",0.999999999999993],["information",0.9999999999999736],["for",0.9999999999999736],["the",0.9999999999999735],["company\'s",0.9999999999999646],["name",0.5285325021248511],["red",0.9999999999999691],["door",0.9999999999999797],["interactive\'s",0.7855416385161217]],"confidence":0.921,"transcript":"Watson show me more information for the company\'s name red door interactive\'s ","timestamps":[["Watson",59.39,60.03],["show",60.06,60.38],["me",60.38,60.52],["more",60.52,60.97],["information",61,61.71],["for",61.71,61.87],["the",61.87,61.95],["company\'s",61.95,62.43],["name",62.43,62.82],["red",62.91,63.22],["door",63.22,63.57],["interactive\'s",63.57,64.54]]},{"transcript":"Watson show me more information for the company\'s name red door interactives "},{"transcript":"Watson show me more information for the companies named red door interactive\'s "}],"final":true},"time_captured":1472757472176,"messageId":"c732cb00-7078-11e6-bff1-1766b5cdc518"};
    publish(obj, exchange_topic, topic_transcript);

}

function commandInformationCompany() {
    var obj = {  "incoming": "Watson show me more information for the company\'s name red door interactive\'s ",  "timestamp": 1472757472204,  "cmd": {    "action": "show",    "subject": {      "type": "company",      "names": [        "red door interactive"      ]    },    "addressee": "watson"  }};
    publish(obj, exchange_topic, topic_command);

}

function transcriptWebsiteCompany() {
    var obj = {"workerID":"e999fa73-e577-4a9a-a0ef-aa6747c2e902","channelIndex":0,"result":{"alternatives":[{"word_confidence":[["Watson",0.8323861770687634],["show",0.8142837837452106],["me",0.9571424116336237],["the",1],["website",0.8207901520232352],["for",0.932119606582468],["the",1],["company",1],["name",0.6141803996986658],["red",0.8910448392948825],["door",1],["interactive\'s",0.8343061601681865]],"confidence":0.857,"transcript":"Watson show me the website for the company name red door interactive\'s ","timestamps":[["Watson",79.45,80],["show",80.03,80.28],["me",80.28,80.41],["the",80.41,80.53],["website",80.53,81.08],["for",81.08,81.23],["the",81.23,81.32],["company",81.32,81.72],["name",81.72,82.14],["red",82.37,82.65],["door",82.65,82.97],["interactive\'s",82.97,83.9]]},{"transcript":"Watson show me the website for the company name red door interactives "},{"transcript":"Watson show me the website for the company named red door interactive\'s "}],"final":true},"time_captured":1472757491368,"messageId":"d2a34280-7078-11e6-bff1-1766b5cdc518"};
    publish(obj, exchange_topic, topic_transcript);
}

function commandWebsiteCompany() {
    var obj = {  "incoming": "Watson show me the website for the company name red door interactive\'s ",  "timestamp": 1472757491395,  "cmd": {    "action": "show",    "subject": {      "type": "website",      "criteria": {        "names": [          "red door interactive"        ]      }    },    "addressee": "watson"  }};
    publish(obj, exchange_topic, topic_command);
}

function transcriptHighlightCompany() {
    var obj = {"workerID":"e999fa73-e577-4a9a-a0ef-aa6747c2e902","channelIndex":0,"result":{"alternatives":[{"word_confidence":[["Watson",0.7907604760939116],["highlight",0.35901992422849416],["the",0.890642957112542],["company",0.9890642957114055],["named",0.45176933944683273],["red",1],["door",1],["interactive\'s",0.9007381962496608]],"confidence":0.767,"transcript":"Watson highlight the company named red door interactive\'s ","timestamps":[["Watson",103.8,104.38],["highlight",104.38,104.96],["the",104.96,105.05],["company",105.05,105.45],["named",105.45,105.87],["red",105.91,106.17],["door",106.17,106.47],["interactive\'s",106.47,107.41]]},{"transcript":"Watson highlight the company named red door interactives "},{"transcript":"Watson highlight the company name to red door interactive\'s "}],"final":true},"time_captured":1472757514938,"messageId":"e0afc1a0-7078-11e6-bff1-1766b5cdc518"};
    publish(obj, exchange_topic, topic_transcript);
}

function commandHighlightCompany() {
    var obj = {  "incoming": "Watson highlight the company named red door interactive\'s ",  "timestamp": 1472757514960,  "cmd": {    "action": "highlight",    "subject": {      "type": "company",      "names": [        "red door interactive"      ]    },    "addressee": "watson"  }};
    publish(obj, exchange_topic, topic_command);
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
    publish(obj, exchange_topic, topic_transcript)
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

    publish(obj, exchange_topic, topic_command);
}

function samplePositionTracker() {
    var obj = [
        {
            "timestamp": "",
            "Person ID": "0",
            "Pose": "1",
            "Parameters": {
                "LocationX": "1439.98",
                "LocationY": "540.835"
            }
        },
        {
            "timestamp": "",
            "Person ID": "1",
            "Pose": "0",
            "Parameters": {
                "LocationX": "1113.52",
                "LocationY": "211.18"
            }
        },
        {
            "timestamp": "",
            "Person ID": "2",
            "Pose": "1",
            "Parameters": {
                "LocationX": "950.651",
                "LocationY": "271.996"
            }
        }
    ];

    publish(obj, exchange_topic, 'persontracker');
}

function publish(message, exchange, topic) {
    $("#message").val(JSON.stringify(message, null, 2));
    $("#exchange").val(exchange);
    $("#topic").val(topic);
}