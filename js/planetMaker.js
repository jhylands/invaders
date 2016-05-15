function makePlanet(imgMap,specMap,bumpMap,emMap,size){
	var planetGeometry = new THREE.SphereGeometry(size,32,32);
	
	var img = new THREE.TextureLoader().load(imgMap);
	if(specMap!=null){var spec = new THREE.TextureLoader().load(specMap);}
	if(bumpMap!=null){var bump = new THREE.TextureLoader().load(bumpMap);}
	if(emMap!=null){var em = new THREE.TextureLoader().load(emMap);}
	
	var planetMaterial = new THREE.MeshPhongMaterial({
		map:img,
		emissiveMap:em,
		bumpMap:bump,
		specularMap:spec
		});
	return new THREE.Mesh(planetGeometry,PlanetMaterial);
}

function bindLighting(planet,planetColour){
	var planetLight = new THREE.pointLight(planetColour);
	var planetObject = new THREE.Group();
	planetObject.add(planet);
	planetObject.add(planetLight);
	return planetObject;
}
	
