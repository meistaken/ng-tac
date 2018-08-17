from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField

class RuleForm(FlaskForm):

    src_addr = StringField("Source address")
    dst_addr = StringField("Destination address")

    src_port = StringField("Port")
    dst_port = StringField("Port")

    ipprotocol = SelectField('Protocol', choices=[('any', 'any'), ('tcp', 'TCP'), ('udp', 'UDP'), ('inet', 'INET')])

    interface = SelectField('Incoming interface', choices=[('lan', 'LAN'), ('wan', 'WAN')])

    submit = SubmitField("Check")