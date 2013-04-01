#pragma strict
var boltRot : GameObject;


function Start () {
	boltRot = new GameObject();
	boltRot.transform.position = renderer.bounds.center;
	boltRot.transform.parent = transform.parent;
	transform.parent = boltRot.transform;

}

function Update () {
	boltRot.transform.Rotate(Vector3.up * Time.deltaTime*10, Space.World);
	//transform.RotateAround(
	//transform.Rotate(Vector3.up * Time.deltaTime*10);
	//transform.Rotate(Vector3.up * Time.deltaTime, Space.World);
}