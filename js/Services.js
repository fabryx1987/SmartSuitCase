
var Services = {

    async: false,
    retryLimit: 5,
    timeout: 3000,


    /**
    * @method ajaxSync
    * @param  {Object} 
    * @return {Object} 
    */
    ajaxSync: function (param) {

      if (!param) { return; }

      var p = {
        urlService: param.urlService || "/",
        data: (param.data) ? JSON.stringify(param.data) : "{}",
        callback: param.callback
      },

      data = null;

      $.ajax({
        type: "POST",
        url: p.urlService,
        data: p.data,
        timeout: Services.timeout,
        async: Services.async,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        retryLimit: Services.retryLimit,
        retryCount: 0,
        success: function (result) {
          if (Services.async) {
            data = result.d
            p.callback(data);
          }
          else { data = result.d; }
        },
        error: function (e) {
          ++this.retryCount;
          if (this.retryCount < this.retryLimit) {
            $.ajax(this);
          }
          console.log("retry ajax request", this.retryCount);
        }
      });

      if (!Services.async) return data;
    },


    /**
    * @method bodyMethod
    * @param  {Object} 
    * @return {} 
    */
    bodyMethod: function (data, urlService, callback) {

      if (data) {

        var data = data || {};

        return this.ajaxSync.call(null, { urlService: urlService, data: data, callback: callback });
      }

      return this.ajaxSync.call(null, { urlService: urlService });
    },


    /**
    * @method generateMethod
    * @param  {Array}
    * @return {} 
    */
    generateMethod: function (param) {

      if (!param) { return; }

      this.param = param;

      var len = this.param.length, i = 0;

      for (i; i < len; i++) {

        var name = param[i][0], urlService = param[i][1];

        if (name && !(name in this)) {

          this[name] = function (urlService) {

            return function () {

              return this.bodyMethod(arguments[0], urlService, arguments[1]);
            }

          }(urlService);
        }

        else {

          console.warn("il metodo ".concat(name, " è già esistente."));
        }
      }
    }

};

