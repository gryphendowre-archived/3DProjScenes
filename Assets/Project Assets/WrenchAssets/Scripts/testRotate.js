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

//force rotation arrows
var clockArrow : Transform;
var countArrow : Transform;
var torqueClockArrow : Transform;
var torqueCountArrow : Transform;

//rotation testing
private var originalRot : Quaternion;
private var offsetRot : Quaternion;
var numberAverages : int = 3;

//force Arrow locations
var currentClockArrowPos : Vector3;
var currentCountArrowPos : Vector3;

var turnSpeed = 1.0;
//var rotateObject = true;

var experimentRun : boolean = false;
var rotateWrenchbool : boolean = false;	

function Start () {
	numberAverages = Mathf.Clamp (numberAverages, 1, numberAverages);

	wrenchModel = transform.FindChild("Model");
	wrenchTurnAxis = wrenchModel.transform.FindChild("mesh29");
	
	clockArrow = wrenchModel.transform.FindChild("ClockwiseForceArrow").FindChild("group_0");
	countArrow = wrenchModel.transform.FindChild("CounterClockwiseForceArrow").FindChild("group_0");
	torqueClockArrow = wrenchModel.transform.FindChild("TorqueClockwise").FindChild("group_0");
	torqueCountArrow = wrenchModel.transform.FindChild("TorqueCounterClockwise").FindChild("group_0");
	currentClockArrowPos = clockArrow.transform.position;
	currentCountArrowPos = countArrow.transform.position;
	torqueClockArrow.renderer.enabled = false;
	torqueCountArrow.renderer.enabled = false;
	clockArrow.renderer.enabled = false;
	countArrow.renderer.enabled = false;
	wrenchModel.collider.enabled = false;
	
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
	
	if (rotateWrenchbool == true){
		var rad2deg : float = (totTorq* (180 / Mathf.PI));
		var prevRotNum2 : Vector3;
		prevRotNum2 = wrenchTurnAxis.eulerAngles;
		wrenchRot.transform.Rotate(0,((-1)*rad2deg*Time.deltaTime)/30,0);
		
		if (((prevRotNum2.y - wrenchTurnAxis.eulerAngles.y + 360.0) % 360.0) > 180.0){
			nutModel.transform.position = Vector3.Lerp(nutModel.transform.position, startM.position, ((rad2deg*Time.deltaTime)/30)*0.004);
			prevRotNum2 = wrenchTurnAxis.eulerAngles;
		}
		if (((prevRotNum2.y - wrenchTurnAxis.eulerAngles.y + 360.0) % 360.0) <= 180.0){
			nutModel.transform.position = Vector3.Lerp(nutModel.transform.position, endM.position,((rad2deg*Time.deltaTime)/30)*0.004);
			prevRotNum2 = wrenchTurnAxis.eulerAngles;
		}
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
			//clockArrow.renderer.enabled = false;
			//countArrow.renderer.enabled = false;
			continue;
		}
		else if (((prevRotNum.y - wrenchTurnAxis.eulerAngles.y + 360.0) % 360.0) > 180.0){
			//~ clockArrow.renderer.enabled = true;
			//~ torqueClockArrow.renderer.enabled = true;
			//~ countArrow.renderer.enabled = false;
			//~ torqueCountArrow.renderer.enabled = false;
			nutModel.transform.position = Vector3.Lerp(nutModel.transform.position, startM.position, 0.004);
			//nutModel.transform.position = Vector3.MoveTowards(nutModel.transform.position, startM.position, Time.deltaTime*0.005);
			//nutModel.transform.Rotate(Vector3.up*Time.deltaTime*100.0, Space.World);
			prevRotNum = wrenchTurnAxis.eulerAngles;
		}
		else if (((prevRotNum.y - wrenchTurnAxis.eulerAngles.y + 360.0) % 360.0) <= 180.0){
			//~ countArrow.renderer.enabled = true;
			//~ torqueCountArrow.renderer.enabled=true;
			//~ clockArrow.renderer.enabled = false;
			//~ torqueClockArrow.renderer.enabled = false;
			nutModel.transform.position = Vector3.Lerp(nutModel.transform.position, endM.position, 0.004);
			//nutModel.transform.position = Vector3.MoveTowards(nutModel.transform.position, endM.position, Time.deltaTime*0.005);
			//nutModel.transform.Rotate(Vector3.down*Time.deltaTime*100.0, Space.World);
			prevRotNum = wrenchTurnAxis.eulerAngles;
		}
		//nutModel.transform.position = Vector3.MoveTowards(nutModel.transform.position, endM.position, Time.deltaTime*0.005);	

		
	}
}
var forceAmount : String = "5";
var radiusAmount : String = "0";
var forceInt: int = 0;
var radInt : int = 0;
var totTorq : double = 0;
var stringTot : String = "0";

