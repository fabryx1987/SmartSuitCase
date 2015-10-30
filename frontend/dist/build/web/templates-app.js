angular.module('templates-app', ['home/home.tpl.html']);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"well\">\n" +
    "  <h1>{{ 'welcome' | translate }}</h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-lg-12\">\n" +
    "    <p>\n" +
    "      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt vitae erat eget dignissim. Quisque tincidunt, purus in rutrum aliquet, sapien arcu aliquet mi, et iaculis neque arcu eu erat. Pellentesque tincidunt purus tellus, a porta diam tempor a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut sed quam ac odio vestibulum porta ornare non odio. Nam leo tellus, posuere non molestie vitae, tempus a quam. Sed ut consequat orci.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt vitae erat eget dignissim. Quisque tincidunt, purus in rutrum aliquet, sapien arcu aliquet mi, et iaculis neque arcu eu erat. Pellentesque tincidunt purus tellus, a porta diam tempor a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut sed quam ac odio vestibulum porta ornare non odio. Nam leo tellus, posuere non molestie vitae, tempus a quam. Sed ut consequat orci.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt vitae erat eget dignissim. Quisque tincidunt, purus in rutrum aliquet, sapien arcu aliquet mi, et iaculis neque arcu eu erat. Pellentesque tincidunt purus tellus, a porta diam tempor a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut sed quam ac odio vestibulum porta ornare non odio. Nam leo tellus, posuere non molestie vitae, tempus a quam. Sed ut consequat orci.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt vitae erat eget dignissim. Quisque tincidunt, purus in rutrum aliquet, sapien arcu aliquet mi, et iaculis neque arcu eu erat. Pellentesque tincidunt purus tellus, a porta diam tempor a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut sed quam ac odio vestibulum porta ornare non odio. Nam leo tellus, posuere non molestie vitae, tempus a quam. Sed ut consequat orci.\n" +
    "    </p>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
