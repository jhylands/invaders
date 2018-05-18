import re


#need to add an error checking function based on nonetype of m
def add(search,data,info):
    m = re.findall(search,data)
    print(m)
    return m



with open('../js/include.js','r') as f:
    include = f.read()
    nodeStrings ='';
    for elm in (add('function ([a-z|A-Z]+)\(\)',include,'1')):
        nodeStrings +='exports.' + elm + '=' + elm + ';';
    nodeStrings += include
with open('../js/include.js','w') as f:
    f.write(nodeStrings)
print('done')
        
        
