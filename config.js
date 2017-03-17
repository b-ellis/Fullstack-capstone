exports.DATABASE_URL = 'mongodb://b-ellis:Marshall18@ds131890.mlab.com:31890/thinkfulcapstone' ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/capstone' :
                            'mongodb://localhost/capstone-dev');
exports.PORT = process.env.PORT || 8080;