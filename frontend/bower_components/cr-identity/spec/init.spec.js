describe("cr-identity module", function(){

    beforeEach(function(){
        module('cr.identity');
    });

    it('load crIdentity provider', inject(function(crIdentity) {
        expect(crIdentity).toBeDefined();
    }));

});
