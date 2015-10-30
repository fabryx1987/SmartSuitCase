(function (root, factory) {

    root.Core = factory();

})(this, function() {

    "use strict";

    var

    /**
    *  Variabili private
    */
    _coef_peso_list     = [],
    _coef_volume_list   = [],
    
    _coef_peso_sic      = [],
    _coif_volume_sic    = [],

    _data_peso          = [],
    _data_volume        = [],

    _max_peso           = 0,
    _max_volume         = 0,
  
    _my_peso            = 0,
    _my_volume          = 0,

    _max_peso_compagnia = 0,

    _valore_percentuale_errore_peso   = 5,
    _valore_percentuale_errore_volume = 5,



    /**
    * @method maxPeso
    * @return {Boolean} calcolo del peso massimo consentito
    */
    _maxPeso = function (peso) {
        return _max_peso_compagnia - peso;
    },


    /**
    * @method _predicatoDiAssociazioneCoefficienteLista
    * @return {Boolean} 
    */
    _predicatoDiAssociazioneCoefficienteLista = function (l, a, b) {
        return l >= a && l <= b;
    },


    /**
    * @method _percentualeErrore
    * @return {Boolean} 
    */
    _percentualeErrore = function(a,b,e) {
        return (((a / b) - 1) * 100) <= e;
    },


    /**
    * @method divisione
    * @return {Number}
    */
    _divisione = function (a, b) {
        return a / b;
    },


    /**
    * @method applicaCoefficiente
    * @return {Number or Array} applica il coefficiente ad una lista di elementi o elementi singoli
    */
    _applicaCoefficiente = function (list, coefficiente) {

        if (!list && !coefficiente) { return; }

        var l = list, c = coefficiente, newList = [];

        if ($.isArray(l))
        {
            for (var i = 0, len = l.length; i < len; i++)
            {
                newList.push.call(newList, _divisione(l[i], c));
            }

            return newList;
        }

        return _divisione(l, c);
    },


    /**
    * @method _associazioneCoefficienteLista
    * @return {Number} associa un coefficente ad una lista di elementi
    */
    _associazioneCoefficienteLista = function (list, coeflist) {

        if (!list && !coeflist) { return; }

        var l = list, c = coeflist, result = 0;
        
        for (var i = 0, len = l.length; i < len; i++)
        {               
            for (var y = 0, len2 = c.length; y < len2; y++)
            {     
                if(_predicatoDiAssociazioneCoefficienteLista(l[i], c[y].from, c[y].to)) 
                {
                    result += _applicaCoefficiente(l[i], c[y].coef);

                    //console.log(i, "peso", l[i], ": e tra ", c[y].from, "e", c[y].to, "- coefficiente assegnato: ", c[y].coef);

                    break;
                }
                else if (y == (len2 -1))
                {
                    result += l[i];

                    //console.log(i, "peso", l[i], " coefficiente non assegnato ----------->>>>>>");
                }
            }
        }        

        return result;
    },


    /**
    * @method Disequazioni
    * @return {Number}
    */
    _disequazione = function (data, coeflist, coefSic) {                

        var l = data, result = 0, list, hasCoefList;

        for (var i = 0, len = l.length; i < len; i++)
        {
            list = l[i].list, hasCoefList = l[i].hasCoefList || false;

            if(hasCoefList)
            {
                result += _associazioneCoefficienteLista(list, coeflist);
            }
            else
            {
                for (var y = 0, len2 = list.length; y < len2; y++)
                {
                    result += list[y];
                }                
            }
        }

        return Math.round(result * coefSic);
    },
    

    /**
    * @method volume
    * @return {Boolean}
    */
    _volume = function () {

        if (_dataValidation.volume()) {

            var dis = _disequazione.call(this, _data_volume, _coef_volume_list, _coif_volume_sic);

            if(dis <= _max_volume) 
            {
                _my_volume += dis;

                return true;
            } 
            else 
            {
                _my_volume += dis;

                return _percentualeErrore(dis, _max_volume, _valore_percentuale_errore_volume);
            }
        }
    },


    /**
    * @method peso
    * @return {Boolean}
    */
    _peso = function () {

        if (_dataValidation.peso()) {

            var dis = _disequazione.call(this, _data_peso, _coef_peso_list, _coef_peso_sic),

            peso = _maxPeso(_max_peso);

            if(dis <= peso) 
            {
                _my_peso += dis;

                return true;
            } 
            else 
            {
                _my_peso += dis;

                return _percentualeErrore(dis, peso, _valore_percentuale_errore_peso);
            }
        }
    },


    /**
    *   @validateData
    *   @return {Boolean}
    */
    _dataValidation = {        

      peso: function () {
          if (!_max_peso_compagnia) { console.warn("_max_peso_compagnia", "not set!"); return false; }
          if (!_coef_peso_list) { console.warn("_coef_peso_list", "not set!"); return false; }
          if (!_coef_peso_sic) { console.warn("_coef_peso_sic", "not set!"); return false; }
          if (!_data_peso) { console.warn("_data_peso", "not set!"); return false; }
          if (!_max_peso) { console.warn("_max_peso", "not set!"); return false; }
          else { return true; }
        },

      volume: function () {
          if (!_coef_volume_list) { console.warn("_coef_volume_list", "not set!"); return false; }
          if (!_coif_volume_sic) { console.warn("_coif_volume_sic", "not set!"); return false; }
          if (!_data_volume) { console.warn("_data_volume", "not set!"); return false; }
          if (!_max_volume) { console.warn("_max_volume", "not set!"); return false; }
          else { return true; }
        }
    },


    /**
    *   @method reset
    *   @return {Boolean}    
    */
    _reset = function () {
        /*_coef_peso_list   = [],
        _coef_volume_list   = [],
        _coef_peso_sic      = [],
        _coif_volume_sic    = [],    
        _data_peso          = [],
        _data_volume        = [],    
        _max_peso_compagnia = 0,
        _max_peso           = 0,
        _max_volume         = 0,*/
        _my_peso            = 0,
        _my_volume          = 0;
        return true;
    },


    /*get and set property*/
    setCoefPesoList = function (val)      { _coef_peso_list = val; return this; },
    setCoefVolumeList = function (val)    { _coef_volume_list = val; return this; },
    setCoefPesoSic = function (val)       { _coef_peso_sic = val;  return this; },
    setCoefVolumeSic = function (val)     { _coif_volume_sic = val;  return this; },
    setDataPeso = function (val)          { _data_peso = val; return this; },
    setDataVolume = function (val)        { _data_volume = val; return this; },
    setMaxPesoCompagnia = function (val)  { _max_peso_compagnia = val; return this; },
    setMaxVolume = function (val)         { _max_volume = val; return this; },
    setErrorePeso = function (val)        { _valore_percentuale_errore_peso = val; return this; },
    setErroreVolume = function (val)      { _valore_percentuale_errore_volume = val; return this; },
    setMaxPeso = function (val)           { _max_peso = val; return this; },
    getMyPeso = function ()               { return _my_peso; },
    getMyVolume = function ()             { return _my_volume; },


    /**
    * @return metodi pubblici
    */
    publicPropertyMap = {
        volume: {
            setCoefList: setCoefVolumeList,
            setCoefSic: setCoefVolumeSic,
            setData: setDataVolume,
            setMax: setMaxVolume,
            setErrore: setErroreVolume,
            get: getMyVolume,
            run: _volume
        },
        peso: {
            setCoefList: setCoefPesoList,
            setCoefSic: setCoefPesoSic,
            setData: setDataPeso,
            setMax: setMaxPeso,
            setMaxCompagnia: setMaxPesoCompagnia,
            setErrore: setErrorePeso,
            get: getMyPeso,
            run: _peso
        },
        reset: _reset
    };

    return publicPropertyMap;

});
