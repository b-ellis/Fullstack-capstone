exports.DATABASE_URL = process.env.PROD_MONGODB ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/capstone' :
                            'mongodb://localhost/capstone-dev');
exports.PORT = process.env.PORT || 8080;