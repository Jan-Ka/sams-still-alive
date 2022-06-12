import * as Tone from "tone";

//const synth = new tone.Synth().toDestination();

const playbutton = document.getElementById("control");
let playing = 0;
const synths = [];

playbutton.addEventListener("click", async (e) => {
    if (!playing) {
        e.target.innerText = "■";

        const now = Tone.now() + 0.5;
        song.tracks.forEach((track) => {
            //create a synth for each track
            const synth = new Tone.PolySynth(Tone.Synth, {
                envelope: {
                    attack: 0.02,
                    decay: 0.1,
                    sustain: 0.3,
                    release: 1
                }
            }).toDestination();
            synths.push(synth);
            //schedule all of the events
            track.notes.forEach((note) => {
                synth.triggerAttackRelease(
                    note.name,
                    note.duration,
                    note.time + now,
                    note.velocity
                );
            });
        });

        for (const line of lyrics) {
            console.log(line);
            await typeSentence.apply(this, [".sentence.current", ...line]);
            await newLine();
        }

        playing = 1;
    } else {
        //dispose the synth and make a new one
        while (synths.length) {
            const synth = synths.shift();
            synth.disconnect();
        }

        e.target.innerText = "▶";
        playing = 0;
    }
});

async function typeSentence(ref, sentence, read = true, delay = 100) {
    const letters = sentence.split("");
    let i = 0;

    if (read) {
        const msg = new SpeechSynthesisUtterance(sentence);
        msg.rate = 0.6;
        msg.pitch = 0.7;
        window.speechSynthesis.speak(msg);
    }

    while (i < letters.length) {
        await waitForMs(delay);
        //console.log(Array.from(document.querySelectorAll(ref)));
        Array.from(document.querySelectorAll(ref)).at(-1).append(letters[i]);
        i++;
    }
    return;
}

async function deleteSentence(ref) {
    const sentence = document.getElementById(ref).innerText;
    const letters = sentence.split("");
    let i = 0;
    while (letters.length > 0) {
        await waitForMs(100);
        letters.pop();
        document.getElementById(ref).innerText = letters.join("");
    }
}

async function newLine() {
    for (const elem of Array.from(document.querySelector(".sentence.current"))) {
        elem.className = "sentence";
    }

    const newSentence = document.createElement("div");
    newSentence.classList.add("sentence", "current");

    document.getElementById("content").append(newSentence);
}

function waitForMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOMContentLoaded");
});

//await typeSentence("Forms FORM-29827281-12:", "sentence");
//await waitForMs(2000);
//deleteSentence("sentence");

const lyrics = [
    ["Forms FORM-29827281-12:", false],
    ["Test Assessment Report", false],
    ["This was a triumph"],
    ["I'm making a note here:"],
    ["huge success."]
];

