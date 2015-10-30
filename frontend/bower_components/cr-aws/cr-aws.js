/**
 * Integration between AngularJs and AWS Js sdk
 */
angular.module('cr.aws', [])
/**
 * Cognito service
 * @see http://aws.amazon.com/cognito/
 * This service helps you to manage integration with CognitoSyncManager library
 */
.service('cognitoSync', ['$q', "crAws", function($q, crAws) {
  var service = this;
  credentialQ = crAws.get();

  /**
   * Create or resume local dataset
   * @param name string
   * @return $q
   */
  service.openOrCreateDataset = function(name) {
    var deferred = $q.defer();
    credentialQ.then(function(){
      var syncManager = new AWS.CognitoSyncManager();

      syncManager.openOrCreateDataset(name, function(err, dataset) {
        if (err) {
          deferred.reject(err);
          return deferred.promise;
        }

        /**
         * This object is a wrapper of dataset.
         * it helps you to work with promise
         */
        var ngDataset = {};

        /**
         * Get value from dataset
         * @param keyName string
         * @return $q
         */
        ngDataset.get = function(keyName) {
          var deferred = $q.defer();
          dataset.get(keyName, function(err, value) {
            if (err) {
              deferred.reject(err);
            }
            deferred.resolve(value);
          });
          return deferred.promise;
        };

        /**
         * Insert value from dataset
         * @param keyName string
         * @parm keyValue string
         * @return $q
         */
        ngDataset.put = function(keyName, keyValue) {
          var deferred = $q.defer();
          dataset.put(keyName, keyValue, function(err, record) {
            if (err) {
              deferred.reject(err);
            }
            deferred.resolve(record);
          });
          return deferred.promise;
        };

        /**
         * remove value from dataset
         * @param keyName string
         * @return $q
         */
        ngDataset.remove = function(keyName) {
          var deferred = $q.defer();
          dataset.remove(keyName, function(err, record) {
            if (err) {
              deferred.reject(err);
            }
            deferred.resolve(record);
          });
          return deferred.promise;
        };

        /**
         * synchrnoize value between local and remote
         * if this calls fail or it has success return a promose, if sync
         * return a different status use your callback to resolve it.
         * {onConflict: func,onDatasetDeleted: func, onDatasetMerged: func}
         * @see http://docs.aws.amazon.com/cognito/devguide/sync/handling-callbacks/
         * @param mismatchCallbacks Object
         * @return mixed
         */
        ngDataset.synchronize = function(mismatchCallbacks) {
          var deferred = $q.defer();

          var result = {
            onSuccess: function(dataset, newRecords) {
              deferred.resolve(dataset, newRecords);
            },
            onFailure: function(err) {
              deferred.reject(err);
            }
          };

          angular.forEach(mismatchCallbacks, function(func, name) {
            result[name] = func;
          }, result);

          dataset.synchronize(result);
          return deferred.promise;
        };

        deferred.resolve(ngDataset);
      });
    });
    return deferred.promise;
  };
  return service;
}])
/**
 * Service to work with S3
 */
.service("S3", ["$q", function($q) {
  var s3 = new AWS.S3();
  var methods = ["abortMultipartUpload", "completeMultipartUpload",
    "copyObject", "createBucket", "createMultipartUpload", "deleteBucket",
    "deleteBucketCors", "deleteBucketLifecycle", "deleteBucketPolicy",
    "deleteBucketReplication", "deleteBucketTagging", "deleteBucketWebsite",
    "deleteObject", "deleteObjects", "getBucketAcl", "getBucketCors",
    "getBucketLifecycle", "getBucketLocation", "getBucketLogging",
    "getBucketNotification", "getBucketNotificationConfiguration",
    "getBucketPolicy", "getBucketReplication", "getBucketRequestPayment",
    "getBucketTagging", "getBucketVersioning", "getBucketWebsite", "getObject",
    "getObjectAcl", "getObjectTorrent", "getSignedUrl", "headBucket",
    "headObject", "listBuckets", "listMultipartUploads", "listObjects",
    "listObjectVersions", "listParts", "noPresignedContentLength",
    "putBucketAcl", "putBucketCors", "putBucketLifecycle",
    "putBucketLogging", "putBucketNotification", "putBucketNotificationConfiguration",
    "putBucketPolicy", "putBucketReplication", "putBucketRequestPayment",
    "putBucketTagging", "putBucketVersioning", "putBucketWebsite",
    "putObject", "putObjectAcl", "restoreObject", "upload", "uploadPart",
    "uploadPartCopy", "waitFor"
  ];

  this.putObject = function(params) {
    var deferred = $q.defer();
    s3.putObject(params, function(err, data) {
      if (err) {
        deferred.reject(err);
      }
      deferred.resolve(data);
    });
    return deferred.promise;
  };
  return this;
}])

/**
 * CrAws Provider
 */
.provider('crAws', function() {
  var creds = {};
	AWS.config.region = 'eu-west-1';
	AWS.config.logger = console;

  /**
   * startup identity session
   */
	this.setConfig = function(config) {
    creds = new AWS.CognitoIdentityCredentials(config);
    AWS.config.update({
      region: 'eu-west-1',
      credentials: creds
    });
	};

	this.$get = ["$q", function($q) {

    return {
      /**
       * Work with current credential
       * @return $q
       */
      get: function() {
        var deferred = $q.defer();
        AWS.config.credentials.get(function() {
          deferred.resolve();
        });
        return deferred.promise;
      },
      /**
       * Update or void credential
       * You can clean session with {} param
       */
      updateCredentials: function(params) {
        if (params === undefined) {
          params = {};
        }
        var deferred = $q.defer();
        creds.params.Logins = params;
        creds.expired = true;
        AWS.config.credentials.refresh(function(err){
          if (err) {
            deferred.reject(err);
          }
          deferred.resolve();
        });
        return deferred.promise;
      }
    };

  }];
});
