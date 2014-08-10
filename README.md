##Thinkster.io Angular Tutorial

AngularFire 0.8 has come out and there are significant changes to the API that Thinkster hasn't modified in the tutorial.
#Changes I made:

from

scripts/services/post.js

        app.factory('Post',
          function ($firebase, FIREBASE_URL) {
            var ref = new Firebase(FIREBASE_URL + 'posts');

            var posts = $firebase(ref);
          });
to
        app.factory('Post',
          function($firebase, FIREBASE_URL){
            var ref = new Firebase(FIREBASE_URL + 'posts');

            var posts = $firebase(ref).$asArray();

            /*var Post={
              all: posts,
              create: function(post){
                return posts.$add(post);
              },
              find: function(postId){
                return posts.$keyAt(postId);
              },
              delete: function(postId){
                return posts.$remove(postId);
              }
            };*/
            return posts;
        });
I loaded into an array at beginning but that defeats the purpose of 3 way binding so I will try to change it to an object in the future and use $bindTo.

from

scripts/controllers/postview.js

        app.controller('PostViewCtrl', function ($scope, $routeParams, Post) {

          $scope.post = Post.find($routeParams.postId);

        });

to
        app.controller('PostViewCtrl', function ($scope, $routeParams, Post) {
          //console.log($scope.posts);
          $scope.post = Post[$routeParams.postId];
        });
