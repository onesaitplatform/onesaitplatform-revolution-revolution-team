
class Tokenizer:

    # Attributes
    secret = None
    method = None
    methods = [ 'FPE' ]
    alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789=-_.:,;{}[]"¡!¿?+*|\'é'
    default_char = '?'

    def __init__(self, method, id):
        self.method = method
        self.secret = (str(
            datetime.datetime.now().timestamp()) + '-' + id).encode()

    def tokenize(self, value):
        value = value.encode(
            'ascii', errors = 'ignore')
        token = ''
        if (self.method == self.methods[0]):
            tokenize_fpe(value)
        return(token)

    def tokenize_fpe(self, value):
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