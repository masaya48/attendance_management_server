CREATE OR REPLACE VIEW v_test
AS
SELECT
    t1.id,
    t1.column1,
    t1.column2,
    t2.column3,
    t2.column4
FROM
    test1 AS t1
    INNER JOIN
    test2 AS t2 ON
    t1.id = t2.id;

