import re
import os
files = os.listdir(r'../consolemod')
files = [r'../consolemod/' + i for i in files]
print (files[0])
f = open(files[0],'r')
data = f.read()
f.close()
m = re.search('[C][O][M][M][A][N][D].*[;]', data)
print(data[m.start()+8:m.end()-1])
