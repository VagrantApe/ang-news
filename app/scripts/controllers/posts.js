'use strict';

app.controller('PostsCtrl', function($scope, $location, Post) {

  $scope.posts=Post;

  $scope.deletePost = function(postId){
    Post.$remove(postId);
  };
});
