'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',	
        
        function($scope, $location, Authentication) {
            
//                $scope.embed = [
//                'nalYHVvAF5Y',
//                'FrHpVICF264',
//                'fij7liDhDqk'
//                ];
//                
                $scope.embed = [
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/nalYHVvAF5Y" frameborder="0" allowfullscreen></iframe>',
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/FrHpVICF264" frameborder="0" allowfullscreen></iframe>',
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/fij7liDhDqk" frameborder="0" allowfullscreen></iframe>'
                ];
//                
//                $scope.embed = [
//                'https://www.youtube.com/embed/nalYHVvAF5Y',
//                'https://www.youtube.com/embed/FrHpVICF264',
//                'https://www.youtube.com/embed/fij7liDhDqk'
//                ];
                $scope.randomEmbed = $scope.embed[Math.floor(Math.random() * $scope.embed.length)];
                
//              
                
		// This provides Authentication context.
		$scope.authentication = Authentication;
                $scope.user = Authentication.user;
                if($scope.user.userType==='Current')
                    $location.path('/home/current');
                else if($scope.user.userType==='Prospective')
                    $location.path('/home/prospective');
                else if($scope.user.userType==='Alumni')
                    $location.path('/home/alumni');
                else
                    $location.path('http://localhost:3000/#!/');           
                
	}
]);