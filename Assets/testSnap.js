#pragma strict

var cubeA : GameObject;
var cubeB : GameObject;

var snapA : Transform;
var snapB : Transform;

var dist : float;
var newPos : Vector3;

function Start () {
	cubeA = GameObject.Find("Cube1");
	cubeB = GameObject.Find("Cube2");
}

function Update () {
	if (Input.GetMouseButtonDown(0)){
			onMouseDown();
	}
}

function onMouseDown(){
	var hit : RaycastHit;
	var dir : Vector3;
	var ray : Ray;
	var cubeAOrig : Vector3;
	
	ray = camera.main.ScreenPointToRay(Input.mousePosition);
	while(Input.GetButton("Fire1") && Physics.Raycast(ray, hit)){
		if (hit.collider.gameObject == cubeA){
			Debug.Log("Got cubeA");
			cubeAOrig = cubeA.transform.position;
			
			
			
			//dist = Vector3.Distance(hit.transform.position, Camera.main.transform.position);
			//newPos = ray.GetPoint(dist);
			//hit.transform.position = newPos;
			//hit.transform.position.z = cubeAOrig.z;
			
			
			}
		if (hit.collider.gameObject == cubeB)
			Debug.Log("Got cubeB");
			
		yield;
	}
}