function OnGUI(){
	GUI.Box(Rect(10,10,100,110), "Wrench Mode");
	
	if (GUI.Button(Rect(20,40,80,20),"FreeForm")){
		Debug.Log("Free Form Mode!");
		wrenchModel.collider.enabled = true;
		experimentRun = true;
	}
	if (GUI.Button(Rect(20,70,80,20),"Edit/Auto")){
		Debug.Log("Edit/Auto Mode");
		wrenchModel.collider.enabled = false;
	}
	if (GUI.Button(Rect(20,100,80,20),"Restart")){
		Application.LoadLevel(Application.loadedLevel);
	}
	
	GUI.Box(Rect(10,130,100,105),"Input values");
	GUI.Box(Rect(20,150,80,40),"Force");
	forceAmount = GUI.TextField(Rect(22,170,76,20),forceAmount,25);
	GUI.Box(Rect(20,190,80,40),"Radius");
	radiusAmount = GUI.TextField(Rect(22,210,76,20),radiusAmount,25);
	
	GUI.Box(Rect(10,240,100,55), "Torque Output");
	GUI.TextField(Rect(20,270,80,20),stringTot);
	
	
	if (Event.current.keyCode == KeyCode.Return) {
	    if (forceAmount != "" && radiusAmount != "" && experimentRun == false){
			forceInt = parseInt(forceAmount);
			radInt = parseInt(radiusAmount);
			translateForceArrow(forceInt, radInt);
			totTorq = calcTorqueVal(forceInt,radInt);
			stringTot = totTorq.ToString();
			if(forceInt < 0){
				clockArrow.renderer.enabled = true;
				countArrow.renderer.enabled = false;
			}
			if(forceInt > 0){
			countArrow.renderer.enabled = true;
			clockArrow.renderer.enabled = false;
			}
		}
		else if (experimentRun == false){
			totTorq = 0;
			stringTot = totTorq.ToString();
		}
		if (experimentRun == true){
			GUI.TextField(Rect(20,330,80,20),"Please reset the experiment");
		}
    //Debug.Log(originalCountArrowY);
	}
	
	if (GUI.Button(Rect(20,300,80,20), "Begin Test")){
		if (forceInt > 0 && totTorq !=0){
			//countArrow
			experimentRun = true;
			torqueCountArrow.renderer.enabled=true;
			torqueClockArrow.renderer.enabled = false;
			rotateWrenchbool = true;			
		}
		if (forceInt < 0 && totTorq != 0){
			//clockArrow
			experimentRun = true;
			torqueClockArrow.renderer.enabled = true;
			torqueCountArrow.renderer.enabled = false;
			rotateWrenchbool = true;
		}
	}
	
}

function translateForceArrow(frc, radus){
	var temp : float = 0;
	var frcT : int = frc;
	var radusT : float = radus	;
	//clockArrow.transform.localPosition = ((clockArrow.transform.localPosition - wrenchModel.transform.localPosition).normalized) *((radusT));
	clockArrow.transform.position.z = currentClockArrowPos.z - ((radusT-1)*(0.01));
	countArrow.transform.position.z = currentCountArrowPos.z - ((radusT-1)*(0.01));
	//~ Debug.Log(clockArrow.transform.position.x);
	//~ Debug.Log(clockArrow.transform.position.y);
	//~ Debug.Log(clockArrow.transform.position.z);
}

function calcTorqueVal(frc, radus){
	var temp : float = 0;
	var frcT : int = frc;
	var radusT : int = radus;
	var degR : int = 45;
	var deg2rad : float = degR * (Mathf.PI / 180);
	temp = frcT*radusT*Mathf.Sin(deg2rad);
	return temp;
	
	
}