var configuration = {
    "tiles": {
        "number of rows": 7,
        "number of columns": 7,
        "width": 75,
        "height": 75,
        "tiles configuration": [
            "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96",
            "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0",
            "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96",
            "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0",
            "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96",
            "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0",
            "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96",
            "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0", "#335b96", "#E0E0E0"
        ]
    },
    "pieces": {
        "pawn white": {
            "team": 1,
            "transform": {
                "matrix": [0.1046349, 0, 0, 0.1046349, 15.8365, 0.83333],
                "rotate": undefined,
                "scale": undefined
            },
            "drawing": `
                <rect x="-50" y="20" width="500" height="650" fill-opacity="0"></rect>
                <path transform="translate(225, 75)" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" stroke="#000000" fill="#ffffff" d="M -163.2096622851282 574.0452144019284 C -182.23511758800083 576.940207322642 -209.56906999149857 558.868616650869 -185.48293754452283 542.4452969616261 C -165.10000376732881 531.7650342200843 -184.65928202843486 503.9535699083702 -163.10497335971888 490.444623269631 C -141.18787590623674 460.523151855065 -117.85434453687483 429.9367427537123 -106.93213808155832 394.0368273197118 C -108.45614077390965 376.83790396889844 -142.52131939716395 348.368149173793 -108.00981819606599 342.78982332930957 C -79.55290500098047 346.09799337224393 -89.96088597510393 303.4937484406725 -80.12545199425276 285.03379445771844 C -74.21128842400128 257.0142020418731 -69.91226849292812 228.52743982445634 -70.97344832870778 199.82881837511692 C -90.79124303139983 199.2754160521141 -111.0146801516467 201.58282879476462 -130.4434776136785 196.87097587461625 C -142.83658158326682 180.60376584767496 -102.44366379758173 172.5042300156394 -95.77849302954968 157.8209380729619 C -81.79362836242731 136.71702724302685 -116.25097387373742 113.39979691741382 -101.50090198850211 88.45240788010274 C -92.07947829433019 50.68732702035819 -48.49398297816097 26.203177421847922 -11.614392927125095 40.036931413418394 C 26.575312010006314 49.94057620622311 54.805459574274494 95.05347932166015 36.654102461757134 132.57898917510903 C 35.2049577847547 139.8185181634966 23.8632168001551 149.2053111958376 27.651108448347486 154.97062812439117 C 44.18737625849906 166.44658103585635 63.33385775507156 176.4476336211959 73.8107378074402 194.16753833022273 C 58.97702345550243 204.92307566934264 34.156184854494995 196.73205475733434 15.648251466106785 201.84123656272564 C -1.189730551565276 216.77648830494795 15.442622855350407 247.3140667241374 16.305111080102336 267.80496774776134 C 21.557832631837755 291.2170701479927 26.195081108428894 314.8355980988971 32.214585645839634 338.0344285100809 C 44.86885044855535 342.9704751185886 70.86035756252232 348.6861644250623 56.6025771985025 369.19128358128944 C 36.2766789621586 385.69214190196425 46.226238361522576 411.97494866772325 57.69349738298837 430.4916302829233 C 71.96589434956974 459.0871566866866 96.46585596051636 480.9318050568405 111.47507821681683 508.8668312801711 C 117.04887599359216 521.7638005120364 97.1233857285327 544.605239595162 121.95679424549763 539.2639128145162 C 148.8789460593576 544.9827536561147 132.7686969714469 582.312451749598 108.57635416831198 573.4926633556547 C 19.438497709507374 576.6313025436011 -69.88243758286768 577.9053740107408 -159.02241317735965 574.4336501621929 L -163.20969850966986 574.0451781773868 L -163.20969850966986 574.0451781773868 L -163.2096622851282 574.0452144019284 z"/>`,
            "initial positions": [
                { "row": 1, "column": 0 }, { "row": 1, "column": 1 }, { "row": 1, "column": 2 },
                { "row": 1, "column": 3 }, { "row": 1, "column": 4 }, { "row": 1, "column": 5 },
                { "row": 1, "column": 6 }, { "row": 1, "column": 7 },
            ],
            "movement": {
                "piece position": {
                    "row": 3,
                    "column": 1
                },
                "endless": false,
                "top reach": 3,
                "empty field": [
                    [0, 0, 0],
                    [0, 2, 0],
                    [0, [2, 3], 0],
                    [0, 1, 0],
                    [0, 0, 0]
                ],
                "enemy field": [
                    [0, 0, 0, 0, 0],
                    [0, [2, 3], 0, [2, 3], 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                "jump": false,
            },
            "offset": {
                "x": 0,
                "y": 0
            },
            "bias": {
                "x": 0.85,
                "y": 0.5
            }
        },
        "pawn black": {
            "team": 2,
            "transform": {
                "matrix": [0.1046349, 0, 0, 0.1046349, 15.8365, 0.83333],
                "rotate": undefined,
                "scale": undefined
            },
            "drawing": `
                <rect x="-50" y="20" width="500" height="650" fill-opacity="0"></rect>
                <path transform="translate(225, 75)" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" stroke="#ffffff" fill="#000000" d="M -163.2096622851282 574.0452144019284 C -182.23511758800083 576.940207322642 -209.56906999149857 558.868616650869 -185.48293754452283 542.4452969616261 C -165.10000376732881 531.7650342200843 -184.65928202843486 503.9535699083702 -163.10497335971888 490.444623269631 C -141.18787590623674 460.523151855065 -117.85434453687483 429.9367427537123 -106.93213808155832 394.0368273197118 C -108.45614077390965 376.83790396889844 -142.52131939716395 348.368149173793 -108.00981819606599 342.78982332930957 C -79.55290500098047 346.09799337224393 -89.96088597510393 303.4937484406725 -80.12545199425276 285.03379445771844 C -74.21128842400128 257.0142020418731 -69.91226849292812 228.52743982445634 -70.97344832870778 199.82881837511692 C -90.79124303139983 199.2754160521141 -111.0146801516467 201.58282879476462 -130.4434776136785 196.87097587461625 C -142.83658158326682 180.60376584767496 -102.44366379758173 172.5042300156394 -95.77849302954968 157.8209380729619 C -81.79362836242731 136.71702724302685 -116.25097387373742 113.39979691741382 -101.50090198850211 88.45240788010274 C -92.07947829433019 50.68732702035819 -48.49398297816097 26.203177421847922 -11.614392927125095 40.036931413418394 C 26.575312010006314 49.94057620622311 54.805459574274494 95.05347932166015 36.654102461757134 132.57898917510903 C 35.2049577847547 139.8185181634966 23.8632168001551 149.2053111958376 27.651108448347486 154.97062812439117 C 44.18737625849906 166.44658103585635 63.33385775507156 176.4476336211959 73.8107378074402 194.16753833022273 C 58.97702345550243 204.92307566934264 34.156184854494995 196.73205475733434 15.648251466106785 201.84123656272564 C -1.189730551565276 216.77648830494795 15.442622855350407 247.3140667241374 16.305111080102336 267.80496774776134 C 21.557832631837755 291.2170701479927 26.195081108428894 314.8355980988971 32.214585645839634 338.0344285100809 C 44.86885044855535 342.9704751185886 70.86035756252232 348.6861644250623 56.6025771985025 369.19128358128944 C 36.2766789621586 385.69214190196425 46.226238361522576 411.97494866772325 57.69349738298837 430.4916302829233 C 71.96589434956974 459.0871566866866 96.46585596051636 480.9318050568405 111.47507821681683 508.8668312801711 C 117.04887599359216 521.7638005120364 97.1233857285327 544.605239595162 121.95679424549763 539.2639128145162 C 148.8789460593576 544.9827536561147 132.7686969714469 582.312451749598 108.57635416831198 573.4926633556547 C 19.438497709507374 576.6313025436011 -69.88243758286768 577.9053740107408 -159.02241317735965 574.4336501621929 L -163.20969850966986 574.0451781773868 L -163.20969850966986 574.0451781773868 L -163.2096622851282 574.0452144019284 z"/>`,
            "initial positions": [
                { "row": 6, "column": 0 }, { "row": 6, "column": 1 }, { "row": 6, "column": 2 },
                { "row": 6, "column": 3 }, { "row": 6, "column": 4 }, { "row": 6, "column": 5 },
                { "row": 6, "column": 6 }, { "row": 6, "column": 7 },
            ],
            "movement": {
                "piece position": {
                    "row": 1,
                    "column": 1
                },
                "endless": false,
                "top reach": 3,
                "empty field": [
                    [0, 0, 0],
                    [0, 1, 0],
                    [0, [2, 3], 0],
                    [0, 2, 0],
                    [0, 0, 0]
                ],
                "enemy field": [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, [2, 3], 0, [2, 3], 0],
                    [0, 0, 0, 0, 0]
                ],
                "jump": false,
            },
            "offset": {
                "x": 0,
                "y": 0
            },
            "bias": {
                "x": 0.85,
                "y": 0.5
            }
        },
        "kight white": {
            "team": 2,
            "transform": {
                "matrix": undefined,
                "rotate": undefined,
                "scale": [0.85]
            },
            "drawing": 
                `<rect x="10" y="0" width="72" height="80" fill-opacity="0"></rect>
                <path transform="translate(-2, 10)" style="fill-rule:evenodd;stroke:#000000;stroke-width:1px;fill:#ffffff" d="m8.7908 45.793c4.1372-4.653 16.547-37.748 16.547-37.748l-0.517-10.342 12.411 4.1365 6.205-5.6881 4.654 9.825 18.616 6.7226 12.927 22.235 3.103 26.373-1.034 6.722h-49.125l10.342-17.582 3.619-14.996-8.79 3.62-12.411 13.962-3.62-1.034-1.034-3.103-5.171 2.069-6.7222-5.172z"/>
                <path transform="translate(-2, 10)" style="fill:#000000" d="m16.432 39.786c1.205 0 1.807 0.818 1.807 2.453 0 2.152-1.075 3.228-3.227 3.228-0.861 0-1.291-0.689-1.291-2.066 0-2.41 0.904-3.615 2.711-3.615m9.295-15.75c-1.205 0-1.807-0.732-1.807-2.195 0-2.324 1.377-4.217 4.131-5.68 1.205-0.603 2.324-0.904 3.357-0.904 1.807 0 2.797 0.603 2.969 1.808 0 1.979-1.549 3.873-4.648 5.68-1.549 0.861-2.883 1.291-4.002 1.291m1.033-24.271c0.344 1.2049 0.516 2.0226 0.516 2.4529 0 0.2582-0.129 0.9467-0.387 2.0656 1.377 0 3.271-0.6885 5.68-2.0656-2.323-1.2049-4.26-2.0226-5.809-2.4529m-15.363 44.411c0.516 2.065 1.893 3.571 4.131 4.518 0.861 0.344 1.679 0.516 2.453 0.516h0.258c0.172 0 1.119-0.516 2.841-1.549 0.516-0.344 0.946-0.516 1.291-0.516h0.516c0.43 0 0.645 0.258 0.645 0.774l-0.774 2.453c0 0.775 0.602 1.162 1.807 1.162 0.172 0 1.248-1.506 3.228-4.518 3.787-5.853 9.166-10.285 16.137-13.298 0.689-4.647 2.41-8.735 5.164-12.264 0.689-0.947 1.377-1.42 2.066-1.42 0.774 0 1.162 0.559 1.162 1.678 0 0.258-0.775 2.711-2.324 7.359-0.603 1.979-0.904 3.443-0.904 4.389 0 0.258 0.086 0.818 0.258 1.679 0 6.11-2.582 12.522-7.746 19.235-3.442 4.648-5.336 8.349-5.68 11.103h42.603c0.344-3.959 0.516-6.885 0.516-8.779 0-17.729-5.551-31.887-16.654-42.474-3.356-3.098-6.067-4.6472-8.133-4.6472h-7.746c-0.688-0.3443-1.377-2.0656-2.065-5.164-0.517-2.4959-1.162-4.0451-1.937-4.6476-1.033 3.0984-4.217 5.5083-9.553 7.2296-2.84 0.8606-4.82 1.7213-5.939 2.582-0.947 3.0122-3.744 9.1232-8.391 18.332-4.562 9.123-6.972 14.545-7.23 16.267m72.296 26.078h-54.093c0.344-5.939 2.582-11.619 6.713-17.041 3.185-4.304 5.078-6.929 5.681-7.876 1.205-1.893 1.936-4.174 2.194-6.842-5.594 2.41-9.94 5.853-13.039 10.328l-1.807 2.969c-1.291 2.066-2.109 3.228-2.453 3.486-0.516 0.43-1.076 0.646-1.678 0.646-2.668 0-4.476-0.904-5.422-2.711-0.173-0.259-0.259-0.56-0.259-0.904-0.86 0.43-1.721 0.645-2.582 0.645-4.131 0-7.4014-2.582-9.8113-7.746 0.6886-3.787 4.3033-12.522 10.844-26.207 0.689-1.291 1.205-2.324 1.549-3.098 2.582-5.767 3.873-10.113 3.873-13.039 0-0.4307-0.258-2.8406-0.774-7.23h1.033c4.647 0 9.08 1.4631 13.297 4.3894 2.324-4.0451 4.26-6.0677 5.809-6.0677 2.754 1.4631 4.648 3.5287 5.681 6.1968l1.42 4.2603c0.86-0.1721 1.592-0.2582 2.195-0.2582 6.885 0 13.684 4.3894 20.397 13.168 7.832 10.242 11.748 24.271 11.748 42.086 0 4.045-0.172 7.66-0.516 10.845"/>`,
            "initial positions": [
                { "row": 0, "column": 1 }, { "row": 0, "column": 6 }
            ],
            "movement": {
                "piece position": {
                    "row": 2,
                    "column": 2
                },
                "endless": false,
                "top reach": 2,
                "empty field": [
                    [0, 2, 0, 2, 0],
                    [2, 0, 0, 0, 2],
                    [0, 0, 1, 0, 0],
                    [2, 0, 0, 0, 2],
                    [0, 2, 0, 2, 0]
                ],
                "enemy field": [
                    [0, 2, 0, 2, 0],
                    [2, 0, 0, 0, 2],
                    [0, 0, 1, 0, 0],
                    [2, 0, 0, 0, 2],
                    [0, 2, 0, 2, 0]
                ],
                "jump": true,
            },
            "offset": {
                "x": 0,
                "y": 0
            },
            "bias": {
                "x": 0.5,
                "y": 0.5
            }
        },
        "kight black": {
            "team": 2,
            "transform": {
                "matrix": undefined,
                "rotate": undefined,
                "scale": [0.85]
            },
            "drawing": 
                `<rect x="10" y="0" width="72" height="80" fill-opacity="0"></rect>
                <path transform="translate(-2, 10)" style="fill-rule:evenodd;stroke:#000000;stroke-width:1px;fill:#000000" d="m8.7908 45.793c4.1372-4.653 16.547-37.748 16.547-37.748l-0.517-10.342 12.411 4.1365 6.205-5.6881 4.654 9.825 18.616 6.7226 12.927 22.235 3.103 26.373-1.034 6.722h-49.125l10.342-17.582 3.619-14.996-8.79 3.62-12.411 13.962-3.62-1.034-1.034-3.103-5.171 2.069-6.7222-5.172z"/>
                <path transform="translate(-2, 10)" style="fill:#ffffff" d="m16.432 39.786c1.205 0 1.807 0.818 1.807 2.453 0 2.152-1.075 3.228-3.227 3.228-0.861 0-1.291-0.689-1.291-2.066 0-2.41 0.904-3.615 2.711-3.615m9.295-15.75c-1.205 0-1.807-0.732-1.807-2.195 0-2.324 1.377-4.217 4.131-5.68 1.205-0.603 2.324-0.904 3.357-0.904 1.807 0 2.797 0.603 2.969 1.808 0 1.979-1.549 3.873-4.648 5.68-1.549 0.861-2.883 1.291-4.002 1.291m1.033-24.271c0.344 1.2049 0.516 2.0226 0.516 2.4529 0 0.2582-0.129 0.9467-0.387 2.0656 1.377 0 3.271-0.6885 5.68-2.0656-2.323-1.2049-4.26-2.0226-5.809-2.4529m-15.363 44.411c0.516 2.065 1.893 3.571 4.131 4.518 0.861 0.344 1.679 0.516 2.453 0.516h0.258c0.172 0 1.119-0.516 2.841-1.549 0.516-0.344 0.946-0.516 1.291-0.516h0.516c0.43 0 0.645 0.258 0.645 0.774l-0.774 2.453c0 0.775 0.602 1.162 1.807 1.162 0.172 0 1.248-1.506 3.228-4.518 3.787-5.853 9.166-10.285 16.137-13.298 0.689-4.647 2.41-8.735 5.164-12.264 0.689-0.947 1.377-1.42 2.066-1.42 0.774 0 1.162 0.559 1.162 1.678 0 0.258-0.775 2.711-2.324 7.359-0.603 1.979-0.904 3.443-0.904 4.389 0 0.258 0.086 0.818 0.258 1.679 0 6.11-2.582 12.522-7.746 19.235-3.442 4.648-5.336 8.349-5.68 11.103h42.603c0.344-3.959 0.516-6.885 0.516-8.779 0-17.729-5.551-31.887-16.654-42.474-3.356-3.098-6.067-4.6472-8.133-4.6472h-7.746c-0.688-0.3443-1.377-2.0656-2.065-5.164-0.517-2.4959-1.162-4.0451-1.937-4.6476-1.033 3.0984-4.217 5.5083-9.553 7.2296-2.84 0.8606-4.82 1.7213-5.939 2.582-0.947 3.0122-3.744 9.1232-8.391 18.332-4.562 9.123-6.972 14.545-7.23 16.267m72.296 26.078h-54.093c0.344-5.939 2.582-11.619 6.713-17.041 3.185-4.304 5.078-6.929 5.681-7.876 1.205-1.893 1.936-4.174 2.194-6.842-5.594 2.41-9.94 5.853-13.039 10.328l-1.807 2.969c-1.291 2.066-2.109 3.228-2.453 3.486-0.516 0.43-1.076 0.646-1.678 0.646-2.668 0-4.476-0.904-5.422-2.711-0.173-0.259-0.259-0.56-0.259-0.904-0.86 0.43-1.721 0.645-2.582 0.645-4.131 0-7.4014-2.582-9.8113-7.746 0.6886-3.787 4.3033-12.522 10.844-26.207 0.689-1.291 1.205-2.324 1.549-3.098 2.582-5.767 3.873-10.113 3.873-13.039 0-0.4307-0.258-2.8406-0.774-7.23h1.033c4.647 0 9.08 1.4631 13.297 4.3894 2.324-4.0451 4.26-6.0677 5.809-6.0677 2.754 1.4631 4.648 3.5287 5.681 6.1968l1.42 4.2603c0.86-0.1721 1.592-0.2582 2.195-0.2582 6.885 0 13.684 4.3894 20.397 13.168 7.832 10.242 11.748 24.271 11.748 42.086 0 4.045-0.172 7.66-0.516 10.845"/>`,
            "initial positions": [
                { "row": 7, "column": 1 }, { "row": 7, "column": 6 }
            ],
            "movement": {
                "piece position": {
                    "row": 2,
                    "column": 2
                },
                "endless": false,
                "top reach": 2,
                "empty field": [
                    [0, 2, 0, 2, 0],
                    [2, 0, 0, 0, 2],
                    [0, 0, 1, 0, 0],
                    [2, 0, 0, 0, 2],
                    [0, 2, 0, 2, 0]
                ],
                "enemy field": [
                    [0, 2, 0, 2, 0],
                    [2, 0, 0, 0, 2],
                    [0, 0, 1, 0, 0],
                    [2, 0, 0, 0, 2],
                    [0, 2, 0, 2, 0]
                ],
                "jump": true,
            },
            "offset": {
                "x": 0,
                "y": 0
            },
            "bias": {
                "x": 0.5,
                "y": 0.5
            }
        }
    }
}