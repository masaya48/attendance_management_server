CREATE OR REPLACE VIEW v_test
AS
SELECT
    t2.id,
    t2.test1_id,
    t1.column1,
    t1.column2,
    t2.column3,
    t2.column4
FROM
    test2 AS t2
    INNER JOIN
    test1 AS t1 ON
    t1.id = t2.test1_id;
