'use strict';

app.controller('PostViewCtrl', function ($scope, $routeParams, Post) {
  //console.log($scope.posts);
  $scope.post = Post[$routeParams.postId];
});
