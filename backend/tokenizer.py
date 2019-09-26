
class Tokenizer:

    # Attributes
    secret = None
    method = None
    engine = None
    methods = [ 'FPE', 'AES', 'MAP' ]
    alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\''
    default_char = '?'
    utf8_encoding = 'utf-8'

    def save_secret(self, id):
        f = open(path_secrets + '/' + id, 'w+')
        f.writelines(str(
            self.secret))
        return

    def __init__(self, method, id):
        self.method = method
        if (method == self.methods[0]):
            self.secret = (str(
                datetime.datetime.now().timestamp()) + '-' + id).encode()
        elif (method == self.methods[1]):
            self.secret = Fernet.generate_key()
            self.engine = Fernet(self.secret)
        elif (method == self.methods[2]):
            self.engine = dict()
            alphabet_list = list(self.alphabet)
            random.shuffle(alphabet_list)
            alphabet_map = ''.join(
                alphabet_list)
            self.secret = self.alphabet + \
                newline + alphabet_map
            for i, new_ch in enumerate(alphabet_map):
                self.engine[self.alphabet[i]] = new_ch
        self.save_secret(id)
        return

    def tokenize(self, value):
        value = value.encode(
            'ascii', errors = 'ignore')
        token = ''
        if (self.method == self.methods[0]):
            token = self.tokenize_fpe(value)
        elif (self.method == self.methods[1]):
            token = self.tokenize_aes(value)
        elif (self.method == self.methods[2]):
            token = self.tokenize_map(value)
        return(token)

    def tokenize_aes(self, value):
        value = str(value).encode()
        value_enc = self.engine.encrypt(value)
        value_enc = value_enc.decode(
            self.utf8_encoding)
        return(value_enc)

    def tokenize_map(self, value):
        value = str(value).encode()
        value = value.decode(
            self.utf8_encoding)
        value_enc = ''
        for ch in value:
            if (ch in self.alphabet):
                value_enc += self.engine[ch]
            else: value_enc += self.default_char
        return(value_enc)

    def tokenize_fpe(self, value):
        token = ''
        value = value.decode(
            self.utf8_encoding)
        # String
        if (type(value) is str):
            pending = True
            prev_ch = ''
            while (pending):
                try:
                    e = pyffx.String(self.secret, alphabet = self.alphabet,
                        length = len(str(value)))
                    token = e.encrypt(value)
                    pending = False
                except Exception as err:
                    ch = str(err).split("'")[1]
                    if (ch == prev_ch):
                        value = value.replace(ch,
                            self.default_char)
                    else:
                        self.alphabet += ch
                        prev_ch = ch
        # Integer
        elif (type(value) is int):
            e = pyffx.Integer(self.secret,
                length = len(str(value)))
            token = e.encrypt(value)
        # Float
        elif (type(value) is float):
            integer, decimal = str(value).split('.')
            e = pyffx.Integer(self.secret,
                length = len(str(integer)))
            token += str(e.encrypt(integer)) + '.'
            e = pyffx.Integer(self.secret,
                length = len(str(decimal)))
            token += str(e.encrypt(decimal))
            token = float(token)
        return(token)