Core.amount = (function(){

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
    _assignedAmount = function () {
        
        if(_dataValidation()) {

            var dataC = $.extend(true, [], _data), day = _days_numeber;

            for (var i = 0, len = dataC.length; i < len; i++)
            {
                dataC[i].amount = Math.round(_assigned(day, dataC[i].coefQ));
            }

            return dataC;
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
        run: _assignedAmount
    };

    return publicPropertyMap;

})();