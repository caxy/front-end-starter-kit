# KSS Styleguide

## Folder Structure

The styleguide needs access to three sets of resources:

* Pattern Markup
* Project Assets
* KSS Builder

### Pattern Markup

KSS-node crawls through this folder to find any markup referenced in a 
project's SCSS files. For example:

~~~~
// Pattern Name
//
// Pattern description...
//
// Markup: <span class="example-span">Example Span</span>
//
// Styleguide 1.2.3
~~~~

In certain circumstances, this markup can become unwieldy to include in
this way. When markup becomes longer than a couple of lines, it's best 
to move it into a separate markup file and reference it like this
instead:

~~~~
// Pattern Name
//
// Pattern description...
//
// Markup: example-span.html
//
// Styleguide 1.2.3
~~~~

As long as the `example-span.html` file is found somewhere in the
`pattern-markup` folder, the KSS builder will pull it in to the compiled
styleguide in the appropriate place.


### Project Assets

While effort has been taken to separate project assets and code from 
assets that are solely concerned with styleguide rendering and population,
there are some minor needs to project assets to be made available to the
styleguide: *Breakpoint definition* and *Color Swatch definition*. 

There may be other use cases that can be considered as needed, and the
following question should be used to asses them:

Would this SCSS/CSS ever exist in the project's Production state?

If the answer is "no," then the SCSS/CSS belongs in this folder.

Use caution, however- the entire point of a living styleguide is to have
an accurate representation of the final production code. To add in
overrides or special-case considerations flies in the face of that goal.


### KSS Builder

Any KSS Node build can be used, but some kind of template is needed for
KSS to populate and create the final styleguide files with.