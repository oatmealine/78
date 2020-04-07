# 78

78 is an esoteric language based on the numbers **7** and **8**. It's really confusing and complicated to use, but supports quite a few features.

For example, the language has:

- (Up to) 2 variables
- Float support
- Simple if conditions
- Outputting both numbers and characters
- Loops

## Why?

¯\\\_(ツ)\_/¯

## Interpreters

Currently the only interpreter I know of is mine, which you can see in this repo as `interpreter.js`! It only has the very basic features of 78 and nothing else. To run it, you have to do:

```bash
node interpreter.js code.78
```

## Syntax

The syntax of the language is really simple. Each character in a program is an instruction, which must be one of the pre-defined instructions. Each instruction in the program is ran in order over and over again until the program is terminated.

### Instructions

- **a** - 7 is added to the current value
- **b** - 8 is subtracted from the current value
- **g** - 10^-x ie added to the current value, the amount of the next g instructions determines the x
- **o** - output the current value multiplied by 2
- **s** - swaps the current variable and the extra variable's values
- **!** - starts and ends a loop. a loop is terminated once the resulting main value at the end of the loop is equal to 0
- **h** - the next instruction is ignored if the current value is over 0
- **j** - the next instruction is ignored if the current value is 0
- **k** - if the next instruction is h or j, it reverses the statement of the instruction (ex. kha would only add 7 if the current value is below 0), else negtates the value
- **f** - terminates the program if the next instruction is u
- **u** - ignored if the next instruction isnt c
- **c** - ignored if the next instruction isnt k
- **y** - outputs the current value's character based on the ascii code
- **r** - sets the current value to 8
 (whitespace) - ignored
 
## Examples

### 14

This program will output the number 14 and then exit:

```78
a o fuck
```

This is because first the main value is added 7 to with `a`, making it 7, then that value is multiplied by two and outputted by `o`, and then the program is terminated with `fuck`.

### Loops

This program will output numbers from 14 to 0:

```78
a !ba g g g g g o! fuck
```

*Note: because of float impercision, this doesn't actually happen on the JS interpreter included in the repo.*

### Simpler loops

This program will output even numbers from 14 to 0:

```78
a !ba o! fuck
```

### Extra variable

This program would output even numbers from 14 to 0 and put spaces inbetween the numbers:

```78
aaaaabababa s a !ba o s y s! fuck
```

What this does is it first sets the main value to the unicode code of a space character, then swaps the extra and main values to make it stored in memory, but not erased: `aaaaabababa s`. And then, when it needs to use the value, it swaps to the extra value, prints it out, then swaps back to the main value: `s y s`.

### Unicode table

This program will output each character in the unicode table:

```78
a !aaaaaaabbbbb y!
```

Since there is no termination condition, the program will run forever.*

*_Until the interpreter reaches the maximum call stack size._

### If conditions

This program will never terminate, even though there is a `fuck` inside it:

```78
a hfuck
```

This happens because `h` doesn't run the next instruction unless the value is under or equal to 0, and the value just happens to be 7, due to the first `a` instruction in the program. Therefore the `h` ignores the `fuck` instruction and the program endlessly loops.

~~also the program says "ah fuck" for some reason but that's a different mystery to solve~~



There are a few more examples in the `examples/` folder of the repo which you can check out. They usually have a comment after the `fuck` instruction saying what it does.
