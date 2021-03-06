# masonite

**A Tumblr theme.**  
masonry + infinite-scroll = masonite.  
Clever, huh?

[Up for grabs](http://www.tumblr.com/theme/34822) in Tumblr Theme Garden,  
live at [hellodirty.com](http://hellodirty.com).

## Features and Options

* [jQuery Masonry](http://masonry.desandro.com/)-powered index page layout
  * [infinite scrolling](http://www.infinite-scroll.com) – automatic or user-triggered ("Twitter-style")
  * opt-out to a one-column layout
  * optional centered layout mode
  * defaults to 400 pixel wide posts with optional 500-pixel wide posts on index pages  
    (permalink pages show 500 pixel wide content)
* one- or two-column navigation, left or right of the main content and on top or bottom of the viewport
* fully customizable colors thanks to using `@font-face` for all theme icons
* Vimeo-videos incorporating the "Accents"-color and pretty YouTube-videos
* [FitVids.js](https://github.com/davatron5000/FitVids.js) to make videos always fit in the available width, even when nested in blockquotes or similar
* customizable fonts
  * via Tumblr's own custom fonts functionality
  * or by specifying a web font family (and style(s)) from the [Google Web Fonts API](http://www.google.com/webfonts)
* optional
  * links to "Reblog" and "Like" and tag display on index pages
  * lightbox-view of high resolution images, including a (user-invoked) slideshow
  * hide Tumblr avatar and/or title
  * show latest Likes and/or Tweets
  * show "People I follow"
  * [Disqus](http://disqus.com/) 2012 integration
  * [Google Analytics](http://www.google.com/analytics/) and [Clicky](http://getclicky.com/) integration
  * [Google Code Prettify](http://code.google.com/p/google-code-prettify/) syntax highlighting

### Customization Options

#### Colors

* Background, Brights, Lights, Mids, Darks, Copy, Accents

#### Fonts

* **Body, PostMeta, Quote, Title, Pre** – Override the theme default font by choosing from Tumblr's "Customize" font-stacks.
* **Google Web Font** – Load one or multiple font families from [Google Web Fonts](http://www.google.com/webfonts) using the [Google WebFont Loader](https://developers.google.com/webfonts/docs/webfont_loader).  
The option accepts an array as defined [here](https://developers.google.com/webfonts/docs/webfont_loader#GoogleModule), e. g. `'Fruktur','Open Sans:400,700,400italic,700italic'` would load the "[Fruktur](http://www.google.com/webfonts/specimen/Fruktur)" font family and the normal (400), italic (400italic), bold (700) and bold italic (700italic) versions of "[Open Sans](http://www.google.com/webfonts/specimen/Open+Sans)". To make use of the loaded fonts you can write your own CSS-styles or put the name of the font into one of the five "Google Web Font …" option-fields – e. g. to use "Fruktur" as font for all quotes, put `Fruktur` into the "Google Web Font Quote"-field.

#### Images

* **Avatar** – Upload an image to replace the Tumblr avatar with a custom logo.  
Additionally, you can use _Avatar HiDPI_ to provide a high-resolution version of the _Avatar_-image to display on HiDPI devices (such as iPad 3/4). Please make sure that this image is at least exactly twice as big as the original _Avatar_ image.

#### Options

* **Post Width** – defaults to 400px, can be switched to 500px
* **Header Options**
  * **Header Left, Header Top**  
    activate these to override the header default (right- and bottom-aligned) position
  * Show Avatar
  * Show Title
  * Fading Sidebar
  * Two Column Navigation
* One Column Content
* Centered Content
* Show Album Art on Audio Posts
* Show Copyright
* Show Likes
* Show People I Follow
* Show Post Footer Border
* Show Tags
* Show Tags on Index Page
* Custom trigger Infinite Scroll
* Dog Ear Zoom Icon
* Enable Google Prettify
* Show Twitter

#### Analytics & User Tracking

masonite comes with two analytics options built in, Google Analytics and realtime user tracking with Clicky.

##### Google Analytics

To setup Google Analytics [sign up for an account](http://www.google.com/analytics/) first; once you have your site information added, Google will provide you with both a Google Analytics ID and embed code. Just grab the ID (e. g. `UA-000000-1`) and paste it into _Customize > Appearance > Google Analytics_.

##### Clicky

Alternately (or in addition), you can use Clicky to see in realtime what people are doing on your site. [Sign up for a Clicky account](http://getclicky.com/) and paste your site ID into _Customize > Appearance > Clicky Tracking_.

#### Disqus Comments

To setup comments with your blog, you'll need to [register a Disqus account for your site](http://disqus.com/admin/register/).  After you're done, grab the Disqus Site Shortname you selected and paste it into _Customize > Appearance > Disqus Shortname_.

#### Social Links

Add URLs to display the following social site icons below your site description.  
_Please make sure you add the full URL, including “http://”._

_Dribbble, Facebook, Github, Soundcloud, Twitter, Vimeo, Rdio, Yahoo, Skype, Evernote, Delicious, Behance, XING, LinkedIn, Picasa, YouTube, StumbledUpon, Last.fm, Google+, Forrst, Pinterest, Flickr, deviantART, Instagram, Blogger, Flattr_

## Credits

* originally based on [Off Franklin](http://somerandomdude.com/projects/off-franklin-tumblr-theme/) by [P.J. Onori](http://somerandomdude.com/)
* pretty YouTube- and Vimeo-videos thanks to [Matthew Buchanan’s and Hayden Hunter’s YouTube improvement script](http://matthewbuchanan.name/post/451892574/widescreen-youtube-embeds) plus [Better Vimeo Embeds](http://mattbu.ch/tumblr/vimeo-embeds/) by Matthew Buchanan
* [Modernizr](http://modernizr.com/) v2.6.2
* layout powered by David DeSandro’s [jQuery Masonry](http://masonry.desandro.com/) v2.1.06
* lightbox and slideshow powered by Jack Moore’s [ColorBox](http://jacklmoore.com/colorbox/) v1.3.20.1
* infinite scrolling courtesy of the [Infinite Scroll jQuery plugin](http://www.infinite-scroll.com) v2.0b2.120519
* [FitVids.js](https://github.com/davatron5000/FitVids.js) v1.0
* [jQuery](http://jquery.com/) v1.8.2
* built on HTML5 Boilerplate's CSS (normalize.css + H5BP goodies)
* icon-font generated with [IcoMoon](http://icomoon.io/) by [@Keyamoon](http://twitter.com/keyamoon/), containing icons from
  * [Typicons](http://typicons.com/) – License: [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)
  * [Entypo](http://www.entypo.com/) – License: [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)
  * [IcoMoon - Free](http://keyamoon.com/icomoon/) – License: [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)
  * [Broccolidry](http://dribbble.com/shots/587469-Free-16px-Broccolidryiconsaniconsetitisfullof-icons) – License: [Aribitrary](http://licence.visualidiot.com/) 
  * [Iconic](http://somerandomdude.com/work/iconic/) – License: [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/us/)

## Contributing

Contributions are welcome!  
We use [git-flow](https://github.com/nvie/gitflow) and its branching model: the **master** branch always contains stable, production-ready code while the **develop** branch contains the latest development code.

When editing CSS, please use SASS and Compass if possible.