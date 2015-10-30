angular.module('templates-common', ['layout/header.tpl.html', 'layout/left.tpl.html']);

angular.module("layout/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("layout/header.tpl.html",
    "<div class=\"navbar navbar-default \" role=\"navigation\">\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"navbar-header \">\n" +
    "      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "        <span class=\"sr-only\">ngStartup</span></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a class=\"navbar-brand\" href=\"/\">ngStartup</a>\n" +
    "    </div>\n" +
    "    <div class=\"navbar-collapse collapse navbar-right\">\n" +
    "      <ul class=\" nav navbar-nav\">\n" +
    "        <li ng-class=\"{'active': state.name == 'home'}\"><a  ui-sref=\"home\">Home</a></li>\n" +
    "        <li><a href=\"http://ngstartup.corleycloud.com/documentation/latest.html\">Documentation</a></li>\n" +
    "      </ul>\n" +
    "    </div><!--/.nav-collapse -->\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("layout/left.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("layout/left.tpl.html",
    "<div class=\"left-column\">\n" +
    "  <p>\n" +
    "    <strong>This is  the left column</strong>\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    <small>\n" +
    "    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt vitae erat eget dignissim. Quisque tincidunt, purus in rutrum aliquet, sapien arcu aliquet mi, et iaculis neque arcu eu erat. Pellentesque tincidunt purus tellus, a porta diam tempor a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut sed quam ac odio vestibulum porta ornare non odio. Nam leo tellus, posuere non molestie vitae, tempus a quam. Sed ut consequat orci.\n" +
    "    </small>\n" +
    "  </p>\n" +
    "</div>\n" +
    "");
}]);
