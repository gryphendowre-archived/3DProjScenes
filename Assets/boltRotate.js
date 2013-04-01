#pragma strict
var nutRot : GameObject;


function Start () {
	nutRot = new GameObject();
	nutRot.transform.position = renderer.bounds.center;
	nutRot.transform.parent = transform.parent;
	transform.parent = nutRot.transform;

}

function Update () {
	nutRot.transform.Rotate(Vector3.up * Time.deltaTime*10, Space.World);
	//transform.RotateAround(
	//transform.Rotate(Vector3.up * Time.deltaTime*10);
	//transform.Rotate(Vector3.up * Time.deltaTime, Space.World);
}