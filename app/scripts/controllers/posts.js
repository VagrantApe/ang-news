'use strict';

app.controller('PostsCtrl', function($scope, $location, Post) {

  $scope.posts=Post;

  $scope.post = {url: 'http://'};

  $scope.submitPost = function(){
    Post.$add($scope.post);
  };

  $scope.deletePost = function(postId){
    Post.$remove(postId);
  };
});
