#pragma strict

var wrenchRot : GameObject;


function Start () {
	wrenchRot = new GameObject();
	wrenchRot.transform.position = (renderer.bounds.center)+(Vector3(0,0,0.0019));
	//wrenchRot.transform.parent = transform.parent;
	//transform.parent = wrenchRot.transform;
	
	
	//wrenchRot.transform.position = renderer.bounds.center;
	wrenchRot.transform.parent = transform.parent.parent;
	transform.parent.parent = wrenchRot.transform;
}

function Update () {

	if (Input.GetMouseButtonDown(0)){
		OnMouseDrag();
		//Debug.Log("Pressed Left Click");
		
		//wrenchRot.transform.Rotate((Input.GetAxis("Mouse X")*Time.deltaTime*100.0), (Input.GetAxis("Mouse Y")*Time.deltaTime*100.0), 0, Space.World)	;
	}
	//wrenchRot.transform.Rotate(Vector3.up * Time.deltaTime*100, Space.World);
	//transform.Rotate(Vector3.forward, Time.deltaTime*10);
}

function OnMouseDrag(){
	//wrenchRot.transform.parent.renderer.material.color -= Color.blue * Time.deltaTime;
	wrenchRot.transform.Rotate((Input.GetAxis("Mouse X")*Time.deltaTime*100.0), (Input.GetAxis("Mouse Y")*Time.deltaTime*100.0), 0, Space.World);
}