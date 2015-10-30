describe("crLoading directive", function() {
  var $_compiler;
  var $_scope;
  var element;

  beforeEach(module("cr.loading"));

  beforeEach(inject(["$rootScope", "$compiler",
    function($rootScope, $compiler){
      $_scope = $rootScope.$new();
      $_compiler = $compiler;
      element = $compiler.compile("<div></div>")($_scope);
    }
  ]));

});
