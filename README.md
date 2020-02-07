This project was supposed to help easily create chess UI for chess (classical and variants on the browser). I have decided to back away from the project for now.
There are a few things that I don't like about the idea being based on a configuration object. Special conditions such as en passant and castling revealed
just how brittle and confusing the configuration object can be. I kept thinking of a way to generalize those two features such as to allow creative options in 
the future, but then again there is an issue with games such as Bughouse where game rules if incorporated with the current model would make the configuration
options and code unwieldy. The code is currently maintainable as far as the complexity goes, but it needs future patterning, and I can't think of new ways to manage it as it scales.
I might come back to this project in the future. If you are interested in the project go ahead and take it for a spin, and maybe drop me a line and tell me what you think.

Cheers :)