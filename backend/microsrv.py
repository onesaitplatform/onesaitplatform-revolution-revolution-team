
# Imports
from flask import Flask, request, redirect, url_for
import os
import hashlib
import datetime
import csv
import pyffx

# Includes
exec(open("tokenizer.py").read())

# Parameters
path_upload = 'uploads'
path_download = 'downloads'
error = 'error'
default_sep = ','
newline = '\n'

# Init
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = path_upload

# Save
def save_file(
        id, output):
    download_link = path_download + '/' + id
    f_output = open(
        download_link, 'w+')
    f_output.writelines(
        ''.join(output))
    f_output.flush()
    f_output.close()
    return(
        download_link)

# CSV
def csv_reader(f):
    return(csv.reader(f, quotechar = '"', delimiter = default_sep,
        quoting = csv.QUOTE_ALL, skipinitialspace = True))

# Hash
def get_id(s):
    s_encoded = s.encode()
    ts = datetime.datetime.now().timestamp()
    return(str(ts) + '-' + str(
        hashlib.sha512(
            s_encoded).hexdigest()))

# Hello
@app.route('/')
def hello():
    return 'hello'

# Tokenize: line
def tokenize_line(
        flags, tokenizer, line):
    line_tokenized = list()
    for i, value in enumerate(line):
        if (flags[i] == 1):
            line_tokenized.append(
                tokenizer.tokenize(value))
        else: line_tokenized.append(
            value)
    return(default_sep.join(
        line_tokenized))

# Tokenize
@app.route('/tokenize',
    methods = ['POST'])
def tokenize():
    id = request.args.get(
        'id', default = None, type = str)
    flags = request.json['flags']
    tokenizer = Tokenizer(
        request.json['method'], id)
    output = list()
    f = open(path_upload + '/' + id)
    for i, line in enumerate(csv_reader(f)):
        if (i == 0):
            output.append(
                ''.join(line))
        line_tokenized = tokenize_line(
            flags, tokenizer, line)
        output.append(
            line_tokenized)
    return(save_file(
        id, output))

# Fields
@app.route('/fields',
    methods = ['GET'])
def extract_fields():
    id = request.args.get(
        'id', default = None, type = str)
    f = open(UPLOAD_FOLDER + '/' + id)
    fields = f.readline()
    fields_list = fields.split(
        default_sep)
    values = f.readline()
    values_list = values.split(
        default_sep)
    json = { 'id': id,
        'fields': fields_list,
        'values': values_list }
    return(json)

# Upload
@app.route('/upload',
    methods = ['POST'])
def upload_file():
    if request.method != 'POST':
        return(error)
    if 'file' in request.files:
        file = request.files['file']
        if file.filename != '':
            filename = file.filename
            filename_id = get_id(filename)
            file.save(os.path.join(
                app.config['UPLOAD_FOLDER'], filename_id))
            return(filename_id)
    return(error)

# Main
if __name__ == '__main__':
    app.run()