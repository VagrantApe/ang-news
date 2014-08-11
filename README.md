##Thinkster.io Angular Tutorial

AngularFire 0.8 has come out and there are significant changes to the API that Thinkster hasn't modified in the tutorial.
#Changes I made:

scripts/services/post.js

from

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

scripts/controllers/postview.js

from

        app.controller('PostViewCtrl', function ($scope, $routeParams, Post) {

          $scope.post = Post.find($routeParams.postId);

        });

to

        app.controller('PostViewCtrl', function ($scope, $routeParams, Post) {
          //console.log($scope.posts);
          $scope.post = Post[$routeParams.postId];
        });

I was sick of tabbing past the http:// so I concatenated it on submit to the $scope.post.url on submit. I also thought changing the location seemed wrong so I removed it.

scripts/controllers/posts.js

from
        app.controller('PostsCtrl', function ($scope, $location, Post) {
            $scope.posts = Post.all;

            $scope.post = {url: 'http://'};

            $scope.submitPost = function () {
              Post.create($scope.post).then(function (ref) {
                $location.path('/posts/' + ref.name());
              });
            };

to

        app.controller('PostsCtrl', function($scope, $location, Post) {

          $scope.posts=Post;

          $scope.submitPost = function(){
            $scope.post.url = 'http://'+$scope.post.url;
            Post.$add($scope.post);
            $scope.post = {title:'', url:''};
          };

          $scope.deletePost = function(postId){
            Post.$remove(postId);
          };
        });
