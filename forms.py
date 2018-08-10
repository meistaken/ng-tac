from flask_wtf import Form
from wtforms import StringField, SubmitField, SelectField


class RuleForm(Form):


    src_addr = StringField("Source Address")
    dst_addr = StringField("Destination Address")

    src_port = StringField("Source Port")
    dst_port = StringField("Destination Port")


    protocol = SelectField('Protocol', choices=[('any', 'any'), ('tcp', 'TCP'), ('udp', 'UDP')])

    interface = SelectField('Incoming interface', choices=[('lan', 'LAN'), ('wan', 'WAN')])


    submit = SubmitField("Send")