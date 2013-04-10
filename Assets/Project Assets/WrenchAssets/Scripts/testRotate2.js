#pragma strict

var wrenchModel : Transform;
var wrenchTurnAxis : Transform;
var wrenchRot : GameObject;

//rotation testing
private var originalRot : Quaternion;
private var offsetRot : Quaternion;
var numberAverages : int = 3;
private var yDeg : float;

var turnSpeed = 1.0;
//var rotateObject = true;

function Start () {
	numberAverages = Mathf.Clamp (numberAverages, 1, numberAverages);

	wrenchModel = transform.FindChild("Model");
	wrenchTurnAxis = wrenchModel.transform.FindChild("mesh29");
	
	wrenchRot = new GameObject();
	wrenchRot.transform.position = (wrenchTurnAxis.renderer.bounds.center)+(Vector3(0,0,0.0019));
	
	Debug.Log(wrenchTurnAxis);
	
	wrenchRot.transform.parent = wrenchModel.parent;
	wrenchModel.parent = wrenchRot.transform;
	
}

function Update () {
	//wrenchRot.transform.Rotate((Input.GetAxis("Mouse Y") * turnSpeed * Time.deltaTime), (Input.GetAxis("Mouse X") * turnSpeed * Time.deltaTime), 0, Space.World);
	//wrenchRot.transform.Rotate(Vector3.up * Time.deltaTime*100, Space.World);
		
	if (Input.GetMouseButton(0)){
		yDeg +=Input.GetAxis("Mouse Y") * 100;
		originalRot = wrenchRot.transform.rotation;
		offsetRot = Quaternion.Euler(0, yDeg, 0);
		wrenchRot.transform.rotation = Quaternion.Lerp(originalRot, offsetRot, Time.deltaTime*100);
	}
	
	
	
	
	
	
}