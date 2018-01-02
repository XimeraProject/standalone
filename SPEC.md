# Specification

The HTML format for interactive documents.


## Attributes

The following html attributes influence the behavior of answer blanks and math expressions.  They are inherited by child elements.

### Generic attributes

`data-class="Cls"`

The class used to process both user answer blank input and the `data-correct` attribute strings.  The function Cls will be called with the string as input. Exception, if Cls is "MathExpression", the parser specified by `data-parser` will be used.  Default value is "MathExpression".


### MathExpression attributes

`data-bind-x="f"`

After parsing math expressions, the symbol x in the parsed expression will be replaced with f.  f must be the name of a javascript variable that is either a math expression or a constant string/number.  If f is a constant string, it will be parsed into a math expression.  Does not apply to parsing of user answer blank input.

`data-unbind-x`

The symbol x will remain as a symbol.  Does not apply to parsing of user answer blank input.

`data-parser="text"`

Strings will be parsed into math-expressions using the specified parser.  Valid options are "text" and "latex".  Default value is "text".

`data-parser-xx="value"`

Pass the parameter `xx="value"` to the parser.

`data-output="latex"`

The "math" class will output the resulting math expression in this format.  Valid options are "text", "latex", and "guppy".  Default value is "latex".


## Answer blanks

### Answer blank attributes

`id = "F"`

The user response, after passing to `data-class`, will be assigned to the javascript variable F.

`data-correct="2x"`

The canonical correct answer for the answer blank.  Will be used to validate the user response unless overridden by a validator.  If used to validate, the `data-correct` string will be passed to `data-class` and the user response string will be passed to `data-class`.  The response will be considered correct if those two results are equal.

`data-validator = "Javascript expression"`

If present, will override the standard comparison between the user input string and the `data-correct` value.  The validator is evaluated by the following sequence.  
1. If `id` is defined, the result of applying `data-class` to the user input string will be assigned to the Javascript variable defined by the `id`.
2. `Javascript expression` will be evaluated.
3. If the result from step 2 is a Javascript function, that function will be called with one or two arguments.  The first argument will be the result of applying `data-class` to the user input string.  If `data-correct` is specified, the second argument will be the result of applying `data-class` to the value of `data-correct`.
4. If the result from step 2 or 3 is a boolean or a number between 0 and 1, then the response will be evaluated as correct, incorrect, or partially correct as given by the number. If the result is a Promise, then wait for the Promise to be resolved and apply step 4 to the resolved promise.  Return an error for any other result of the validator. 

### Answer blank examples

`<div class="answer" id="F"></div>`

An answer blank.  Response, after passing to `data-class`, will be assigned to the javascript variable F.  

`<div class="answer" id="F" data-correct="2x"></div>`

An answer blank with a correct answer of 2x.  Automatically display a "check work" button, unless enclosed in a validator.

`<div class="answer" id="F" data-correct="2" data-class="Number"></div>`

Answer blank with a correct answer of `Number("2")`.  User response string `resp` will be correct if `Number(resp) == Number("2")`.

`<div class="answer" id="F" data-correct="2" data-class="Number" data-validator="F % 2 == 0"></div>`

Answer blank where correct answer is any even number and `2` is simply the canonical answer.

`<div class="answer" id="F" data-bind-x="y" data-correct="2x"></div>`

Since above attributes apply to the parsing of `data-correct` but not to the user's response, the above is an answer blank with a correct answer of 2y.

## Validators

A validator can enclose a number of answer blanks.  The enclosed answer blanks do not have individual check work buttons, but instead there will be a single "check work" button which evaluates the validator.  Any `data-validator` or `data-correct` attributes of the answer blanks are not used in validation.  The validator must contain a `data-validator` attribute which functions using the same algorithm as a `data-validator` in an answer blank, with two differences: (A) step 1 is applied to all enclosed answer blanks, and (B) in step 3, if the result is a function, it is passed the results of all enclosed answer blanks, in the order they appear.

The following examples illustrate how a validator might be used.

`<div class="validator" data-validator="F.add(G).equals(17)"><div class="answer" id=F" data-correct="8"></div><div class="answer" id=G" data-correct="9"></div></div>`

Any combinations of math expressions that sum to 17 would be correct.

`<div class="validator" data-validator="F + G == 17"><div class="answer" id=F" data-correct="8" data-class="Number"></div><div class="answer" id=G" data-correct="9" data-class="Number"></div></div>`

Any two numbers that sum to 17 would be correct.

## Displaying feedback

After each check work button, a feedback section would be automatically created to give feedback on the correctness of the responses.  In addition, one can explicitly create feedback sections that display when certain conditions are met.

`<div class="feedback" data-condition="Javascript expression">...</div>`

Evaluate Javascript expression and display the content if true.  This condition would need to be reevaluated when any check work button is triggered.


## Organization tags

`<div class="problem">...</div>`

A problem.


## Displaying mathematics

`<span class="math">expression</span>`

Parse the string `expression` as determined by `data-parser`.  Display the output as determined by `data-output`.  If any symbols in `expression` have been bound to variables, the output will automatically update if those variables change.
