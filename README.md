dang-jssor
==========
An AngularJS directive for the powerful JSSOR slider plugin, jssor.com

##Why?

__dang-jssor__ was created to make it easy to use the __powerful__ [jssor slider](http://jssor.com) in angular applications.

This component depends on the official jssor distribution, available on both jssor.com and the bower repository, [bower.io](http://bower.io), where it is known as [jssor-slider](https://github.com/jssor/jquery-slider).

##Usage

1.  Add a __slides-container__ class to your jssor slides container.
2.  Add the __enable-jssor__ directive to the container.
3.  Add a __jssor-options__ attribute to the container.  The attribute's value must be a scope variable initialized with an object that represents your slider options.
4.  Add a __jssor-trigger__ attribute to the container.  The value of this attribute must be 'true' or 'false'. A value of 'true' activates the jssor directive.  Otherwise, it remains deactivated.

Example:

    <div class="slides-container" enable-jssor jssor-options="scope-object-variable" jssor-trigger='true'>
        <div u="slides">
            <div> ... </div>
            <!-- Other slides here -->
        </div>
        <!-- Other slider configuration UI definition here -->
    </div>
    
See the demo page hosted [here](http://dang-jssor.apphb.com/index.html).  The source of this demo is available [here](https://github.com/adebisi-fa/dang-jssor/tree/master/demo) in this repository.

##Build

The build system depends on Node.js, and __bower__ npm package.  Install this before running the following commands:

1.  Install grunt and its dependencies
    > npm install

2.  Install bower dependencies
    > bower install

3.  Build
    > grunt

##License

MIT License
