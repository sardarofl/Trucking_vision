(function ($) {
  var methods = {
    /*initialize the bars*/
    init: function (options) {
      /*default settings for a bar. these will be used when nothing is specifiend on bar initialization*/
      var settings = $.extend({
        'position': 'bottom', //'top', 'bottom'
        'background_color': '#044A99',//any hex  value
        'content': 'none',//none or an array of objects containing the data for the custom bar. See 'Display Custom Content' tab on http://scriptosaur.com//widgets/jRollingNews
        'feed': 'http://rss.nytimes.com/services/xml/rss/nyt/Europe.xml',// any RSS feed url. If content parameter is not set to 'none', this will  be ignored.
        'scroll_speed': 70, //the scrolling speed of the bar. Higher is faster
        'text_color': '#ffffff',//ant hex value
        'opacity': 80,//0-100; transparency of the bar. Inherited by the popups opened from the bar also. 0 means background is totally  transparent, 100 means is opaque.
        'line_height': 10,//the height of your bar
        'pop_links_color': '#042344',// what color will the links from feeds popup will have? any hex value
        'open_popup_links_in_new_page': 'true', //'true', 'false', 'default'; changes the target of the links from feeds popups
        'font_family': 'default', //'default', css standard font-family name; the font from bar and popup will inherit this
        'number_of_retreived_feeds': '20',// how many feeds will be displayed in the bar from the specified source?
        'popup_title_color': '#ffffff',//what color the popup title shall have?
        'minimize_at_start': 'false',//'true' or 'false'; true will minimize the bar after installation
        'loop_for': 0,//loop for a fixed number of times. After loop, after_loops effect will be triggered
        'after_loops': 'hide',//'minimize', 'stop', 'hide'; triggered after the bar looped for loop_for number of times
        'padding_bottom': 'true',//'true','false'; add padding to the bottom of your page equal with the bar height. This will allow your whole page  content to be visible
        'padding_top': 'false',//'true','false'; add padding to the top of your page equal with the bar height. This will allow your whole page  content to be visible
        'remove_last_separator': 'false',//'true','false'; true removes the last bullet from the bar. Usefull when you only have only one item in your bar.
        'bars_z_index': 3,//set the layer in which the bars will be displayed. Useful when you have other layered items in your page.
        'popup_min_width': 150,// the minimum width for your popups.
        'popup_max_width': 800,// the maximum width for your popups
        'scroll_rss_content': 'false',//when set to true, the content of the rss feed will also be scrolled in the bar, immidiately after the title
        'hide_title_for_scrolled_content': 'false',//taken into account only when scroll_rss_content is set to true; if this is set to true, hide title scrolling in bar
        'refresh_news_timer': 15//refresh the news in bar every X minutes. 0 never refreshes; only applies for RSS, not content
      }, options);

      return this.each(function () {
        var content = settings.content;
        var active_el = $(this);
        if ((settings.refresh_news_timer != 0) && (content == 'none')) {
          var refreshRSS = setInterval(function () {
            active_el.find(".bar_double_size").stop().fadeOut(800, function () {
              active_el.children().removeData().remove().end().removeData();
              init();
            })
          }, settings.refresh_news_timer * 60000);
        }
        active_el.data('timer', refreshRSS);
        init();
        function init() {
          if (content == 'none') {/*if no content is specified, it means we have a feed. Read feed and retrieve the feed entries into arrays.*/
            var api = "https://query.yahooapis.com/v1/public/yql?q=select * from rss(0, "+settings.number_of_retreived_feeds+") where url='"+settings.feed+"'";
            $.getJSON(api, {
              format: "json"
            })
              .done(function (data) {
                if (!data || !data.query.count) {
                  // there was an error
                  return false;
                }

                var content_from_feeds = new Array();
                var title_from_feeds = new Array();
                var feed_date = new Array();
                var feed_link = new Array();
                for (var i = 0; i < data.query.results.item.length; i++) {
                  var entry = data.query.results.item[i];
                  title_from_feeds[i] = entry.title;
                  feed_link[i] = entry.link;

                  if (settings.number_of_retreived_feeds == 'false') {
                    content_from_feeds[i] = entry.description;
                  } else {
                    content_from_feeds[i] = "";
                    if(entry.description) {
                      content_from_feeds[i] = entry.description.replace(/<[^>]*>/g, "");//when we scroll the rss content in the bar, we strip the html, as it breaks the layout
                    }
                  }

                  var temp_date = entry.pubDate.split(" ");
                  feed_date[i] = temp_date[0] + " " + temp_date[1] + " " + temp_date[2] + " " + temp_date[3];
                }
                deploy(active_el, title_from_feeds, content_from_feeds, feed_link, feed_date)
              })


          }
          else {/*it means we have content specified. The arrays will be populated from the objects provided*/
            var title_from_array = new Array();
            var content_from_array = new Array();
            var url_from_array = new Array();
            for (var i = 0; i < content.length; i++) {
              var entry = content[i];
              title_from_array[i] = entry.title;
              content_from_array[i] = entry.content;
              url_from_array[i] = entry.url;
            }
            deploy(active_el, title_from_array, content_from_array, url_from_array)
          }
        }


        /*start building the DOM and event handlers for the bars*/
        function deploy(active_el, title, content, link, date) {
          if (!date)
            var date = "";

          var title_length = title.length;
          var top_container;

          if ($('#text_scroller_top').length <= 0) {
            top_container = $("<div>")
              .attr("id", "text_scroller_top")
              .addClass("text_scroller_top");
            top_container.css({'z-index': settings.bars_z_index});
          }
          else
            top_container = $('#text_scroller_top');

          var toggle_button = $("<div>")
            .addClass("toggle_button_minimize");

          var bottom_container;
          if ($('#text_scroller_bottom').length <= 0) {
            bottom_container = $("<div>")
              .attr("id", "text_scroller_bottom")
              .addClass("text_scroller_bottom")
              .css({'z-index': settings.bars_z_index});
          }
          else
            bottom_container = $('#text_scroller_bottom');

          $('body').append(top_container).append(bottom_container);

          active_el.css({
            /*add the specified settings to the bar*/
            'background-color': 'transparent',
            'float': 'left',
            'width': '100%',
            'overflow': 'hidden',
            'position': 'relative',
            'height': "70px",
            'line-height': "45px",
            'margin-top':'10px',
            'color': settings.text_color,
            'bottom': '0px',
            'clear': 'both'
          });


          if (settings.position == 'top') {
            if (top_container.find(active_el).length == 0) {
              top_container.append(active_el);
            }
          } else {
            if (bottom_container.find(active_el).length == 0) {
              bottom_container.append(active_el);
            }
          }


          active_el
            .attr("added_pad_top", settings.padding_top)
            .attr("added_pad_bottom", settings.padding_bottom);
          if (settings.font_family != 'default')
            active_el.css({'font-family': settings.font_family});

          var bar_double_size = $("<div class='bar_double_size'></div>");

          active_el.append(bar_double_size);
          active_el.append(toggle_button);

          var bar_single_size = $("<div class='bar_single_size'></div>");
          bar_single_size.css({
            'filter': "alpha(opacity='" + settings.opacity + "'",
            "opacity": settings.opacity / 100,
            'background-color': settings.background_color
          });
          active_el.append(bar_single_size);

          var bar_items_container = $("<div class='bar_items_container'></div>");
          bar_double_size.append(bar_items_container);
          var content_item = "";
          var temp_width = 0;
          for (var x = 0; x < title_length; x++) {/*start adding the items to the bar*/
            var contentAddedToBar = ""; //content placeholder
            var titleAddedToBar = title[x];
            if (settings.scroll_rss_content == "true") {
              contentAddedToBar = content[x];
              if (settings.hide_title_for_scrolled_content == 'true') {
                titleAddedToBar = "";
              }
            }
            var titleContentSeparator = "           ";
            if ((settings.scroll_rss_content == "true") && (settings.hide_title_for_scrolled_content != 'true')) {
              titleContentSeparator = " <span class='title_separator'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ";
            }
            // content_item=$("<div class='content_item'>" + titleAddedToBar + titleContentSeparator + contentAddedToBar +"</div>");
            content_item = $("<div>")
              .addClass("content_item")
              .append(titleAddedToBar + titleContentSeparator + contentAddedToBar);

            var content_separator = $("<div class='content_separator'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>");
            if (content) {
              var title_with_link = "";
              if (content && content[x])
                content_item.attr("content", content[x]);
              else
                content_item.attr("content", "");
              if (title && title[x]) {
                content_item.attr("pop_title", title[x]);
                title_with_link = title[x];
              }
              else
                content_item.attr("pop_title", "");
              if (date && date[x])
                content_item.attr("pop_date", date[x]);
              else
                content_item.attr("pop_date", "");
              if (link && link[x]) {
                content_item.attr("pop_link", link[x]);
                title_with_link = "<a href='" + link[x] + "' target='_new'>" + title[x] + "</a>";
              }
              else
                content_item.attr("pop_link", "");

              content_item.attr("pop_position", settings.position);
              content_item.attr("title_with_link", title_with_link);


            }
            bar_items_container.append($(content_item));
            if (x < (title_length - 1))
              bar_items_container.append($(content_separator));
            else {
              if ((settings.remove_last_separator != 'true'))
                bar_items_container.append($(content_separator));
            }
            content_separator.css('height', settings.line_height + "px")
            temp_width = temp_width + bar_items_container.width() + content_item.width() + $(content_separator).width();
          }


          active_el.on("click", ".content_item", function () {/*build the popup for the current item*/
            if ($("#popup_container").length > 0) {
              $("#popup_container").remove();
            }
            var popup = $("<div id='popup_container'><div class='pop_background'></div><div class='pop_content'><div class='pop_close'></div><div class='pop_title'>" + $(this).attr("title_with_link") + "</div><div class='pop_date'>" + $(this).attr("pop_date") + "</div>" + $(this).attr("content") + "</div></div>");
            popup.css({'z-index': settings.bars_z_index});//inherit the z-index from the bars for the opening popup
            if ($(this).attr("pop_position") == 'bottom')
              popup.css({
                "bottom": $("#text_scroller_bottom").height() + "px",
                'color': settings.text_color
              })
            else
              popup.css({
                "top": $("#text_scroller_top").height() + "px",
                'color': settings.text_color
              })
            popup.attr("popup_opener", active_el.attr("id"))
            if (settings.font_family != 'default')
              popup.css({'font-family': settings.font_family}, {'z-index': settings.bars_z_index});

            $('body').append(popup);
            if (settings.popup_min_width > settings.popup_max_width)
              settings.popup_min_width = settings.popup_max_width;
            if (settings.popup_max_width < settings.popup_min_width)
              settings.popup_max_width = settings.popup_min_width;
            if (popup.width() < settings.popup_min_width)
              popup.width(settings.popup_min_width);

            if (popup.width() > settings.popup_max_width)
              popup.width(settings.popup_max_width);
            popup.find("a").css({'color': settings.pop_links_color})
            $(".pop_background").css({
              'background-color': settings.background_color,
              'filter': "alpha(opacity='" + settings.opacity + "'",
              "opacity": settings.opacity / 100
            });
            $(".pop_content").css({'color': settings.text_color});
            $(".pop_content img").css({
              'margin-left': '10px',
              'margin-right': '10px'
            });
            $(".pop_close").click(function () {
              $("#popup_container").fadeOut(500, function () {
                $("#popup_container").remove()
              });
            });
            $('.pop_title a').css({'color': settings.popup_title_color});

            if (settings.open_popup_links_in_new_page != 'default') {
              if (settings.open_popup_links_in_new_page == 'true')
                popup.find('a').attr("target", "_new");
              else
                popup.find('a').attr("target", "");
            }
            popup.fadeIn(500);
          });


          bar_items_container.css({'color': settings.text_color});

          if (bar_items_container.width() < active_el.width()) {
            bar_items_container.width(active_el.width());
            temp_width = active_el.width();
          }

          bar_double_size.css("width", (2 * temp_width) + "px");

          toggle_button.attr("parent_bar", active_el.attr("id"));
          toggle_button.click(function () {
            if ($("#" + $(this).attr("parent_bar")).width() != $(this).width()) {
              if (active_el.attr("id") == $("#popup_container").attr("popup_opener")) {
                $("#popup_container").fadeOut(500, function () {
                  $("#popup_container").remove()
                });
              }
              $("#" + $(this).attr("parent_bar")).animate({'width': $(this).width() + "px"}, 300, function () {
                toggle_button.removeClass().addClass('toggle_button_maximize');
                toggle_button.fadeIn(300);
                $(this).find('.bar_items_container').trigger("mouseenter");
              })
            }
            else {
              $("#" + $(this).attr("parent_bar")).animate({'width': "100%"}, 300, function () {
                toggle_button.removeClass().addClass('toggle_button_minimize');
                $(this).find('.bar_items_container').trigger("mouseleave");
              })
            }
          })

          active_el
            .mouseenter(function () {
              toggle_button.fadeIn(300);
            }).mouseleave(function () {
            if (active_el.width() != toggle_button.width())
              toggle_button.fadeOut(300);
          });

          var time = (bar_items_container.width() / settings.scroll_speed) * 1000;
          var loops = 0;
          rotateText(bar_items_container);
          var declared_loops = settings.loop_for;

          function rotateText(item_to_rotate, is_on_pause) {

            if (is_on_pause == true)
              return;

            loops++;
            if ((declared_loops != 0) && (loops > declared_loops)) {
              declared_loops = 0;
              if (settings.after_loops == 'stop') {
                return;
              }
              else if (settings.after_loops == 'hide') {
                bar_double_size.parent().stop().animate({'height': '0px'}, 500, function () {/*$(this.remove())*/
                });
              }
              else if (settings.after_loops == 'minimize') {
                toggle_button.trigger("click");
              }
            }

            var clone = item_to_rotate.clone(true);
            item_to_rotate.parent().append(clone);

            var destination = "-" + item_to_rotate.width();

            item_to_rotate.parent()
              .unbind()
              .mouseenter(function () {
                if (item_to_rotate.is(':animated')) {
                  item_to_rotate.stop();
                  return;
                }
              })
              .mouseleave(function () {
                var distance_remaining = item_to_rotate.width() + item_to_rotate.offset().left;
                var new_time = (distance_remaining * time) / item_to_rotate.width()
                item_to_rotate
                  .stop()
                  .animate(
                    {'margin-left': destination},
                    new_time,
                    'linear',
                    // function(){
                    continueAnimation
                    //  }
                  );
              });


            item_to_rotate
              .stop()
              .animate(
                {'margin-left': destination},
                time,
                'linear',
                //   function(){
                continueAnimation
                //   }
              );

            function continueAnimation() {
              item_to_rotate.children().removeData().remove().end().remove();
              bar_double_size.empty().append(clone);
              rotateText(clone);
              delete item_to_rotate;
              item_to_rotate = null;
            }


          }

          if (settings.minimize_at_start == 'true')
            toggle_button.trigger("click");

          if (settings.padding_bottom == 'true') {
            var all_padding_bottom = 0;
            $("#text_scroller_bottom>div").each(function () {
              if ($(this).attr("added_pad_bottom") != 'false')
                all_padding_bottom = all_padding_bottom + $(this).height();
            });
            $('body').css({'padding-bottom': bottom_container.height() + "px"});
          }
          if (settings.padding_top == 'true') {
            var all_padding_top = 0;
            $("#text_scroller_top>div").each(function () {
              if ($(this).attr("added_pad_top") != 'false')
                all_padding_top = all_padding_top + $(this).height();
            });
            $('body').css({'padding-top': all_padding_top + "px"});
          }
          active_el.find(".bar_double_size").stop().fadeIn(1000);


        }
      });
    },
    /*destroy method. invoke this if you want to remove jRollingNews from the initialization element*/
    destroy: function () {
      var all_padding_top = 0;
      var all_padding_bottom = 0;
      $("#text_scroller_top>div").each(function () {
        if ($(this).attr("added_pad_top") != 'false')
          all_padding_top = all_padding_top + $(this).height();
      });
      $("#text_scroller_bottom>div").each(function () {
        if ($(this).attr("added_pad_bottom") != 'false')
          all_padding_bottom = all_padding_bottom + $(this).height();
      });
      if (this.attr("added_pad_top") != 'false') {
        $('body').css({'padding-top': (all_padding_top - $(this).height()) + "px"});
      }
      ;
      if (this.attr("added_pad_bottom") != 'false') {
        $('body').css({'padding-bottom': (all_padding_bottom - $(this).height()) + "px"});
      }
      ;

      clearInterval(this.data('timer'));
      var a = this.empty().removeClass().attr("style", "");

      return a;
    }
  };

  $.fn.jRollingNews = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.jRollingNews');
    }
  };
})(jQuery);
