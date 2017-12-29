# Specification

The HTML format for interactive documents.

`<div class="answer" id="F"></div>`

An answer blank

`<div class="answer" id="F" data-correct="2x"></div>`

An answer blank with a correct answer of 2x.

`<div class="validator" data-validator="F + G == 17">...</div>`

Create a "check work" button which evalulates the validator.

`<div class="problem">...</div>`

A problem.

`<div class="feedback" data-condition="expression">...</div>`

Evalulate expression and display the content if true.

