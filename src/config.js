module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL,
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://dunder_mifflin@localhost/test_res_review'
};