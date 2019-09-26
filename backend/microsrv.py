
# Includes
exec(open("lib.py").read())
exec(open("tokenizer.py").read())

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
def csv_reader(f, separator):
    return(csv.reader(f, quotechar = '"', delimiter = separator,
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

# Jobs
@app.route('/jobs',
    methods = ['GET'])
def jobs():
    user = request.args.get(
        'user', default = None, type = str)
    jobs = list(query_ontology(
        config['ontology_jobs'], { 'user': user }))
    json = { 'user': user, 'jobs': jobs }
    return(json)

# Secret
@app.route('/secret',
    methods = ['GET'])
def secret():
    id = request.args.get(
        'id', default = None, type = str)
    f = open(path_secrets + '/' + id)
    secret = f.readlines()
    json = { 'id': id,
        'secret': secret }
    return(json)

# Tokenize: line
def tokenize_line(
        flags, tokenizer, line, separator):
    line_tokenized = list()
    for i, value in enumerate(line):
        if (flags[i] == 1):
            line_tokenized.append(
                tokenizer.tokenize(value))
        else: line_tokenized.append(
            value)
    return(separator.join(
        line_tokenized))

# Tokenize
@app.route('/tokenize',
    methods = ['POST'])
def tokenize():
    id = request.args.get(
        'id', default = None, type = str)
    separator = list(query_ontology(
        config['ontology_jobs'],
            { 'id': id }))[0]['separator']
    flags = request.json['flags']
    tokenizer = Tokenizer(
        request.json['method'], id)
    output = list()
    f = open(path_upload + '/' + id)
    for i, line in enumerate(csv_reader(f, separator)):
        if (i == 0):
            output.append(
                ''.join(line))
        line_tokenized = tokenize_line(
            flags, tokenizer, line, separator)
        output.append(
            line_tokenized + newline)
    return(save_file(
        id, output))

# Fields
@app.route('/fields',
    methods = ['GET'])
def extract_fields():
    id = request.args.get(
        'id', default = None, type = str)
    separator = query_ontology(
        collection, { 'id': id })[separator]
    f = open(UPLOAD_FOLDER + '/' + id)
    fields = f.readline()
    fields_list = fields.split(
        separator)
    values = f.readline()
    values_list = values.split(
        separator)
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
    user = request.args.get(
        'user', default = anonymous_user, type = str)
    separator = request.args.get(
        'separator', default = None, type = str)
    if 'file' in request.files:
        file = request.files['file']
        if file.filename != '':
            filename = file.filename
            filename_id = get_id(filename)
            file_path = os.path.join(
                app.config['UPLOAD_FOLDER'], filename_id)
            file.save(file_path)
            num_lines = sum(
                1 for line in open(file_path))
            now = datetime.datetime.now()
            insert_ontology_single(
                dict(user = user, id = filename_id,
                    filename = filename, separator = separator,
                    timestamp = now, hour = now.hour,
                    weekday = now.strftime('%A'),
                    num_lines = num_lines),
                config['ontology_jobs'])
            return(filename_id)
    return(error)

# Main
if __name__ == '__main__':
    app.run()