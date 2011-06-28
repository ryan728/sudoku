/*!
 * jquery.tzineClock.js - Tutorialzine Colorful Clock Plugin
 *
 * Copyright (c) 2009 Martin Angelov
 * http://tutorialzine.com/
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Launch  : December 2009
 * Version : 1.0
 * Released: Monday 28th December, 2009 - 00:00
 */

(function($) {

    // A global array used by the functions of the plug-in:
    var gVars = {};
    var startTime
    var h_last = 0
    var m_last = 0
    var s_last = 0
    var animate_interval

    // Extending the jQuery core:
    $.fn.tzineClock = function(opts) {

        // "this" contains the elements that were selected when calling the plugin: $('elements').tzineClock();
        // If the selector returned more than one element, use the first one:

        var container = this.eq(0);

        if (!container) {
            try {
                console.log("Invalid selector!");
            } catch(e) {
            }

            return false;
        }

        if (!opts) opts = {};

        var defaults = {
            /* Additional options will be added in future versions of the plugin. */
        };

        /* Merging the provided options with the default ones (will be used in future versions of the plugin): */
        $.each(defaults, function(k, v) {
            opts[k] = opts[k] || defaults[k];
        })

        // Calling the setUp function and passing the container,
        // will be available to the setUp function as "this":
        initStartTime()
        setUp.call(container);

        return this;
    }

    function initStartTime() {
        startTime = new Date().getTime()
        startTime -= s_last * 1000
        startTime -= m_last * 1000 * 60
        startTime -= h_last * 1000 * 60 * 60
    }

    var flag = true
    $.fn.timeout = function() {
        if (flag) {
            clearInterval(animate_interval)
        } else {
            initStartTime()
            startAnimation()
        }
        flag = !flag
    }

    function setUp() {
        // The colors of the dials:
        var colors = ['orange','blue','green'];

        var tmp;

        for (var i = 0; i < 3; i++) {
            // Creating a new element and setting the color as a class name:

            tmp = $('<div>').attr('class', colors[i] + ' clock').html(
                    '<div class="display"></div>' +

                            '<div class="front left"></div>' +

                            '<div class="rotate left">' +
                            '<div class="bg left"></div>' +
                            '</div>' +

                            '<div class="rotate right">' +
                            '<div class="bg right"></div>' +
                            '</div>'
            );

            // Appending to the container:
            $(this).append(tmp);

            // Assigning some of the elements as variables for speed:
            tmp.rotateLeft = tmp.find('.rotate.left');
            tmp.rotateRight = tmp.find('.rotate.right');
            tmp.display = tmp.find('.display');

            // Adding the dial as a global variable. Will be available as gVars.colorName
            gVars[colors[i]] = tmp;
        }

        // Setting up a interval, executed every 1000 milliseconds:
        startAnimation()
    }

    function startAnimation() {
        animate_interval = setInterval(function() {

//			var currentTime = new Date();
//			var h = currentTime.getHours();
//			var m = currentTime.getMinutes();
//			var s = currentTime.getSeconds();

            var currentTime = new Date().getTime();
            var s_diff = parseInt((currentTime - startTime) / 1000)
            var m_diff = parseInt(s_diff / 60)
            var h_diff = parseInt(m_diff / 60)
            h_last = h_diff % 24
            m_last = m_diff % 60
            s_last = s_diff % 60

            animation(gVars.green, s_last, 60);
            animation(gVars.blue, m_last, 60);
            animation(gVars.orange, h_last, 24);

        }, 1000);
    }

    function animation(clock, current, total) {
        // Calculating the current angle:
        var angle = (360 / total) * (current + 1);

        var element;

        if (current == 0) {
            // Hiding the right half of the background:
            clock.rotateRight.hide();

            // Resetting the rotation of the left part:
            rotateElement(clock.rotateLeft, 0);
        }

        if (angle <= 180) {
            // The left part is rotated, and the right is currently hidden:
            element = clock.rotateLeft;
        }
        else {
            // The first part of the rotation has completed, so we start rotating the right part:
            clock.rotateRight.show();
            clock.rotateLeft.show();

            rotateElement(clock.rotateLeft, 180);

            element = clock.rotateRight;
            angle = angle - 180;
        }

        rotateElement(element, angle);

        // Setting the text inside of the display element, inserting a leading zero if needed:
        clock.display.html(current < 10 ? '0' + current : current);
    }

    function rotateElement(element, angle) {
        // Rotating the element, depending on the browser:
        var rotate = 'rotate(' + angle + 'deg)';

        if (element.css('MozTransform') != undefined)
            element.css('MozTransform', rotate);

        else if (element.css('WebkitTransform') != undefined)
            element.css('WebkitTransform', rotate);

        // A version for internet explorer using filters, works but is a bit buggy (no surprise here):
        else if (element.css("filter") != undefined) {
            var cos = Math.cos(Math.PI * 2 / 360 * angle);
            var sin = Math.sin(Math.PI * 2 / 360 * angle);

            element.css("filter", "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=-" + sin + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand',FilterType='nearest neighbor')");

            element.css("left", -Math.floor((element.width() - 200) / 2));
            element.css("top", -Math.floor((element.height() - 200) / 2));
        }

    }

})(jQuery)