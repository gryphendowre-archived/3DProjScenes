#pragma strict

function OnGUI(){
	GUI.Box(Rect(10,10,100,90), "Wrench Mode");
	
	GUI.Button(Rect(20,40,80,20),"FreeForm");
	GUI.Button(Rect(20,70,80,20),"Edit/Auto");
}