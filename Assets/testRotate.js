#pragma strict

var wrenchModel : Transform;
var wrenchTurnAxis : Transform;
var wrenchRot : GameObject;
var nutModel : Transform;

//nut movement objects
var nPA : GameObject;
var nPB : GameObject;
var startM : Transform;
var endM : Transform;

//rotation testing
private var originalRot : Quaternion;
private var offsetRot : Quaternion;
var numberAverages : int = 3;

var turnSpeed = 1.0;
//var rotateObject = true;

function Start () {
	numberAverages = Mathf.Clamp (numberAverages, 1, numberAverages);

	wrenchModel = transform.FindChild("Model");
	wrenchTurnAxis = wrenchModel.transform.FindChild("mesh29");
	
	wrenchRot = new GameObject();
	wrenchRot.transform.position = (wrenchTurnAxis.renderer.bounds.center)+(Vector3(0,0,0.0019));
	
	//Debug.Log(wrenchTurnAxis);
	
	wrenchRot.transform.parent = wrenchModel.parent;
	wrenchModel.parent = wrenchRot.transform;
	
	nutModel = transform.FindChild("Nut");
	
	nPA = GameObject.Find("nutPointA");
	nPB = GameObject.Find("nutPointB");
	startM = nPA.transform;
	endM = nPB.transform;
}

function Update () {
	//wrenchRot.transform.Rotate((Input.GetAxis("Mouse Y") * turnSpeed * Time.deltaTime), (Input.GetAxis("Mouse X") * turnSpeed * Time.deltaTime), 0, Space.World);
	//wrenchRot.transform.Rotate(Vector3.up * Time.deltaTime*100, Space.World);
	if (Input.GetMouseButtonDown(0)){
		onMouseDown();
	}
	
}

function onMouseDown(){
	var hit : RaycastHit;
	var dir : Vector3;
	
	if (Physics.Raycast (camera.main.ScreenPointToRay(Input.mousePosition), hit)) {
		//Debug.Log("Hit target");
		originalRot = wrenchRot.transform.rotation;
		dir = hit.point - transform.position;
		offsetRot = Quaternion.Inverse (Quaternion.LookRotation(dir));
		Spin (dir);
	}
}

function Spin (dir : Vector3){
	var hit : RaycastHit;
	var prevDirList : Array = new Array ();
	var currDir : Vector3;
	var prevRotNum : Vector3;	
	
	for (var i : int = 0; i < numberAverages; i++){
		prevDirList.Add(currDir);
	}
	
	currDir = dir;
	
	while (Input.GetButton ("Fire1") && Physics.Raycast (camera.main.ScreenPointToRay(Input.mousePosition), hit)){
		prevDirList.RemoveAt(0);
		prevDirList.Add(currDir);
		prevRotNum = wrenchTurnAxis.eulerAngles;
		currDir = hit.point - transform.position;
		//Debug.Log(currDir);
		wrenchRot.transform.rotation = Quaternion.LookRotation (currDir) * offsetRot* originalRot;
		//wrenchRot.transform.rotation.y = wrenchRot.transform.rotation.y*0.5;
		//Debug.Log(wrenchRot.transform.rotation.y);
		//Debug.Log(wrenchTurnAxis.eulerAngles);
		
		wrenchRot.transform.rotation.x = 0;
		wrenchRot.transform.rotation.z = 0;
		yield;
		
		if ((prevRotNum.y - wrenchTurnAxis.eulerAngles.y) < 1.0 && (prevRotNum.y - wrenchTurnAxis.eulerAngles.y) > -1.0) {
			continue;
		}
		else if (((prevRotNum.y - wrenchTurnAxis.eulerAngles.y + 360.0) % 360.0) > 180.0){
			nutModel.transform.position = Vector3.Lerp(nutModel.transform.position, startM.position, 0.004);
			//nutModel.transform.position = Vector3.MoveTowards(nutModel.transform.position, startM.position, Time.deltaTime*0.005);
			//nutModel.transform.Rotate(Vector3.up*Time.deltaTime*100.0, Space.World);
			prevRotNum = wrenchTurnAxis.eulerAngles;
		}
		else if (((prevRotNum.y - wrenchTurnAxis.eulerAngles.y + 360.0) % 360.0) <= 180.0){
			nutModel.transform.position = Vector3.Lerp(nutModel.transform.position, endM.position, 0.004);
			//nutModel.transform.position = Vector3.MoveTowards(nutModel.transform.position, endM.position, Time.deltaTime*0.005);
			//nutModel.transform.Rotate(Vector3.down*Time.deltaTime*100.0, Space.World);
			prevRotNum = wrenchTurnAxis.eulerAngles;
		}
		//nutModel.transform.position = Vector3.MoveTowards(nutModel.transform.position, endM.position, Time.deltaTime*0.005);	

		
	}
	
	
	
	
	
	
	
	
	
	
	
}