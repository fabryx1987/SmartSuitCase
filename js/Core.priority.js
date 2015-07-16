Core.priority = (function(){

    "use strict";

    var

    /**
    *  Variabili private
    */    
    _data           = [],
    _days_numeber   = 0,


    /**
    * @method _assigned
    * @return {Number} 
    */
    _assigned = function (d,q) {
        return d/q;
    },


    /**
    * @method _assignedAmount
    * @return {Array}
    */
    _assignedPriority = function () {

        if(_dataValidation()) {

            var amount = Core.amount.setData(_data).setDaysNumber(_days_numeber).run();

            for (var i = 0, len = amount.length; i < len; i++)
            {
                amount[i].priority = [];

                for (var y = 1, len2 = amount[i].amount; y <= len2; y++)
                {
                    amount[i].priority.push(Math.round(_assigned(y,len2) * 100) / 100);
                }
            }
        }
    },


    /**
    *   @validateData
    *   @return {Boolean}
    */
    _dataValidation = function() {
        if (!_data) { console.warn("_data", "not set!"); return false; }
        if (!_days_numeber) { console.warn("_days_numeber", "not set!"); return false; }
        else { return true; }
    },


    /*get and set property*/
    setData = function (val) { _data         = val; return this; },
    setDays = function (val) { _days_numeber = val; return this; },


    /**
    * @return metodi pubblici
    */
    publicPropertyMap = {
        setData: setData,
        setDaysNumber: setDays,
        run: _assignedPriority
    };

    return publicPropertyMap;

})();