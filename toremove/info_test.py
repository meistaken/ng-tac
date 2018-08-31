import xml.etree.ElementTree as ET
import ipaddress


tree = ET.parse('config.xml')
root = tree.getroot()

def printinterfaceinfo():
    int_title = '*** INTERFACES INFORMATION ***' + '\n' * 2
    int_str = ''
    for interface in root.iterfind('./interfaces/'):
        net = ''
        pref = ''
        enab = False
        int_str += (interface.tag.upper() + '\n')
        int_str += '*' * 10 + '\n'
        for int_config in interface.iterfind('./'):
            if int_config.tag == 'enable':
                enab = True
            if int_config.tag == 'ipaddr':
                net = int_config.text
            if int_config.tag == 'subnet':
                pref = int_config.text
        if enab:
            int_str += 'Interface enabled' + '\n'
        else:
            int_str += 'WARNING: Interface disabled' + '\n'
        if net == '' and pref == '':
            int_str += 'IP address not specified' + '\n' * 2
        elif net == 'dhcp':
            int_str += 'IP address provided by DHCP' + '\n' * 2
        else:
            full_add = net + '/' + pref
            sub = ipaddress.IPv4Interface(full_add)
            int_str += ('IP Address:{} \nPrefix:{} \nSubnet:{} \nBroadcast:{}'.format(net, pref,
                                                                                      sub.network.network_address,
                                                                                      sub.network.broadcast_address) + '\n' * 2)
        result = int_title + int_str

    print(result)

printinterfaceinfo()