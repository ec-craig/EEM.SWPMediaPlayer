# EEM Player

An HTML, CSS and JavaScript project aiming to present a visual media player for EEM's SWP media USB sticks.

* TODO: Documentation

## Technologies

Additional functionality is provided by the following technologies:

* Bootstrap 4: CSS and basic JavaScript framework
* Font Awesome: Navigation icons
* JQuery: Required JavaScript library
* Plyr.io: HTML5 media player element
* Popper: Required JavaScript library

## Features

The player provides the following features:

* Configuration file driven.
* Product specific background, brand logo and URI.
* Searchable audio playlist.
* Searchable video playlist.
* Optimised for screen height of 720 or greater (ideally 1024 x 768).
* Auto play on click, but does not autoplay the next item in the track list.

## Source Folder Structure

The main project files can all be found in the "\src" sub folder.  This is the folder that should be duplicated to the root of the USB master stick BEFORE product specific customisations are made.

```text
.
├── assets                                          Contains all the CSS, JavaScript and image files for the base HTML project.
│   ├── custom                                          Custom CSS and JavaScript
│   │   ├── scripts.js                                      Main JavaScript functions.
│   │   ├── scripts.utilities.js                            Utility JavaScript code.
│   │   └── styles.css                                      Main CSS.
│   ├── images                                          Main EC images folder.
│   │   ├── background.jpg                                  Fallback background image if the customer does not provide one.
│   │   ├── brand-logo.png                                  Fallback (transparent) brand logo if the customer does not provide one.
│   │   ├── ec-icon-32x32.png                               EC favicon.
│   │   ├── ec-icon-108x108.png                             EC favicon.
│   │   ├── ec-icon-192x192.png                             EC favicon.
│   │   ├── ec-icon-270x270.png                             EC favicon.
│   │   ├── ec-logo.png                                     EC brand logo.
│   │   ├── ec.ico                                          EC favicon.
│   │   ├── eem-logo.png                                    EEM brand logo.
│   │   └── poster.png                                      Fallback "poster" for the video Plyr.io object if the customer does not provide one.
│   └── vendor                                      Contains all the vendor CSS and JavaScript required to make the base HTML project work.
├── content                                         Contains the main media content on the stick; i.e. what the customer paid for.
│   ├── mp3                                             MP3 audio files, leave the folder empty if video only stick.
│   └── mp4                                             MP4 video files, leave the folder empty if audio only stick.
├── product                                         Contains product specific images and JSON objects.
│   ├── background.jpg                                  A product specific background image, if provided. 3840 x 2160 pixels and web-prepared, must be ".jpg".
│   ├── brand-logo.png                                  A product specific brand logo, if provided. 202 x 85 pixels white on transparent background ONLY, web-prepared, must be .png with transparency.
│   ├── poster.png                                      A product specific "poster" for the video Plyr.io object, if provided. 1920 x 1080 pixels and web prepared. must be .png.
│   ├── product.brand.js                                JSON object representing the product brand information.
│   ├── product.details.js                              JSON object representing the product details.
│   ├── tracklist.audio.js                              JSON object representing the audio tracklist details, leave null if video only stick.
│   └── tracklist.video.js                              JSON object representing the video tracklist details, leave null if audio only stick.
├── autorun.inf                                     Windows autorun.inf file to display the EC logo instead of the regular drive logo and name the stick in File Explorer.
└── player.html                                     The main HTML file to run.
```

## Additional Files

The following additional files are for internal use only.

```text
.
├── docs                                                MkDocs documentation for the project.
├── templates                                           Contains Mp3tag export templates to product the required JSON object files.
│   ├── SWP Audio.mte                                       Audio JSON export file.
│   └── SWP Video.mte                                       Video JSON export file.
```
