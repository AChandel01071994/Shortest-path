var app = angular.module('test', []);
app.controller('myCtrl', function($scope) {
	$scope.ButtonAction = "";
	$scope.ButtonActions = ["Start","End", "Go"];


	$scope.Message = "";
	$scope.StartButton ={row: -1, col: -1};
	$scope.EndButton ={row: -1, col: -1};
	$scope.Config ={
		GridWidth: 12,
		GridHeight: 12,
	};
	$scope.Grid= [];
	//$scope.AGrid= [];


	for(var i = 0; i<$scope.Config.GridHeight ; i++){
		var row = [];
		for(var j = 0; j<$scope.Config.GridWidth;j++){
			row.push({row:i, col: j});
		}
		$scope.Grid.push(row);
	}
/*
	for(var i = 0; i<12*12 ; i++){
		var row = [];
		for(var j = 0; j<12*12;j++){
			row.push({row:i, col: j, val: false});
		}
		$scope.AGrid.push(row);
	}
*/

	$scope.ToggleWall = function(cell){
		if($scope.ButtonAction==$scope.ButtonActions[0] && ($scope.EndButton.row !=cell.row || $scope.EndButton.col !=cell.col)){
			$scope.StartButton.row = cell.row;
			$scope.StartButton.col = cell.col;
		}else if($scope.ButtonAction==$scope.ButtonActions[1] && ($scope.StartButton.row !=cell.row || $scope.StartButton.col !=cell.col)){
			$scope.EndButton.row = cell.row;
			$scope.EndButton.col = cell.col;
		}else if ($scope.ButtonAction==$scope.ButtonActions[2] ){
			$scope.Go();
		}
		else{
			cell.Blocked=!cell.Blocked;
		}
		$scope.ButtonAction = "";
		/*var id=12*cell.row+cell.col;
		for(var i=0;i<144;i++){

			$scope.AGrid[id][i].val=false;
			$scope.AGrid[i][id].val=false;

		}
*/
	}


	$scope.Quee = [];

	$scope.Go = function(){
		$scope.Quee = [];
		var start = $scope.Grid[$scope.StartButton.row][$scope.StartButton.col];
		var end = $scope.Grid[$scope.EndButton.row][$scope.EndButton.col];
		var pathExists = false;
		var counter = 0;
		$scope.Quee.push(start);
		while($scope.Quee.length > 0){
			counter ++;
			var current = $scope.Quee.shift();
			if(current.row == $scope.EndButton.row && current.col == $scope.EndButton.col){
				pathExists = true;
				break;

			}
			current.Visited = true;
			//left
			if(current.col > 0){
				var left = $scope.Grid[current.row][current.col-1];
				if(left.row == $scope.EndButton.row && left.col == $scope.EndButton.col){
					pathExists = true;
					break;
				}else if(!left.Blocked && !left.Visited && !$scope.Quee.includes(left)){
					left.parent=current;
					$scope.Quee.push(left);
				}
			}

			//up
			if(current.row > 0){
				var up = $scope.Grid[current.row- 1][current.col];
				if(up.row == $scope.EndButton.row && up.col == $scope.EndButton.col){
					pathExists = true;
					break;
				}else if(!up.Blocked && !up.Visited && !$scope.Quee.includes(up)){
					up.parent=current;
					$scope.Quee.push(up);
				}
			}

			//right
			if(current.col < $scope.Config.GridWidth - 1){
				var right = $scope.Grid[current.row ][current.col + 1];
				if(right.row == $scope.EndButton.row && right.col == $scope.EndButton.col){
					pathExists = true;
					break;
				}else if(!right.Blocked && !right.Visited && !$scope.Quee.includes(right)){
					right.parent=current;
					$scope.Quee.push(right);
				}
			}

			//down
			if(current.row < $scope.Config.GridHeight - 1){
				var down = $scope.Grid[current.row + 1][current.col];
				if(down.row == $scope.EndButton.row && down.col == $scope.EndButton.col){
					pathExists = true;
					break;
				}else if(!down.Blocked && !down.Visited && !$scope.Quee.includes(down)){
					down.parent=current;
					$scope.Quee.push(down);
				}
			}
			//diagupl
			if(current.row > 0 & current.col > 0){
				var down = $scope.Grid[current.row-1][current.col-1];
				if(down.row == $scope.EndButton.row && down.col == $scope.EndButton.col){
					pathExists = true;
					break;
				}else if(!down.Blocked && !down.Visited && !$scope.Quee.includes(down)){
					down.parent=current;
					$scope.Quee.push(down);
				}
			}
			//diagupr
			if(current.row > 0 & current.col < $scope.Config.GridWidth - 1){
				var down = $scope.Grid[current.row - 1][current.col+1];
				if(down.row == $scope.EndButton.row && down.col == $scope.EndButton.col){
					pathExists = true;
					break;
				}else if(!down.Blocked && !down.Visited && !$scope.Quee.includes(down)){
					down.parent=current;
					$scope.Quee.push(down);
				}
			}
			//diagdownl
			if(current.row < $scope.Config.GridHeight - 1 & current.col > 0 ){
				var down = $scope.Grid[current.row + 1][current.col-1];
				if(down.row == $scope.EndButton.row && down.col == $scope.EndButton.col){
					pathExists = true;
					break;
				}else if(!down.Blocked && !down.Visited && !$scope.Quee.includes(down)){
					down.parent=current;
					$scope.Quee.push(down);
				}
			}
			//diagdownr
			if(current.row < $scope.Config.GridHeight - 1 & current.col < $scope.Config.GridWidth - 1){
				var down = $scope.Grid[current.row + 1][current.col+1];
				if(down.row == $scope.EndButton.row && down.col == $scope.EndButton.col){
					pathExists = true;
					break;
				}else if(!down.Blocked && !down.Visited && !$scope.Quee.includes(down)){
					down.parent=current;
					$scope.Quee.push(down);
				}
			} 
		}		

		if(!pathExists){
			$scope.Message = "Path not exists";
		}else{
			$scope.Message = "Path counter is:"+ counter;
		}
		while(current.col!=start.col | current.row!=start.row){
			 $scope.Grid[current.row][current.col].Path=true;
			 $scope.Grid[current.row][current.col].Visited=false;
			
			current=current.parent;
		}
		$scope.Grid[current.row][current.col].Path=true;
			 $scope.Grid[current.row][current.col].Visited=false;
	}
	$scope.Test = "Working";
});