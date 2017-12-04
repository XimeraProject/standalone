import $ from 'jquery';

import {MathJax} from "mathjax3/mathjax3/mathjax.js";
export {MathJax} from "mathjax3/mathjax3/mathjax.js";

import "mathjax3/mathjax3/handlers/html.js";
import {TeX} from "mathjax3/mathjax3/input/tex.js";
import {CHTML} from "mathjax3/mathjax3/output/chtml.js";
import {MathML} from "mathjax3/mathjax3/input/mathml.js";

// handler for HTML documents
import {HTMLHandler} from "mathjax3/mathjax3/handlers/html/HTMLHandler.js";
MathJax.handlers.register(new HTMLHandler());

$(function() {
    // initialize mathjax with with a DOM document
    const html = MathJax.document(window.document, {
	InputJax: new TeX({inlineMath: [['$', '$'], ['\\(', '\\)'] ]}),
	OutputJax: new CHTML()
    });
    
    // process the document
    html.findMath()
	.compile()
	.getMetrics()
	.typeset()
	.updateDocument()
    ;
});
