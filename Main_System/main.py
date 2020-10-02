import pandas as pd 
from random import randint
import xml.etree.ElementTree as ET
from xml.dom import minidom
import requests
import json
import msgpack


# TODO 
# 01. Read from people.csv
# 02. Genereate CPR
# 03. Build xml body
# 04. Send POST request with XML body
# 05. msgpack

# FOR TESTING
# dob = '17-09-1992'
# firstname = 'Veronique'
# lastname = 'Jensen'


baseUrl = 'http://localhost:8080/nemID'

# 01
df = pd.read_csv('Main_system/people.csv')

# 02
def cprGenerator(dob):
    dateOfBirth = dob.replace(dob[6:8],'').replace('-', '')
    cprEnd = randint(1000, 9999)
    cpr = dateOfBirth + '-' + str(cprEnd)
    return cpr

# 03
def xmlBodyBuild(firstname, lastname, email, cpr):
    root = ET.Element('Person')
    firsName = ET.SubElement(root, 'Firstname')
    firsName.text = firstname
    lastName = ET.SubElement(root, 'Lastname')
    lastName.text= lastname
    cprNo = ET.SubElement(root, 'CprNumber')
    cprNo.text = cpr
    eMail = ET.SubElement(root, 'Email')
    eMail.text = email
    return root

# 05
def createMsgpack(person, cpr, nemId):
	json_person = {
		'f_name': person[0],
		'l_name': person[1],
		'birth_date': person[2],
		'email': person[3],
		'country': person[4],
		'phone': person[5],
		'address': person[6],
		'cprnumber': cpr,
		'nemid': nemId
	}
	with open(str(cpr) + '.msgpack', 'wb') as outfile:
		packed = msgpack.packb(json.dumps(json_person))
		outfile.write(packed)

# 04
for index, person in df.iterrows():
	cpr = cprGenerator(person['DateOfBirth'])
	xml = xmlBodyBuild(person['FirstName'], person['LastName'], person['Email'],cpr)
	print(person['Email'])

	headers = {'Content-Type': 'application/xml'}
	response = requests.post(baseUrl, data=ET.tostring(xml), headers=headers)


	nemID = json.loads(response.content)["nemID"]
 

	createMsgpack(person, cpr, nemID)
