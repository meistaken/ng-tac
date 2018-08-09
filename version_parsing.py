import pandas as pd
import xml.etree.ElementTree as ET
tree = ET.parse('config.xml')
root = tree.getroot()



def ver_check():
    url = 'https://www.netgate.com/docs/pfsense/releases/versions-of-pfsense-and-freebsd.html'
    test = pd.read_html(url)
    new = test[0].to_dict()
    for field,value in new.items():
        if field == 'Config Rev':
            lst = value
        else:
            continue
    # dev = [lst[0] for x,y in lst.items() if x == 0]
    stable = [lst[1] for x,y in lst.items() if x == 1]
    outdate = [lst[x] for x,y in lst.items() if x != 0 and x != 1]

    for ver in root.iterfind('./'):
        if ver.tag == 'version':
            if ver.text in outdate:
                ver_str = 'pfSense version is out of date' + '\n'*2
            elif ver.text in stable:
                ver_str = 'pfSesne is up do tade' + '\n'*2
            else:
                ver_str = 'Looks like development version is running. Some issue possible. Please double check it'
    return ver_str

if __name__ == '__main__':
    ver_info = (ver_check())

    print(ver_info)