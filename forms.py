from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms import StringField, SubmitField, SelectField


class RuleForm(FlaskForm):

    source = StringField("Source Address")
    destination = StringField("Destination Address")

    src_port = StringField("Source Port")
    dst_port = StringField("Destination Port")


    ipprotocol = SelectField('Protocol', choices=[('any', 'any'), ('tcp', 'TCP'), ('udp', 'UDP'), ('inet', 'INET')])
    interface = SelectField('Incoming interface', choices=[('lan', 'LAN'), ('wan', 'WAN')])


    submit = SubmitField("Check")

class UploadForm(FlaskForm):

    file = FileField()