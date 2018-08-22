import xml.etree.ElementTree as ET
import ipaddress
from flask import Flask, render_template, request
from forms import RuleForm, UploadForm
from werkzeug.utils import secure_filename
import os

tree = ET.parse('config.xml')
root = tree.getroot()

folder = '/home/denis/ng_tac_helper'
extesion = {'xml'}

app = Flask(__name__)
app.secret_key = 'development key'
app.config['folder'] = folder


@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html')


@app.route('/general_info')
def printsysinfo():
    sys_info = {}
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

    return render_template('general_info.html', gen_info=sys_info.items())


@app.route('/interfaces')
def printinterfaceinfo():
    result = {}
    for interface in root.iterfind('./interfaces/'):
        result[interface.tag] = {}
        pref = ''
        net = ""
        enab = False
        for int_config in interface.iterfind('./'):
            if int_config.tag == 'enable':
                enab = True
            if int_config.tag == 'ipaddr':
                net = int_config.text
                if net == '' and pref == '':
                    result[interface.tag][int_config.tag] = 'IP address not specified'
                elif net == 'dhcp':
                    result[interface.tag][int_config.tag] = 'IP address provided by DHCP'
                else:
                    result[interface.tag][int_config.tag] = net
            if int_config.tag == 'subnet':
                pref = int_config.text
                result[interface.tag][int_config.tag] = pref
            if enab:
                result[interface.tag]['status'] = 'enabled'
            else:
                result[interface.tag]['status'] = 'disabled'
            if net != '' and pref != '':
                full_add = net + '/' + pref
                sub = ipaddress.IPv4Interface(full_add)
                result[interface.tag]['subnet'] = sub.network.network_address
                result[interface.tag]['broadcast'] = sub.network.broadcast_address

    return render_template('interfaces.html', result=result.items())



@app.route('/rule_checker', methods = ['GET', 'POST'])
def RuleCheck():
    form = RuleForm()

    if request.method == 'POST':

        filter_dict = {}
        for index, item in enumerate(root.iterfind('./filter/')):
            # if item.tag == 'rule':
            #     print(index+1, item.tag)
            # else:
            #     continue
            for i in item.iterfind('./'):
                # print(i.tag)
                if index not in filter_dict.keys():
                    filter_dict[index] = {}
                    filter_dict[index][i.tag] = [i.text]
                else:
                    if i.tag == 'source':
                        for x in i:
                            filter_dict[index][i.tag] = {}
                            filter_dict[index][i.tag] = [x.tag, x.text]
                    elif i.tag == 'destination':
                        for x in i:
                            filter_dict[index][i.tag] = {}
                            filter_dict[index][i.tag] = [x.tag, x.text]
                    else:
                        filter_dict[index][i.tag] = [i.text]
        #         filter_dict[rule.tag][i.tag] = [i.text]



        test = filter_dict

        target_dict = {}
        target_dict.update(request.form)
        print(target_dict)
        print(test)

        for k, v in test.items():
            if target_dict.items() <= v.items():
                # print(target_dict.items(), print(v.items()))
                print('Rule at line {} matched. Rule ID is {} \n'.format(k + 1, v['tracker']))
                for x, y in v.items():
                    print(x, y)

        return render_template('rule_checker.html', form=form)

    elif request.method == 'GET':
        return render_template('rule_checker.html', form=form)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in extesion

@app.route('/upload', methods = ['GET', 'POST'])
def upload_file():
    form = UploadForm()
    if request.method == 'POST':
        file = request.files['file']
        if not allowed_file(file.filename):
            message = 'That type of file not permited'
            return render_template('upload.html', form=form, msg=message)

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['folder'], filename))
            message = 'File uploaded'
            return render_template('upload.html', form=form, msg=message)

    return render_template('upload.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)