#pragma strict

var cubeA : GameObject;
var cubeB : GameObject;

var snapA : Transform;
var snapB : Transform;

function Start () {
	
}

function Update () {
	if (Input.GetMouseButtonDown(0)){
			onMouseDown();
	}
}

function onMouseDown(){
	var hit : RaycastHit;
	var dir : Vector3;
	
	if (Physics.Raycast (camera.main.ScreenPointToRay(Input.mousePosition), hit)){
		Debug.Log("Got something");
	}
}