import xml.etree.ElementTree as ET
import ipaddress
from flask import Flask, render_template, request
from forms import RuleForm

tree = ET.parse('config.xml')
root = tree.getroot()


app = Flask(__name__)
app.secret_key = 'development key'

@app.route("/")
@app.route("/home")
def home():
   return render_template('home.html')

@app.route('/general_info')
def printsysinfo():
    sys_info = {}
    formated_str = ''
    for sys_data in root.iterfind('./system/'):
        if sys_data.tag == 'hostname':
            sys_info[sys_data.tag] = sys_data.text
        if sys_data.tag == 'domain':
            sys_info[sys_data.tag] = sys_data.text
        if sys_data.tag == 'timezone':
            sys_info[sys_data.tag] = sys_data.text
        if sys_data.tag == 'dnsserver':
            if sys_data.tag not in sys_info.keys():
                sys_info[sys_data.tag] = [sys_data.text]
            else:
                sys_info[sys_data.tag].append(sys_data.text)

    for k, v in sys_info.items():
        formated_str += k.upper()
        formated_str += ': ' + str(v) + '\n'
    return render_template('general_info.html', gen_info=sys_info.items())

@app.route('/interfaces')
def printinterfaceinfo():
    int_title = '*** INTERFACES INFORMATION ***' + '\n' * 2
    int_str = ''
    for interface in root.iterfind('./interfaces/'):
        net = ''
        pref = ''
        full_add = ''
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

    return render_template('interfaces.html', result=result)



@app.route('/rule_checker', methods = ['GET', 'POST'])
def RuleCheck():
    form = RuleForm()

    if request.method == 'POST':
        return "Success!"
    elif request.method == 'GET':
        return render_template('rule_checker.html', form=form)


if __name__ == '__main__':
    app.run(debug=True)