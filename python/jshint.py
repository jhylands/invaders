#python file to get the functiomn names of all the modules included in the js hints automatically

#WARNING 
#doesn't get the assistor functions 
import re,os
theExpression = 'function ([A-Z|a-z]*)\('

#some function to get the name of global from a file 
def getName(fname):
    with open(fname,'r') as f:
        doc = f.read()
    ans = re.search(theExpression,doc)
    if not ans:
        return ''
    else:
        return ans.group(1)
#some function to get a list of all the files in MVC

def getModules():
    files = os.listdir(r'../js/MVC')
    modules=['$','THREE','console','window','document','onPageReady','I','__scene','__camera']
    i=0
    while i< len(files):
        fullName = '../js/MVC/' + files[i]
        print(fullName)
        if(os.path.isdir(fullName)):
            files = files + [files[i] + '/' + x for x in os.listdir(fullName)]
        else:
            moduleName = getName(fullName)
            if not moduleName=='':
                modules.append(moduleName)
        i+=1
    return modules

#some function that makes the globals section of the database
def makeGlobal(modules):
    return ''.join(['       "' + module + '":true,\n' for module in modules])[:-2]

modules = getModules()
pre = '{\n  "esversion": 6,\n "strict":false,\n  "unused":false,\n  "expr":true,\n  "undef":true,\n  "proto":true,\n  "globals":{\n'
theglobals = makeGlobal(modules)
post = '}\n}'
config_file = os.path.join(os.path.expanduser("~"), '.jshintrc')
with open(config_file,'w') as f:
    f.write(pre+theglobals+post)


