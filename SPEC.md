# Specification

The HTML format for interactive documents.


## Attributes

The following html attributes influence the behavior of math expressions.  They are inherited by child elements.

`data-bind-x="f"`

After parsing math expressions, the symbol x in the parsed expression will be replaced with f.  f must be the name of a javascript variable that is either a math expression or a constant string/number.  If f is a constant string, it will be parsed into a math expression.

`data-unbind-x`

The symbol x will remain as a symbol.

`data-input="text"`

Strings will be parsed into math-expressions using the specified parser.  Valid options are "text" and "latex".  Default value is "text".

`data-output="latex"`

The "math" class will output the resulting math expression in this format.  Valid options are "text", "latex", and "guppy".  Default value is "latex".

`data-split-symbols`

When parsing math expressions from text, split multiple character symbols into the product of single character symbols.  If true, symbols specified as unsplitSymbols will remain unsplit.  Does not apply to latex parser, which always splits mult-as unsplit symbols can be indicated as "\myvar".  Default value is "true".


## Answer blanks

`<div class="answer" id="F"></div>`

An answer blank.  Response will be assigned the javascript variable F.  The above attributes do not apply to the parsing of the user's response.

`<div class="answer" id="F" data-correct="2x"></div>`

An answer blank with a correct answer of 2x.  Automatically display a "check work" button.

`<div class="answer" id="F" data-bind-x="y" data-correct="2x"></div>`

Since above attributes apply to the parsing of `data-correct` but not to the user's response, the above is an answer blank with a correct answer of 2y.

`<div class="validator" data-validator="F + G = 17">...</div>`

Create a "check work" button which evaluates the validator.  The expression "F + G = 17" can never evaluate as true unless `data-bind-F` and/or `data-bind-G` have been specified, as otherwise, "F + G" will always be parsed as the sum of two literal symbols.

`<div class="feedback" data-condition="expression">...</div>`

Evaluate expression and display the content if true.  Again, any variables in `expression` must be bound with a `data-bind-x` if they are not to be interpreted as literal symbols.

`<div class="problem">...</div>`

A problem.


## Displaying mathematics

`<span class="math">expression</span>`

Parse the string `expression` as determined by `data-input`.  Display the output as determined by `data-output`.  If any symbols in `expression` have been bound to variables, the output will automatically update if those variables change.

`<span class="math" id="F">expression</span>`

In addition to displaying the output, save the result to the javascript variable F.


