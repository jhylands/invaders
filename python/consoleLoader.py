#This script managed the including of console mods from the consolemod folder
#It requires that the mod file has HELP: somehelp ; somewhere in the file for
#the help to be included
#COMMAND: somecommand; somewhere for the command to switch to the class
#class className extends Handler{ for the class include
#If the file is not to be included then it should have
#NOMOD! somewhere in the file

import re,os
#get a list of files
files = os.listdir(r'../consolemod')
#files = [ i for i in files if i!='Handler.php']

#need to add an error checking function based on nonetype of m
def add(search,data,info):
    m = re.search(search,data)
    if not m:
        if info!='MOD':
            print('    Error no ' + info)
        return 'ERROR'
    else:
        try:
            return m.group(1)
        except IndexError:
            return m.group(0)


#for each file add command and classname to data structure
pairs = []
for file in files:
    print(file)
    f = open('../consolemod/' + file,'r')
    data = f.read()
    f.close()
    #check for NOMOD!
    mod = add('NOMOD\!',data,'MOD')=='ERROR'
    if(mod):
        command = add('COMMAND:(.*);',data,'COMMAND')
        theClass = add('class\s+(\w+)\s+extends',data,'class')
        helper = add('HELP:(.*);',data,'HELP')
        pairs.append( ('consolemod/' + file, command,theClass,helper) )
    else:
        #send the nomod has beeen found to console
        print('    NOMOD!')
            

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
    case += theClass + '($db,$ship);\n                     break;\n'
    
with open('../consoleTempl.php','r') as f:
    code = f.read()
    code = code.replace('//IMPORTCLASS INPUT',imports)
    code = code.replace('//HELP-TEXT INPUT',helps)
    code = code.replace('//CASE INPUT',case)
#print(code)
with open('../console.php','w') as f:
    f.write(code)
        
          
    


