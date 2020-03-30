---
layout: post
title: Deobfuscating the "Highlight All Instances of a Word or Phrase in a PDF" script
tags: JavaScript Obfuscation Acrobat try67 
---

> When I saw that the "Highlight All Instances of a Word or Phrase in a PDF" script had a free demo available to download, I immediately went to work and got my hands dirty.

One day, I came across [Gilad Denneboom's awesome blog](https://try67.blogspot.com) about custom Adobe scripts, mainly for Acrobat/Reader. There is quite a lot of scripts ranging from simple "close all files without saving" scripts to more elaborate scripts which handle hundreds of files and extract their content.

When I saw that the [Highlight All Instances of a Word or Phrase in a PDF](https://try67.blogspot.com/2008/11/acrobat-highlight-all-instances-of.html) script had a free demo available to download (it was not the only one), I immediately went to work and got my hands dirty.

This script, as the name suggests, enables you to highlight all instances of a word or a phrase with the ability to add a comment or change the color of the highlight. The free demo is limited to highlight only up to 3 matches.

When I downloaded the script and opened it, I saw heavily obfuscated JavaScript code 😊
<pre data-src="AutoHighlighter-0-DEMO.js"></pre>

To deobfuscate the code, I used [this JavaScript Beautifier](https://beautifier.io/) and I got the following code:
<pre class="line-numbers match-braces" data-src="AutoHighlighter-1-Deobfuscated.js"></pre>

The whole code looks pretty readable, but it needed a little touch-up, the square bracket notation is not that readable, so I will need to change it to the dot notation, and the variable names need to be implemented.

Here is how the code looked after changing the square bracket notation to dot notation:
<pre class="line-numbers match-braces" data-src="AutoHighlighter-2-Dot_notation.js"></pre>

Now, let's implement back the variable names. First, we will implement them in the dialog part. Looking at the code, we can see keywords like "initialize", "cancel", "destroy" and when we google for them, we get the JavaScript for Acrobat API Reference, in which we can see that the parameter passed in these function is "dialog, so let's change that. Then, we go over the code to implement the rest of the variable names (note that the JavaScript API reference states that "Dialog box items are identified by an ItemID, which is a unique 4-character string", so we cannot change them).
<pre class="line-numbers match-braces" data-src="AutoHighlighter-3-Variable_names_dialog.js"></pre>

Okay, so we have the variable names in the dialog part implemented, which also helped us to uncover some variables in the execute part, but not all of them.
<pre class="line-numbers match-braces" data-src="AutoHighlighter-4-Variable_names_execute.js"></pre>

So, let's implement them!
<pre class="line-numbers match-braces" data-src="AutoHighlighter-5-Variable_names_execute_implemented.js"></pre>

And here is the prettified source code:
<pre class="line-numbers match-braces" data-src="AutoHighlighter-6-Prettified.js"></pre>

At this point, it is pretty easy to spot where the protection lies. There are three points where the number of so far highlighted matches is checked. If the count is higher than or equal to 3, the whole loop breaks and no other matches are highlighted.
<pre class="line-numbers match-braces" data-line="16-18, 35-37, 44-46" data-src="AutoHighlighter-7-Protection.js"></pre>

If you would like to support Gilad Denneboom (the creator of this script), you can buy the full version of this script through [his blog post](https://try67.blogspot.com/2008/11/acrobat-highlight-all-instances-of.html).
