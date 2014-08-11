'use strict';

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
