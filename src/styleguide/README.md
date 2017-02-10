# KSS Styleguide with Caxy's Zaba Theme Builder

TODO: How to Generate Styleguide and Viewing the Styleguide sections
likely need revision.

This styleguide setup and builder has the following features:

- Color Swatches
- Pattern Markers


## How to Generate Styleguide

**From within the /src/styleguide folder**

Run `npm install` to get up and running. You can then run the following
to build your styleguide:

`npm run generate-styleguide`

This will compile the styleguide's CSS and create the styleguide pages 
based on comments found in files in the `/src/styles/` folder and the
markup HTML found in the `src/styleguide/pattern-markup/` folder.


## Viewing the Styleguide

While in the src/styleguide/ folder, running `npm start` will start a
local server to aid in review, which is recommended. This will get
around quirks that can crop up with font rendering outside of a server
setting.


## Populating and Editing the Styleguide

KSS uses a slight variation of markdown to populate Handlebars templates
and create your styleguide. This markdown should be included in relevant
CSS files, and provides inline documentation of your CSS as a nice
byproduct. Detailed examples can be found in the
[KSS Node project repo](https://github.com/kss-node/kss-node).

If you find your example markup extends beyond four or five lines, it's
best to move it into a separate HTML file that KSS-node will reference,
rather than kept inside your Sass or CSS file. KSS-node crawls all
folders inside the styles folder, so if it finds any template names
referenced in your CSS they will be included in their correct position.

Also, if you don't want your markdown to appear in your final compiled
CSS (and ideally you shouldn't), remember to use `//` to comment rather
than `/* */` so that the markdown will be omitted.


### Modifying the Styleguide's Homepage

The styleguide's index page is rendered from the markdown file
`homepage.md` in the `src/styleguide/project-assets` folder.


### Using Pattern Markers

Caxy's Zaba theme builder adds two pattern markers, defined with custom
kss values:

- `PatternType` : Pattern Type
- `Status` : Pattern Status (not active by default)

Marker values should be lowercase and are added to your markup in the
following way:

~~~~
// Pattern Name
//
// Pattern description...
//
// PatternType: atom
//
// Status: ready
//
// Styleguide 3.1.1
~~~~


#### Pattern Type

Pattern types follow [Brad Frost's Atomic Design methodology](http://bradfrost.com/blog/post/atomic-web-design/).

Use of this marker is entirely optional. If no `PatternType` value is
found, no marker displays.

To utilize these markers, the following values are available:

- `atom`
- `molecule`
- `organism`
- `template`
- `page`

#### Pattern Status

Because not all styleguide projects will be iterative, pattern status
markers are not active by default. For situations where patterns will
need some kind of indicator of their production-readiness, these status
markers can be activated.

To activate pattern status markers for your project, set
`styleguide_hide_pattern_status` to `false` in the `./project.config.js` file.

This marker has three values available:

- `development` : In Development (default)
- `review` : In Review
- `ready` : Production Ready

Pattern status markers are aggressively applied in an effort to
encourage mindful documentation. If no status is set for a given
pattern, it will automatically display as In Development.


### Using Color Swatches

To populate your project's color swatches, do the following:

#### Step 1: Create Color Sets

Sets of colors should be grouped as follows:

~~~~
$color-set-1 (
  primary: $color-primary,
  secondary: $color-secondary
);
~~~~

These should all then be added to an object named `$color-sets`:

~~~~
$color-sets: (
  "color-set-1": $color-set-1,
  "color-set-2": $color-set-2,
);
~~~~

#### Step 2: Create Swatch Markup

Swatches will be created for the styleguide via a mixin with the
following class naming convention:

`.[color set name]--[variable name]`

So a color in the $color-set-1 set above with the name `primary` will
end up with the class name `.color-set-1--primary`. Your markup would
then look like this:

~~~~
<div class="kss-style">
  <h3 class="kss-title">Color Set 1</h3>
  <ul class="has-swatches kss-style">
    <li class="swatch color-set-1--primary"><span class="dot"></span></li>
    <li class="swatch color-set-1--secondary"><span class="dot"></span></li>
  </ul>
</div>
~~~~

The mixin will add the hex and rgba values to the page for reference for
you at this point.