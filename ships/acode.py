ass = open("b.txt","r")
a = ass.read()
ass.close
bs = open("a.txt","r")
b=bs.read()
bs.close()

f = open("asteroid.js","r+")
o = open("asteroidScene.js","w")
o.write(a)
for i in xrange(0,43812266/1447):
	o.write(f.read(1447))
o.write(b)
f.close()
o.close()
