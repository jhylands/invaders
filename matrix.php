responce.x = Vector.x*Math.cos(rotation.y)*Math.cos(rotation.z)-Vector.y*Math.cos(rotation.y)*Math.sin(rotation.z);
responce.y = -Vector.z*Math.cos(rotation.y)*Math.sin(rotation.x)+Vector.x*(Math.cos(rotation.z)*Math.sin(rotation.x)*Math.sin(rotation.y) + Math.cos(rotation.x)*Math.sin(rotation.z)) + Vector.y*(Math.cos(rotation.x)*Math.cos(rotation.z)-Math.sin(rotation.x)*Math.sin(rotation.z)-Math.sin(rotation.x)*Math.sin(rotation.y)*Math.sin(rotation.z));
responce.z = Vector.z*Math.cos(rotation.x)*Math.cos(rotation.y)+Vector.x*(Math.sin(rotation.x)*Math.sin(rotation.z)-Math.cos(rotation.x)*Math.cos(rotation.z)*Math.sin(rotation.y)) + Vector.y*(Math.cos(rotation.z)*Math.sin(rotation.x)+Math.cos(rotation.x)*Math.sin(rotation.y)*Math.sin(rotation.z));

