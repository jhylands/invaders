import re,os
#get a list of files
files = os.listdir(r'../consolemod')
files = [ i for i in files if i!='Handler.php']

#need to add an error checking function based on nonetype of m
def add(m):
    pass

#for each file add command and classname to data structure
pairs = []
for file in files:
    print(file)
    f = open('../consolemod/' + file,'r')
    data = f.read()
    f.close()
    m = re.search('[C][O][M][M][A][N][D].*[;]', data)
    command = data[m.start()+8:m.end()-1]
    m = re.search('[c][l][a][s][s]\s*.*[{]',data)
    theClass = data[m.start()+6:m.end()-17]
    m = re.search('[H][E][L][P].*[;]',data)
    helper = data[m.start()+5:m.end()-1]
    pairs.append( ('consolemod/' + file, command,theClass,helper) )

imports =''
helps=''
case =''
for (file,command,theClass,helper) in pairs:
    #add import clause to php file
    imports+='include "' + file +'";\n'
    #add help text to help
    helps+= '                    echo "' + helper +'<br />";\n'
    #add switch cases to file
    case +='            case "' + command + '":\n                    $handler = new '
    case += theClass + '($con,$ship);\n                     break;\n'
    
with open('../consoleTempl.php','r') as f:
    code = f.read()
    code = code.replace('//IMPORTCLASS INPUT',imports)
    code = code.replace('//HELP-TEXT INPUT',helps)
    code = code.replace('//CASE INPUT',case)
print(code)
with open('../console.php','w') as f:
    f.write(code)
        
          
    


