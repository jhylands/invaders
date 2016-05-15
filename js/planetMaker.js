function makePlanet(planet){
	var planetGeometry = new THREE.SphereGeometry(planet['Radius'],32,32);
	
	var img = new THREE.TextureLoader().load(planet['Image']);
	if(specMap!=null){var spec = new THREE.TextureLoader().load(planet['Specular']);}
	if(bumpMap!=null){var bump = new THREE.TextureLoader().load(planet['Bump']);}
	if(emMap!=null){var em = new THREE.TextureLoader().load(planet['Emissive']);}
	
	var planetMaterial = new THREE.MeshPhongMaterial({
		map:img,
		emissiveMap:em,
		bumpMap:bump,
		specularMap:spec
		});
	return new THREE.Mesh(planetGeometry,PlanetMaterial);
}

function bindLights(threePlanet,planet){
	var planetLight = new THREE.pointLight(planet['Reflection']);
	var planetObject = new THREE.Group();
	planetObject.add(threePlanet);
	planetObject.add(planetLight);
	return planetObject;
}
	
