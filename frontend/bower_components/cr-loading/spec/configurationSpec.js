describe("crLoading default configuration", function(){

  var provider;


  beforeEach(function(){
    module("cr.loading", function(crLoadingProvider){
      provider = crLoadingProvider;
    });
  });

  it("override click span class conf", function(){
    inject(["crLoading", function(crLoading){
      provider.setClickSpinnerClass("override");
      expect(crLoading.getClickSpinnerClass()).toBe("override");
    }]);
  });


  it("return default configuration of spinner class", function(){
    inject(["crLoading", function(crLoading){
      expect(crLoading.getClickSpinnerClass()).toBe("fa fa-spin fa-spinner spin");
    }]);
  });

});
