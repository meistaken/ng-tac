from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField

class RuleForm(FlaskForm):

    src_addr = StringField("Source address")
    dst_addr = StringField("Destination address")

    src_port = StringField("Port")
    dst_port = StringField("Port")

    protocol = SelectField('Protocol', choices=[('any', 'any'), ('tcp', 'TCP'), ('udp', 'UDP')])

    interface = SelectField('Incoming interface', choices=[('lan', 'LAN'), ('wan', 'WAN')])

    submit = SubmitField("Check")