const song = {
    header: {
        keySignatures: [
            {
                key: "D",
                scale: "major",
                ticks: 0
            },
            {
                key: "F",
                scale: "major",
                ticks: 61440
            },
            {
                key: "D",
                scale: "major",
                ticks: 94208
            },
            {
                key: "F",
                scale: "major",
                ticks: 167936
            },
            {
                key: "D",
                scale: "major",
                ticks: 200704
            },
            {
                key: "F",
                scale: "major",
                ticks: 274432
            },
            {
                key: "D",
                scale: "major",
                ticks: 307200
            }
        ],
        meta: [],
        name: "",
        ppq: 1024,
        tempos: [
            {
                bpm: 120.00024000048,
                ticks: 0
            },
            {
                bpm: 120.00024000048,
                ticks: 0
            },
            {
                bpm: 119.99928000431997,
                ticks: 0
            },
            {
                bpm: 119.99928000431997,
                ticks: 71680
            },
            {
                bpm: 118.94519401943565,
                ticks: 71936
            },
            {
                bpm: 118.4759256918994,
                ticks: 72192
            },
            {
                bpm: 117.94840543584884,
                ticks: 72448
            },
            {
                bpm: 116.95245298024088,
                ticks: 72704
            },
            {
                bpm: 116.48381942678313,
                ticks: 72960
            },
            {
                bpm: 115.95636948337572,
                ticks: 73216
            },
            {
                bpm: 115.48788820772421,
                ticks: 73472
            },
            {
                bpm: 119.99928000431997,
                ticks: 73984
            },
            {
                bpm: 119.99928000431997,
                ticks: 202752
            },
            {
                bpm: 119.4719340514924,
                ticks: 203008
            },
            {
                bpm: 118.94519401943565,
                ticks: 203264
            },
            {
                bpm: 118.94519401943565,
                ticks: 203520
            },
            {
                bpm: 118.4759256918994,
                ticks: 203776
            },
            {
                bpm: 118.4759256918994,
                ticks: 204032
            },
            {
                bpm: 117.94840543584884,
                ticks: 204288
            },
            {
                bpm: 117.47982284042716,
                ticks: 204544
            },
            {
                bpm: 119.99928000431997,
                ticks: 204800
            },
            {
                bpm: 119.99928000431997,
                ticks: 206848
            },
            {
                bpm: 119.4719340514924,
                ticks: 207104
            },
            {
                bpm: 118.94519401943565,
                ticks: 207360
            },
            {
                bpm: 118.94519401943565,
                ticks: 207616
            },
            {
                bpm: 118.4759256918994,
                ticks: 207872
            },
            {
                bpm: 118.4759256918994,
                ticks: 208128
            },
            {
                bpm: 117.94840543584884,
                ticks: 208384
            },
            {
                bpm: 117.47982284042716,
                ticks: 208640
            },
            {
                bpm: 119.99928000431997,
                ticks: 208896
            },
            {
                bpm: 119.99928000431997,
                ticks: 210944
            },
            {
                bpm: 119.4719340514924,
                ticks: 211200
            },
            {
                bpm: 118.94519401943565,
                ticks: 211456
            },
            {
                bpm: 118.94519401943565,
                ticks: 211712
            },
            {
                bpm: 118.4759256918994,
                ticks: 211968
            },
            {
                bpm: 118.4759256918994,
                ticks: 212224
            },
            {
                bpm: 117.94840543584884,
                ticks: 212480
            },
            {
                bpm: 117.47982284042716,
                ticks: 212736
            },
            {
                bpm: 119.99928000431997,
                ticks: 212992
            },
            {
                bpm: 119.99928000431997,
                ticks: 215040
            },
            {
                bpm: 119.4719340514924,
                ticks: 215296
            },
            {
                bpm: 118.94519401943565,
                ticks: 215552
            },
            {
                bpm: 118.94519401943565,
                ticks: 215808
            },
            {
                bpm: 118.4759256918994,
                ticks: 216064
            },
            {
                bpm: 118.4759256918994,
                ticks: 216320
            },
            {
                bpm: 117.94840543584884,
                ticks: 216576
            },
            {
                bpm: 117.47982284042716,
                ticks: 216832
            },
            {
                bpm: 119.99928000431997,
                ticks: 217088
            },
            {
                bpm: 119.99928000431997,
                ticks: 219136
            },
            {
                bpm: 119.4719340514924,
                ticks: 219392
            },
            {
                bpm: 118.94519401943565,
                ticks: 219648
            },
            {
                bpm: 118.94519401943565,
                ticks: 219904
            },
            {
                bpm: 118.4759256918994,
                ticks: 220160
            },
            {
                bpm: 118.4759256918994,
                ticks: 220416
            },
            {
                bpm: 117.94840543584884,
                ticks: 220672
            },
            {
                bpm: 117.47982284042716,
                ticks: 220928
            },
            {
                bpm: 119.99928000431997,
                ticks: 221184
            },
            {
                bpm: 119.99928000431997,
                ticks: 223232
            },
            {
                bpm: 119.4719340514924,
                ticks: 223488
            },
            {
                bpm: 118.94519401943565,
                ticks: 223744
            },
            {
                bpm: 118.94519401943565,
                ticks: 224000
            },
            {
                bpm: 118.4759256918994,
                ticks: 224256
            },
            {
                bpm: 118.4759256918994,
                ticks: 224512
            },
            {
                bpm: 117.94840543584884,
                ticks: 224768
            },
            {
                bpm: 117.47982284042716,
                ticks: 225024
            },
            {
                bpm: 119.99928000431997,
                ticks: 225280
            },
            {
                bpm: 119.99928000431997,
                ticks: 227328
            },
            {
                bpm: 119.4719340514924,
                ticks: 227584
            },
            {
                bpm: 118.94519401943565,
                ticks: 227840
            },
            {
                bpm: 118.94519401943565,
                ticks: 228096
            },
            {
                bpm: 118.4759256918994,
                ticks: 228352
            },
            {
                bpm: 118.4759256918994,
                ticks: 228608
            },
            {
                bpm: 117.94840543584884,
                ticks: 228864
            },
            {
                bpm: 117.47982284042716,
                ticks: 229120
            },
            {
                bpm: 119.99928000431997,
                ticks: 229376
            },
            {
                bpm: 119.99928000431997,
                ticks: 235520
            },
            {
                bpm: 119.4719340514924,
                ticks: 235776
            },
            {
                bpm: 118.94519401943565,
                ticks: 236032
            },
            {
                bpm: 118.94519401943565,
                ticks: 236288
            },
            {
                bpm: 118.4759256918994,
                ticks: 236544
            },
            {
                bpm: 118.4759256918994,
                ticks: 236800
            },
            {
                bpm: 117.94840543584884,
                ticks: 237056
            },
            {
                bpm: 117.47982284042716,
                ticks: 237312
            },
            {
                bpm: 119.99928000431997,
                ticks: 237568
            },
            {
                bpm: 119.99928000431997,
                ticks: 239616
            },
            {
                bpm: 119.4719340514924,
                ticks: 239872
            },
            {
                bpm: 118.94519401943565,
                ticks: 240128
            },
            {
                bpm: 118.94519401943565,
                ticks: 240384
            },
            {
                bpm: 118.4759256918994,
                ticks: 240640
            },
            {
                bpm: 118.4759256918994,
                ticks: 240896
            },
            {
                bpm: 117.94840543584884,
                ticks: 241152
            },
            {
                bpm: 117.47982284042716,
                ticks: 241408
            },
            {
                bpm: 119.99928000431997,
                ticks: 241664
            },
            {
                bpm: 119.99928000431997,
                ticks: 243712
            },
            {
                bpm: 119.4719340514924,
                ticks: 243968
            },
            {
                bpm: 118.94519401943565,
                ticks: 244224
            },
            {
                bpm: 118.94519401943565,
                ticks: 244480
            },
            {
                bpm: 118.4759256918994,
                ticks: 244736
            },
            {
                bpm: 118.4759256918994,
                ticks: 244992
            },
            {
                bpm: 117.94840543584884,
                ticks: 245248
            },
            {
                bpm: 117.47982284042716,
                ticks: 245504
            },
            {
                bpm: 119.99928000431997,
                ticks: 245760
            }
        ],
        timeSignatures: [
            {
                ticks: 0,
                timeSignature: [4, 4],
                measures: 0
            }
        ]
    },
    tracks: [
        {
            channel: 0,
            controlChanges: {
                6: [
                    {
                        number: 6,
                        ticks: 4,
                        time: 0.00195313671875,
                        value: 0.09448818897637795
                    },
                    {
                        number: 6,
                        ticks: 4,
                        time: 0.00195313671875,
                        value: 0.09448818897637795
                    }
                ],
                7: [
                    {
                        number: 7,
                        ticks: 0,
                        time: 0,
                        value: 0.7952755905511811
                    },
                    {
                        number: 7,
                        ticks: 0,
                        time: 0,
                        value: 0.8031496062992126
                    },
                    {
                        number: 7,
                        ticks: 0,
                        time: 0,
                        value: 0.8661417322834646
                    },
                    {
                        number: 7,
                        ticks: 4042,
                        time: 1.9736446542968749,
                        value: 0.8031496062992126
                    },
                    {
                        number: 7,
                        ticks: 5345,
                        time: 2.609878940429687,
                        value: 0.8661417322834646
                    },
                    {
                        number: 7,
                        ticks: 63713,
                        time: 31.110049940429686,
                        value: 0.8031496062992126
                    },
                    {
                        number: 7,
                        ticks: 63713,
                        time: 31.110049940429686,
                        value: 0.8661417322834646
                    },
                    {
                        number: 7,
                        ticks: 65482,
                        time: 31.973824654296873,
                        value: 0.8031496062992126
                    },
                    {
                        number: 7,
                        ticks: 112353,
                        time: 54.88623419042968,
                        value: 0.8661417322834646
                    },
                    {
                        number: 7,
                        ticks: 356577,
                        time: 174.24530969042962,
                        value: 0.8031496062992126
                    },
                    {
                        number: 7,
                        ticks: 357601,
                        time: 174.74531269042964,
                        value: 0.8661417322834646
                    }
                ],
                10: [
                    {
                        number: 10,
                        ticks: 0,
                        time: 0,
                        value: 0.5039370078740157
                    }
                ],
                38: [
                    {
                        number: 38,
                        ticks: 5,
                        time: 0.0024414208984375,
                        value: 0
                    },
                    {
                        number: 38,
                        ticks: 5,
                        time: 0.0024414208984375,
                        value: 0
                    }
                ],
                100: [
                    {
                        number: 100,
                        ticks: 3,
                        time: 0.0014648525390625,
                        value: 0
                    },
                    {
                        number: 100,
                        ticks: 3,
                        time: 0.0014648525390625,
                        value: 0
                    }
                ],
                101: [
                    {
                        number: 101,
                        ticks: 3,
                        time: 0.0014648525390625,
                        value: 0
                    },
                    {
                        number: 101,
                        ticks: 3,
                        time: 0.0014648525390625,
                        value: 0
                    }
                ]
            },
            pitchBends: [],
            instrument: {
                family: "piano",
                number: 0,
                name: "acoustic grand piano"
            },
            name: "Piano",
            notes: [
                {
                    duration: 0.23388812207031262,
                    durationTicks: 479,
                    midi: 79,
                    name: "G5",
                    ticks: 2069,
                    time: 1.0102599677734374,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.23144670117187505,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 2579,
                    time: 1.2592848994140624,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.24609522656250005,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 3084,
                    time: 1.5058684101562498,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2324232695312498,
                    durationTicks: 476,
                    midi: 76,
                    name: "E5",
                    ticks: 3589,
                    time: 1.7524519208984375,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.5122101044921874,
                    durationTicks: 1049,
                    midi: 78,
                    name: "F#5",
                    ticks: 4100,
                    time: 2.00196513671875,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.2792985507812502,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 4100,
                    time: 2.00196513671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.2626968886718748,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 4642,
                    time: 2.266615162109375,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26123203613281243,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 5150,
                    time: 2.514663525390625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.26367345703125,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 5655,
                    time: 2.7612470361328123,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26367345703125,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 6165,
                    time: 3.0102719677734373,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.26123203613281243,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 6675,
                    time: 3.2592968994140623,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26123203613281243,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 7180,
                    time: 3.5058804101562497,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 7685,
                    time: 3.752463920898437,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.27929855078124977,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 8196,
                    time: 4.00197713671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.2626968886718748,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 8738,
                    time: 4.2666271621093745,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2612320361328129,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 9246,
                    time: 4.514675525390625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2338881220703124,
                    durationTicks: 479,
                    midi: 69,
                    name: "A4",
                    ticks: 9751,
                    time: 4.761259036132812,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.26367345703125,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 9751,
                    time: 4.761259036132812,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2338881220703124,
                    durationTicks: 479,
                    midi: 79,
                    name: "G5",
                    ticks: 10261,
                    time: 5.010283967773438,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.26367345703125,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 10261,
                    time: 5.010283967773438,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.23144670117187527,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 10771,
                    time: 5.259308899414062,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2612320361328129,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 10771,
                    time: 5.259308899414062,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.24609522656249982,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 11276,
                    time: 5.50589241015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328129,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 11276,
                    time: 5.50589241015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.4990264316406252,
                    durationTicks: 1022,
                    midi: 76,
                    name: "E5",
                    ticks: 11781,
                    time: 5.752475920898437,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 11781,
                    time: 5.752475920898437,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.27929855078124977,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 12292,
                    time: 6.00198913671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.23291155371093808,
                    durationTicks: 477,
                    midi: 78,
                    name: "F#5",
                    ticks: 12834,
                    time: 6.266639162109374,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2626968886718748,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 12834,
                    time: 6.266639162109374,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2612320361328129,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 13342,
                    time: 6.514687525390625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.26367345703125,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 13847,
                    time: 6.761271036132812,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.4951201582031244,
                    durationTicks: 1014,
                    midi: 74,
                    name: "D5",
                    ticks: 14357,
                    time: 7.0102959677734376,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.26367345703125,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 14357,
                    time: 7.0102959677734376,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.2612320361328129,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 14867,
                    time: 7.259320899414062,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117187527,
                    durationTicks: 474,
                    midi: 76,
                    name: "E5",
                    ticks: 15372,
                    time: 7.5059044101562495,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328129,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 15372,
                    time: 7.5059044101562495,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.23242326953125048,
                    durationTicks: 476,
                    midi: 69,
                    name: "A4",
                    ticks: 15877,
                    time: 7.752487920898437,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 15877,
                    time: 7.752487920898437,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 16388,
                    time: 8.00200113671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 16930,
                    time: 8.266651162109374,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 17438,
                    time: 8.514699525390624,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 17943,
                    time: 8.761283036132813,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 18453,
                    time: 9.010307967773437,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.261232036132812,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 18963,
                    time: 9.259332899414062,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.261232036132812,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 19468,
                    time: 9.50591641015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2324232695312496,
                    durationTicks: 476,
                    midi: 69,
                    name: "A4",
                    ticks: 19973,
                    time: 9.752499920898437,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 19973,
                    time: 9.752499920898437,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.512210104492187,
                    durationTicks: 1049,
                    midi: 76,
                    name: "E5",
                    ticks: 20484,
                    time: 10.00201313671875,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 59,
                    name: "B3",
                    ticks: 20484,
                    time: 10.00201313671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 21026,
                    time: 10.266663162109374,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 21534,
                    time: 10.514711525390624,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 21534,
                    time: 10.514711525390624,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.7441450898437498,
                    durationTicks: 1524,
                    midi: 79,
                    name: "G5",
                    ticks: 22039,
                    time: 10.761295036132813,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 22039,
                    time: 10.761295036132813,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 22549,
                    time: 11.010319967773437,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.261232036132812,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 23059,
                    time: 11.259344899414062,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117187438,
                    durationTicks: 474,
                    midi: 76,
                    name: "E5",
                    ticks: 23564,
                    time: 11.50592841015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.261232036132812,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 23564,
                    time: 11.50592841015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.4990264316406243,
                    durationTicks: 1022,
                    midi: 73,
                    name: "C#5",
                    ticks: 24069,
                    time: 11.752511920898437,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 24069,
                    time: 11.752511920898437,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 24580,
                    time: 12.00202513671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.7431685214843746,
                    durationTicks: 1522,
                    midi: 74,
                    name: "D5",
                    ticks: 25122,
                    time: 12.266675162109374,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 25122,
                    time: 12.266675162109374,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 25630,
                    time: 12.514723525390623,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 26135,
                    time: 12.761307036132813,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.49512015820312527,
                    durationTicks: 1014,
                    midi: 76,
                    name: "E5",
                    ticks: 26645,
                    time: 13.010331967773437,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 57,
                    name: "A3",
                    ticks: 26645,
                    time: 13.010331967773437,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.261232036132812,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 27155,
                    time: 13.259356899414062,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2460952265625007,
                    durationTicks: 504,
                    midi: 69,
                    name: "A4",
                    ticks: 27660,
                    time: 13.50594041015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.261232036132812,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 27660,
                    time: 13.50594041015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.5288117666015619,
                    durationTicks: 1083,
                    midi: 69,
                    name: "A4",
                    ticks: 28165,
                    time: 13.752523920898437,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 28165,
                    time: 13.752523920898437,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 28676,
                    time: 14.00203713671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.49414358984375006,
                    durationTicks: 1012,
                    midi: 78,
                    name: "F#5",
                    ticks: 29218,
                    time: 14.266687162109374,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 29218,
                    time: 14.266687162109374,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 29726,
                    time: 14.514735525390623,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 30231,
                    time: 14.761319036132813,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 30741,
                    time: 15.010343967773437,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.261232036132812,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 31251,
                    time: 15.259368899414062,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.261232036132812,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 31756,
                    time: 15.50595241015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.26220860449218897,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 32261,
                    time: 15.752535920898437,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 32772,
                    time: 16.00204913671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.26269688867187213,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 33314,
                    time: 16.266699162109376,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 33822,
                    time: 16.514747525390625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 34327,
                    time: 16.761331036132812,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23388812207031506,
                    durationTicks: 479,
                    midi: 79,
                    name: "G5",
                    ticks: 34837,
                    time: 17.010355967773435,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 34837,
                    time: 17.010355967773435,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 35347,
                    time: 17.25938089941406,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 35347,
                    time: 17.25938089941406,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.24609522656249894,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 35852,
                    time: 17.50596441015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 35852,
                    time: 17.50596441015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2324232695312496,
                    durationTicks: 476,
                    midi: 76,
                    name: "E5",
                    ticks: 36357,
                    time: 17.752547920898436,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 36357,
                    time: 17.752547920898436,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.5122101044921905,
                    durationTicks: 1049,
                    midi: 78,
                    name: "F#5",
                    ticks: 36868,
                    time: 18.002061136718748,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.27929855078125243,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 36868,
                    time: 18.002061136718748,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 37410,
                    time: 18.266711162109374,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 37918,
                    time: 18.514759525390623,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 38423,
                    time: 18.76134303613281,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 38933,
                    time: 19.010367967773437,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 39443,
                    time: 19.259392899414063,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 39948,
                    time: 19.50597641015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 40453,
                    time: 19.752559920898438,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 40964,
                    time: 20.00207313671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.26269688867187213,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 41506,
                    time: 20.266723162109376,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 42014,
                    time: 20.514771525390625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 69,
                    name: "A4",
                    ticks: 42519,
                    time: 20.761355036132812,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 42519,
                    time: 20.761355036132812,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23388812207031506,
                    durationTicks: 479,
                    midi: 79,
                    name: "G5",
                    ticks: 43029,
                    time: 21.010379967773435,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 43029,
                    time: 21.010379967773435,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 43539,
                    time: 21.25940489941406,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 43539,
                    time: 21.25940489941406,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.24609522656249894,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 44044,
                    time: 21.50598841015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 44044,
                    time: 21.50598841015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2324232695312496,
                    durationTicks: 476,
                    midi: 76,
                    name: "E5",
                    ticks: 44549,
                    time: 21.752571920898436,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 44549,
                    time: 21.752571920898436,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.27929855078125243,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 45060,
                    time: 22.002085136718748,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 45602,
                    time: 22.266735162109374,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 46110,
                    time: 22.514783525390623,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 46110,
                    time: 22.514783525390623,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.23388812207031506,
                    durationTicks: 479,
                    midi: 74,
                    name: "D5",
                    ticks: 46615,
                    time: 22.76136703613281,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 46615,
                    time: 22.76136703613281,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 47125,
                    time: 23.010391967773437,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 47635,
                    time: 23.259416899414063,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2314467011718726,
                    durationTicks: 474,
                    midi: 76,
                    name: "E5",
                    ticks: 48140,
                    time: 23.50600041015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 48140,
                    time: 23.50600041015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2324232695312496,
                    durationTicks: 476,
                    midi: 69,
                    name: "A4",
                    ticks: 48645,
                    time: 23.752583920898438,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 48645,
                    time: 23.752583920898438,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 49156,
                    time: 24.00209713671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.26269688867187213,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 49698,
                    time: 24.266747162109375,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 50206,
                    time: 24.514795525390625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 50711,
                    time: 24.761379036132812,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 51221,
                    time: 25.010403967773435,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 51731,
                    time: 25.25942889941406,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 52236,
                    time: 25.50601241015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 52741,
                    time: 25.752595920898436,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.5122101044921905,
                    durationTicks: 1049,
                    midi: 76,
                    name: "E5",
                    ticks: 53252,
                    time: 26.002109136718747,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.27929855078125243,
                    durationTicks: 572,
                    midi: 59,
                    name: "B3",
                    ticks: 53252,
                    time: 26.002109136718747,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 53794,
                    time: 26.266759162109373,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 54302,
                    time: 26.514807525390623,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 54302,
                    time: 26.514807525390623,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.7441450898437516,
                    durationTicks: 1524,
                    midi: 79,
                    name: "G5",
                    ticks: 54807,
                    time: 26.76139103613281,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 54807,
                    time: 26.76139103613281,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 55317,
                    time: 27.010415967773437,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 55827,
                    time: 27.259440899414063,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2314467011718726,
                    durationTicks: 474,
                    midi: 76,
                    name: "E5",
                    ticks: 56332,
                    time: 27.50602441015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 56332,
                    time: 27.50602441015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.7617233203124982,
                    durationTicks: 1560,
                    midi: 73,
                    name: "C#5",
                    ticks: 56837,
                    time: 27.752607920898438,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 56837,
                    time: 27.752607920898438,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 57348,
                    time: 28.00212113671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.26269688867187213,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 57890,
                    time: 28.266771162109375,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2314467011718726,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 58398,
                    time: 28.514819525390624,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 58398,
                    time: 28.514819525390624,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 76,
                    name: "E5",
                    ticks: 58903,
                    time: 28.761403036132812,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2636734570312491,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 58903,
                    time: 28.761403036132812,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 57,
                    name: "A3",
                    ticks: 59413,
                    time: 29.010427967773435,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 59923,
                    time: 29.25945289941406,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 59923,
                    time: 29.25945289941406,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 60428,
                    time: 29.50603641015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 60428,
                    time: 29.50603641015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.2324232695312496,
                    durationTicks: 476,
                    midi: 76,
                    name: "E5",
                    ticks: 60933,
                    time: 29.752619920898436,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 60933,
                    time: 29.752619920898436,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 77,
                    name: "F5",
                    ticks: 61444,
                    time: 30.002133136718747,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.27929855078125243,
                    durationTicks: 572,
                    midi: 58,
                    name: "A#3",
                    ticks: 61444,
                    time: 30.002133136718747,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.23291155371093808,
                    durationTicks: 477,
                    midi: 76,
                    name: "E5",
                    ticks: 61986,
                    time: 30.266783162109373,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 61986,
                    time: 30.266783162109373,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 62494,
                    time: 30.514831525390623,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.26123203613281376,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 62494,
                    time: 30.514831525390623,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.23388812207031506,
                    durationTicks: 479,
                    midi: 72,
                    name: "C5",
                    ticks: 62999,
                    time: 30.76141503613281,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 70,
                    name: "A#4",
                    ticks: 62999,
                    time: 30.76141503613281,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2314467011718726,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 64524,
                    time: 31.50604841015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2324232695312496,
                    durationTicks: 476,
                    midi: 70,
                    name: "A#4",
                    ticks: 65029,
                    time: 31.752631920898438,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.5122101044921905,
                    durationTicks: 1049,
                    midi: 72,
                    name: "C5",
                    ticks: 65540,
                    time: 32.002145136718745,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.279298550781256,
                    durationTicks: 572,
                    midi: 53,
                    name: "F3",
                    ticks: 65540,
                    time: 32.002145136718745,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 60,
                    name: "C4",
                    ticks: 66082,
                    time: 32.266795162109375,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 66590,
                    time: 32.514843525390624,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 66590,
                    time: 32.514843525390624,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 60,
                    name: "C4",
                    ticks: 67095,
                    time: 32.76142703613281,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 76,
                    name: "E5",
                    ticks: 67605,
                    time: 33.010451967773434,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 55,
                    name: "G3",
                    ticks: 67605,
                    time: 33.010451967773434,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 74,
                    name: "D5",
                    ticks: 68115,
                    time: 33.25947689941406,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 68115,
                    time: 33.25947689941406,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117186905,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 68620,
                    time: 33.50606041015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 68620,
                    time: 33.50606041015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 72,
                    name: "C5",
                    ticks: 69125,
                    time: 33.752643920898436,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 69125,
                    time: 33.752643920898436,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.24951321582030772,
                    durationTicks: 511,
                    midi: 74,
                    name: "D5",
                    ticks: 69636,
                    time: 34.00215713671875,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 69636,
                    time: 34.00215713671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.24756007910156086,
                    durationTicks: 507,
                    midi: 72,
                    name: "C5",
                    ticks: 70178,
                    time: 34.26680716210937,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 60,
                    name: "C4",
                    ticks: 70178,
                    time: 34.26680716210937,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 72,
                    name: "C5",
                    ticks: 70686,
                    time: 34.51485552539062,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 70686,
                    time: 34.51485552539062,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 60,
                    name: "C4",
                    ticks: 71191,
                    time: 34.76143903613281,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.5001485859375023,
                    durationTicks: 1014,
                    midi: 72,
                    name: "C5",
                    ticks: 71701,
                    time: 35.01046396777343,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.2650888447265629,
                    durationTicks: 540,
                    midi: 53,
                    name: "F3",
                    ticks: 71701,
                    time: 35.01046396777343,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.2654277675781245,
                    durationTicks: 535,
                    midi: 60,
                    name: "C4",
                    ticks: 72211,
                    time: 35.260715937499995,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23793990820312416,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 72716,
                    time: 35.51111355859374,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.26870424218750344,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 72716,
                    time: 35.51111355859374,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.24098809667968624,
                    durationTicks: 476,
                    midi: 70,
                    name: "A#4",
                    ticks: 73221,
                    time: 35.764658542968746,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.27193695898437653,
                    durationTicks: 537,
                    midi: 60,
                    name: "C4",
                    ticks: 73221,
                    time: 35.764658542968746,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.517016807617189,
                    durationTicks: 1049,
                    midi: 72,
                    name: "C5",
                    ticks: 73732,
                    time: 36.02340418359375,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.2841052539062474,
                    durationTicks: 572,
                    midi: 53,
                    name: "F3",
                    ticks: 73732,
                    time: 36.02340418359375,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 60,
                    name: "C4",
                    ticks: 74274,
                    time: 36.292860912109376,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 74782,
                    time: 36.540909275390625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 74782,
                    time: 36.540909275390625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 60,
                    name: "C4",
                    ticks: 75287,
                    time: 36.78749278613281,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 79,
                    name: "G5",
                    ticks: 75797,
                    time: 37.036517717773435,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 55,
                    name: "G3",
                    ticks: 75797,
                    time: 37.036517717773435,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 77,
                    name: "F5",
                    ticks: 76307,
                    time: 37.28554264941406,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 76307,
                    time: 37.28554264941406,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 76,
                    name: "E5",
                    ticks: 76812,
                    time: 37.532126160156245,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 76812,
                    time: 37.532126160156245,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.24707179492187237,
                    durationTicks: 506,
                    midi: 74,
                    name: "D5",
                    ticks: 77317,
                    time: 37.77870967089844,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 77317,
                    time: 37.77870967089844,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 74,
                    name: "D5",
                    ticks: 77828,
                    time: 38.028222886718744,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.279298550781256,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 77828,
                    time: 38.028222886718744,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.23291155371093453,
                    durationTicks: 477,
                    midi: 76,
                    name: "E5",
                    ticks: 78370,
                    time: 38.292872912109374,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 60,
                    name: "C4",
                    ticks: 78370,
                    time: 38.292872912109374,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 78878,
                    time: 38.54092127539062,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 78878,
                    time: 38.54092127539062,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 60,
                    name: "C4",
                    ticks: 79383,
                    time: 38.78750478613281,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.4951201582031288,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 79893,
                    time: 39.03652971777343,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 57,
                    name: "A3",
                    ticks: 79893,
                    time: 39.03652971777343,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 60,
                    name: "C4",
                    ticks: 80403,
                    time: 39.28555464941406,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117186905,
                    durationTicks: 474,
                    midi: 79,
                    name: "G5",
                    ticks: 80908,
                    time: 39.53213816015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 80908,
                    time: 39.53213816015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 81,
                    name: "A5",
                    ticks: 81413,
                    time: 39.778721670898435,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 60,
                    name: "C4",
                    ticks: 81413,
                    time: 39.778721670898435,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26416174121093405,
                    durationTicks: 541,
                    midi: 82,
                    name: "A#5",
                    ticks: 81924,
                    time: 40.02823488671875,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 58,
                    name: "A#3",
                    ticks: 81924,
                    time: 40.02823488671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.23291155371093453,
                    durationTicks: 477,
                    midi: 82,
                    name: "A#5",
                    ticks: 82466,
                    time: 40.29288491210937,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 65,
                    name: "F4",
                    ticks: 82466,
                    time: 40.29288491210937,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.4951201582031288,
                    durationTicks: 1014,
                    midi: 81,
                    name: "A5",
                    ticks: 82974,
                    time: 40.54093327539062,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 69,
                    name: "A4",
                    ticks: 82974,
                    time: 40.54093327539062,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 65,
                    name: "F4",
                    ticks: 83479,
                    time: 40.78751678613281,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.4951201582031288,
                    durationTicks: 1014,
                    midi: 79,
                    name: "G5",
                    ticks: 83989,
                    time: 41.03654171777343,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 58,
                    name: "A#3",
                    ticks: 83989,
                    time: 41.03654171777343,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 84499,
                    time: 41.28556664941406,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 77,
                    name: "F5",
                    ticks: 85004,
                    time: 41.53215016015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 69,
                    name: "A4",
                    ticks: 85004,
                    time: 41.53215016015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 79,
                    name: "G5",
                    ticks: 85509,
                    time: 41.77873367089843,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 65,
                    name: "F4",
                    ticks: 85509,
                    time: 41.77873367089843,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26416174121093405,
                    durationTicks: 541,
                    midi: 81,
                    name: "A5",
                    ticks: 86020,
                    time: 42.02824688671875,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 86020,
                    time: 42.02824688671875,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.23291155371094163,
                    durationTicks: 477,
                    midi: 81,
                    name: "A5",
                    ticks: 86562,
                    time: 42.29289691210937,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 60,
                    name: "C4",
                    ticks: 86562,
                    time: 42.29289691210937,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.4951201582031288,
                    durationTicks: 1014,
                    midi: 79,
                    name: "G5",
                    ticks: 87070,
                    time: 42.54094527539062,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 87070,
                    time: 42.54094527539062,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 60,
                    name: "C4",
                    ticks: 87575,
                    time: 42.78752878613281,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 88085,
                    time: 43.03655371777344,
                    velocity: 0.5118110236220472
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 57,
                    name: "A3",
                    ticks: 88085,
                    time: 43.03655371777344,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 60,
                    name: "C4",
                    ticks: 88595,
                    time: 43.28557864941406,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 89100,
                    time: 43.53216216015625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 89100,
                    time: 43.53216216015625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 72,
                    name: "C5",
                    ticks: 89605,
                    time: 43.77874567089843,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 60,
                    name: "C4",
                    ticks: 89605,
                    time: 43.77874567089843,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 74,
                    name: "D5",
                    ticks: 90116,
                    time: 44.028258886718746,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 90116,
                    time: 44.028258886718746,
                    velocity: 0.4330708661417323
                },
                {
                    duration: 0.24756007910156796,
                    durationTicks: 507,
                    midi: 77,
                    name: "F5",
                    ticks: 90658,
                    time: 44.29290891210937,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 60,
                    name: "C4",
                    ticks: 90658,
                    time: 44.29290891210937,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 77,
                    name: "F5",
                    ticks: 91166,
                    time: 44.540957275390625,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 65,
                    name: "F4",
                    ticks: 91166,
                    time: 44.540957275390625,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.4975615791015642,
                    durationTicks: 1019,
                    midi: 76,
                    name: "E5",
                    ticks: 91671,
                    time: 44.78754078613281,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 60,
                    name: "C4",
                    ticks: 91671,
                    time: 44.78754078613281,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 57,
                    name: "A3",
                    ticks: 92181,
                    time: 45.036565717773435,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 76,
                    name: "E5",
                    ticks: 92691,
                    time: 45.28559064941406,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 60,
                    name: "C4",
                    ticks: 92691,
                    time: 45.28559064941406,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 93196,
                    time: 45.532174160156245,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 93196,
                    time: 45.532174160156245,
                    velocity: 0.4015748031496063
                },
                {
                    duration: 0.7617233203124982,
                    durationTicks: 1560,
                    midi: 78,
                    name: "F#5",
                    ticks: 93701,
                    time: 45.778757670898436,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 66,
                    name: "F#4",
                    ticks: 93701,
                    time: 45.778757670898436,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.7587936152343815,
                    durationTicks: 1554,
                    midi: 50,
                    name: "D3",
                    ticks: 94212,
                    time: 46.028270886718744,
                    velocity: 0.5669291338582677
                },
                {
                    duration: 0.7587936152343815,
                    durationTicks: 1554,
                    midi: 57,
                    name: "A3",
                    ticks: 94212,
                    time: 46.028270886718744,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 78,
                    name: "F#5",
                    ticks: 95262,
                    time: 46.54096927539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 74,
                    name: "D5",
                    ticks: 95767,
                    time: 46.78755278613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 50,
                    name: "D3",
                    ticks: 95767,
                    time: 46.78755278613281,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 57,
                    name: "A3",
                    ticks: 95767,
                    time: 46.78755278613281,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 71,
                    name: "B4",
                    ticks: 96277,
                    time: 47.03657771777343,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.7417036689453127,
                    durationTicks: 1519,
                    midi: 47,
                    name: "B2",
                    ticks: 96277,
                    time: 47.03657771777343,
                    velocity: 0.5511811023622047
                },
                {
                    duration: 0.7417036689453127,
                    durationTicks: 1519,
                    midi: 54,
                    name: "F#3",
                    ticks: 96277,
                    time: 47.03657771777343,
                    velocity: 0.6614173228346457
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 74,
                    name: "D5",
                    ticks: 96787,
                    time: 47.28560264941406,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 78,
                    name: "F#5",
                    ticks: 97292,
                    time: 47.53218616015624,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 74,
                    name: "D5",
                    ticks: 97797,
                    time: 47.778769670898434,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23242326953124604,
                    durationTicks: 476,
                    midi: 47,
                    name: "B2",
                    ticks: 97797,
                    time: 47.778769670898434,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24707179492187237,
                    durationTicks: 506,
                    midi: 54,
                    name: "F#3",
                    ticks: 97797,
                    time: 47.778769670898434,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 69,
                    name: "A4",
                    ticks: 98308,
                    time: 48.02828288671875,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.7587936152343744,
                    durationTicks: 1554,
                    midi: 50,
                    name: "D3",
                    ticks: 98308,
                    time: 48.02828288671875,
                    velocity: 0.5669291338582677
                },
                {
                    duration: 0.7587936152343744,
                    durationTicks: 1554,
                    midi: 57,
                    name: "A3",
                    ticks: 98308,
                    time: 48.02828288671875,
                    velocity: 0.6771653543307087
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 74,
                    name: "D5",
                    ticks: 98850,
                    time: 48.29293291210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 78,
                    name: "F#5",
                    ticks: 99358,
                    time: 48.54098127539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 74,
                    name: "D5",
                    ticks: 99863,
                    time: 48.787564786132805,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23388812207031862,
                    durationTicks: 479,
                    midi: 50,
                    name: "D3",
                    ticks: 99863,
                    time: 48.787564786132805,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 57,
                    name: "A3",
                    ticks: 99863,
                    time: 48.787564786132805,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 71,
                    name: "B4",
                    ticks: 100373,
                    time: 49.03658971777344,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.7417036689453056,
                    durationTicks: 1519,
                    midi: 47,
                    name: "B2",
                    ticks: 100373,
                    time: 49.03658971777344,
                    velocity: 0.5511811023622047
                },
                {
                    duration: 0.7417036689453056,
                    durationTicks: 1519,
                    midi: 54,
                    name: "F#3",
                    ticks: 100373,
                    time: 49.03658971777344,
                    velocity: 0.6614173228346457
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 74,
                    name: "D5",
                    ticks: 100883,
                    time: 49.28561464941406,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 78,
                    name: "F#5",
                    ticks: 101388,
                    time: 49.53219816015625,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 74,
                    name: "D5",
                    ticks: 101893,
                    time: 49.77878167089843,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 47,
                    name: "B2",
                    ticks: 101893,
                    time: 49.77878167089843,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24707179492187237,
                    durationTicks: 506,
                    midi: 54,
                    name: "F#3",
                    ticks: 101893,
                    time: 49.77878167089843,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 69,
                    name: "A4",
                    ticks: 102404,
                    time: 50.02829488671875,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.7587936152343744,
                    durationTicks: 1554,
                    midi: 50,
                    name: "D3",
                    ticks: 102404,
                    time: 50.02829488671875,
                    velocity: 0.5669291338582677
                },
                {
                    duration: 0.7587936152343744,
                    durationTicks: 1554,
                    midi: 57,
                    name: "A3",
                    ticks: 102404,
                    time: 50.02829488671875,
                    velocity: 0.6771653543307087
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 74,
                    name: "D5",
                    ticks: 102946,
                    time: 50.29294491210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 78,
                    name: "F#5",
                    ticks: 103454,
                    time: 50.54099327539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 74,
                    name: "D5",
                    ticks: 103959,
                    time: 50.78757678613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 50,
                    name: "D3",
                    ticks: 103959,
                    time: 50.78757678613281,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 57,
                    name: "A3",
                    ticks: 103959,
                    time: 50.78757678613281,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 71,
                    name: "B4",
                    ticks: 104469,
                    time: 51.036601717773436,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.7417036689453127,
                    durationTicks: 1519,
                    midi: 47,
                    name: "B2",
                    ticks: 104469,
                    time: 51.036601717773436,
                    velocity: 0.5511811023622047
                },
                {
                    duration: 0.7417036689453127,
                    durationTicks: 1519,
                    midi: 54,
                    name: "F#3",
                    ticks: 104469,
                    time: 51.036601717773436,
                    velocity: 0.6614173228346457
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 74,
                    name: "D5",
                    ticks: 104979,
                    time: 51.285626649414056,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 78,
                    name: "F#5",
                    ticks: 105484,
                    time: 51.53221016015625,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 74,
                    name: "D5",
                    ticks: 105989,
                    time: 51.77879367089844,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23242326953124604,
                    durationTicks: 476,
                    midi: 47,
                    name: "B2",
                    ticks: 105989,
                    time: 51.77879367089844,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24707179492187237,
                    durationTicks: 506,
                    midi: 54,
                    name: "F#3",
                    ticks: 105989,
                    time: 51.77879367089844,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.279298550781256,
                    durationTicks: 572,
                    midi: 69,
                    name: "A4",
                    ticks: 106500,
                    time: 52.028306886718745,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.7587936152343744,
                    durationTicks: 1554,
                    midi: 50,
                    name: "D3",
                    ticks: 106500,
                    time: 52.028306886718745,
                    velocity: 0.5669291338582677
                },
                {
                    duration: 0.7587936152343744,
                    durationTicks: 1554,
                    midi: 57,
                    name: "A3",
                    ticks: 106500,
                    time: 52.028306886718745,
                    velocity: 0.6771653543307087
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 74,
                    name: "D5",
                    ticks: 107042,
                    time: 52.292956912109375,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 78,
                    name: "F#5",
                    ticks: 107550,
                    time: 52.54100527539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 69,
                    name: "A4",
                    ticks: 108055,
                    time: 52.78758878613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23388812207031862,
                    durationTicks: 479,
                    midi: 50,
                    name: "D3",
                    ticks: 108055,
                    time: 52.78758878613281,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 57,
                    name: "A3",
                    ticks: 108055,
                    time: 52.78758878613281,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 79,
                    name: "G5",
                    ticks: 108565,
                    time: 53.036613717773434,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.7417036689453127,
                    durationTicks: 1519,
                    midi: 47,
                    name: "B2",
                    ticks: 108565,
                    time: 53.036613717773434,
                    velocity: 0.5511811023622047
                },
                {
                    duration: 0.7417036689453127,
                    durationTicks: 1519,
                    midi: 54,
                    name: "F#3",
                    ticks: 108565,
                    time: 53.036613717773434,
                    velocity: 0.6614173228346457
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 78,
                    name: "F#5",
                    ticks: 109075,
                    time: 53.285638649414054,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 109580,
                    time: 53.532222160156245,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.5288117666015637,
                    durationTicks: 1083,
                    midi: 76,
                    name: "E5",
                    ticks: 110085,
                    time: 53.778805670898436,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 47,
                    name: "B2",
                    ticks: 110085,
                    time: 53.778805670898436,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24707179492187237,
                    durationTicks: 506,
                    midi: 54,
                    name: "F#3",
                    ticks: 110085,
                    time: 53.778805670898436,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 110596,
                    time: 54.02831888671875,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 110596,
                    time: 54.02831888671875,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.49414358984374473,
                    durationTicks: 1012,
                    midi: 78,
                    name: "F#5",
                    ticks: 111138,
                    time: 54.29296891210937,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 111138,
                    time: 54.29296891210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 111646,
                    time: 54.54101727539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 112151,
                    time: 54.78760078613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 112661,
                    time: 55.03662571777343,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 112661,
                    time: 55.03662571777343,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 113171,
                    time: 55.28565064941406,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 113676,
                    time: 55.53223416015625,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 114181,
                    time: 55.778817670898434,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 114692,
                    time: 56.02833088671875,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 114692,
                    time: 56.02833088671875,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 115234,
                    time: 56.29298091210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 115742,
                    time: 56.54102927539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 116247,
                    time: 56.78761278613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 79,
                    name: "G5",
                    ticks: 116757,
                    time: 57.03663771777343,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 116757,
                    time: 57.03663771777343,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 116757,
                    time: 57.03663771777343,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 117267,
                    time: 57.28566264941406,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 117267,
                    time: 57.28566264941406,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 117772,
                    time: 57.53224616015625,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 117772,
                    time: 57.53224616015625,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.7617233203124982,
                    durationTicks: 1560,
                    midi: 76,
                    name: "E5",
                    ticks: 118277,
                    time: 57.77882967089843,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 118277,
                    time: 57.77882967089843,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 118788,
                    time: 58.02834288671875,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 118788,
                    time: 58.02834288671875,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 119330,
                    time: 58.29299291210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117186905,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 119838,
                    time: 58.541041275390626,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 119838,
                    time: 58.541041275390626,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.49756157910155707,
                    durationTicks: 1019,
                    midi: 74,
                    name: "D5",
                    ticks: 120343,
                    time: 58.78762478613281,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 120343,
                    time: 58.78762478613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 120853,
                    time: 59.03664971777343,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.2636734570312598,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 120853,
                    time: 59.03664971777343,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.49267873730468636,
                    durationTicks: 1009,
                    midi: 76,
                    name: "E5",
                    ticks: 121363,
                    time: 59.28567464941406,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 121363,
                    time: 59.28567464941406,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 121868,
                    time: 59.532258160156246,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.7617233203124982,
                    durationTicks: 1560,
                    midi: 69,
                    name: "A4",
                    ticks: 122373,
                    time: 59.77884167089843,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 122373,
                    time: 59.77884167089843,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 122884,
                    time: 60.028354886718745,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 122884,
                    time: 60.028354886718745,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 123426,
                    time: 60.29300491210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 123934,
                    time: 60.541053275390624,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 124439,
                    time: 60.78763678613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468736,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 124949,
                    time: 61.036661717773434,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 124949,
                    time: 61.036661717773434,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 125459,
                    time: 61.28568664941406,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 125964,
                    time: 61.532270160156244,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 126469,
                    time: 61.778853670898435,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.5122101044921905,
                    durationTicks: 1049,
                    midi: 76,
                    name: "E5",
                    ticks: 126980,
                    time: 62.02836688671874,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 52,
                    name: "E3",
                    ticks: 126980,
                    time: 62.02836688671874,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 59,
                    name: "B3",
                    ticks: 126980,
                    time: 62.02836688671874,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718757,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 127522,
                    time: 62.29301691210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 128030,
                    time: 62.54106527539062,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 128030,
                    time: 62.54106527539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.7441450898437552,
                    durationTicks: 1524,
                    midi: 79,
                    name: "G5",
                    ticks: 128535,
                    time: 62.787648786132806,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 128535,
                    time: 62.787648786132806,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468736,
                    durationTicks: 2026,
                    midi: 52,
                    name: "E3",
                    ticks: 129045,
                    time: 63.03667371777343,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703125267,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 129045,
                    time: 63.03667371777343,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 129555,
                    time: 63.28569864941406,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.49365530566406335,
                    durationTicks: 1011,
                    midi: 76,
                    name: "E5",
                    ticks: 130060,
                    time: 63.53228216015624,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328173,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 130060,
                    time: 63.53228216015624,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2622086044921943,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 130565,
                    time: 63.77886567089843,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 73,
                    name: "C#5",
                    ticks: 131076,
                    time: 64.02837888671874,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 52,
                    name: "E3",
                    ticks: 131076,
                    time: 64.02837888671874,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 131076,
                    time: 64.02837888671874,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 131618,
                    time: 64.29302891210938,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 132126,
                    time: 64.54107727539062,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 132126,
                    time: 64.54107727539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.7441450898437552,
                    durationTicks: 1524,
                    midi: 76,
                    name: "E5",
                    ticks: 132631,
                    time: 64.7876607861328,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2636734570312598,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 132631,
                    time: 64.7876607861328,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468665,
                    durationTicks: 2026,
                    midi: 52,
                    name: "E3",
                    ticks: 133141,
                    time: 65.03668571777344,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 57,
                    name: "A3",
                    ticks: 133141,
                    time: 65.03668571777344,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 133651,
                    time: 65.28571064941406,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 69,
                    name: "A4",
                    ticks: 134156,
                    time: 65.53229416015624,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 134156,
                    time: 65.53229416015624,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.5288117666015495,
                    durationTicks: 1083,
                    midi: 69,
                    name: "A4",
                    ticks: 134661,
                    time: 65.77887767089844,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 134661,
                    time: 65.77887767089844,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 135172,
                    time: 66.02839088671874,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 135172,
                    time: 66.02839088671874,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.49414358984374473,
                    durationTicks: 1012,
                    midi: 78,
                    name: "F#5",
                    ticks: 135714,
                    time: 66.29304091210938,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 135714,
                    time: 66.29304091210938,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 136222,
                    time: 66.54108927539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 136727,
                    time: 66.78767278613282,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468665,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 137237,
                    time: 67.03669771777344,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 137237,
                    time: 67.03669771777344,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 137747,
                    time: 67.28572264941405,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 138252,
                    time: 67.53230616015625,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 138757,
                    time: 67.77888967089844,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 139268,
                    time: 68.02840288671874,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 139268,
                    time: 68.02840288671874,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 139810,
                    time: 68.29305291210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 140318,
                    time: 68.54110127539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 69,
                    name: "A4",
                    ticks: 140823,
                    time: 68.78768478613281,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 140823,
                    time: 68.78768478613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 71,
                    name: "B4",
                    ticks: 141333,
                    time: 69.03670971777343,
                    velocity: 0.5511811023622047
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 79,
                    name: "G5",
                    ticks: 141333,
                    time: 69.03670971777343,
                    velocity: 0.6614173228346457
                },
                {
                    duration: 0.9892637480468665,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 141333,
                    time: 69.03670971777343,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.2636734570312598,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 141333,
                    time: 69.03670971777343,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 141843,
                    time: 69.28573464941405,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 141843,
                    time: 69.28573464941405,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 141843,
                    time: 69.28573464941405,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 67,
                    name: "G4",
                    ticks: 142348,
                    time: 69.53231816015625,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 142348,
                    time: 69.53231816015625,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 142348,
                    time: 69.53231816015625,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 67,
                    name: "G4",
                    ticks: 142853,
                    time: 69.77890167089843,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24707179492186526,
                    durationTicks: 506,
                    midi: 76,
                    name: "E5",
                    ticks: 142853,
                    time: 69.77890167089843,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 142853,
                    time: 69.77890167089843,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 69,
                    name: "A4",
                    ticks: 143364,
                    time: 70.02841488671874,
                    velocity: 0.5669291338582677
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 78,
                    name: "F#5",
                    ticks: 143364,
                    time: 70.02841488671874,
                    velocity: 0.6771653543307087
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 143364,
                    time: 70.02841488671874,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812631,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 143364,
                    time: 70.02841488671874,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 143906,
                    time: 70.29306491210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 144414,
                    time: 70.54111327539061,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 144919,
                    time: 70.78769678613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468665,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 145429,
                    time: 71.03672171777343,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.2636734570312598,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 145429,
                    time: 71.03672171777343,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 145939,
                    time: 71.28574664941405,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 146444,
                    time: 71.53233016015625,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 146949,
                    time: 71.77891367089843,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 147460,
                    time: 72.02842688671875,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 147460,
                    time: 72.02842688671875,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 148002,
                    time: 72.29307691210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 148510,
                    time: 72.54112527539061,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 69,
                    name: "A4",
                    ticks: 149015,
                    time: 72.78770878613281,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 149015,
                    time: 72.78770878613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23388812207032572,
                    durationTicks: 479,
                    midi: 71,
                    name: "B4",
                    ticks: 149525,
                    time: 73.03673371777343,
                    velocity: 0.5511811023622047
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 79,
                    name: "G5",
                    ticks: 149525,
                    time: 73.03673371777343,
                    velocity: 0.6614173228346457
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 149525,
                    time: 73.03673371777343,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.2636734570312598,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 149525,
                    time: 73.03673371777343,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 150035,
                    time: 73.28575864941405,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 150035,
                    time: 73.28575864941405,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 150035,
                    time: 73.28575864941405,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 67,
                    name: "G4",
                    ticks: 150540,
                    time: 73.53234216015625,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 150540,
                    time: 73.53234216015625,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 150540,
                    time: 73.53234216015625,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 67,
                    name: "G4",
                    ticks: 151045,
                    time: 73.77892567089843,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 76,
                    name: "E5",
                    ticks: 151045,
                    time: 73.77892567089843,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 151045,
                    time: 73.77892567089843,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 151556,
                    time: 74.02843888671875,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 151556,
                    time: 74.02843888671875,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 152098,
                    time: 74.29308891210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 152606,
                    time: 74.54113727539061,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 152606,
                    time: 74.54113727539061,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 152606,
                    time: 74.54113727539061,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 66,
                    name: "F#4",
                    ticks: 153111,
                    time: 74.78772078613281,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 74,
                    name: "D5",
                    ticks: 153111,
                    time: 74.78772078613281,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 153111,
                    time: 74.78772078613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468665,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 153621,
                    time: 75.03674571777344,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 153621,
                    time: 75.03674571777344,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 154131,
                    time: 75.28577064941405,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 67,
                    name: "G4",
                    ticks: 154636,
                    time: 75.53235416015625,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 154636,
                    time: 75.53235416015625,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 154636,
                    time: 75.53235416015625,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 69,
                    name: "A4",
                    ticks: 155141,
                    time: 75.77893767089844,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 155141,
                    time: 75.77893767089844,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 155652,
                    time: 76.02845088671874,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 155652,
                    time: 76.02845088671874,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 156194,
                    time: 76.29310091210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 156702,
                    time: 76.54114927539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 157207,
                    time: 76.7877327861328,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468665,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 157717,
                    time: 77.03675771777344,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 157717,
                    time: 77.03675771777344,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 158227,
                    time: 77.28578264941406,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 158732,
                    time: 77.53236616015624,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 159237,
                    time: 77.77894967089844,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.5122101044921834,
                    durationTicks: 1049,
                    midi: 76,
                    name: "E5",
                    ticks: 159748,
                    time: 78.02846288671874,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 52,
                    name: "E3",
                    ticks: 159748,
                    time: 78.02846288671874,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812631,
                    durationTicks: 572,
                    midi: 59,
                    name: "B3",
                    ticks: 159748,
                    time: 78.02846288671874,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 160290,
                    time: 78.29311291210936,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 160798,
                    time: 78.54116127539062,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 160798,
                    time: 78.54116127539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.7441450898437552,
                    durationTicks: 1524,
                    midi: 79,
                    name: "G5",
                    ticks: 161303,
                    time: 78.7877447861328,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 161303,
                    time: 78.7877447861328,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468665,
                    durationTicks: 2026,
                    midi: 52,
                    name: "E3",
                    ticks: 161813,
                    time: 79.03676971777344,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 161813,
                    time: 79.03676971777344,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 162323,
                    time: 79.28579464941406,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.49365530566406335,
                    durationTicks: 1011,
                    midi: 76,
                    name: "E5",
                    ticks: 162828,
                    time: 79.53237816015624,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 162828,
                    time: 79.53237816015624,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 163333,
                    time: 79.77896167089844,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.5122101044921692,
                    durationTicks: 1049,
                    midi: 73,
                    name: "C#5",
                    ticks: 163844,
                    time: 80.02847488671875,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 52,
                    name: "E3",
                    ticks: 163844,
                    time: 80.02847488671875,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 163844,
                    time: 80.02847488671875,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 164386,
                    time: 80.29312491210936,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 164894,
                    time: 80.54117327539062,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 164894,
                    time: 80.54117327539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 76,
                    name: "E5",
                    ticks: 165399,
                    time: 80.7877567861328,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 165399,
                    time: 80.7877567861328,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 52,
                    name: "E3",
                    ticks: 165909,
                    time: 81.03678171777344,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 57,
                    name: "A3",
                    ticks: 165909,
                    time: 81.03678171777344,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 166419,
                    time: 81.28580664941406,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 166419,
                    time: 81.28580664941406,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 166924,
                    time: 81.53239016015624,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 166924,
                    time: 81.53239016015624,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 76,
                    name: "E5",
                    ticks: 167429,
                    time: 81.77897367089844,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 167429,
                    time: 81.77897367089844,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 77,
                    name: "F5",
                    ticks: 167940,
                    time: 82.02848688671875,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.5122101044921692,
                    durationTicks: 1049,
                    midi: 50,
                    name: "D3",
                    ticks: 167940,
                    time: 82.02848688671875,
                    velocity: 0.5669291338582677
                },
                {
                    duration: 0.5122101044921692,
                    durationTicks: 1049,
                    midi: 53,
                    name: "F3",
                    ticks: 167940,
                    time: 82.02848688671875,
                    velocity: 0.5669291338582677
                },
                {
                    duration: 0.5122101044921692,
                    durationTicks: 1049,
                    midi: 58,
                    name: "A#3",
                    ticks: 167940,
                    time: 82.02848688671875,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.23291155371094874,
                    durationTicks: 477,
                    midi: 76,
                    name: "E5",
                    ticks: 168482,
                    time: 82.29313691210936,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 168990,
                    time: 82.54118527539062,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.49512015820313593,
                    durationTicks: 1014,
                    midi: 50,
                    name: "D3",
                    ticks: 168990,
                    time: 82.54118527539062,
                    velocity: 0.5669291338582677
                },
                {
                    duration: 0.49512015820313593,
                    durationTicks: 1014,
                    midi: 53,
                    name: "F3",
                    ticks: 168990,
                    time: 82.54118527539062,
                    velocity: 0.5669291338582677
                },
                {
                    duration: 0.49512015820313593,
                    durationTicks: 1014,
                    midi: 58,
                    name: "A#3",
                    ticks: 168990,
                    time: 82.54118527539062,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 72,
                    name: "C5",
                    ticks: 169495,
                    time: 82.7877687861328,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 50,
                    name: "D3",
                    ticks: 170005,
                    time: 83.03679371777343,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 53,
                    name: "F3",
                    ticks: 170005,
                    time: 83.03679371777343,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 58,
                    name: "A#3",
                    ticks: 170005,
                    time: 83.03679371777343,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 50,
                    name: "D3",
                    ticks: 170515,
                    time: 83.28581864941405,
                    velocity: 0.5511811023622047
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 53,
                    name: "F3",
                    ticks: 170515,
                    time: 83.28581864941405,
                    velocity: 0.5511811023622047
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 58,
                    name: "A#3",
                    ticks: 170515,
                    time: 83.28581864941405,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 171020,
                    time: 83.53240216015624,
                    velocity: 0.6614173228346457
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 50,
                    name: "D3",
                    ticks: 171020,
                    time: 83.53240216015624,
                    velocity: 0.5826771653543307
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 53,
                    name: "F3",
                    ticks: 171020,
                    time: 83.53240216015624,
                    velocity: 0.5826771653543307
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 58,
                    name: "A#3",
                    ticks: 171020,
                    time: 83.53240216015624,
                    velocity: 0.6614173228346457
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 70,
                    name: "A#4",
                    ticks: 171525,
                    time: 83.77898567089844,
                    velocity: 0.6771653543307087
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 50,
                    name: "D3",
                    ticks: 171525,
                    time: 83.77898567089844,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 53,
                    name: "F3",
                    ticks: 171525,
                    time: 83.77898567089844,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 58,
                    name: "A#3",
                    ticks: 171525,
                    time: 83.77898567089844,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.5122101044921834,
                    durationTicks: 1049,
                    midi: 72,
                    name: "C5",
                    ticks: 172036,
                    time: 84.02849888671875,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 45,
                    name: "A2",
                    ticks: 172036,
                    time: 84.02849888671875,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 48,
                    name: "C3",
                    ticks: 172036,
                    time: 84.02849888671875,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 53,
                    name: "F3",
                    ticks: 172036,
                    time: 84.02849888671875,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 173086,
                    time: 84.54119727539063,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 45,
                    name: "A2",
                    ticks: 173591,
                    time: 84.7877807861328,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 48,
                    name: "C3",
                    ticks: 173591,
                    time: 84.7877807861328,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24853664746095205,
                    durationTicks: 509,
                    midi: 53,
                    name: "F3",
                    ticks: 173591,
                    time: 84.7877807861328,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 76,
                    name: "E5",
                    ticks: 174101,
                    time: 85.03680571777343,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 52,
                    name: "E3",
                    ticks: 174101,
                    time: 85.03680571777343,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 55,
                    name: "G3",
                    ticks: 174101,
                    time: 85.03680571777343,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 60,
                    name: "C4",
                    ticks: 174101,
                    time: 85.03680571777343,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 74,
                    name: "D5",
                    ticks: 174611,
                    time: 85.28583064941407,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 175116,
                    time: 85.53241416015624,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 72,
                    name: "C5",
                    ticks: 175621,
                    time: 85.77899767089843,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 52,
                    name: "E3",
                    ticks: 175621,
                    time: 85.77899767089843,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 55,
                    name: "G3",
                    ticks: 175621,
                    time: 85.77899767089843,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 60,
                    name: "C4",
                    ticks: 175621,
                    time: 85.77899767089843,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 74,
                    name: "D5",
                    ticks: 176132,
                    time: 86.02851088671875,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 50,
                    name: "D3",
                    ticks: 176132,
                    time: 86.02851088671875,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 53,
                    name: "F3",
                    ticks: 176132,
                    time: 86.02851088671875,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 58,
                    name: "A#3",
                    ticks: 176132,
                    time: 86.02851088671875,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.24756007910156086,
                    durationTicks: 507,
                    midi: 72,
                    name: "C5",
                    ticks: 176674,
                    time: 86.29316091210937,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 72,
                    name: "C5",
                    ticks: 177182,
                    time: 86.54120927539063,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.23388812207032572,
                    durationTicks: 479,
                    midi: 50,
                    name: "D3",
                    ticks: 177687,
                    time: 86.7877927861328,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.23388812207032572,
                    durationTicks: 479,
                    midi: 53,
                    name: "F3",
                    ticks: 177687,
                    time: 86.7877927861328,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24853664746095205,
                    durationTicks: 509,
                    midi: 58,
                    name: "A#3",
                    ticks: 177687,
                    time: 86.7877927861328,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 72,
                    name: "C5",
                    ticks: 178197,
                    time: 87.03681771777343,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 45,
                    name: "A2",
                    ticks: 178197,
                    time: 87.03681771777343,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 48,
                    name: "C3",
                    ticks: 178197,
                    time: 87.03681771777343,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 53,
                    name: "F3",
                    ticks: 178197,
                    time: 87.03681771777343,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 179212,
                    time: 87.53242616015623,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 70,
                    name: "A#4",
                    ticks: 179717,
                    time: 87.77900967089843,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 45,
                    name: "A2",
                    ticks: 179717,
                    time: 87.77900967089843,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 48,
                    name: "C3",
                    ticks: 179717,
                    time: 87.77900967089843,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 53,
                    name: "F3",
                    ticks: 179717,
                    time: 87.77900967089843,
                    velocity: 0.7086614173228346
                },
                {
                    duration: 0.5122101044921834,
                    durationTicks: 1049,
                    midi: 72,
                    name: "C5",
                    ticks: 180228,
                    time: 88.02852288671875,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 45,
                    name: "A2",
                    ticks: 180228,
                    time: 88.02852288671875,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 48,
                    name: "C3",
                    ticks: 180228,
                    time: 88.02852288671875,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 53,
                    name: "F3",
                    ticks: 180228,
                    time: 88.02852288671875,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 181278,
                    time: 88.54122127539063,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 45,
                    name: "A2",
                    ticks: 181783,
                    time: 88.78780478613281,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 48,
                    name: "C3",
                    ticks: 181783,
                    time: 88.78780478613281,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 53,
                    name: "F3",
                    ticks: 181783,
                    time: 88.78780478613281,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 79,
                    name: "G5",
                    ticks: 182293,
                    time: 89.03682971777343,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 52,
                    name: "E3",
                    ticks: 182293,
                    time: 89.03682971777343,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 55,
                    name: "G3",
                    ticks: 182293,
                    time: 89.03682971777343,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 60,
                    name: "C4",
                    ticks: 182293,
                    time: 89.03682971777343,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 77,
                    name: "F5",
                    ticks: 182803,
                    time: 89.28585464941406,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 76,
                    name: "E5",
                    ticks: 183308,
                    time: 89.53243816015625,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 74,
                    name: "D5",
                    ticks: 183813,
                    time: 89.77902167089843,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 52,
                    name: "E3",
                    ticks: 183813,
                    time: 89.77902167089843,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 55,
                    name: "G3",
                    ticks: 183813,
                    time: 89.77902167089843,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 60,
                    name: "C4",
                    ticks: 183813,
                    time: 89.77902167089843,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 74,
                    name: "D5",
                    ticks: 184324,
                    time: 90.02853488671875,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 50,
                    name: "D3",
                    ticks: 184324,
                    time: 90.02853488671875,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 53,
                    name: "F3",
                    ticks: 184324,
                    time: 90.02853488671875,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 58,
                    name: "A#3",
                    ticks: 184324,
                    time: 90.02853488671875,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.23291155371093453,
                    durationTicks: 477,
                    midi: 76,
                    name: "E5",
                    ticks: 184866,
                    time: 90.29318491210937,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 185374,
                    time: 90.54123327539062,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 50,
                    name: "D3",
                    ticks: 185879,
                    time: 90.78781678613281,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 53,
                    name: "F3",
                    ticks: 185879,
                    time: 90.78781678613281,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 58,
                    name: "A#3",
                    ticks: 185879,
                    time: 90.78781678613281,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 186389,
                    time: 91.03684171777343,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 45,
                    name: "A2",
                    ticks: 186389,
                    time: 91.03684171777343,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 48,
                    name: "C3",
                    ticks: 186389,
                    time: 91.03684171777343,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 53,
                    name: "F3",
                    ticks: 186389,
                    time: 91.03684171777343,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 79,
                    name: "G5",
                    ticks: 187404,
                    time: 91.53245016015624,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 81,
                    name: "A5",
                    ticks: 187909,
                    time: 91.77903367089843,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 45,
                    name: "A2",
                    ticks: 187909,
                    time: 91.77903367089843,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 48,
                    name: "C3",
                    ticks: 187909,
                    time: 91.77903367089843,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 53,
                    name: "F3",
                    ticks: 187909,
                    time: 91.77903367089843,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.26416174121094116,
                    durationTicks: 541,
                    midi: 82,
                    name: "A#5",
                    ticks: 188420,
                    time: 92.02854688671874,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 188420,
                    time: 92.02854688671874,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 53,
                    name: "F3",
                    ticks: 188420,
                    time: 92.02854688671874,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 58,
                    name: "A#3",
                    ticks: 188420,
                    time: 92.02854688671874,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.23291155371092032,
                    durationTicks: 477,
                    midi: 82,
                    name: "A#5",
                    ticks: 188962,
                    time: 92.29319691210938,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 81,
                    name: "A5",
                    ticks: 189470,
                    time: 92.54124527539062,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 79,
                    name: "G5",
                    ticks: 190485,
                    time: 93.03685371777343,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 52,
                    name: "E3",
                    ticks: 190485,
                    time: 93.03685371777343,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 55,
                    name: "G3",
                    ticks: 190485,
                    time: 93.03685371777343,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 60,
                    name: "C4",
                    ticks: 190485,
                    time: 93.03685371777343,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 77,
                    name: "F5",
                    ticks: 191500,
                    time: 93.53246216015624,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.49365530566406335,
                    durationTicks: 1011,
                    midi: 52,
                    name: "E3",
                    ticks: 191500,
                    time: 93.53246216015624,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566406335,
                    durationTicks: 1011,
                    midi: 55,
                    name: "G3",
                    ticks: 191500,
                    time: 93.53246216015624,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566406335,
                    durationTicks: 1011,
                    midi: 60,
                    name: "C4",
                    ticks: 191500,
                    time: 93.53246216015624,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 79,
                    name: "G5",
                    ticks: 192005,
                    time: 93.77904567089843,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.26416174121094116,
                    durationTicks: 541,
                    midi: 81,
                    name: "A5",
                    ticks: 192516,
                    time: 94.02855888671874,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 57,
                    name: "A3",
                    ticks: 192516,
                    time: 94.02855888671874,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 60,
                    name: "C4",
                    ticks: 192516,
                    time: 94.02855888671874,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 65,
                    name: "F4",
                    ticks: 192516,
                    time: 94.02855888671874,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.23291155371092032,
                    durationTicks: 477,
                    midi: 81,
                    name: "A5",
                    ticks: 193058,
                    time: 94.29320891210938,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 79,
                    name: "G5",
                    ticks: 193566,
                    time: 94.54125727539062,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 55,
                    name: "G3",
                    ticks: 193566,
                    time: 94.54125727539062,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 60,
                    name: "C4",
                    ticks: 193566,
                    time: 94.54125727539062,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 64,
                    name: "E4",
                    ticks: 193566,
                    time: 94.54125727539062,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 77,
                    name: "F5",
                    ticks: 194071,
                    time: 94.7878407861328,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.49512015820313593,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 194581,
                    time: 95.03686571777342,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.49512015820313593,
                    durationTicks: 1014,
                    midi: 53,
                    name: "F3",
                    ticks: 194581,
                    time: 95.03686571777342,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.49512015820313593,
                    durationTicks: 1014,
                    midi: 58,
                    name: "A#3",
                    ticks: 194581,
                    time: 95.03686571777342,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.49512015820313593,
                    durationTicks: 1014,
                    midi: 62,
                    name: "D4",
                    ticks: 194581,
                    time: 95.03686571777342,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 195596,
                    time: 95.53247416015624,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.49365530566406335,
                    durationTicks: 1011,
                    midi: 52,
                    name: "E3",
                    ticks: 195596,
                    time: 95.53247416015624,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566406335,
                    durationTicks: 1011,
                    midi: 55,
                    name: "G3",
                    ticks: 195596,
                    time: 95.53247416015624,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566406335,
                    durationTicks: 1011,
                    midi: 60,
                    name: "C4",
                    ticks: 195596,
                    time: 95.53247416015624,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.23242326953126735,
                    durationTicks: 476,
                    midi: 72,
                    name: "C5",
                    ticks: 196101,
                    time: 95.77905767089842,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 74,
                    name: "D5",
                    ticks: 196612,
                    time: 96.02857088671874,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 50,
                    name: "D3",
                    ticks: 196612,
                    time: 96.02857088671874,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 53,
                    name: "F3",
                    ticks: 196612,
                    time: 96.02857088671874,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 58,
                    name: "A#3",
                    ticks: 196612,
                    time: 96.02857088671874,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.24756007910156086,
                    durationTicks: 507,
                    midi: 77,
                    name: "F5",
                    ticks: 197154,
                    time: 96.29322091210938,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 77,
                    name: "F5",
                    ticks: 197662,
                    time: 96.54126927539062,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 50,
                    name: "D3",
                    ticks: 197662,
                    time: 96.54126927539062,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 53,
                    name: "F3",
                    ticks: 197662,
                    time: 96.54126927539062,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 58,
                    name: "A#3",
                    ticks: 197662,
                    time: 96.54126927539062,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.49756157910155707,
                    durationTicks: 1019,
                    midi: 76,
                    name: "E5",
                    ticks: 198167,
                    time: 96.78785278613282,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.49512015820313593,
                    durationTicks: 1014,
                    midi: 52,
                    name: "E3",
                    ticks: 198677,
                    time: 97.03687771777342,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.49512015820313593,
                    durationTicks: 1014,
                    midi: 55,
                    name: "G3",
                    ticks: 198677,
                    time: 97.03687771777342,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.49512015820313593,
                    durationTicks: 1014,
                    midi: 60,
                    name: "C4",
                    ticks: 198677,
                    time: 97.03687771777342,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 76,
                    name: "E5",
                    ticks: 199187,
                    time: 97.28590264941406,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 199692,
                    time: 97.53248616015625,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 52,
                    name: "E3",
                    ticks: 199692,
                    time: 97.53248616015625,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 55,
                    name: "G3",
                    ticks: 199692,
                    time: 97.53248616015625,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 60,
                    name: "C4",
                    ticks: 199692,
                    time: 97.53248616015625,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.7617233203125124,
                    durationTicks: 1560,
                    midi: 78,
                    name: "F#5",
                    ticks: 200197,
                    time: 97.77906967089842,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 200708,
                    time: 98.02858288671874,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 201250,
                    time: 98.29323291210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 201758,
                    time: 98.54128127539062,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 202263,
                    time: 98.78786478613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2644372373046906,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 202773,
                    time: 99.03688971777343,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.26362900976562287,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 203283,
                    time: 99.28654861523437,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2646683544922013,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 203788,
                    time: 99.53534074999999,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2670204033203021,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 204293,
                    time: 99.78510587207032,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 204804,
                    time: 100.03943088671875,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 205346,
                    time: 100.30408091210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 205854,
                    time: 100.55212927539061,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 206359,
                    time: 100.79871278613281,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.31074270214843125,
                    durationTicks: 634,
                    midi: 79,
                    name: "G5",
                    ticks: 206869,
                    time: 101.04773771777343,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.2644372373046906,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 206869,
                    time: 101.04773771777343,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.26362900976562287,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 207379,
                    time: 101.29739661523436,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.3153854531250033,
                    durationTicks: 639,
                    midi: 78,
                    name: "F#5",
                    ticks: 207544,
                    time: 101.37867748437499,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2646683544922013,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 207884,
                    time: 101.54618874999998,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.31353675976562556,
                    durationTicks: 631,
                    midi: 74,
                    name: "D5",
                    ticks: 208224,
                    time: 101.71433999999999,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2670204033203021,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 208389,
                    time: 101.79595387207031,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 2.0083961074218735,
                    durationTicks: 4091,
                    midi: 69,
                    name: "A4",
                    ticks: 208900,
                    time: 102.05027888671874,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 208900,
                    time: 102.05027888671874,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 209442,
                    time: 102.31492891210937,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 209950,
                    time: 102.56297727539061,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 210455,
                    time: 102.8095607861328,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2644372373046906,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 210965,
                    time: 103.05858571777343,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.26362900976562287,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 211475,
                    time: 103.30824461523436,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2646683544922013,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 211980,
                    time: 103.55703674999998,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2670204033203021,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 212485,
                    time: 103.80680187207031,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 212996,
                    time: 104.06112688671874,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 213538,
                    time: 104.32577691210936,
                    velocity: 0.4645669291338583
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 214046,
                    time: 104.5738252753906,
                    velocity: 0.4251968503937008
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 214551,
                    time: 104.8204087861328,
                    velocity: 0.3858267716535433
                },
                {
                    duration: 0.23441400878905938,
                    durationTicks: 479,
                    midi: 79,
                    name: "G5",
                    ticks: 215061,
                    time: 105.06943371777342,
                    velocity: 0.4881889763779528
                },
                {
                    duration: 0.2644372373046906,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 215061,
                    time: 105.06943371777342,
                    velocity: 0.3464566929133858
                },
                {
                    duration: 0.23349776953125456,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 215571,
                    time: 105.31909261523435,
                    velocity: 0.4645669291338583
                },
                {
                    duration: 0.26362900976562287,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 215571,
                    time: 105.31909261523435,
                    velocity: 0.30708661417322836
                },
                {
                    duration: 0.24926834765626893,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 216076,
                    time: 105.56788474999998,
                    velocity: 0.4409448818897638
                },
                {
                    duration: 0.2646683544922013,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 216076,
                    time: 105.56788474999998,
                    velocity: 0.2677165354330709
                },
                {
                    duration: 0.5038382304687445,
                    durationTicks: 1022,
                    midi: 76,
                    name: "E5",
                    ticks: 216581,
                    time: 105.8176498720703,
                    velocity: 0.41732283464566927
                },
                {
                    duration: 0.2670204033203021,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 216581,
                    time: 105.8176498720703,
                    velocity: 0.2283464566929134
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 217092,
                    time: 106.07197488671873,
                    velocity: 0.33070866141732286
                },
                {
                    duration: 0.49414358984374473,
                    durationTicks: 1012,
                    midi: 78,
                    name: "F#5",
                    ticks: 217634,
                    time: 106.33662491210936,
                    velocity: 0.3858267716535433
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 217634,
                    time: 106.33662491210936,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 218142,
                    time: 106.5846732753906,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 218647,
                    time: 106.8312567861328,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2644372373046906,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 219157,
                    time: 107.08028171777342,
                    velocity: 0.31496062992125984
                },
                {
                    duration: 0.26362900976562287,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 219667,
                    time: 107.32994061523435,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2646683544922013,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 220172,
                    time: 107.57873274999997,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.2670204033203021,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 220677,
                    time: 107.8284978720703,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 221188,
                    time: 108.08282288671873,
                    velocity: 0.33070866141732286
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 221730,
                    time: 108.34747291210935,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 222238,
                    time: 108.5955212753906,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 69,
                    name: "A4",
                    ticks: 222743,
                    time: 108.8421047861328,
                    velocity: 0.3858267716535433
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 222743,
                    time: 108.8421047861328,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.23441400878905938,
                    durationTicks: 479,
                    midi: 79,
                    name: "G5",
                    ticks: 223253,
                    time: 109.09112971777341,
                    velocity: 0.4094488188976378
                },
                {
                    duration: 0.2644372373046906,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 223253,
                    time: 109.09112971777341,
                    velocity: 0.31496062992125984
                },
                {
                    duration: 0.23349776953125456,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 223763,
                    time: 109.34078861523435,
                    velocity: 0.3858267716535433
                },
                {
                    duration: 0.26362900976562287,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 223763,
                    time: 109.34078861523435,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.24926834765626893,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 224268,
                    time: 109.58958074999997,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2646683544922013,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 224268,
                    time: 109.58958074999997,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.236910446289059,
                    durationTicks: 476,
                    midi: 76,
                    name: "E5",
                    ticks: 224773,
                    time: 109.8393458720703,
                    velocity: 0.3858267716535433
                },
                {
                    duration: 0.2670204033203021,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 224773,
                    time: 109.8393458720703,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 225284,
                    time: 110.09367088671873,
                    velocity: 0.33070866141732286
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 225826,
                    time: 110.35832091210935,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 226334,
                    time: 110.60636927539059,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 226334,
                    time: 110.60636927539059,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 74,
                    name: "D5",
                    ticks: 226839,
                    time: 110.85295278613279,
                    velocity: 0.3858267716535433
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 226839,
                    time: 110.85295278613279,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2644372373046906,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 227349,
                    time: 111.10197771777341,
                    velocity: 0.31496062992125984
                },
                {
                    duration: 0.26362900976562287,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 227859,
                    time: 111.35163661523434,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.23442262500000766,
                    durationTicks: 474,
                    midi: 76,
                    name: "E5",
                    ticks: 228364,
                    time: 111.60042874999996,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2646683544922013,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 228364,
                    time: 111.60042874999996,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.236910446289059,
                    durationTicks: 476,
                    midi: 69,
                    name: "A4",
                    ticks: 228869,
                    time: 111.85019387207029,
                    velocity: 0.3858267716535433
                },
                {
                    duration: 0.2670204033203021,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 228869,
                    time: 111.85019387207029,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 229380,
                    time: 112.10451888671872,
                    velocity: 0.33070866141732286
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 229922,
                    time: 112.36916891210934,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 230430,
                    time: 112.61721727539059,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 230935,
                    time: 112.86380078613278,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 231445,
                    time: 113.1128257177734,
                    velocity: 0.31496062992125984
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 231955,
                    time: 113.36185064941404,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 232460,
                    time: 113.60843416015622,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 232965,
                    time: 113.8550176708984,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.5122101044921834,
                    durationTicks: 1049,
                    midi: 76,
                    name: "E5",
                    ticks: 233476,
                    time: 114.10453088671872,
                    velocity: 0.4251968503937008
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 59,
                    name: "B3",
                    ticks: 233476,
                    time: 114.10453088671872,
                    velocity: 0.33070866141732286
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 234018,
                    time: 114.36918091210934,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.23144670117186195,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 234526,
                    time: 114.6172292753906,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 234526,
                    time: 114.6172292753906,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.7469814013671794,
                    durationTicks: 1524,
                    midi: 79,
                    name: "G5",
                    ticks: 235031,
                    time: 114.86381278613278,
                    velocity: 0.3858267716535433
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 235031,
                    time: 114.86381278613278,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2644372373046906,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 235541,
                    time: 115.1128377177734,
                    velocity: 0.31496062992125984
                },
                {
                    duration: 0.26362900976562287,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 236051,
                    time: 115.36249661523433,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.5016382441406364,
                    durationTicks: 1011,
                    midi: 76,
                    name: "E5",
                    ticks: 236556,
                    time: 115.61128874999996,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2646683544922013,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 236556,
                    time: 115.61128874999996,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.2670204033203021,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 237061,
                    time: 115.86105387207029,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.5122101044921834,
                    durationTicks: 1049,
                    midi: 73,
                    name: "C#5",
                    ticks: 237572,
                    time: 116.11537888671872,
                    velocity: 0.4251968503937008
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 237572,
                    time: 116.11537888671872,
                    velocity: 0.33070866141732286
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 238114,
                    time: 116.38002891210934,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 238622,
                    time: 116.62807727539058,
                    velocity: 0.3937007874015748
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 238622,
                    time: 116.62807727539058,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.7469814013671794,
                    durationTicks: 1524,
                    midi: 76,
                    name: "E5",
                    ticks: 239127,
                    time: 116.87466078613278,
                    velocity: 0.3858267716535433
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 239127,
                    time: 116.87466078613278,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2644372373046906,
                    durationTicks: 540,
                    midi: 57,
                    name: "A3",
                    ticks: 239637,
                    time: 117.1236857177734,
                    velocity: 0.31496062992125984
                },
                {
                    duration: 0.26362900976562287,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 240147,
                    time: 117.37334461523433,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.24926834765626893,
                    durationTicks: 504,
                    midi: 69,
                    name: "A4",
                    ticks: 240652,
                    time: 117.62213674999995,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.2646683544922013,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 240652,
                    time: 117.62213674999995,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.5336235654296786,
                    durationTicks: 1083,
                    midi: 69,
                    name: "A4",
                    ticks: 241157,
                    time: 117.87190187207028,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2670204033203021,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 241157,
                    time: 117.87190187207028,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 241668,
                    time: 118.12622688671871,
                    velocity: 0.33070866141732286
                },
                {
                    duration: 0.49414358984374473,
                    durationTicks: 1012,
                    midi: 78,
                    name: "F#5",
                    ticks: 242210,
                    time: 118.39087691210933,
                    velocity: 0.3858267716535433
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 242210,
                    time: 118.39087691210933,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 242718,
                    time: 118.63892527539058,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 243223,
                    time: 118.88550878613277,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2644372373046906,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 243733,
                    time: 119.1345337177734,
                    velocity: 0.31496062992125984
                },
                {
                    duration: 0.26362900976562287,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 244243,
                    time: 119.38419261523433,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2646683544922013,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 244748,
                    time: 119.63298474999995,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.2670204033203021,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 245253,
                    time: 119.88274987207028,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 245764,
                    time: 120.13707488671871,
                    velocity: 0.33070866141732286
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 246306,
                    time: 120.40172491210933,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 246814,
                    time: 120.64977327539057,
                    velocity: 0.2992125984251969
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 247319,
                    time: 120.89635678613277,
                    velocity: 0.29133858267716534
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 71,
                    name: "B4",
                    ticks: 247829,
                    time: 121.14538171777339,
                    velocity: 0.5511811023622047
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 79,
                    name: "G5",
                    ticks: 247829,
                    time: 121.14538171777339,
                    velocity: 0.6614173228346457
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 247829,
                    time: 121.14538171777339,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 248339,
                    time: 121.39440664941401,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 248339,
                    time: 121.39440664941401,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2612320361328244,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 248339,
                    time: 121.39440664941401,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 67,
                    name: "G4",
                    ticks: 248844,
                    time: 121.6409901601562,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 248844,
                    time: 121.6409901601562,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 248844,
                    time: 121.6409901601562,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.49902643164062965,
                    durationTicks: 1022,
                    midi: 67,
                    name: "G4",
                    ticks: 249349,
                    time: 121.88757367089839,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.513674957031256,
                    durationTicks: 1052,
                    midi: 76,
                    name: "E5",
                    ticks: 249349,
                    time: 121.88757367089839,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 249349,
                    time: 121.88757367089839,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 249860,
                    time: 122.1370868867187,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 249860,
                    time: 122.1370868867187,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.49414358984374473,
                    durationTicks: 1012,
                    midi: 69,
                    name: "A4",
                    ticks: 250402,
                    time: 122.40173691210933,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.49414358984374473,
                    durationTicks: 1012,
                    midi: 78,
                    name: "F#5",
                    ticks: 250402,
                    time: 122.40173691210933,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2626968886718686,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 250402,
                    time: 122.40173691210933,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 250910,
                    time: 122.64978527539058,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 251415,
                    time: 122.89636878613277,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 251925,
                    time: 123.14539371777339,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.2636734570312598,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 251925,
                    time: 123.14539371777339,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 252435,
                    time: 123.39441864941402,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 252940,
                    time: 123.6410021601562,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 253445,
                    time: 123.88758567089839,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 253956,
                    time: 124.1370988867187,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 253956,
                    time: 124.1370988867187,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 254498,
                    time: 124.40174891210933,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 255006,
                    time: 124.64979727539058,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 255511,
                    time: 124.89638078613277,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 71,
                    name: "B4",
                    ticks: 256021,
                    time: 125.14540571777339,
                    velocity: 0.5511811023622047
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 79,
                    name: "G5",
                    ticks: 256021,
                    time: 125.14540571777339,
                    velocity: 0.6614173228346457
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 256021,
                    time: 125.14540571777339,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.2636734570312598,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 256021,
                    time: 125.14540571777339,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 256531,
                    time: 125.39443064941402,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 256531,
                    time: 125.39443064941402,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 256531,
                    time: 125.39443064941402,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 67,
                    name: "G4",
                    ticks: 257036,
                    time: 125.6410141601562,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 257036,
                    time: 125.6410141601562,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 257036,
                    time: 125.6410141601562,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 67,
                    name: "G4",
                    ticks: 257541,
                    time: 125.88759767089839,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 76,
                    name: "E5",
                    ticks: 257541,
                    time: 125.88759767089839,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 257541,
                    time: 125.88759767089839,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 258052,
                    time: 126.1371108867187,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 258052,
                    time: 126.1371108867187,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 258594,
                    time: 126.40176091210932,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 259102,
                    time: 126.64980927539058,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 259102,
                    time: 126.64980927539058,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 259102,
                    time: 126.64980927539058,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 66,
                    name: "F#4",
                    ticks: 259607,
                    time: 126.89639278613276,
                    velocity: 0.5275590551181102
                },
                {
                    duration: 0.24853664746093784,
                    durationTicks: 509,
                    midi: 74,
                    name: "D5",
                    ticks: 259607,
                    time: 126.89639278613276,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 259607,
                    time: 126.89639278613276,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 260117,
                    time: 127.1454177177734,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 260117,
                    time: 127.1454177177734,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 260627,
                    time: 127.39444264941402,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 67,
                    name: "G4",
                    ticks: 261132,
                    time: 127.6410261601562,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2460952265625025,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 261132,
                    time: 127.6410261601562,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 261132,
                    time: 127.6410261601562,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.23242326953125314,
                    durationTicks: 476,
                    midi: 69,
                    name: "A4",
                    ticks: 261637,
                    time: 127.88760967089839,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2622086044921872,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 261637,
                    time: 127.88760967089839,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 262148,
                    time: 128.1371228867187,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 262148,
                    time: 128.1371228867187,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 262690,
                    time: 128.40177291210932,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.26123203613283863,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 263198,
                    time: 128.64982127539056,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 263703,
                    time: 128.89640478613276,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 264213,
                    time: 129.1454297177734,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 264213,
                    time: 129.1454297177734,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.26123203613283863,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 264723,
                    time: 129.394454649414,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 265228,
                    time: 129.6410381601562,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 265733,
                    time: 129.8876216708984,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.5122101044921692,
                    durationTicks: 1049,
                    midi: 76,
                    name: "E5",
                    ticks: 266244,
                    time: 130.1371348867187,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 52,
                    name: "E3",
                    ticks: 266244,
                    time: 130.1371348867187,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 59,
                    name: "B3",
                    ticks: 266244,
                    time: 130.1371348867187,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 266786,
                    time: 130.40178491210932,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 267294,
                    time: 130.64983327539056,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.26123203613283863,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 267294,
                    time: 130.64983327539056,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.7441450898437552,
                    durationTicks: 1524,
                    midi: 79,
                    name: "G5",
                    ticks: 267799,
                    time: 130.89641678613276,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 267799,
                    time: 130.89641678613276,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 52,
                    name: "E3",
                    ticks: 268309,
                    time: 131.1454417177734,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 268309,
                    time: 131.1454417177734,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 268819,
                    time: 131.39446664941403,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.49365530566407756,
                    durationTicks: 1011,
                    midi: 76,
                    name: "E5",
                    ticks: 269324,
                    time: 131.6410501601562,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 269324,
                    time: 131.6410501601562,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 269829,
                    time: 131.8876336708984,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.5122101044921692,
                    durationTicks: 1049,
                    midi: 73,
                    name: "C#5",
                    ticks: 270340,
                    time: 132.1371468867187,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 52,
                    name: "E3",
                    ticks: 270340,
                    time: 132.1371468867187,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 270340,
                    time: 132.1371468867187,
                    velocity: 0.5354330708661418
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 64,
                    name: "E4",
                    ticks: 270882,
                    time: 132.40179691210932,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 271390,
                    time: 132.6498452753906,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 271390,
                    time: 132.6498452753906,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 76,
                    name: "E5",
                    ticks: 271895,
                    time: 132.89642878613276,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 64,
                    name: "E4",
                    ticks: 271895,
                    time: 132.89642878613276,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 52,
                    name: "E3",
                    ticks: 272405,
                    time: 133.1454537177734,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 57,
                    name: "A3",
                    ticks: 272405,
                    time: 133.1454537177734,
                    velocity: 0.5196850393700787
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 272915,
                    time: 133.39447864941403,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 64,
                    name: "E4",
                    ticks: 272915,
                    time: 133.39447864941403,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 273420,
                    time: 133.6410621601562,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 67,
                    name: "G4",
                    ticks: 273420,
                    time: 133.6410621601562,
                    velocity: 0.5039370078740157
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 76,
                    name: "E5",
                    ticks: 273925,
                    time: 133.8876456708984,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 64,
                    name: "E4",
                    ticks: 273925,
                    time: 133.8876456708984,
                    velocity: 0.49606299212598426
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 77,
                    name: "F5",
                    ticks: 274436,
                    time: 134.1371588867187,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.5122101044921692,
                    durationTicks: 1049,
                    midi: 50,
                    name: "D3",
                    ticks: 274436,
                    time: 134.1371588867187,
                    velocity: 0.5669291338582677
                },
                {
                    duration: 0.5122101044921692,
                    durationTicks: 1049,
                    midi: 53,
                    name: "F3",
                    ticks: 274436,
                    time: 134.1371588867187,
                    velocity: 0.5669291338582677
                },
                {
                    duration: 0.5122101044921692,
                    durationTicks: 1049,
                    midi: 58,
                    name: "A#3",
                    ticks: 274436,
                    time: 134.1371588867187,
                    velocity: 0.6456692913385826
                },
                {
                    duration: 0.23291155371094874,
                    durationTicks: 477,
                    midi: 76,
                    name: "E5",
                    ticks: 274978,
                    time: 134.40180891210932,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 275486,
                    time: 134.6498572753906,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 50,
                    name: "D3",
                    ticks: 275486,
                    time: 134.6498572753906,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 53,
                    name: "F3",
                    ticks: 275486,
                    time: 134.6498572753906,
                    velocity: 0.5905511811023622
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 58,
                    name: "A#3",
                    ticks: 275486,
                    time: 134.6498572753906,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 72,
                    name: "C5",
                    ticks: 275991,
                    time: 134.89644078613276,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.24853664746092363,
                    durationTicks: 509,
                    midi: 50,
                    name: "D3",
                    ticks: 276501,
                    time: 135.1454657177734,
                    velocity: 0.5748031496062992
                },
                {
                    duration: 0.24853664746092363,
                    durationTicks: 509,
                    midi: 53,
                    name: "F3",
                    ticks: 276501,
                    time: 135.1454657177734,
                    velocity: 0.5748031496062992
                },
                {
                    duration: 0.24853664746092363,
                    durationTicks: 509,
                    midi: 58,
                    name: "A#3",
                    ticks: 276501,
                    time: 135.1454657177734,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 50,
                    name: "D3",
                    ticks: 277011,
                    time: 135.39449064941402,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 53,
                    name: "F3",
                    ticks: 277011,
                    time: 135.39449064941402,
                    velocity: 0.6141732283464567
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 58,
                    name: "A#3",
                    ticks: 277011,
                    time: 135.39449064941402,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 277516,
                    time: 135.6410741601562,
                    velocity: 0.6614173228346457
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 50,
                    name: "D3",
                    ticks: 277516,
                    time: 135.6410741601562,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 53,
                    name: "F3",
                    ticks: 277516,
                    time: 135.6410741601562,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 58,
                    name: "A#3",
                    ticks: 277516,
                    time: 135.6410741601562,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 70,
                    name: "A#4",
                    ticks: 278021,
                    time: 135.8876576708984,
                    velocity: 0.6771653543307087
                },
                {
                    duration: 0.2622086044922014,
                    durationTicks: 537,
                    midi: 50,
                    name: "D3",
                    ticks: 278021,
                    time: 135.8876576708984,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2622086044922014,
                    durationTicks: 537,
                    midi: 53,
                    name: "F3",
                    ticks: 278021,
                    time: 135.8876576708984,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 58,
                    name: "A#3",
                    ticks: 278021,
                    time: 135.8876576708984,
                    velocity: 0.8110236220472441
                },
                {
                    duration: 0.5122101044921692,
                    durationTicks: 1049,
                    midi: 72,
                    name: "C5",
                    ticks: 278532,
                    time: 136.1371708867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 45,
                    name: "A2",
                    ticks: 278532,
                    time: 136.1371708867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 48,
                    name: "C3",
                    ticks: 278532,
                    time: 136.1371708867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 53,
                    name: "F3",
                    ticks: 278532,
                    time: 136.1371708867187,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 279582,
                    time: 136.64986927539059,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 45,
                    name: "A2",
                    ticks: 280087,
                    time: 136.89645278613276,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 48,
                    name: "C3",
                    ticks: 280087,
                    time: 136.89645278613276,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24853664746095205,
                    durationTicks: 509,
                    midi: 53,
                    name: "F3",
                    ticks: 280087,
                    time: 136.89645278613276,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 76,
                    name: "E5",
                    ticks: 280597,
                    time: 137.1454777177734,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 52,
                    name: "E3",
                    ticks: 280597,
                    time: 137.1454777177734,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 55,
                    name: "G3",
                    ticks: 280597,
                    time: 137.1454777177734,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 60,
                    name: "C4",
                    ticks: 280597,
                    time: 137.1454777177734,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 74,
                    name: "D5",
                    ticks: 281107,
                    time: 137.39450264941402,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 281612,
                    time: 137.6410861601562,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 72,
                    name: "C5",
                    ticks: 282117,
                    time: 137.8876696708984,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 52,
                    name: "E3",
                    ticks: 282117,
                    time: 137.8876696708984,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 55,
                    name: "G3",
                    ticks: 282117,
                    time: 137.8876696708984,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 60,
                    name: "C4",
                    ticks: 282117,
                    time: 137.8876696708984,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 74,
                    name: "D5",
                    ticks: 282628,
                    time: 138.1371828867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 50,
                    name: "D3",
                    ticks: 282628,
                    time: 138.1371828867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 53,
                    name: "F3",
                    ticks: 282628,
                    time: 138.1371828867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 58,
                    name: "A#3",
                    ticks: 282628,
                    time: 138.1371828867187,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.24756007910156086,
                    durationTicks: 507,
                    midi: 72,
                    name: "C5",
                    ticks: 283170,
                    time: 138.40183291210934,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 72,
                    name: "C5",
                    ticks: 283678,
                    time: 138.64988127539058,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 50,
                    name: "D3",
                    ticks: 284183,
                    time: 138.89646478613275,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 53,
                    name: "F3",
                    ticks: 284183,
                    time: 138.89646478613275,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24853664746095205,
                    durationTicks: 509,
                    midi: 58,
                    name: "A#3",
                    ticks: 284183,
                    time: 138.89646478613275,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 72,
                    name: "C5",
                    ticks: 284693,
                    time: 139.1454897177734,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 45,
                    name: "A2",
                    ticks: 284693,
                    time: 139.1454897177734,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 48,
                    name: "C3",
                    ticks: 284693,
                    time: 139.1454897177734,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 53,
                    name: "F3",
                    ticks: 284693,
                    time: 139.1454897177734,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117184774,
                    durationTicks: 474,
                    midi: 69,
                    name: "A4",
                    ticks: 285708,
                    time: 139.64109816015622,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.23242326953126735,
                    durationTicks: 476,
                    midi: 70,
                    name: "A#4",
                    ticks: 286213,
                    time: 139.8876816708984,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 45,
                    name: "A2",
                    ticks: 286213,
                    time: 139.8876816708984,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 48,
                    name: "C3",
                    ticks: 286213,
                    time: 139.8876816708984,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 53,
                    name: "F3",
                    ticks: 286213,
                    time: 139.8876816708984,
                    velocity: 0.7086614173228346
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 72,
                    name: "C5",
                    ticks: 286724,
                    time: 140.1371948867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 45,
                    name: "A2",
                    ticks: 286724,
                    time: 140.1371948867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 48,
                    name: "C3",
                    ticks: 286724,
                    time: 140.1371948867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 53,
                    name: "F3",
                    ticks: 286724,
                    time: 140.1371948867187,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 287774,
                    time: 140.64989327539058,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 45,
                    name: "A2",
                    ticks: 288279,
                    time: 140.89647678613278,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 48,
                    name: "C3",
                    ticks: 288279,
                    time: 140.89647678613278,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24853664746092363,
                    durationTicks: 509,
                    midi: 53,
                    name: "F3",
                    ticks: 288279,
                    time: 140.89647678613278,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 79,
                    name: "G5",
                    ticks: 288789,
                    time: 141.14550171777339,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 52,
                    name: "E3",
                    ticks: 288789,
                    time: 141.14550171777339,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 55,
                    name: "G3",
                    ticks: 288789,
                    time: 141.14550171777339,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 60,
                    name: "C4",
                    ticks: 288789,
                    time: 141.14550171777339,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 77,
                    name: "F5",
                    ticks: 289299,
                    time: 141.39452664941402,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 76,
                    name: "E5",
                    ticks: 289804,
                    time: 141.6411101601562,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 74,
                    name: "D5",
                    ticks: 290309,
                    time: 141.8876936708984,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 52,
                    name: "E3",
                    ticks: 290309,
                    time: 141.8876936708984,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 55,
                    name: "G3",
                    ticks: 290309,
                    time: 141.8876936708984,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 60,
                    name: "C4",
                    ticks: 290309,
                    time: 141.8876936708984,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 74,
                    name: "D5",
                    ticks: 290820,
                    time: 142.1372068867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 50,
                    name: "D3",
                    ticks: 290820,
                    time: 142.1372068867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 53,
                    name: "F3",
                    ticks: 290820,
                    time: 142.1372068867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.7587936152343673,
                    durationTicks: 1554,
                    midi: 58,
                    name: "A#3",
                    ticks: 290820,
                    time: 142.1372068867187,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.23291155371092032,
                    durationTicks: 477,
                    midi: 76,
                    name: "E5",
                    ticks: 291362,
                    time: 142.40185691210934,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 291870,
                    time: 142.64990527539058,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.23388812207033993,
                    durationTicks: 479,
                    midi: 50,
                    name: "D3",
                    ticks: 292375,
                    time: 142.89648878613275,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.23388812207033993,
                    durationTicks: 479,
                    midi: 53,
                    name: "F3",
                    ticks: 292375,
                    time: 142.89648878613275,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24853664746095205,
                    durationTicks: 509,
                    midi: 58,
                    name: "A#3",
                    ticks: 292375,
                    time: 142.89648878613275,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 292885,
                    time: 143.14551371777338,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 45,
                    name: "A2",
                    ticks: 292885,
                    time: 143.14551371777338,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 48,
                    name: "C3",
                    ticks: 292885,
                    time: 143.14551371777338,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.7417036689453198,
                    durationTicks: 1519,
                    midi: 53,
                    name: "F3",
                    ticks: 292885,
                    time: 143.14551371777338,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 79,
                    name: "G5",
                    ticks: 293900,
                    time: 143.64112216015621,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.23242326953126735,
                    durationTicks: 476,
                    midi: 81,
                    name: "A5",
                    ticks: 294405,
                    time: 143.88770567089838,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23242326953126735,
                    durationTicks: 476,
                    midi: 45,
                    name: "A2",
                    ticks: 294405,
                    time: 143.88770567089838,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.23242326953126735,
                    durationTicks: 476,
                    midi: 48,
                    name: "C3",
                    ticks: 294405,
                    time: 143.88770567089838,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24707179492187947,
                    durationTicks: 506,
                    midi: 53,
                    name: "F3",
                    ticks: 294405,
                    time: 143.88770567089838,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.26416174121095537,
                    durationTicks: 541,
                    midi: 82,
                    name: "A#5",
                    ticks: 294916,
                    time: 144.1372188867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 294916,
                    time: 144.1372188867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 53,
                    name: "F3",
                    ticks: 294916,
                    time: 144.1372188867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 58,
                    name: "A#3",
                    ticks: 294916,
                    time: 144.1372188867187,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.23291155371092032,
                    durationTicks: 477,
                    midi: 82,
                    name: "A#5",
                    ticks: 295458,
                    time: 144.40186891210934,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 81,
                    name: "A5",
                    ticks: 295966,
                    time: 144.64991727539058,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 81,
                    name: "A5",
                    ticks: 296471,
                    time: 144.89650078613278,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 79,
                    name: "G5",
                    ticks: 296981,
                    time: 145.14552571777338,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 52,
                    name: "E3",
                    ticks: 296981,
                    time: 145.14552571777338,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 55,
                    name: "G3",
                    ticks: 296981,
                    time: 145.14552571777338,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 60,
                    name: "C4",
                    ticks: 296981,
                    time: 145.14552571777338,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 77,
                    name: "F5",
                    ticks: 297996,
                    time: 145.6411341601562,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 52,
                    name: "E3",
                    ticks: 297996,
                    time: 145.6411341601562,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 55,
                    name: "G3",
                    ticks: 297996,
                    time: 145.6411341601562,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 60,
                    name: "C4",
                    ticks: 297996,
                    time: 145.6411341601562,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.23242326953126735,
                    durationTicks: 476,
                    midi: 79,
                    name: "G5",
                    ticks: 298501,
                    time: 145.88771767089838,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.26416174121092695,
                    durationTicks: 541,
                    midi: 81,
                    name: "A5",
                    ticks: 299012,
                    time: 146.1372308867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 57,
                    name: "A3",
                    ticks: 299012,
                    time: 146.1372308867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 60,
                    name: "C4",
                    ticks: 299012,
                    time: 146.1372308867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 65,
                    name: "F4",
                    ticks: 299012,
                    time: 146.1372308867187,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.23291155371092032,
                    durationTicks: 477,
                    midi: 81,
                    name: "A5",
                    ticks: 299554,
                    time: 146.40188091210933,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 79,
                    name: "G5",
                    ticks: 300062,
                    time: 146.64992927539058,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 55,
                    name: "G3",
                    ticks: 300062,
                    time: 146.64992927539058,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 60,
                    name: "C4",
                    ticks: 300062,
                    time: 146.64992927539058,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 64,
                    name: "E4",
                    ticks: 300062,
                    time: 146.64992927539058,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.2338881220703115,
                    durationTicks: 479,
                    midi: 79,
                    name: "G5",
                    ticks: 300567,
                    time: 146.89651278613277,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 77,
                    name: "F5",
                    ticks: 301077,
                    time: 147.14553771777338,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 53,
                    name: "F3",
                    ticks: 301077,
                    time: 147.14553771777338,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 58,
                    name: "A#3",
                    ticks: 301077,
                    time: 147.14553771777338,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 62,
                    name: "D4",
                    ticks: 301077,
                    time: 147.14553771777338,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 74,
                    name: "D5",
                    ticks: 302092,
                    time: 147.6411461601562,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 52,
                    name: "E3",
                    ticks: 302092,
                    time: 147.6411461601562,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 55,
                    name: "G3",
                    ticks: 302092,
                    time: 147.6411461601562,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 60,
                    name: "C4",
                    ticks: 302092,
                    time: 147.6411461601562,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.23242326953126735,
                    durationTicks: 476,
                    midi: 72,
                    name: "C5",
                    ticks: 302597,
                    time: 147.88772967089838,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 74,
                    name: "D5",
                    ticks: 303108,
                    time: 148.1372428867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 50,
                    name: "D3",
                    ticks: 303108,
                    time: 148.1372428867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 53,
                    name: "F3",
                    ticks: 303108,
                    time: 148.1372428867187,
                    velocity: 0.6692913385826772
                },
                {
                    duration: 0.5122101044921976,
                    durationTicks: 1049,
                    midi: 58,
                    name: "A#3",
                    ticks: 303108,
                    time: 148.1372428867187,
                    velocity: 0.7795275590551181
                },
                {
                    duration: 0.24756007910156086,
                    durationTicks: 507,
                    midi: 77,
                    name: "F5",
                    ticks: 303650,
                    time: 148.40189291210933,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 77,
                    name: "F5",
                    ticks: 304158,
                    time: 148.64994127539057,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 50,
                    name: "D3",
                    ticks: 304158,
                    time: 148.64994127539057,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 53,
                    name: "F3",
                    ticks: 304158,
                    time: 148.64994127539057,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.4951201582031217,
                    durationTicks: 1014,
                    midi: 58,
                    name: "A#3",
                    ticks: 304158,
                    time: 148.64994127539057,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.49756157910155707,
                    durationTicks: 1019,
                    midi: 76,
                    name: "E5",
                    ticks: 304663,
                    time: 148.89652478613277,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.49512015820315014,
                    durationTicks: 1014,
                    midi: 52,
                    name: "E3",
                    ticks: 305173,
                    time: 149.14554971777338,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.49512015820315014,
                    durationTicks: 1014,
                    midi: 55,
                    name: "G3",
                    ticks: 305173,
                    time: 149.14554971777338,
                    velocity: 0.6535433070866141
                },
                {
                    duration: 0.49512015820315014,
                    durationTicks: 1014,
                    midi: 60,
                    name: "C4",
                    ticks: 305173,
                    time: 149.14554971777338,
                    velocity: 0.7637795275590551
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 76,
                    name: "E5",
                    ticks: 305683,
                    time: 149.394574649414,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 306188,
                    time: 149.6411581601562,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 52,
                    name: "E3",
                    ticks: 306188,
                    time: 149.6411581601562,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 55,
                    name: "G3",
                    ticks: 306188,
                    time: 149.6411581601562,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.49365530566404914,
                    durationTicks: 1011,
                    midi: 60,
                    name: "C4",
                    ticks: 306188,
                    time: 149.6411581601562,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 1.2573317626953155,
                    durationTicks: 2575,
                    midi: 78,
                    name: "F#5",
                    ticks: 306693,
                    time: 149.88774167089838,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 307204,
                    time: 150.1372548867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 307204,
                    time: 150.1372548867187,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 307746,
                    time: 150.40190491210933,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 308254,
                    time: 150.64995327539057,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 308759,
                    time: 150.89653678613277,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 309269,
                    time: 151.14556171777338,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.263673457031274,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 309269,
                    time: 151.14556171777338,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 309779,
                    time: 151.394586649414,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 81,
                    name: "A5",
                    ticks: 310284,
                    time: 151.6411701601562,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 310284,
                    time: 151.6411701601562,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 81,
                    name: "A5",
                    ticks: 310789,
                    time: 151.8877536708984,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 310789,
                    time: 151.8877536708984,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 83,
                    name: "B5",
                    ticks: 311300,
                    time: 152.1372668867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 311300,
                    time: 152.1372668867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.2792985507812773,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 311300,
                    time: 152.1372668867187,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.23291155371092032,
                    durationTicks: 477,
                    midi: 81,
                    name: "A5",
                    ticks: 311842,
                    time: 152.40191691210933,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 311842,
                    time: 152.40191691210933,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 312350,
                    time: 152.64996527539057,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 312350,
                    time: 152.64996527539057,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.49756157910155707,
                    durationTicks: 1019,
                    midi: 74,
                    name: "D5",
                    ticks: 312855,
                    time: 152.89654878613277,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 312855,
                    time: 152.89654878613277,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468522,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 313365,
                    time: 153.1455737177734,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 313365,
                    time: 153.1455737177734,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 67,
                    name: "G4",
                    ticks: 313875,
                    time: 153.394598649414,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 313875,
                    time: 153.394598649414,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 313875,
                    time: 153.394598649414,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 69,
                    name: "A4",
                    ticks: 314380,
                    time: 153.6411821601562,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 314380,
                    time: 153.6411821601562,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 314380,
                    time: 153.6411821601562,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.7617233203125124,
                    durationTicks: 1560,
                    midi: 69,
                    name: "A4",
                    ticks: 314885,
                    time: 153.88776567089837,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.7617233203125124,
                    durationTicks: 1560,
                    midi: 78,
                    name: "F#5",
                    ticks: 314885,
                    time: 153.88776567089837,
                    velocity: 0.7086614173228346
                },
                {
                    duration: 0.2622086044922014,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 314885,
                    time: 153.88776567089837,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 315396,
                    time: 154.13727888671872,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.27929855078122046,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 315396,
                    time: 154.13727888671872,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 315938,
                    time: 154.40192891210933,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 316446,
                    time: 154.64997727539057,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 316951,
                    time: 154.89656078613277,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 317461,
                    time: 155.14558571777337,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.263673457031274,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 317461,
                    time: 155.14558571777337,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 81,
                    name: "A5",
                    ticks: 317971,
                    time: 155.394610649414,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 317971,
                    time: 155.394610649414,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 81,
                    name: "A5",
                    ticks: 318476,
                    time: 155.6411941601562,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 318476,
                    time: 155.6411941601562,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 81,
                    name: "A5",
                    ticks: 318981,
                    time: 155.8877776708984,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 318981,
                    time: 155.8877776708984,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.24951321582034325,
                    durationTicks: 511,
                    midi: 83,
                    name: "B5",
                    ticks: 319492,
                    time: 156.1372908867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 319492,
                    time: 156.1372908867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.2792985507812773,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 319492,
                    time: 156.1372908867187,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.23291155371094874,
                    durationTicks: 477,
                    midi: 81,
                    name: "A5",
                    ticks: 320034,
                    time: 156.40194091210932,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 320034,
                    time: 156.40194091210932,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 320542,
                    time: 156.64998927539057,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 320542,
                    time: 156.64998927539057,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.49756157910155707,
                    durationTicks: 1019,
                    midi: 74,
                    name: "D5",
                    ticks: 321047,
                    time: 156.89657278613277,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 321047,
                    time: 156.89657278613277,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 321557,
                    time: 157.1455977177734,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 321557,
                    time: 157.1455977177734,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.23144670117184774,
                    durationTicks: 474,
                    midi: 67,
                    name: "G4",
                    ticks: 322067,
                    time: 157.39462264941403,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 322067,
                    time: 157.39462264941403,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 322067,
                    time: 157.39462264941403,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 69,
                    name: "A4",
                    ticks: 322572,
                    time: 157.6412061601562,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 322572,
                    time: 157.6412061601562,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 322572,
                    time: 157.6412061601562,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.761723320312484,
                    durationTicks: 1560,
                    midi: 69,
                    name: "A4",
                    ticks: 323077,
                    time: 157.8877896708984,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.761723320312484,
                    durationTicks: 1560,
                    midi: 78,
                    name: "F#5",
                    ticks: 323077,
                    time: 157.8877896708984,
                    velocity: 0.7086614173228346
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 323077,
                    time: 157.8877896708984,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 323588,
                    time: 158.13730288671871,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.27929855078122046,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 323588,
                    time: 158.13730288671871,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 324130,
                    time: 158.40195291210932,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 324638,
                    time: 158.6500012753906,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 325143,
                    time: 158.89658478613276,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468522,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 325653,
                    time: 159.1456097177734,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 325653,
                    time: 159.1456097177734,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 81,
                    name: "A5",
                    ticks: 326163,
                    time: 159.394634649414,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 326163,
                    time: 159.394634649414,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 81,
                    name: "A5",
                    ticks: 326668,
                    time: 159.6412181601562,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 326668,
                    time: 159.6412181601562,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 81,
                    name: "A5",
                    ticks: 327173,
                    time: 159.8878016708984,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 327173,
                    time: 159.8878016708984,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.24951321582034325,
                    durationTicks: 511,
                    midi: 83,
                    name: "B5",
                    ticks: 327684,
                    time: 160.13731488671868,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 327684,
                    time: 160.13731488671868,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.2792985507812773,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 327684,
                    time: 160.13731488671868,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.23291155371094874,
                    durationTicks: 477,
                    midi: 81,
                    name: "A5",
                    ticks: 328226,
                    time: 160.40196491210932,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 328226,
                    time: 160.40196491210932,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 328734,
                    time: 160.65001327539056,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 328734,
                    time: 160.65001327539056,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.49756157910155707,
                    durationTicks: 1019,
                    midi: 74,
                    name: "D5",
                    ticks: 329239,
                    time: 160.89659678613276,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 329239,
                    time: 160.89659678613276,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 329749,
                    time: 161.1456217177734,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 329749,
                    time: 161.1456217177734,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 67,
                    name: "G4",
                    ticks: 330259,
                    time: 161.39464664941403,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 330259,
                    time: 161.39464664941403,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 330259,
                    time: 161.39464664941403,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 69,
                    name: "A4",
                    ticks: 330764,
                    time: 161.6412301601562,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 330764,
                    time: 161.6412301601562,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 330764,
                    time: 161.6412301601562,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.761723320312484,
                    durationTicks: 1560,
                    midi: 69,
                    name: "A4",
                    ticks: 331269,
                    time: 161.8878136708984,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.761723320312484,
                    durationTicks: 1560,
                    midi: 78,
                    name: "F#5",
                    ticks: 331269,
                    time: 161.8878136708984,
                    velocity: 0.7086614173228346
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 331269,
                    time: 161.8878136708984,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 331780,
                    time: 162.1373268867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 331780,
                    time: 162.1373268867187,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 332322,
                    time: 162.40197691210932,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 332830,
                    time: 162.6500252753906,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 333335,
                    time: 162.89660878613276,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 333845,
                    time: 163.1456337177734,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 333845,
                    time: 163.1456337177734,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.26123203613283863,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 334355,
                    time: 163.394658649414,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 81,
                    name: "A5",
                    ticks: 334860,
                    time: 163.6412421601562,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 334860,
                    time: 163.6412421601562,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 81,
                    name: "A5",
                    ticks: 335365,
                    time: 163.8878256708984,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 335365,
                    time: 163.8878256708984,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 83,
                    name: "B5",
                    ticks: 335876,
                    time: 164.1373388867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 335876,
                    time: 164.1373388867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 335876,
                    time: 164.1373388867187,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.23291155371094874,
                    durationTicks: 477,
                    midi: 81,
                    name: "A5",
                    ticks: 336418,
                    time: 164.40198891210932,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 336418,
                    time: 164.40198891210932,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 336926,
                    time: 164.65003727539056,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.26123203613283863,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 336926,
                    time: 164.65003727539056,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.49756157910155707,
                    durationTicks: 1019,
                    midi: 74,
                    name: "D5",
                    ticks: 337431,
                    time: 164.89662078613276,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 337431,
                    time: 164.89662078613276,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 337941,
                    time: 165.1456457177734,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 337941,
                    time: 165.1456457177734,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 67,
                    name: "G4",
                    ticks: 338451,
                    time: 165.39467064941402,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 338451,
                    time: 165.39467064941402,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 338451,
                    time: 165.39467064941402,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 69,
                    name: "A4",
                    ticks: 338956,
                    time: 165.6412541601562,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 338956,
                    time: 165.6412541601562,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 338956,
                    time: 165.6412541601562,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.761723320312484,
                    durationTicks: 1560,
                    midi: 69,
                    name: "A4",
                    ticks: 339461,
                    time: 165.8878376708984,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.761723320312484,
                    durationTicks: 1560,
                    midi: 78,
                    name: "F#5",
                    ticks: 339461,
                    time: 165.8878376708984,
                    velocity: 0.7086614173228346
                },
                {
                    duration: 0.2622086044922014,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 339461,
                    time: 165.8878376708984,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 339972,
                    time: 166.1373508867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 339972,
                    time: 166.1373508867187,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 340514,
                    time: 166.40200091210932,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 341022,
                    time: 166.6500492753906,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.263673457031274,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 341527,
                    time: 166.89663278613276,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 342037,
                    time: 167.1456577177734,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 342037,
                    time: 167.1456577177734,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 81,
                    name: "A5",
                    ticks: 342547,
                    time: 167.39468264941402,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 342547,
                    time: 167.39468264941402,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 81,
                    name: "A5",
                    ticks: 343052,
                    time: 167.6412661601562,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 343052,
                    time: 167.6412661601562,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.23242326953123893,
                    durationTicks: 476,
                    midi: 81,
                    name: "A5",
                    ticks: 343557,
                    time: 167.8878496708984,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 343557,
                    time: 167.8878496708984,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.24951321582031483,
                    durationTicks: 511,
                    midi: 83,
                    name: "B5",
                    ticks: 344068,
                    time: 168.1373628867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 344068,
                    time: 168.1373628867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 344068,
                    time: 168.1373628867187,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.23291155371092032,
                    durationTicks: 477,
                    midi: 81,
                    name: "A5",
                    ticks: 344610,
                    time: 168.40201291210934,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.26269688867185437,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 344610,
                    time: 168.40201291210934,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 78,
                    name: "F#5",
                    ticks: 345118,
                    time: 168.65006127539058,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 345118,
                    time: 168.65006127539058,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.49756157910155707,
                    durationTicks: 1019,
                    midi: 74,
                    name: "D5",
                    ticks: 345623,
                    time: 168.89664478613275,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 345623,
                    time: 168.89664478613275,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 346133,
                    time: 169.1456697177734,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 346133,
                    time: 169.1456697177734,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 67,
                    name: "G4",
                    ticks: 346643,
                    time: 169.39469464941402,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 76,
                    name: "E5",
                    ticks: 346643,
                    time: 169.39469464941402,
                    velocity: 0.7401574803149606
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 346643,
                    time: 169.39469464941402,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 69,
                    name: "A4",
                    ticks: 347148,
                    time: 169.64127816015622,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 347148,
                    time: 169.64127816015622,
                    velocity: 0.7480314960629921
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 347148,
                    time: 169.64127816015622,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.761723320312484,
                    durationTicks: 1560,
                    midi: 69,
                    name: "A4",
                    ticks: 347653,
                    time: 169.8878616708984,
                    velocity: 0.6299212598425197
                },
                {
                    duration: 0.761723320312484,
                    durationTicks: 1560,
                    midi: 78,
                    name: "F#5",
                    ticks: 347653,
                    time: 169.8878616708984,
                    velocity: 0.7086614173228346
                },
                {
                    duration: 0.2622086044922014,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 347653,
                    time: 169.8878616708984,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 348164,
                    time: 170.1373748867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 348164,
                    time: 170.1373748867187,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.2626968886718828,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 348706,
                    time: 170.4020249121093,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 349214,
                    time: 170.65007327539058,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 349719,
                    time: 170.89665678613278,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 350229,
                    time: 171.14568171777339,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 350229,
                    time: 171.14568171777339,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 78,
                    name: "F#5",
                    ticks: 350739,
                    time: 171.39470664941402,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 62,
                    name: "D4",
                    ticks: 350739,
                    time: 171.39470664941402,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2460952265625167,
                    durationTicks: 504,
                    midi: 81,
                    name: "A5",
                    ticks: 351244,
                    time: 171.6412901601562,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 351244,
                    time: 171.6412901601562,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.7617233203125124,
                    durationTicks: 1560,
                    midi: 81,
                    name: "A5",
                    ticks: 351749,
                    time: 171.8878736708984,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.262208604492173,
                    durationTicks: 537,
                    midi: 62,
                    name: "D4",
                    ticks: 351749,
                    time: 171.8878736708984,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 1.0078185468750007,
                    durationTicks: 2064,
                    midi: 50,
                    name: "D3",
                    ticks: 352260,
                    time: 172.1373868867187,
                    velocity: 0.7322834645669292
                },
                {
                    duration: 0.2792985507812489,
                    durationTicks: 572,
                    midi: 57,
                    name: "A3",
                    ticks: 352260,
                    time: 172.1373868867187,
                    velocity: 0.6377952755905512
                },
                {
                    duration: 0.26269688867185437,
                    durationTicks: 538,
                    midi: 62,
                    name: "D4",
                    ticks: 352802,
                    time: 172.40203691210934,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.2612320361328102,
                    durationTicks: 535,
                    midi: 66,
                    name: "F#4",
                    ticks: 353310,
                    time: 172.65008527539058,
                    velocity: 0.6062992125984252
                },
                {
                    duration: 0.263673457031274,
                    durationTicks: 540,
                    midi: 62,
                    name: "D4",
                    ticks: 353815,
                    time: 172.89666878613275,
                    velocity: 0.5984251968503937
                },
                {
                    duration: 0.9892637480468807,
                    durationTicks: 2026,
                    midi: 54,
                    name: "F#3",
                    ticks: 354325,
                    time: 173.14569371777338,
                    velocity: 0.7165354330708661
                },
                {
                    duration: 0.26367345703124556,
                    durationTicks: 540,
                    midi: 59,
                    name: "B3",
                    ticks: 354325,
                    time: 173.14569371777338,
                    velocity: 0.6220472440944882
                },
                {
                    duration: 0.23144670117187616,
                    durationTicks: 474,
                    midi: 79,
                    name: "G5",
                    ticks: 354835,
                    time: 173.39471864941402,
                    velocity: 0.6929133858267716
                },
                {
                    duration: 0.24609522656248828,
                    durationTicks: 504,
                    midi: 78,
                    name: "F#5",
                    ticks: 355340,
                    time: 173.64130216015621,
                    velocity: 0.7007874015748031
                },
                {
                    duration: 0.7617233203125124,
                    durationTicks: 1560,
                    midi: 78,
                    name: "F#5",
                    ticks: 355845,
                    time: 173.88788567089838,
                    velocity: 0.6929133858267716
                }
            ],
            endOfTrackTicks: 357602
        }
    ]
};
