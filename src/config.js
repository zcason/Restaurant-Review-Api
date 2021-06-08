module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'production',
    DATABASE_URL: process.env.DATABASE_URL + (process.env.NODE_ENV === 'production' ? '?ssl=true' : '') || 'postgresql://dunder_mifflin@localhost/res_review',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://dunder_mifflin@localhost/test_res_review'
};